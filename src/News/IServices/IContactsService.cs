using Contacts.DTO;
using Contacts.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.IServices
{
    public interface IContactsService
    {
        IEnumerable<Adress> BrowseAllAdress();
        IEnumerable<Town> BrowseAllTown();
        IEnumerable<AdressDetailsDto> BrowseAllDetails();
        Task<AdressDetailsDto> GetAdressByUser(int userId);
        IEnumerable<AdressDetailsDto> BrowseAdressByTown(string townName);
        IEnumerable<AdressDetailsDto> BrowseAdressByDistrict(string district);
        void CreateAdress(CreateAdressDto createAdressDto);
        void AddNewTown(CreateTownDto createTownDto);
        void UpdateAdress(UpdateAdressDto updateAdressDto, int adressId);
        void RemoveAdress(int adressId);
    }
}
