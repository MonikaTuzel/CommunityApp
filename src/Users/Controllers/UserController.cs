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


        [HttpGet("[action]/{id}")]

        public async Task<IActionResult> GetAdressById(int id)
        {
            var adresses = await _userservice.GetAsdressById(id);
            return Json(adresses);
        }




        [HttpGet("[action]")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = await _userservice.GetUserByName(name);
            return Json(user);
        }

        [HttpPost]
        [Route("[action]")]

        public async Task<User> PostNewUser([FromBody]CreateUserDto userDto)
        {
            await _userservice.AddUser(userDto.RoleId, userDto.ShortName, userDto.FullName,
                userDto.StudentScore, userDto.Phone, userDto.Email, userDto.Password);

            return await _userservice.GetUserByName(userDto.ShortName);

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
