namespace agrimak.API.DTOs
{
    public class CreateProductDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public int Category { get; set; } // Enum as int
        public string Unit { get; set; }
        public int Stock { get; set; }
    }
}
