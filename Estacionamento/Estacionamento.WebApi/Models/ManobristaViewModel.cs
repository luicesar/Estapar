using System;
using System.Collections.Generic;
using AutoMapper;
using Estacionamento.Domain.Entities;
using Estacionamento.WebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json;

namespace Estacionamento.WebApi.Models {
  public class ManobristaViewModel : Model<ManobristaDomain> {
    public int PessoaId { get; set; }
    public int CarroId { get; set; }
  }
}