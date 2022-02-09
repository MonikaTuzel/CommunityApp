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
        LoginInfoDto GenerateJwt(LoginUserDto dto);
        void ChangePassword(int userId, ChangePasswordDto dto);
    }
}
