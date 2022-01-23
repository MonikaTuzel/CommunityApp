using System;

namespace Messages.DTO
{
    public class CreateMessageDto
    {
        public int UserId { get; set; }
        public int SenderId { get; set; }
        public string Topic { get; set; }
        public string Contents { get; set; }
        public DateTime Date { get; set; }

    }
}
