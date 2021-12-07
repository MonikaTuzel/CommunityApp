using Files.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Files.IServices
{
    public interface IFilesService
    {
        public IEnumerable<BrowseDocumentsDto> BrowseDocuments();
        public IEnumerable<BrowseDocumentsDto> BrowseDocumentsUser(int id);
        public Task<UploadDocumentsDto> Upload(UploadDocumentsDto dto, IFormFile files);
        void DeleteDoc(int id);
    }
}
