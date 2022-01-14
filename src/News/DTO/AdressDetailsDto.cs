namespace Contacts.DTO
{
    public class AdressDetailsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string TownName { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Commune { get; set; }
        public int Code { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
    }
}
