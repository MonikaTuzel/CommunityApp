namespace Users.DTO
{
    public class RegisterUserDto
    {
        public int RoleId { get; set; } = 2;
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public int StudentScore { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
