using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.DTO
{
    public class LoginInfoDto
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string RoleName { get; set; }
    }
}
