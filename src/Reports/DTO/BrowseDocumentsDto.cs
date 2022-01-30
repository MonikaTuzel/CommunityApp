using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Files.DTO
{
    public class BrowseDocumentsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public DateTime UpdateDate { get; set; }
        public string StatusName { get; set; }
    }
}
