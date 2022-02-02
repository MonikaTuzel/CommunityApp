using System.Collections.Generic;
using System.Threading.Tasks;
using Users.DTO;
using Users.Models;

namespace Users.IServices
{
    public interface IUserService
    {
        IEnumerable<UserInformationDto> BrowseAllUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByName(string name);
        Task UpdateUser(int userId, UpdateUserDto userDto);
        Task EditUser(int userId, EditUserDto userDto);
        void DeleteUser(int id);
    }
}
