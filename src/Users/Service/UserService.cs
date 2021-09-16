using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.DataBase;
using Users.DTO;
using Users.Exeptions;
using Users.IServices;
using Users.Models;

namespace Users.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(AppDbContext dbContext, IMapper mapper ,ILogger<UserService> logger )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<UserInformationDto> BrowseAllUsers()
        {
            var users = _dbContext.User.Include(u=>u.Role).ToList();
            var usersDto = _mapper.Map<List<UserInformationDto>>(users);

            return usersDto;
        }

        public async Task<User> GetUserById(int id)
            => await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Id == id));

        public async Task<User> GetUserByName(string name)
            => await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.ShortName == name));

        public async Task UpdateUser(int userId, UpdateUserDto userDto)
        {
            _logger.LogWarning($"Wywołano funkcję edycji danych użytkonika o id={userId}");

            var user = await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Id == userId));
            if (user is null)
                throw new NotFoundException($"Użytkownik o numerze id: '{userId}' nie istnieje!");
            
            user.FullName = userDto.FullName;
            user.StudentScore = userDto.StudentScore;
            user.Phone = userDto.Phone;

            _dbContext.User.Update(user);
            _dbContext.SaveChanges();
            await Task.FromResult("");
        }

        public void DeleteUser(int id)
        {
            _logger.LogWarning($"Wywołano akcję usunięcia użytwkonika o id =  {id} ");

            var user =  _dbContext.User.FirstOrDefault(x => x.Id == id);
            if (user is null)
                throw new NotFoundException($"Użytkownik o numerze id: {id} nie istnieje");

            _dbContext.User.Remove(user);
            _dbContext.SaveChanges();
        }

    }
}
