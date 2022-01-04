using Messages.DTO;
using System.Collections.Generic;


namespace Messages.IServices
{
    public interface IMessageService
    {
        IEnumerable<MessagesInfoDto> BrowseMessage(int userId);
        void CreateNewMessage(CreateMessageDto dto);
        void DeleteMessage(int messageId);
    }
}
