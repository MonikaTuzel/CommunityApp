using AutoMapper;
using Messages.DataBase;
using Messages.DTO;
using Messages.IServices;
using Messages.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messages.Services
{
    public class MessageService : IMessageService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        public MessageService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public IEnumerable<MessagesInfoDto> BrowseMessage(int userId)
        {
             var messages = _dbContext.Message
                .Include(u => u.StatusMess)
                .Include(u => u.MessageDetails)
                .Where(x=>x.UserId == userId)
                .ToList();

            var messageList = _mapper.Map<List<MessagesInfoDto>>(messages);

            return messageList;
        }

        public IEnumerable<Status> BrowseStatus()
        {
            return (_dbContext.StatusMess.ToList());
        }

        public async Task<ContentMessageDto> ReadMessage(int messageId)
        {
            var contentMessage = await Task.FromResult(_dbContext.Message
                .Include(u => u.MessageDetails)
                .Include(u => u.MessageDetails.Sender)
                .SingleOrDefault(x => x.Id == messageId));

            var contentMessageDto = _mapper.Map<ContentMessageDto>(contentMessage);
            return contentMessageDto;
        }

        public void CreateNewMessage(CreateMessageDto dto)
        {
            var newMessageDetails = new MessageDetails()
            {
                SenderId = dto.SenderId,
                Topic = dto.Topic,
                Contents = dto.Contents,
                Date = DateTime.Now
            };
            _dbContext.MessageDetails.Add(newMessageDetails);
            _dbContext.SaveChanges();


            var newMessage = new Message()
            {
                UserId = dto.UserId,
                StatusId = 1004,
                MessageDetailsId = newMessageDetails.Id,
            };

            _dbContext.Message.Add(newMessage);
            _dbContext.SaveChanges();
        }

        public void DeleteMessage(int messageId)
        {
            var message = _dbContext.Message.SingleOrDefault(x => x.Id == messageId);
            var messageDetails = _dbContext.MessageDetails.SingleOrDefault(x => x.Id == message.MessageDetailsId);

            _dbContext.Message.Remove(message);
            _dbContext.MessageDetails.Remove(messageDetails);
            _dbContext.SaveChanges();
        }
        public void UpdateMessage(UpdateMessageDto dto)
        {
            var message = _dbContext.Message.SingleOrDefault(x => x.Id == dto.Id);
            message.StatusId = dto.StatusId;

            _dbContext.Message.Update(message);
            _dbContext.SaveChanges();
        }




    }
}
