using Microsoft.AspNetCore.Http;
using System;

namespace Files.Models
{
    public class Documents
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public DateTime UpdateDate { get; set; }
        public virtual User User { get;  set; }
    }
}
