using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agrimak_backend.Migrations
{
    /// <inheritdoc />
    public partial class Stockcolumnforproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Products");
        }
    }
}
