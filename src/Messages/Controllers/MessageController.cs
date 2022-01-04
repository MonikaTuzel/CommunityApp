using Messages.DTO;
using Messages.IServices;
using Messages.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Messages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageServices;

        public MessageController(IMessageService messageService)
        {
            _messageServices = messageService;
        }

        /// <summary>
        /// Pobieranie wiadomości użytkownika
        /// </summary>
        [HttpGet]
        public IEnumerable<MessagesInfoDto> GetAllMessage(int userId)
        {
            return _messageServices.BrowseMessage(userId);
        }

        [HttpPost]
        public void SendNewMessage(CreateMessageDto dto)
        {
            _messageServices.CreateNewMessage(dto);
        }

        [HttpDelete]
        public void DeleteMessage(int messageId)
        {
            _messageServices.DeleteMessage(messageId);
        }

        
    }
}
