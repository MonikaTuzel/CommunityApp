using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliveries.DTO
{
    public class AddDeliveryDTO
    {
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string Year { get; set; }
        public int Semestr { get; set; }
        public int Week { get; set; }
        public string Description { get; set; }
        public int StatusId { get; set; }
    }
}
