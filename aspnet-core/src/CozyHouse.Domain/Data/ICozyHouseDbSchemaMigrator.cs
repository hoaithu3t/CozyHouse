using System.Threading.Tasks;

namespace CozyHouse.Data
{
    public interface ICozyHouseDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
