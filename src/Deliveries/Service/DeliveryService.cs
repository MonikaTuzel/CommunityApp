using AutoMapper;
using Deliveries.DataBase;
using Deliveries.DTO;
using Deliveries.Exceptions;
using Deliveries.IServices;
using Deliveries.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deliveries.Service
{
    public class DeliveryService : IDeliveryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<DeliveryService> _logger;

        public DeliveryService(AppDbContext dbContext, IMapper mapper, ILogger<DeliveryService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<DeliveryInformationDto> BrowseAllDeliveries()
        {
           var deliveries = _dbContext.Delivery
                .Include(x=>x.Status)
                .Include(x => x.User)
                .ToList();

           var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

           return deliveriesDto;
        }
        public IEnumerable<DeliveryInformationDto> BrowseHistoryDelivery()
        {
            var deliveries = _dbContext.Delivery
                   .Include(x => x.Status)
                   .Include(x => x.User)
                   .Where(x=>x.StatusId == 2)
                   .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;

        }
        public IEnumerable<DeliveryInformationDto> BrowseFutureDelivery()
        {
            var deliveries = _dbContext.Delivery
                   .Include(x => x.Status)
                   .Include(x => x.User)
                   .Where(x => x.StatusId == 1)                   
                   .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;

        }
        public IEnumerable<DeliveryInformationDto> BrowseHistoryDeliveryById(int userId)
        {
            var deliveries = _dbContext.Delivery
                   .Include(x => x.Status)
                   .Include(x => x.User)
                   .Where(x => x.StatusId == 2)
                   .Where(x=>x.UserId == userId)
                   .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;

        }
        public IEnumerable<DeliveryInformationDto> BrowseFutureDeliveryById(int userId)
        {
            var deliveries = _dbContext.Delivery
                   .Include(x => x.Status)
                   .Include(x => x.User)
                   .Where(x => x.StatusId == 1)
                   .Where(x => x.UserId == userId)
                   .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;

        }


        public IEnumerable<DeliveryInformationDto> GetDeliveryByStatus(int status)
        {
            var deliveries = _dbContext.Delivery
                .Include(x => x.Status)
                .Include(x => x.User)
                .Where(x => x.StatusId == status)
                .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;
        }

        public IEnumerable<DeliveryInformationDto> GetDeliveryByUserId(int userId)
        {
            var deliveries = _dbContext.Delivery
                .Include(x => x.Status)
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .ToList();

            var deliveriesDto = _mapper.Map<List<DeliveryInformationDto>>(deliveries);

            return deliveriesDto;
        }

        public void AddNewDelivery(CreatDeliveryDto creatDeliveryDto)
        {
            _logger.LogInformation($"Wywołano metodę utworzenia nowej dostawy");

            var user = _dbContext.User
                .SingleOrDefault(x => x.Id == creatDeliveryDto.userId);

            if (user is null)
                throw new NotFoundException($"Nie można przypisać nowej dostawy do użytkownika, który nie istnieje");

            var newDeliver = new Delivery()
            {
                DeliveryDate = creatDeliveryDto.DeliveryDate,
                Year = creatDeliveryDto.Year,
                Semestr = creatDeliveryDto.Semestr,
                Week = creatDeliveryDto.Week,
                Description = creatDeliveryDto.Description,
                StatusId = 1,
                UserId = user.Id
            };

            _dbContext.Delivery.Add(newDeliver);
            _dbContext.SaveChanges();

            var deliveryId = newDeliver.Id;

        }

        public async Task<DeliveryInformationDto> GetDeliveryById(int deliveryId)
        {
            var delivery = await Task.FromResult(_dbContext.Delivery
                .Include(x=>x.Status)
                .SingleOrDefault(x => x.Id == deliveryId));
            var deliveryDto = _mapper.Map<DeliveryInformationDto>(delivery);
            return deliveryDto;
        }

        public void UpdateDelivery(UpdateDeliveryDTO deliveryDto, int deliveryId)
        {
            var delivery = _dbContext.Delivery
                .Include(x=>x.Status)
                .SingleOrDefault(x => x.Id == deliveryId);

            if(delivery is null)
            {
                throw new NotFoundException($"Zamówienie o numerze id = {deliveryId} nie istnieje!");
            }

            delivery.Description = deliveryDto.Description;

            if (deliveryDto.StatusName == "Oczekuje")
                delivery.StatusId = 1;
            else if (deliveryDto.StatusName == "Zrealizowano")
                delivery.StatusId = 2;
            else
                throw new NotFoundException($"Niepoprawny status zamówienia");

            delivery.UpdateDate = DateTime.Now;

            _dbContext.Update(delivery);
            _dbContext.SaveChanges();
        }

        public void ChangeStatusDelivery(int deliveryId)
        {
            var delivery = _dbContext.Delivery.SingleOrDefault(x => x.Id == deliveryId);
            delivery.StatusId = 2;
            _dbContext.Update(delivery);
            _dbContext.SaveChanges();

        }


        public void DeleteDelivery(int deliveryId)
        {
            _logger.LogWarning($"Wywołano metodę usunięcia dostawy");

            var delivery = _dbContext.Delivery.FirstOrDefault(x => x.Id == deliveryId);

            if (delivery is null)
                throw new NotFoundException($"Dostawa o podanym numerze id = {deliveryId} nie istnieje");

            _dbContext.Remove(delivery);
            _dbContext.SaveChanges();
        }

    }
}
