using AutoMapper;
using Messages.DTO;
using Messages.Models;

namespace Messages
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Message, MessagesInfoDto>()
            .ForMember(c => c.SenderFullName, c => c.MapFrom(e => e.User.FullName))
            .ForMember(c => c.StatusName, c => c.MapFrom(e => e.StatusMess.Name));


        }
        
    }
}