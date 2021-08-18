using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Deliveries.Models;

namespace Deliveries.IService
{
    public class IDeiveryService : DbContext
    {
        public IDeiveryService (DbContextOptions<IDeiveryService> options)
            : base(options)
        {
        }

        public DbSet<Deliveries.Models.Delivery> Delivery { get; set; }
    }
}
