using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Models;

namespace Users.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
         : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Adress> Adress { get; set; }
    }
}
