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
                .ForMember(c => c.Date, c => c.MapFrom(e => e.MessageDetails.Date))
                .ForMember(c => c.Topic, c => c.MapFrom(e => e.MessageDetails.Topic))
                .ForMember(c => c.StatusName, c => c.MapFrom(e => e.StatusMess.Name));

            CreateMap<Message, ContentMessageDto>()
                .ForMember(c => c.Content, c => c.MapFrom(e => e.MessageDetails.Contents))
                .ForMember(c => c.SenderName, c => c.MapFrom(e => e.MessageDetails.Sender.FullName));

            

        }

    }
}