using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models
{
    public class Adress
    {
        [Key]
        public int IdAdress { get; set; }
        public int TownId { get; set; }
        public int Code { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public int UserId { get; set; }
        
        public Adress(int idAdress, int townId, int code, string street,
            int number, int userId)
        {
            IdAdress = idAdress;
            TownId = townId;
            Code = code;
            Street = street;
            Number = number;
            UserId = userId;
        }

    }

}
