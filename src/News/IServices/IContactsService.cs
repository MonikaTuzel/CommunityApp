using Contacts.DTO;
using Contacts.Models;
using System.Collections.Generic;

namespace Contacts.IServices
{
    public interface IContactsService
    {
        IEnumerable<Adress> BrowseAllAdress();
        IEnumerable<Town> BrowseAllTown();
        IEnumerable<AdressDetailsDto> BrowseAllDetails();


        IEnumerable<AdressDetailsDto> BrowseAdressByTown(string townName);
        IEnumerable<AdressDetailsDto> BrowseAdressByDistrict(string district);
        void CreateAdress(CreateAdressDto createAdressDto);
        void AddNewTown(CreateTownDto createTownDto);
        void UpdateAdress(UpdateAdressDto updateAdressDto, int adressId);
        void RemoveAdress(int adressId);
    }
}
