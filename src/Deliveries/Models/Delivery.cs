using Deliveries.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliveries.Models
{
    public class Delivery
    {

        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string Year { get; set; }
        public int Semestr { get; set; }
        public int Week { get; set; }
        public string Description { get; set; }
        public int StatusId { get; set; }
        public Delivery(int userId, DateTime date, string year, int semestr, int week, string description, int statusId)
        {
            UserId = userId;
            Date = date;
            Year = year;
            Semestr = semestr;
            Week = week;
            Description = description;
            StatusId = statusId;
        }

        public void SetDescription(string description)
        {
            Description = description;
        }
        public void SetStatus(int status)
        {
            StatusId = status;
        }
    }

}
