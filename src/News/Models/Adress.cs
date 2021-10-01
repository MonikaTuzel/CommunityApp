namespace Contacts.Models
{
    public class Adress
    {
        public int Id { get; set; }
        public int TownId { get; set; }
        public int Code { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual Town Town { get; set; }

    }
}
