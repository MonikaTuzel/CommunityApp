using Files.Models;
using Microsoft.EntityFrameworkCore;

namespace Files.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
         : base(options)
        {
        }

        public DbSet<Documents> Documents { get; set; }
        public DbSet<User> User { get; set; }


    }
}
