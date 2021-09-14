using Microsoft.EntityFrameworkCore;
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
        public DbSet<Role> Role { get; set; }

    }
}
