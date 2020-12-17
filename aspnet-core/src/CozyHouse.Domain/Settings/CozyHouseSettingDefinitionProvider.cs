using Volo.Abp.Settings;

namespace CozyHouse.Settings
{
    public class CozyHouseSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(CozyHouseSettings.MySetting1));
        }
    }
}
