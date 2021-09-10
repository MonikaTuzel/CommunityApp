using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliveries.DTO;
using Deliveries.Models;

namespace Deliveries.IServices
{
    public interface IDeliveryService
    {
        Task<IEnumerable<Delivery>> BrowseAllDeliveries();
        Task<Delivery> GetDeliveryByUserId(int userId);
        Task<Delivery> GetDeliveryByWeeks(int week);
        Task<IEnumerable<Delivery>> GetDeliveryByStatus(int status);
        Task<Delivery> GetDeliveryByDeliveryId(int deliveryId);
        Task AddDelivery(int userId, DateTime date, string year, int semestr, int week,
            string description, int statusId);
        Task UpdateDelivery(int deliveryId, string description, int statusId);
        
    }
}
