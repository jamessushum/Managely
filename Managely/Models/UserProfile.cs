using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(555)]
        public string Email { get; set; }

        [MaxLength(255)]
        public string Company { get; set; }

        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
