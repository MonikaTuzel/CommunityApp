using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Users.DTO;
using Users.IServices;
using Users.Models;

namespace Users.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userservice;

        public UserController(IUserService userservice)
        {
            _userservice = userservice;
        }

        [HttpGet]

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userservice.BrowseAllUsers();
        }

        [HttpGet("/{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var users = await _userservice.GetUserById(id);
            return Json(users);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = await _userservice.GetUserByName(name);
            return Json(user);
        }

        [HttpPut("{userId}")]

        public async Task<User> PutUser(int userId,[FromBody] UpdateUserDto userDto )
        {
            await _userservice.UpdateUser(userId, userDto.FullName, userDto.StudentScore, userDto.Phone);
            return await _userservice.GetUserById(userId);
        }

        [HttpDelete("{userId}")]

        public async Task<IActionResult> Delete(int userId)
        {
            await _userservice.DeleteUser(userId);
            return NoContent();
        }

    }
}
