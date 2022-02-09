using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Users.DataBase;
using Users.DTO;
using Users.Exceptions;
using Users.IServices;
using Users.Models;

namespace Users.Service
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger _logger;
        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(AppDbContext dbContext, IPasswordHasher<User> passwordHasher, 
            ILogger<AccountService> logger, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _logger = logger;
            _authenticationSettings = authenticationSettings;
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            _logger.LogWarning($"Wywołano funkcję rejestracji nowego użytkownika");

            var newUser = new User()
            {
                RoleId = 2,
                ShortName = dto.ShortName,
                FullName = dto.FullName,
                StudentScore = dto.StudentScore,
                Phone = dto.Phone,
                Email = dto.Email,
                Password = dto.Password,
            };
            _dbContext.User.Add(newUser);
            var passwordhash = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.Password = passwordhash;
            _dbContext.SaveChanges();

            var newAdress = new Adress()
            {
                TownId = dto.TownId,
                Code = dto.Code,
                Street = dto.Street,
                Number = dto.Number,
                UserId = newUser.Id,
            };
            _dbContext.Adress.Add(newAdress);
            _dbContext.SaveChanges();
        }
        public LoginInfoDto GenerateJwt(LoginUserDto dto)
        {
            _logger.LogWarning($"Próba logowania adresu email: {dto.Email}");

            var user = _dbContext.User.Include(u=>u.Role).FirstOrDefault(x => x.Email == dto.Email);
            if (user is null)
                throw new LoginUserException($"Podane dane logowania są błędne");

            var resultHash = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (resultHash == PasswordVerificationResult.Failed)
                throw new LoginUserException($"Podane dane logowania są błędne");

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.FullName}"),
                new Claim(ClaimTypes.Role, $"{user.Role.Name}"),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expire = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer,
                claims, expires: expire, signingCredentials: cred);
            var tokenHandler = new JwtSecurityTokenHandler();

            var info = new LoginInfoDto()
            {
                Id = user.Id,
                RoleName = user.Role.Name,
                Token = token.ToString()
            };
            return info;
        }

        public void ChangePassword(int userId, ChangePasswordDto dto)
        {
            _logger.LogWarning($"Próba zmiany hasła dla użytkonika nr: {userId}");

            var user = _dbContext.User.FirstOrDefault(x => x.Id == userId);

            var passwordHash = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.CurrentPassword);
            if (passwordHash == PasswordVerificationResult.Failed)
                throw new LoginUserException($"Podano błędne hasło");

            var newPassword = dto.NewPassword;
            var newPasswordRepeat = dto.ConfirmNewPassword;
            if (newPassword != newPasswordRepeat)
                throw new LoginUserException($"Hasła nie są identyczne");

            var newPasswordHash = _passwordHasher.HashPassword(user, dto.NewPassword);
            user.Password = newPasswordHash;
            _dbContext.Update(user);
            _dbContext.SaveChanges();

        }
    }
}
