using Contacts.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Adress> Adress { get; set; }
        public DbSet<Town> Town { get; set; }
        public DbSet<User> User { get; set; }

    }
}
