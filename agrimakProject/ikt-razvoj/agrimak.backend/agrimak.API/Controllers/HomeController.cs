using agrimak.API.Data;
using agrimak.API.DTOs;
using agrimak.domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace agrimak.API.Controllers
{
    [Route("home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public AppDbContext _context { get; set; }

        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<JsonResult> GetAllProducts()
        {
            var allProducts = await _context.Products.ToListAsync();
            return new JsonResult(allProducts);
        }

        [HttpGet]
        [Route("getByCategory")]
        public async Task<JsonResult> GetByType(Category category)
        {
            if (category == Category.AllProducts)
            {
                var products = await _context.Products.ToListAsync();
                return new JsonResult(products);
            }
            else
            {
                var products = await _context.Products
                    .Where(x => x.Category == category)
                    .ToListAsync();
                return new JsonResult(products);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<JsonResult> Create([FromBody] CreateProductDto dto)
        {
            if (!Enum.IsDefined(typeof(Category), dto.Category))
                throw new Exception("Category not defined");

            var product = new Product
            {
                Title = dto.Title,
                Description = dto.Description,
                Image = dto.Image,
                Price = dto.Price,
                Category = (Category)dto.Category,
                Unit = dto.Unit,
                Stock = dto.Stock
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return new JsonResult(product.Id);
        }

        [Authorize]
        [HttpPost]
        [Route("delete")]
        public async Task<JsonResult> Delete([FromBody] DeleteProductDto dto)
        {
            var product = await _context.Products.FindAsync(dto.ProductId);

            if (product == null)
                throw new Exception($"Product with id {dto.ProductId} not found.");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return new JsonResult("");
        }

        [HttpPost]
        [Route("search")]
        public async Task<JsonResult> Search([FromBody] SearchDto search) 
        {
            var products = _context.Products
                .Where(x => EF.Functions.ToTsVector("english", x.Title + " " + x.Description)
                                        .Matches(EF.Functions.WebSearchToTsQuery("english", search.Query))).ToList();

            return new JsonResult(products);
        }

        [HttpGet]
        [Route("getById")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}