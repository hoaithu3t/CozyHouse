using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace CozyHouse.EntityFrameworkCore
{
    [DependsOn(
        typeof(CozyHouseEntityFrameworkCoreModule)
        )]
    public class CozyHouseEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<CozyHouseMigrationsDbContext>();
        }
    }
}
