using AutoMapper;
using Users.DTO;
using Users.Models;

namespace Users.Mappers
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, CreateUserDto>();
                cfg.CreateMap<Adress, CreateUserDto>();
                
            })
            .CreateMapper();
    }

}
