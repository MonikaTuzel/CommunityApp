using Files.DTO;
using Files.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Files.IServices
{
    public interface IFilesService
    {
        public IEnumerable<BrowseDocumentsDto> BrowseDocuments();
        public IEnumerable<BrowseDocumentsDto> BrowseDocumentsUser(int id);
        public Task<UploadDocumentsDto> Upload(UploadDocumentsDto dto, IFormFile files);
        //public Task<IActionResult> DownloadDoc(int id);
        void DeleteDoc(int id);
    }
}
