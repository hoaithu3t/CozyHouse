using CozyHouse.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace CozyHouse
{
    [DependsOn(
        typeof(CozyHouseEntityFrameworkCoreTestModule)
        )]
    public class CozyHouseDomainTestModule : AbpModule
    {

    }
}