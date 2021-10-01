using System;

namespace Deliveries.Models
{
    public class Delivery
    {

        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Year { get; set; }
        public int Semestr { get; set; }
        public int Week { get; set; }
        public string? Description { get; set; }
        public int StatusId { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual Status Status { get; set; }
        public virtual User User { get; set; }


    }

}
