namespace Messages.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public int MessageDetailsId { get; set; }

        public virtual Status StatusMess { get; set; }
        public virtual User User { get; set; }
        public virtual MessageDetails MessageDetails { get; set; }
    }
}
