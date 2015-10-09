using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Autocoders.API
{
    /// <summary>
    /// Json Serializer for converting objects to HttpContent and deserializing JSON values to their corresponding type instance
    /// </summary>
    public class JsonSerializer
    {
        private JsonSerializerSettings _settings;

        internal virtual JsonSerializerSettings Settings
        {
            get
            {
                return _settings ?? (_settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
            }
        }

        public virtual HttpContent Serialize(object value)
        {
            var json = JsonConvert.SerializeObject(value, Settings);
            return new StringContent(json, Encoding.UTF8, "application/json");
        }

        public virtual T Deserialize<T>(string value)
        {
            return JsonConvert.DeserializeObject<T>(value, Settings);
        }
    }
}
