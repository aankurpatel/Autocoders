using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AttributeRouting.Web.Http;
using Autocoders.API.Models;

namespace Autocoders.API.Controllers
{
    //[RoutePrefix("api/edmunds")]
    public class EdmundsController : ApiController
    {
        private readonly EdmundsClient _edmundsClient;


        public EdmundsController()
        {
            
            _edmundsClient = new EdmundsClient();
        }

        [GET("api/edmunds/vehicle/{vin}")]
        public VinDecodeResponse Get(string vin)
        {
            try
            {               
                var vehicleResponse = _edmundsClient.GetVehicleByVin(vin).Result;
                return vehicleResponse;

            }
            catch (Exception exception)
            {
                var message = string.Format("Error getting response from server for {0}", vin);
                return null;
            }            
        }

    }
}