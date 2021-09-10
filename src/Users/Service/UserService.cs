using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.DataBase;
using Users.DTO;
using Users.IServices;
using Users.Models;

namespace Users.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;

        public UserService(AppDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> BrowseAllUsers()
            => await Task.FromResult(_dbContext.User);

        public async Task<User> GetUserById(int id)
            => await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Id == id));


        public async Task<Adress> GetAsdressById(int id)
          => await Task.FromResult(_dbContext.Adress.SingleOrDefault(x => x.IdAdress == id));

        public async Task<User> GetUserByName(string name)
            => await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.ShortName == name));

        public async Task UpdateUser(int userId, string fullName, int studentScore, int phone)
        {
            var user = await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Id == userId));
            if(user == null)
            {
                throw new Exception($"Użytkownik o numerze id =  '{userId}' nie istnieje!");
            };

           await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Id == userId));

            user.SetFullName(fullName);
            user.SetPhone(phone);
            user.SetStudentScore(studentScore);

            _dbContext.User.Update(user);
            await Task.CompletedTask;
            _dbContext.SaveChanges();
            await Task.FromResult("");
        }

        public async Task AddUser(int roleId, string shortName, string fullName, 
            int studentScore, int phone, string email, string password)
        {
            var user = await Task.FromResult(_dbContext.User.SingleOrDefault(x => x.Email == email));
            if (user != null)
            {
                throw new Exception($"Adres e-mail: '{email}' już istnieje");
            }

            user = new User(roleId, shortName, fullName, studentScore, phone, email, password);

            _dbContext.User.Add(user);
            _dbContext.SaveChanges();
            await Task.FromResult("");

        }

        public async Task DeleteUser(int id)
        {
            var user =  _dbContext.User.FirstOrDefault(x => x.Id == id);
            _dbContext.User.Remove(user);

            _dbContext.SaveChanges();
            await Task.CompletedTask;

        }

    }
}
