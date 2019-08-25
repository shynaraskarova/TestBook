using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestBook.Model
{
    public class Category : BaseEntity
    {
        [Required]
        [StringLength(500)]
        public string Name { get; set; }
    }
}
