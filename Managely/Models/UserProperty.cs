using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class UserProperty
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int PropertyId { get; set; }

        public Property Property { get; set; }

        [MaxLength(255)]
        public string PropertyUnitNumber { get; set; }
    }
}
