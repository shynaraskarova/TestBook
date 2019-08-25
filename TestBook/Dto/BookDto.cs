using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestBook.Dto
{
    public class BookDto
    {
        public long id { get; set; }
        public string name { get; set; }
        public long? year { get; set; }
        public long category_id { get; set; }
    }
}
