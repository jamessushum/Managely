using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class Severity
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Type { get; set; }
    }
}
