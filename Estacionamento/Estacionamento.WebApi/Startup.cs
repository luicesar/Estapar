using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Estacionamento.Repository.DataContext;
using Estacionamento.Repository.Interfaces;
using Estacionamento.Repository.Repositorys;
using Estacionamento.Service.Interfaces;
using Estacionamento.Service.Services;
using Estacionamento.WebApi.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
namespace Estacionamento.WebApi {
    public class Startup {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment CurrentEnvironment { get; }
        public Startup (IConfiguration configuration,
            IHostingEnvironment currentEnvironment) {
            Configuration = configuration;
            CurrentEnvironment = currentEnvironment;
        }

        public void ConfigureServices (IServiceCollection services) {
            services
                .AddMvc ().SetCompatibilityVersion (CompatibilityVersion.Version_2_2)
                .AddJsonOptions (json => {
                    json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver ();
                    json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            if (CurrentEnvironment.IsEnvironment ("Test")) {
                services.AddDbContext<EstacionamentoDataContext> (options => options.UseInMemoryDatabase ("EstacionamentoTestDB"));
                Mapper.Reset ();
            } else {

                services
                    .AddEntityFrameworkSqlServer ()
                    .AddDbContext<EstacionamentoDataContext> (opt => opt
                        .UseSqlServer (Configuration.GetConnectionString ("database"), b => b.MigrationsAssembly ("Estacionamento.WebApi"))
                        .EnableSensitiveDataLogging (true), ServiceLifetime.Scoped);
            }

            services.AddAutoMapper ();

            this._ConfigureInjectionDependecy (services);
            //this._ConfigureAuth (services);
            this._ConfigureSwagger (services);

            services.AddCors ();
        }

        public void Configure (
            IApplicationBuilder app, IHostingEnvironment env,
            IServiceProvider serviceProvider) {
            if (env.IsDevelopment ())
                app.UseDeveloperExceptionPage ();

            if (!CurrentEnvironment.IsEnvironment ("Test")) {

                //Usa para rodar o migration na inicialização do App
                serviceProvider.GetService<EstacionamentoDataContext> ().Database.Migrate ();

                app.UseSwagger ();
                app.UseSwaggerUI (c => {
                    c.SwaggerEndpoint ("/swagger/v1/swagger.json", "Estapar API");
                });

                // app.UseResponseCompression();
            }

            app
                .UseCors (builder => builder
                    .AllowAnyOrigin ()
                    .AllowAnyMethod ()
                    .AllowAnyHeader ()
                    .AllowCredentials ())
                .UseMvc ();

        }

        private void _ConfigureInjectionDependecy (IServiceCollection services) {
            services
                .AddScoped<ICarroRepository, CarroRepository> ()
                .AddScoped<IPessoaRepository, PessoaRepository> ()
                .AddScoped<IManobristaRepository, ManobristaRepository> ()

                .AddScoped<ICarroService, CarroService> ()
                .AddScoped<IPessoaService, PessoaService> ()
                .AddScoped<IManobristaService, ManobristaService> ();
        }

        private void _ConfigureSwagger (IServiceCollection services) {
            services.AddSwaggerGen (s => {
                s.SwaggerDoc ("v1", new Info {
                    Version = "v1",
                        Title = "Estapar API",
                        Description = "API responsável pela integração",
                        TermsOfService = "None",
                        Contact = new Contact {
                            Name = "Estapar",
                                Email = string.Empty,
                                Url = "https://github.com/luicesar"
                        }
                });

                s.AddSecurityDefinition ("Bearer", new ApiKeyScheme {
                    Description = "JWT Authorization header use o schema Bearer. Exemplo: \"Authorization: Bearer {token}\"",
                        Name = "Authorization",
                        In = "header",
                        Type = "apiKey"
                });

                var security = new Dictionary<string, IEnumerable<string>> { { "Bearer", new string[] { } }, };
                s.AddSecurityRequirement (security);

            });
        }

        private void _ConfigureAuth (IServiceCollection services) {
            var tokenConfigurations = new TokenConfiguration ();
            new ConfigureFromConfigurationOptions<TokenConfiguration> (Configuration
                    .GetSection ("TokenSettings"))
                .Configure (tokenConfigurations);

            services.AddSingleton (tokenConfigurations);

            services.AddAuthentication (authOptions => {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (bearerOptions => {
                bearerOptions.SaveToken = true;

                bearerOptions.TokenValidationParameters = new TokenValidationParameters () {
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (tokenConfigurations.SecretyKey)),
                    ValidAudience = tokenConfigurations.Audience,
                    ValidIssuer = tokenConfigurations.Issuer,
                    ClockSkew = TimeSpan.Zero,

                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true

                };
            });

            // Ativa o uso do token como forma de autorizar o acesso
            // a recursos deste projeto
            services.AddAuthorization (auth => {
                auth.AddPolicy ("Bearer", new AuthorizationPolicyBuilder ()
                    .AddAuthenticationSchemes (JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser ().Build ());
            });
        }

    }
}