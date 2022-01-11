using System;

namespace Messages.Models
{
    public class MessageDetails
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string Topic { get; set; }
        public string Contents { get; set; }
        public DateTime Date { get; set; }

        public virtual User Sender { get; set; }
    }
}
