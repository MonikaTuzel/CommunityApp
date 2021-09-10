using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deliveries.DataBase;
using Deliveries.DTO;
using Deliveries.IServices;
using Deliveries.Models;

namespace Deliveries.Service
{
    public class DeliveryService : IDeliveryService
    {
        private readonly AppDbContext _dbContext;

        public DeliveryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<Delivery>> BrowseAllDeliveries()
            => await Task.FromResult(_dbContext.Delivery);

        public async Task<IEnumerable<Delivery>> GetDeliveryByStatus(int status)
        {
            var deliveries = _dbContext.Delivery.Where(x => x.StatusId == status);
            return await Task.FromResult(deliveries);
        }

        public async Task<Delivery> GetDeliveryByUserId(int userId)
            => await Task.FromResult(_dbContext.Delivery.SingleOrDefault(x => x.UserId == userId));

        public async Task<Delivery> GetDeliveryByWeeks(int week)
            => await Task.FromResult(_dbContext.Delivery.SingleOrDefault(x => x.Week == week));

        public async Task<Delivery> GetDeliveryByDeliveryId(int deliveryId)
            => await Task.FromResult(_dbContext.Delivery.SingleOrDefault(x => x.Id == deliveryId));


        public async Task AddDelivery(int userId, DateTime date, string year, int semestr, int week,
            string description, int statusId)
        {
            var delivery = new Delivery(userId, date, year, semestr, week, description, statusId);

            _dbContext.Delivery.Add(delivery);
            _dbContext.SaveChanges();

            await Task.FromResult("");
        }

        public async Task UpdateDelivery(int deliveryId, string description, int statusId)
        {
            var delivery = await Task.FromResult(_dbContext.Delivery.SingleOrDefault(x => x.Id == deliveryId));
            if(delivery==null)
            {
                throw new Exception($"Takie zamówienie nie istnieje!");
            }
            delivery.SetDescription(description);
            delivery.SetStatus(statusId);

            _dbContext.Update(delivery);
            _dbContext.SaveChanges();

            await Task.CompletedTask;
        }
    }
}
