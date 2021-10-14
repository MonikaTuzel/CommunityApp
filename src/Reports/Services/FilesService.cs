using AutoMapper;
using Files.DataBase;
using Files.DTO;
using Files.Exceptions;
using Files.IServices;
using Files.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace Files.Services
{
    public class FilesService : IFilesService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        private readonly ILogger<FilesService> _logger;

        public FilesService(AppDbContext dbContext, IMapper mapper, ILogger<FilesService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<BrowseDocumentsDto> BrowseDocuments()
        {
            var docs = _dbContext.Documents
                .Include(x => x.User)
                .ToList();

            return _mapper.Map<List<BrowseDocumentsDto>>(docs);
        }

        public IEnumerable<BrowseDocumentsDto> BrowseDocumentsUser(int id)
        {
            var docs = _dbContext.Documents
                .Include(x => x.User)
                .Where(x => x.User.Id == id)
                .ToList();
            
            return _mapper.Map<List<BrowseDocumentsDto>>(docs);
        }

        public async Task<UploadDocumentsDto> Upload(UploadDocumentsDto dto, IFormFile files)
        {
            _logger.LogInformation($"Wywołano funkcję wysyłania pliku");

            if (files is not null)
            {
                var filesName = Path.GetFileName(files.FileName);
                var filesExtension = Path.GetExtension(filesName);

                if (filesExtension == ".pdf")
                {
                    var file = new Documents()
                    {
                        Name = dto.Name,
                        UserId = dto.UserId,
                        UpdateDate = DateTime.Now,
                    };

                    _dbContext.Documents.Add(file);
                    _dbContext.SaveChanges();

                    filesName = file.Name + file.Id.ToString() + filesExtension;

                    var path = Path.Combine(AppDirectory, filesName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await files.CopyToAsync(stream);
                    }

                    await Task.FromResult("Przesłanie załącznika przebiegło pomyślnie!");
                }
                else
                {
                    throw new FilesUploadException($"Wymagany załącznik o rozszerzeniu .pdf!");
                }

                return dto;
            }
            else
            {
                throw new FilesUploadException($"Dodaj załącznik");
            }
        }
        public void DeleteDoc(int id)
        {
            _logger.LogInformation($"Wywołano funkcję usunięcia pliku o id nr: {id}");

            var file = _dbContext.Documents.FirstOrDefault(x => x.Id == id);

            if (file is not null)
            {
                var path = Path.Combine(AppDirectory, file.Name + file.Id.ToString()) + ".pdf";

                var memory = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                _dbContext.Remove(file);
                File.Delete(path);
                _dbContext.SaveChanges();
            }
            else
            {
                throw new NotFoundException($"Plik o id: {id} nie istnieje");
            }

        }
        //public async Task<IActionResult> DownloadDoc(int id)
        //{
        //    if (!Directory.Exists(AppDirectory))
        //        Directory.CreateDirectory(AppDirectory);
        //    {
        //        var file = _dbContext.Documents.Where(x => x.Id == id).FirstOrDefault();

        //        var path = Path.Combine(AppDirectory, file.Name + file.Id.ToString()) + ".pdf";

        //        var memory = new MemoryStream();
        //        using (var stream = new FileStream(path, FileMode.Open))
        //        {
        //            await stream.CopyToAsync(memory);
        //        }
        //        memory.Position = 0;
        //        var contentType = "APPLICATION/octet-stream";
        //        var fileName = Path.GetFileName(path);

        //        return File(memory, contentType, fileName);
        //    }
        //}


    }
}
