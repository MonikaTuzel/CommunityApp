using Contacts.IServices;
using Contacts.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Contacts.DataBase;
using AutoMapper;
using Contacts.Middleware;
using FluentValidation;
using Contacts.DTO;
using FluentValidation.AspNetCore;
using Contacts.Validation;

namespace Contacts
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddFluentValidation();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Contacts", Version = "v1" });
            });

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("CommunityContext")));

            services.AddScoped<IContactsService, ContactsService>();
            services.AddAutoMapper(this.GetType().Assembly);
            services.AddScoped<ErrorHandingMiddleware>();
            services.AddScoped<IValidator<CreateAdressDto>, CreateAdressValidation>();
            services.AddScoped<IValidator<CreateTownDto>, CreateTownValidation>();


        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Contacts v1"));
            }

            app.UseMiddleware<ErrorHandingMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
