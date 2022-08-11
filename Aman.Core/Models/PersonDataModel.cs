using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aman.Core.Models
{
   public class PersonDataModel
    {
        [JsonProperty("id")] public int? Id { get; set; }
        [JsonProperty("addressId")] public int AddressId { get; set; }
        [JsonProperty("addressName")] public string AddressName { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("email")] public string Email { get; set; }

    }
}
