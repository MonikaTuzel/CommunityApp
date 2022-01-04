using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.DTO
{
    public class UserInformationDto
    {
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public int StudentScore { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }
    }
}
