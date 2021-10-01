using Contacts.DataBase;
using Contacts.DTO;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.Validation
{
    public class CreateAdressValidation : AbstractValidator<CreateAdressDto>
    {
        private readonly AppDbContext _dbContext;

        public CreateAdressValidation(AppDbContext dbContext)
        {
            _dbContext = dbContext;

            RuleFor(x => x.TownName).Custom((value, context) =>
            {
                var town = _dbContext.Town.SingleOrDefault(x => x.Name == value);

                if (town is null)
                {
                    context.AddFailure("Town", "Podana miejscowość nie istnieje!");
                }
            });
            RuleFor(x => x.UserName).Custom((value, context) =>
            {
                var user = _dbContext.User.SingleOrDefault(x => x.ShortName == value);

                if (user is null)
                {
                    context.AddFailure("User", "Podany użytkownik nie istnieje!");
                }
            });
        }

         
    }
}
