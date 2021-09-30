using AutoMapper;
using Deliveries.DTO;
using Deliveries.Models;

namespace Deliveries
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Delivery, DeliveryInformationDto>()
                .ForMember(c => c.StatusName, c => c.MapFrom(e => e.Status.Name))
                .ForMember(u => u.UserName, u => u.MapFrom(e => e.User.FullName))
                .ForMember(u => u.StudentScore, u => u.MapFrom(e => e.User.StudentScore));

            CreateMap<Delivery, UpdateDeliveryDTO>()
                .ForMember(c => c.StatusName, c => c.MapFrom(e => e.Status.Name));
        }
    }
}
