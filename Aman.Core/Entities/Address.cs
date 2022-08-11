using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aman.Core.Entities
{
    public class Address 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string AddressName { get; set; }

        public virtual ICollection<Person> Person { get; set; }
    }
}
