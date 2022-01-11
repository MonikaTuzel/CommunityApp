using Messages.DTO;
using Messages.IServices;
using Messages.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        /// Pobieranie treści wiadomości
        /// </summary>
        [HttpGet("read/{messageId}")]
        public async Task<IActionResult> GetMessage([FromRoute] int messageId)
        {
           var message = await  _messageServices.ReadMessage(messageId);
            return Ok(message);
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
        [HttpPut("/{messageId}")]
        public void DeleteMessage(UpdateMessageDto dto)
        {
            _messageServices.UpdateMessage(dto);
        }

        /// <summary>
        /// Usuwanie wiadomości
        /// </summary>
        [HttpDelete("/{messageId}")]
        public void DeleteMessage([FromRoute]int messageId)
        {
            _messageServices.DeleteMessage(messageId);
        }        
    }
}
