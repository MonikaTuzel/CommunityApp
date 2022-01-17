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
        [HttpGet("{userId}")]
        public IEnumerable<MessagesInfoDto> GetAllMessage(int userId)
        {
            return _messageServices.BrowseMessage(userId);
        }

        /// <summary>
        /// Pobieranie statusu
        /// </summary>
        [HttpGet("status")]
        public IEnumerable<Status> GetAllStatus( )
        {
            return _messageServices.BrowseStatus();
        }       

        /// <summary>
        /// Wysyłanie nowej wiadomości
        /// </summary>
        [HttpPost("send")]
        public void SendNewMessage(CreateMessageDto dto)
        {
            _messageServices.CreateNewMessage(dto);
        }

        /// <summary>
        /// Edycja wiadomości
        /// </summary>
        [HttpPut("read/{messageId}")]
        public void ReadMessage([FromRoute] int messageId)
        {
            _messageServices.UpdateMessage(messageId);
        }

        /// <summary>
        /// Usuwanie wiadomości
        /// </summary>
        [HttpDelete("{messageId}")]
        public void DeleteMessage([FromRoute]int messageId)
        {
            _messageServices.DeleteMessage(messageId);
        }        
    }
}
