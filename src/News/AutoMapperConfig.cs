using AutoMapper;
using Contacts.DTO;
using Contacts.Models;

namespace Contacts
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Adress, AdressDetailsDto>()
                .ForMember(x => x.TownName, x => x.MapFrom(x => x.Town.Name))
                .ForMember(x => x.Province, x => x.MapFrom(x => x.Town.Province))
                .ForMember(x => x.District, x => x.MapFrom(x => x.Town.District))
                .ForMember(x => x.Commune, x => x.MapFrom(x => x.Town.Commune))
                .ForMember(x => x.UserName, x => x.MapFrom(x => x.User.FullName))
                .ForMember(x => x.UserEmail, x => x.MapFrom(x => x.User.Email));

            CreateMap<Adress, CreateAdressDto>()
                .ForMember(x => x.TownName, x => x.MapFrom(x => x.Town.Name))
                .ForMember(x => x.UserName, x => x.MapFrom(x => x.User.ShortName));

        }

    }   
}

