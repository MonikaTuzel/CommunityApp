using Deliveries.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Models;

namespace Deliveries.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<User> User { get; set; }


    }
}
