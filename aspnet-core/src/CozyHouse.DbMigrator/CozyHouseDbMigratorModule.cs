using CozyHouse.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace CozyHouse.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(CozyHouseEntityFrameworkCoreDbMigrationsModule),
        typeof(CozyHouseApplicationContractsModule)
        )]
    public class CozyHouseDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
