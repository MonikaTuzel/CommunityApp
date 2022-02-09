namespace Users.DTO
{
    public class RegisterUserDto
    {
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public int StudentScore { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int TownId { get; set; }
        public int Code { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
    }
}
