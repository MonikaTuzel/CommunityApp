using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.DTO;

namespace Users.IServices
{
    public interface IAccountService
    {
        void RegisterUser(RegisterUserDto dto);
    }
}
