using AutoMapper;
using Messages.DataBase;
using Messages.DTO;
using Messages.IServices;
using Messages.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
                .Include(u => u.User)
                .Where(x => x.User.Id == userId)
                .ToList();

            var messageList = _mapper.Map<List<MessagesInfoDto>>(messages);

            return messageList;
        }
        public void CreateNewMessage(CreateMessageDto dto)
        {
            var newMessage = new Message()
            {
                UserId = dto.UserId,
                SenderId = dto.SenderId,
                Topic = dto.Topic,
                Contents = dto.Contents,
                Date = DateTime.UtcNow,
                StatusId = 1002,
            };

            _dbContext.Message.Add(newMessage);
            _dbContext.SaveChanges();
        }

        public void DeleteMessage(int messageId)
        {
            var mess = _dbContext.Message.FirstOrDefault(x => x.Id == messageId);

            _dbContext.Message.Remove(mess);
            _dbContext.SaveChanges();
        }



    }
}
