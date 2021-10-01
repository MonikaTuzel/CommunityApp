using Contacts.DTO;
using Contacts.IServices;
using Contacts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : Controller
    {
        private readonly IContactsService _contactsServices;
        public ContactsController(IContactsService contactsServices)
        {
            _contactsServices = contactsServices;
        }

        /// <summary>
        /// Pobieranie listy wszystkich adresów
        /// </summary>
        [HttpGet]
        public IEnumerable<Adress> BrowseAdresses()
        {
            return _contactsServices.BrowseAllAdress();
        }

        [HttpGet("town/{townName}")]
        public IEnumerable<AdressDetailsDto> GetAdressDetails([FromRoute] string townName)
        {
            return _contactsServices.BrowseAdressByTown(townName);
        }

        [HttpGet("district/{district}")]
        public IEnumerable<AdressDetailsDto> GetAdressFromDistrict([FromRoute]string district)
        {
            return _contactsServices.BrowseAdressByDistrict(district);
        }

        [HttpPost("[action]")]
        public void AddNewAdress([FromBody] CreateAdressDto createAdressDto)
        {
            _contactsServices.CreateAdress(createAdressDto);
        }

        [HttpPost("[action]")]
        public void AddNewTown([FromBody]CreateTownDto createTownDto)
        {
            _contactsServices.AddNewTown(createTownDto);
        }

        [HttpPut("[action]")]
        
        public void UpdateAdress([FromBody]UpdateAdressDto updateAdressDto, int townId)
        {
            _contactsServices.UpdateAdress(updateAdressDto, townId);
        }
    }
}
