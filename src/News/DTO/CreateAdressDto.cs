using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.DTO
{
    public class CreateAdressDto
    {
        public int Code { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string TownName { get; set; }
        public string UserName { get; set; }

    }
}
