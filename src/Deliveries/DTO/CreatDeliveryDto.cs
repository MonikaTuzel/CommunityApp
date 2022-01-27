using System;

namespace Deliveries.DTO
{
    public class CreatDeliveryDto
    {
        public DateTime DeliveryDate { get; set; }
        public int userId { get; set; }
        public string Year { get; set; }
        public int Semestr { get; set; }
        public int Week { get; set; }
        public string? Description { get; set; }

    }
}
