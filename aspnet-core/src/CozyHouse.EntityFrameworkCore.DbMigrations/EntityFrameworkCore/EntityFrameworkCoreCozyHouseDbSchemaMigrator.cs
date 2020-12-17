using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using CozyHouse.Data;
using Volo.Abp.DependencyInjection;

namespace CozyHouse.EntityFrameworkCore
{
    public class EntityFrameworkCoreCozyHouseDbSchemaMigrator
        : ICozyHouseDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreCozyHouseDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the CozyHouseMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<CozyHouseMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}