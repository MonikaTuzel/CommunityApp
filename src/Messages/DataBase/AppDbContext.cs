using Messages.Models;
using Microsoft.EntityFrameworkCore;

namespace Messages.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
         : base(options)
        {
        }

        public DbSet<Message> Message { get; set; }
        public DbSet<Status> StatusMess { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<MessageDetails> MessageDetails { get; set; }

    }
}
