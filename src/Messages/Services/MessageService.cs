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
                .Where(x=>x.UserId == userId)
                .ToList();

            var messageList = _mapper.Map<List<MessagesInfoDto>>(messages);

            return messageList;
        }

        public IEnumerable<Status> BrowseStatus()
        {
            return (_dbContext.StatusMess.ToList());
        }       

        public void CreateNewMessage(CreateMessageDto dto)
        {
            var sender = _dbContext.User.SingleOrDefault(x => x.Id == dto.SenderId);

            var newMessage = new Message()
            {
                UserId = dto.UserId,
                StatusId = 1004,
                SenderName = sender.FullName,
                Topic = dto.Topic,
                Contents = dto.Contents,
                Date = DateTime.Now
            };
            _dbContext.Message.Add(newMessage);
            _dbContext.SaveChanges();

        }

        public void ReplyMessage(ReplyMessageDto dto)
        {
            var message = _dbContext.Message.SingleOrDefault(x => x.Id == dto.MessageId);
            var user = _dbContext.User.SingleOrDefault(x => x.FullName == message.SenderName);

            var newMessage = new Message()
            {
                UserId = user.Id,
                StatusId = 1004,
                SenderName = dto.SenderName,
                Topic = dto.Topic,
                Contents = dto.Contents,
                Date = DateTime.Now
            };
            _dbContext.Message.Add(newMessage);
            _dbContext.SaveChanges();

        }


        public void DeleteMessage(int messageId)
        {
            var message = _dbContext.Message.SingleOrDefault(x => x.Id == messageId);

            _dbContext.Message.Remove(message);
            _dbContext.SaveChanges();
        }
        public void UpdateMessage(int messageId)
        {
            var message = _dbContext.Message.SingleOrDefault(x => x.Id == messageId);
            message.StatusId = 1003;

            _dbContext.Message.Update(message);
            _dbContext.SaveChanges();
        }




    }
}
