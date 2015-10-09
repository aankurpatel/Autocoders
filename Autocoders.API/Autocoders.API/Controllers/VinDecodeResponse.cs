using System.Collections.Generic;

namespace Autocoders.API.Controllers
{
    public class VinDecodeResponse
    {
        public Make make { get; set; }
        public Model model { get; set; }
        public Engine engine { get; set; }
        public Transmission transmission { get; set; }
        public string drivenWheels { get; set; }
        public string numOfDoors { get; set; }
        public List<object> options { get; set; }
        public List<Color> colors { get; set; }
        public string manufacturerCode { get; set; }
        public Price price { get; set; }
        public Categories categories { get; set; }
        public string vin { get; set; }
        public string squishVin { get; set; }
        public List<Year> years { get; set; }
        public string matchingType { get; set; }
        public string completeness { get; set; }
        public string optionMatchPercent { get; set; }

        public class Make
        {
            public string id { get; set; }
            public string name { get; set; }
            public string niceName { get; set; }
        }

        public class Model
        {
            public string id { get; set; }
            public string name { get; set; }
            public string niceName { get; set; }
        }

        public class Rpm
        {
            public string horsepower { get; set; }
            public string torque { get; set; }
        }

        public class Valve
        {
            public string timing { get; set; }
            public string gear { get; set; }
        }

        public class Engine
        {
            public string id { get; set; }
            public string name { get; set; }
            public string equipmentType { get; set; }
            public string availability { get; set; }
            public string compressionRatio { get; set; }
            public string cylinder { get; set; }
            public string size { get; set; }
            public string displacement { get; set; }
            public string configuration { get; set; }
            public string fuelType { get; set; }
            public string horsepower { get; set; }
            public string torque { get; set; }
            public string totalValves { get; set; }
            public string type { get; set; }
            public string code { get; set; }
            public string compressorType { get; set; }
            public Rpm rpm { get; set; }
            public Valve valve { get; set; }
        }

        public class Transmission
        {
            public string id { get; set; }
            public string name { get; set; }
            public string equipmentType { get; set; }
            public string availability { get; set; }
            public string automaticType { get; set; }
            public string transmissionType { get; set; }
            public string numberOfSpeeds { get; set; }
        }

        public class Option
        {
            public string id { get; set; }
            public string name { get; set; }
            public string equipmentType { get; set; }
            public string availability { get; set; }
        }

        public class Color
        {
            public string category { get; set; }
            public List<Option> options { get; set; }
        }

        public class Price
        {
            public string baseMSRP { get; set; }
            public string baseInvoice { get; set; }
            public string deliveryCharges { get; set; }
            public string usedTmvRetail { get; set; }
            public string usedPrivateParty { get; set; }
            public string usedTradeIn { get; set; }
            public bool estimateTmv { get; set; }
            public string tmvRecommendedRating { get; set; }
        }

        public class Categories
        {
            public string market { get; set; }
            public string EPAClass { get; set; }
            public string vehicleSize { get; set; }
            public string crossover { get; set; }
            public string primaryBodyType { get; set; }
            public string vehicleStyle { get; set; }
            public string vehicleType { get; set; }
        }

        public class Submodel
        {
            public string body { get; set; }
            public string modelName { get; set; }
            public string niceName { get; set; }
        }

        public class Style
        {
            public string id { get; set; }
            public string name { get; set; }
            public Submodel submodel { get; set; }
            public string trim { get; set; }
        }

        public class Year
        {
            public string id { get; set; }
            public string year { get; set; }
            public List<Style> styles { get; set; }
        }

        public class MPG
        {
            public string highway { get; set; }
            public string city { get; set; }
        }

        public class RootObject
        {
          
        }

    }
}