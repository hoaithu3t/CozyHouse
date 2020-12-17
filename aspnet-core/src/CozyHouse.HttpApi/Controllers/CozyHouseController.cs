using CozyHouse.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace CozyHouse.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class CozyHouseController : AbpController
    {
        protected CozyHouseController()
        {
            LocalizationResource = typeof(CozyHouseResource);
        }
    }
}