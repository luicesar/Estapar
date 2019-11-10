using System;
using System.Collections.Generic;
using AutoMapper;
using Estacionamento.Domain.Entities;
using Estacionamento.WebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json;

namespace Estacionamento.WebApi.Models {
  public class ManobristaSlimViewModel {
    public int ID { get; set; }
    public int PessoaId { get; set; }
    public string PessoaNome { get; set; }
    public int CarroId { get; set; }
    public string MarcaNome { get; set; }
    public string ModeloNome { get; set; }
  }
}