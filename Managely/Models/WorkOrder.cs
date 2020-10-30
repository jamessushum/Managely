using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class WorkOrder
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Subject { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public int SeverityId { get; set; }

        public Severity Severity { get; set; }

        [Required]
        public int StatusId { get; set; }

        public Status Status { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int PropertyId { get; set; }

        public Property Property { get; set; }
    }
}
