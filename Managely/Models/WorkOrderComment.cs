using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class WorkOrderComment
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Content { get; set; }

        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int WorkOrderId { get; set; }

        public WorkOrder WorkOrder { get; set; }
    }
}
