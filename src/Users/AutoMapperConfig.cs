using AutoMapper;
using Users.DTO;
using Users.Models;

namespace Users
{
    public class AutoMapperConfig : Profile

    {
        public AutoMapperConfig()
        {
            CreateMap<User, UserInformationDto>()
                .ForMember(c => c.RoleName, c => c.MapFrom(e => e.Role.Name));

        }
    }
}
