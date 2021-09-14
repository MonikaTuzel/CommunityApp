using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.DataBase;
using Users.DTO;

namespace Users.Validation
{
    public class RegisterUserDtoValidation : AbstractValidator<RegisterUserDto>
    {
        private readonly AppDbContext _dbContext;

        public RegisterUserDtoValidation(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        

            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).MinimumLength(6);
            RuleFor(x => x.Email).Custom((value, context) =>
            {
                var emailInUse = _dbContext.User.Any(u => u.Email == value);
                if (emailInUse)
                {
                    context.AddFailure("Email", "Ten użytkownik już istnieje!");
                }
            });

        }
    }
}
