using Deliveries.DTO;
using Deliveries.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Deliveries.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class DeliveryController : Controller
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        /// <summary>
        /// Pobieranie listy wszystkich dostaw
        /// </summary>
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public IEnumerable<DeliveryInformationDto> GetAllDelivery()
        {
            return _deliveryService.BrowseAllDeliveries();
        }

        /// <summary>
        /// Pobieranie listy historii dostaw
        /// </summary>
        [HttpGet("history")]
        //[Authorize(Roles = "Admin")]
        public IEnumerable<DeliveryInformationDto> GetHistoryDelivery()
        {
            return _deliveryService.BrowseHistoryDelivery();
        }

        /// <summary>
        /// Pobieranie listy przyszłych dostaw
        /// </summary>
        [HttpGet("future")]
        //[Authorize(Roles = "Admin")]
        public IEnumerable<DeliveryInformationDto> GetFutureDelivery()
        {
            return _deliveryService.BrowseFutureDelivery();
        }
        /// <summary>
        /// Pobieranie listy historii dostaw użytkownika
        /// </summary>
        [HttpGet("history/{userId}")]
        //[Authorize(Roles = "Admin")]
        public IEnumerable<DeliveryInformationDto> GetHistoryDeliveryById([FromRoute] int userId)
        {
            return _deliveryService.BrowseHistoryDeliveryById(userId);
        }

        /// <summary>
        /// Pobieranie listy przyszłych dostaw użytkownika
        /// </summary>
        [HttpGet("future/{userId}")]
        //[Authorize(Roles = "Admin")]
        public IEnumerable<DeliveryInformationDto> GetFutureDeliveryById([FromRoute] int userId)
        {
            return _deliveryService.BrowseFutureDeliveryById(userId);
        }

        /// <summary>
        /// Pobieranie listy dostaw użytkownika o numerze id
        /// </summary>
        [HttpGet("{userId}")]
        
        public IEnumerable<DeliveryInformationDto> GetByUser([FromRoute] int userId)
        {
            return _deliveryService.GetDeliveryByUserId(userId);
        }

        /// <summary>
        /// Dodawanie nowej dostawy
        /// </summary>
        [HttpPost("create")]
        //[Authorize(Roles = "Admin")]

        public void AddNewDelivery([FromBody] CreatDeliveryDto creatDeliveryDto)
        {
            _deliveryService.AddNewDelivery(creatDeliveryDto);

        }

        /// <summary>
        /// Aktualnienie danych dostawy
        /// </summary>
        [HttpPut("/change/{deliveryId}")]
        public Task<DeliveryInformationDto> Put([FromBody] UpdateDeliveryDTO updateDTO, [FromRoute] int deliveryId)
        {
             _deliveryService.UpdateDelivery(updateDTO, deliveryId);
            var delivery = _deliveryService.GetDeliveryById(deliveryId);

            return delivery;
        }

        [HttpPut("{deliveryId}")]
        public IActionResult ChangeStatus([FromRoute] int deliveryId)
        {
            _deliveryService.ChangeStatusDelivery(deliveryId);
            return Ok();

        }

        /// <summary>
        /// Usuwanie dostawy
        /// </summary>
        [HttpDelete("{deliveryId}")]
        //[Authorize(Roles = "Admin")]
        public void DeleteDelivery([FromRoute] int deliveryId)
        {
            _deliveryService.DeleteDelivery(deliveryId);
        }

    }
}
