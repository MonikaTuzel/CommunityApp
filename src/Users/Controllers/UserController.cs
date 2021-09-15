using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Users.DTO;
using Users.IServices;
using Users.Models;

namespace Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
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
            return Ok(users);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = await _userservice.GetUserByName(name);
            return Ok(user);
        }

        [HttpPut("{userId}")]

        public async Task<User> PutUser([FromBody] UpdateUserDto userDto, [FromRoute] int userId)
        {
            await _userservice.UpdateUser(userId, userDto);
            return await _userservice.GetUserById(userId);
        }

        [HttpDelete("{userId}")]

        public ActionResult Delete(int userId)
        {
            _userservice.DeleteUser(userId);
            return NoContent();
        }

    }
}
