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
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public ActionResult RegistryNewUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult GenerateJwt([FromBody]LoginUserDto dto )
        {
            string token = _accountService.GenerateJwt(dto);
            return Ok(token);
        }
        
        [HttpPut("{userId}/change")]

        public ActionResult ChangeUserPassword([FromBody]ChangePasswordDto dto, [FromRoute]int userId)
        {
            _accountService.ChangePassword(userId, dto);
            return Ok();
        }

    }
}
