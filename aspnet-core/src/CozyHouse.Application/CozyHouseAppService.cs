using System;
using System.Collections.Generic;
using System.Text;
using CozyHouse.Localization;
using Volo.Abp.Application.Services;

namespace CozyHouse
{
    /* Inherit your application services from this class.
     */
    public abstract class CozyHouseAppService : ApplicationService
    {
        protected CozyHouseAppService()
        {
            LocalizationResource = typeof(CozyHouseResource);
        }
    }
}
