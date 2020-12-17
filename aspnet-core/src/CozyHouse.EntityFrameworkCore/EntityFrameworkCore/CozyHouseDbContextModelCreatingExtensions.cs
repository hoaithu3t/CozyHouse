using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace CozyHouse.EntityFrameworkCore
{
    public static class CozyHouseDbContextModelCreatingExtensions
    {
        public static void ConfigureCozyHouse(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(CozyHouseConsts.DbTablePrefix + "YourEntities", CozyHouseConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}