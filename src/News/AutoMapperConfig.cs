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
                .ForMember(x => x.UserName, x => x.MapFrom(x => x.User.FullName))
                .ForMember(x => x.Phone, x => x.MapFrom(x => x.User.Phone))
                .ForMember(x => x.Email, x => x.MapFrom(x => x.User.Email))
                .ForMember(x => x.TownName, x => x.MapFrom(x => x.Town.Name))
                .ForMember(x => x.Province, x => x.MapFrom(x => x.Town.Province))
                .ForMember(x => x.District, x => x.MapFrom(x => x.Town.District))
                .ForMember(x => x.Commune, x => x.MapFrom(x => x.Town.Commune));

            CreateMap<Adress, CreateAdressDto>()
                .ForMember(x => x.TownName, x => x.MapFrom(x => x.Town.Name))
                .ForMember(x => x.UserName, x => x.MapFrom(x => x.User.ShortName));

        }

    }   
}

