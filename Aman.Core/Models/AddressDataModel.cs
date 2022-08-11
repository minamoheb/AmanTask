using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aman.Core.Models
{
   public class AddressDataModel
    {
        [JsonProperty("id")] public int? Id { get; set; }
        [JsonProperty("addressName")] public string AddressName { get; set; }

    }
}
