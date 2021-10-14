using AutoMapper;
using Files.DTO;
using Files.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Files
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Documents, BrowseDocumentsDto>()
                .ForMember(c => c.UserName, c => c.MapFrom(e => e.User.ShortName));
        }
    }
}
