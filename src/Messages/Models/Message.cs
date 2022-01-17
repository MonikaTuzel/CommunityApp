using System;

namespace Messages.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public string SenderName { get; set; }
        public string Topic { get; set; }
        public string Contents { get; set; }
        public DateTime Date { get; set; }

        public virtual Status StatusMess { get; set; }
        public virtual User User { get; set; }
    }
}
