using Messages.DTO;
using Messages.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Messages.IServices
{
    public interface IMessageService
    {
        IEnumerable<MessagesInfoDto> BrowseMessage(int userId);
        IEnumerable<Status> BrowseStatus();
        void CreateNewMessage(CreateMessageDto dto);
        void UpdateMessage(int messageId);
        void DeleteMessage(int messageId);
    }
}
