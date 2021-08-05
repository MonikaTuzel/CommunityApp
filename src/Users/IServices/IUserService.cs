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
        //Task AddUser(int roleId, string shortName, string fullName,  int studentScore, int phone, string email, string password);

        Task AddUser(CreateUserDto userdto);
        Task UpdateUser(int userId, string fullName, int studentScore, int phone);
        Task DeleteUser(int id);
    }
}
