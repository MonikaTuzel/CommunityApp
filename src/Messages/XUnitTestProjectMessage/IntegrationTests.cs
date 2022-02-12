using Messages;
using Messages.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace MessagesTests
{
    public class IntegrationTests : IClassFixture<TestFixture<Startup>>
    {

        private HttpClient Client;
        private string requestUrl = "/api/Message";

        public IntegrationTests(TestFixture<Startup> fixture)
        {
            Client = fixture.Client;
        }        

        [Fact]
        public async Task TestGetMessage()
        {
            // Act
            var response = await Client.GetAsync(requestUrl + "/1");
            var responseString = response.Content.ReadAsStringAsync().Result;


            JObject o = JObject.Parse(responseString);

            JsonSerializer serializer = new JsonSerializer();
            Message message = (Message)serializer.Deserialize(new JTokenReader(o), typeof(Message));


            double status = message.StatusId;

            Assert.Equal(500, status);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }

        [Fact]
        public async Task TestPostMessage()
        {
            // Arrange
            var requestBody = new
            {
                Url = (requestUrl + "/send"),
                Body = new Message
                {
                    UserId = 1,
                    SenderName = "testing",
                    Topic = "TestTemat",
                    Contents = "TestContents",
                    Date = new DateTime(2022, 1, 10),

                }
            };

            // Act
            var response = await Client.PostAsync(requestBody.Url, ContentHelper.GetStringContent(requestBody.Body));
            //var value = await response.Content.ReadAsStringAsync();



            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        
        [Fact]
        public async Task TestPutMessage()
        {
            var requestBody = new
            {
                Url = requestUrl + "read/4011",
                Body = new 
                {
                    StatusId = 1003,
                }
            };

            // Act
            var response = await Client.PutAsync(requestBody.Url, ContentHelper.GetStringContent(requestBody.Body));

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task TestDeleteMessage()
        {
            var response = await Client.DeleteAsync(requestUrl + "/4011");

            // Assert
            response.EnsureSuccessStatusCode();
            //  Assert.False(singleResponse.Id);

           response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
    }
}
