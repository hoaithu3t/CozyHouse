using CozyHouse.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace CozyHouse.Permissions
{
    public class CozyHousePermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(CozyHousePermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(CozyHousePermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<CozyHouseResource>(name);
        }
    }
}
