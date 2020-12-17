using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace CozyHouse.Data
{
    /* This is used if database provider does't define
     * ICozyHouseDbSchemaMigrator implementation.
     */
    public class NullCozyHouseDbSchemaMigrator : ICozyHouseDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}