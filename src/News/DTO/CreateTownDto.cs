using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.DTO
{
    public class CreateTownDto
    {
        public string Name { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Commune { get; set; }
    }
}
