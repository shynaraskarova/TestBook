using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestBook.Model
{
    public class BaseEntity
    {
        [Key]
        public long Id { get; set; }

        /// <summary>
        /// Дата создания сущности
        /// </summary>
        public DateTime DateCreate { get; set; } = DateTime.Now;

        /// <summary>
        /// Дата изменения сущности
        /// </summary>
        public DateTime DateUpdate { get; set; } = DateTime.Now;

    }
}
