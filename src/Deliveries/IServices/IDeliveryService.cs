using Deliveries.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deliveries.IServices
{
    public interface IDeliveryService
    {
        IEnumerable<DeliveryInformationDto> BrowseAllDeliveries();
        IEnumerable<DeliveryInformationDto> GetDeliveryByUserId(int userId);
        IEnumerable<DeliveryInformationDto> GetDeliveryByStatus(int status);
        Task<DeliveryInformationDto> GetDeliveryById(int deliveryId);
        void AddNewDelivery(CreatDeliveryDto creatDeliveryDto);
        void UpdateDelivery(UpdateDeliveryDTO deliveryDto, int deliveryId);
        void DeleteDelivery(int deliveryId);
    }
}
