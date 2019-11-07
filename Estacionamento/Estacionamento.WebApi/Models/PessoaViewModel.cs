using System;
using System.Collections.Generic;
using AutoMapper;
using Estacionamento.Domain.Entities;
using Estacionamento.WebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json;

namespace Estacionamento.WebApi.Models {
  public class PessoaViewModel : Model<PessoaDomain> {

    public string Nome { get; set; }
    public string Cpf { get; set; }
    public DateTime DataNascimento { get; set; }

    [JsonIgnore]
    public ICollection<ManobristaDomain> Manobristas { get; private set; }
  }
}