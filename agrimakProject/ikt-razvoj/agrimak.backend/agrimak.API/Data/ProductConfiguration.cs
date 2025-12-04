using agrimak.domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace agrimak.API.Data
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => new { x.Title, x.Description })
                .HasMethod("GIN")
                .IsTsVectorExpressionIndex("english");
        }
    }
}
