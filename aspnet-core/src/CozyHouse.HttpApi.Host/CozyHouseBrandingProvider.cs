using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace CozyHouse
{
    [Dependency(ReplaceServices = true)]
    public class CozyHouseBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "CozyHouse";
    }
}
