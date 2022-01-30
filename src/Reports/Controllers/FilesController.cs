using Files.DataBase;
using Files.DTO;
using Files.IServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Files.Controllers
{
    [Route("[controller]")]
    [ApiController]
   // [Authorize]
    public class FilesController : ControllerBase
    {
        private readonly IFilesService _filesService;
        private static IWebHostEnvironment _webHostEnvironment;
        private readonly AppDbContext _dbContext;
        private readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "FilesDoc");
        private readonly IWebHostEnvironment _env;


        public FilesController(IFilesService fileService, IWebHostEnvironment webHostEnvironment, 
            AppDbContext dbContext, IWebHostEnvironment environment)
        {
            _filesService = fileService;
            _webHostEnvironment = webHostEnvironment;
            _dbContext = dbContext;
            _env = environment;
        }
        /// <summary>
        /// Pobieranie listy wszystkich dokumentów
        /// </summary>
        [HttpGet("[action]")]
        public IEnumerable<BrowseDocumentsDto> Browse()
        {
            return _filesService.BrowseDocuments();
        }

        /// <summary>
        /// Pobieranie listy dokumentów przypisanych do użytkownika o numerze ID
        /// </summary>
        [HttpGet("[action]/{userId}")]
        public IEnumerable<BrowseDocumentsDto> Browse(int userId)
        {
            return _filesService.BrowseDocumentsUser(userId);
        }

        /// <summary>
        /// Pobieranie pliku .pdf
        /// </summary>
        [HttpGet("[action]/{filesId}")]
        public async Task<IActionResult> Download([FromRoute] int filesId)
        {
            if (!Directory.Exists(AppDirectory))
                Directory.CreateDirectory(AppDirectory);
            {
                var file = _dbContext.Documents.Where(x => x.Id == filesId).FirstOrDefault();

                var path = Path.Combine(_env.ContentRootPath, "FilesDoc", file.Name + file.Id.ToString() + ".pdf");


                var memory = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                var contentType = "APPLICATION/octet-stream";
                var filesExtension = ".pdf";

                return File(memory, contentType, file.Name + filesExtension);
            }           
        }

        /// <summary>
        /// Wysyłanie pliku .pdf
        /// </summary>
        [HttpPost("[action]")]
        public void Upload([FromForm]UploadDocumentsDto dto, IFormFile files)
        {
            _filesService.Upload(dto, files);
        }

        /// <summary>
        /// Usuwanie pliku .pdf o numerze ID
        /// </summary>
        [HttpDelete("[action]/{id}")]
        public void Delete(int id)
        {
            _filesService.DeleteDoc(id);
        }
    }
}
