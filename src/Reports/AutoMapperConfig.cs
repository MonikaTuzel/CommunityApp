using AutoMapper;
using Files.DTO;
using Files.Models;

namespace Files
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Documents, BrowseDocumentsDto>()
                .ForMember(c => c.UserName, c => c.MapFrom(e => e.User.ShortName))
                .ForMember(c => c.StatusName, c => c.MapFrom(e => e.Status.Name));                
        }
    }
}