using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Autocoders.API.Models;

namespace Autocoders.API.Controllers
{
    public class EdmundsClient
    {
        private readonly HttpClient _httpClient;
        private readonly string APIKey = "5mb6ytkzebykvr6978nwt37q";
        private JsonSerializer _serializer;

        public EdmundsClient()
        {
            _serializer = new JsonSerializer();
            _httpClient = new HttpClient();
        }

        public async Task<VinDecodeResponse> GetVehicleByVin(string vin)
        {
            
            try
            {
                var response =  _httpClient.GetAsync(string.Format("https://api.edmunds.com/api/vehicle/v2/vins/{0}?api_key={1}",vin,APIKey)).Result;
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                return ParseVehicleInfo(content);

            }
            catch (Exception exp)
            {               
                return null;
            }
        }

        private VinDecodeResponse ParseVehicleInfo(string content)
        {
            var response = _serializer.Deserialize<VinDecodeResponse>(content);

            if (response == null)
            {
                const string message = "No CAR found for given VIN";                
                throw new Exception(message);
            }
            return response;
        }
    }
}