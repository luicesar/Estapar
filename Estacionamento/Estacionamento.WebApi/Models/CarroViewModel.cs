using System;
using System.Collections.Generic;
using AutoMapper;
using Estacionamento.Domain.Entities;
using Estacionamento.WebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json;

namespace Estacionamento.WebApi.Models {
  public class CarroViewModel : Model<CarroDomain> {

    public string Marca { get; set; }
    public string Modelo { get; set; }
    public string Placa { get; set; }

    [JsonIgnore]
    public ICollection<ManobristaDomain> Manobristas { get; private set; }
  }
}