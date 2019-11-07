using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Estacionamento.Domain.Entities;
using Estacionamento.Service.Interfaces;
using Estacionamento.WebApi.Auth;
using Estacionamento.WebApi.Models;

namespace Estacionamento.WebApi.Controllers {
 //[Authorize ("Bearer"), Route ("api/[controller]")]
    [Route ("api/[controller]")]
    public class PessoaController : ControllerBase<PessoaDomain, PessoaViewModel> {
        private readonly IPessoaService Service;
        public PessoaController (IPessoaService service) : base (service) {
            this.Service = service;
        }
    }
}