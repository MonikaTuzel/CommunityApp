using Deliveries.DTO;
using Deliveries.IServices;
using Deliveries.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Deliveries.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : Controller
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        [HttpGet]
        public async Task<IEnumerable<Delivery>> GetAllDelivery()
        {
            return await _deliveryService.BrowseAllDeliveries();
        }


        //// GET api/<DeliveryController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<DeliveryController>
        [HttpPost]
        [Route("[action]")]
        public async Task<Delivery> PostNewDelivery([FromBody]AddDeliveryDTO  addDTO)
        {
            
            await _deliveryService.AddDelivery(addDTO.UserId, addDTO.Date, addDTO.Year, addDTO.Semestr,
                addDTO.Week, addDTO.Description, addDTO.StatusId);

            return await _deliveryService.GetDeliveryByUserId(addDTO.UserId);
        }

        // PUT api/<DeliveryController>/5
        [HttpPut("{deliveryId}")]
        public async Task<Delivery> Put(int deliveryId, [FromBody] UpdateDeliveryDTO updateDTO)
        {
            await _deliveryService.UpdateDelivery(deliveryId, updateDTO.Description, updateDTO.StatusId);

            return await _deliveryService.GetDeliveryByDeliveryId(deliveryId);
        }

    }
}
