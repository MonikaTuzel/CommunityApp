using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.DTO;
using Users.IServices;

namespace Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        /// <summary>
        /// Rejestracja nowego użytkownika
        /// </summary>
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public ActionResult RegistryNewUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }

        /// <summary>
        /// Logowanie użytkownika - generowanie tokena
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult GenerateJwt([FromBody]LoginUserDto dto )
        {
            string token = _accountService.GenerateJwt(dto);
            return Ok(token);
        }


        /// <summary>
        /// Zmiana hasła użytwkonika
        /// </summary>
        [HttpPut("{userId}/change")]

        public ActionResult ChangeUserPassword([FromBody]ChangePasswordDto dto, [FromRoute]int userId)
        {
            _accountService.ChangePassword(userId, dto);
            return Ok();
        }

    }
}
