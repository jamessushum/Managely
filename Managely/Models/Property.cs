using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class Property
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Address { get; set; }

        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public int PropertyTypeId { get; set; }

        public PropertyType PropertyType { get; set; }
    }
}
