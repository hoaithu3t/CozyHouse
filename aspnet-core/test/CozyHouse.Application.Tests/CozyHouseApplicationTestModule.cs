using Volo.Abp.Modularity;

namespace CozyHouse
{
    [DependsOn(
        typeof(CozyHouseApplicationModule),
        typeof(CozyHouseDomainTestModule)
        )]
    public class CozyHouseApplicationTestModule : AbpModule
    {

    }
}