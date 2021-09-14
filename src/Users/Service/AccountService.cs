using Microsoft.AspNetCore.Identity;
using Users.DataBase;
using Users.DTO;
using Users.IServices;
using Users.Models;

namespace Users.Service
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(AppDbContext dbContext, IPasswordHasher<User> passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                RoleId = dto.RoleId,
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
                
        }
    }
}
