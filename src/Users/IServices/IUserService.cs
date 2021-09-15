using System.Collections.Generic;
using System.Threading.Tasks;
using Users.DTO;
using Users.Models;

namespace Users.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<User>> BrowseAllUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByName(string name);
        Task UpdateUser(int userId, UpdateUserDto userDto);
        void DeleteUser(int id);
    }
}
