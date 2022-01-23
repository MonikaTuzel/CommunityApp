using System;

namespace Messages.DTO
{
    public class ReplyMessageDto
    {
        public int MessageId { get; set; }
        public string SenderName { get; set; }
        public string Topic { get; set; }
        public string Contents { get; set; }
        public DateTime Date { get; set; }
    }
}
