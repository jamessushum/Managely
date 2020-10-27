using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class PropertyType
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }
    }
}
