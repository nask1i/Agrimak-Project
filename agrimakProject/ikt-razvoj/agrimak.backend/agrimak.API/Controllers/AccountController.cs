using agrimak.API.Data;
using agrimak.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace agrimak.API.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppDbContext _dataContext;


        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            AppDbContext dataContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            if (user == null)
                return Unauthorized();

            var result = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, true, lockoutOnFailure: true);
            if (!result.Succeeded)
                return Unauthorized();

            var currentUser = await _userManager.GetUserAsync(User);
            var role = User.FindFirstValue(ClaimTypes.Role);

            var userProfile = new UserProfileDto()
            {
                UserName = currentUser.UserName,
                Email = currentUser.Email,
                Role = role
            };

            return Ok(userProfile); // Authentication succeeded, cookie is set
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> CreateUser(UserDto userData)
        {
            if (userData.Password != userData.ConfirmPassword)
                return BadRequest("Password and confirmation password do not match.");

            var exist = await _userManager.FindByEmailAsync(userData.Email);

            if (exist != null)
                return BadRequest("User with this email already exist");

            var user = new IdentityUser()
            {
                UserName = userData.Email,
                Email = userData.Email,
            };

            var result = await _userManager.CreateAsync(user, userData.Password);

            if (result.Succeeded)
            {
                var addRoleResult = await _userManager.AddToRoleAsync(user, "Manager");

                if (addRoleResult.Succeeded)
                    return Ok("User registered");
                else
                    return BadRequest(addRoleResult.Errors.FirstOrDefault()?.Description);

            }
            else
            {
                return BadRequest(result.Errors.FirstOrDefault()?.Description);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("allUsers")]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await (from user in _dataContext.Users
                               join userRole in _dataContext.UserRoles on user.Id equals userRole.UserId
                               join role in _dataContext.Roles on userRole.RoleId equals role.Id
                               where role.Name != "Admin"
                               select new
                               {
                                   user.Id,
                                   user.Email,
                                   Role = role.Name
                               }).ToListAsync();

            return new JsonResult(users);
        }

        [HttpGet]
        [Authorize]
        [Route("logout")]
        public async Task<ActionResult> LogoutUser()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
