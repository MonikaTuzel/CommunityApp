using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliveries.DTO
{
    public class DeliveryInformationDto
    {
        public int Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Year { get; set; }
        public int Semestr { get; set; }
        public int Week { get; set; }
        public string Description { get; set; }
        public string StatusName { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UserName { get; set; }
        public int StudentScore { get; set; }



    }
}
