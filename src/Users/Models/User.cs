using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Users.Models
{
    public class User
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public int StudentScore { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User(int roleId, string shortName, string fullName,
            int studentScore, int? phone, string email, string password)
        {
            
            RoleId = roleId;
            ShortName = shortName;
            FullName = fullName;
            StudentScore = studentScore;
            Phone = phone;
            Email = email;
            Password = password;
        }
        public void SetFullName(string fullName)
        {
            FullName = fullName;
        }
        public void SetStudentScore(int studenctScore)
        {
            StudentScore = studenctScore;
        }
        public void SetPhone(int phone)
        {
            Phone = phone;
        }
    }
     
}
