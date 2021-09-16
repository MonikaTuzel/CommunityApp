using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Users.DTO;
using Users.IServices;
using Users.Models;

namespace Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userservice;

        public UserController(IUserService userservice)
        {
            _userservice = userservice;
        }

        /// <summary>
        /// Pobieranie listy wszystkich użytkowników
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<UserDto>> GetUsers()
        {
            var users = _userservice.BrowseAllUsers();
            return Ok(users);
        }

        /// <summary>
        /// Pobieranie użytkownika po numerze id
        /// </summary>
        [HttpGet("[action]")]

        public async Task<IActionResult> GetById()
        {
            var userId = int.Parse(User.FindFirst(c =>
            c.Type == ClaimTypes.NameIdentifier).Value);

            var users = await _userservice.GetUserById(userId);
            return Ok(users);
        }

        /// <summary>
        /// Pobieranie użytkownika po nazwie
        /// </summary>
        [HttpGet("[action]")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = await _userservice.GetUserByName(name);
            return Ok(user);
        }

        /// <summary>
        /// Aktualnienie danych użytkownika
        /// </summary>
        [HttpPut("{userId}")]

        public async Task<User> PutUser([FromBody] UpdateUserDto userDto, [FromRoute] int userId)
        {
            await _userservice.UpdateUser(userId, userDto);
            return await _userservice.GetUserById(userId);
        }

        /// <summary>
        /// Usuwanie użytkownika
        /// </summary>
        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]

        public ActionResult Delete(int userId)
        {
            _userservice.DeleteUser(userId);
            return NoContent();
        }

    }
}
