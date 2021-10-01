using Contacts.DataBase;
using Contacts.DTO;
using FluentValidation;
using System.Linq;

namespace Contacts.Validation
{
    public class CreateTownValidation : AbstractValidator<CreateTownDto>
    {
        private readonly AppDbContext _dbContext;
        public CreateTownValidation(AppDbContext dbContext)
        {
            _dbContext = dbContext;

            RuleFor(x => x.Name).Custom((value, context) =>
              {
                  var town = _dbContext.Town.Any(x => x.Name == value);
                  if (town)
                  {
                      context.AddFailure("Town", "Podana miejscowość już istnieje!");
                  }
              });
        }
    }
}
