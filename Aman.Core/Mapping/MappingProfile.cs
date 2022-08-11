using AutoMapper;
using Aman.Core.Models;
using Aman.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aman.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AddressDataModel, Address>();
            CreateMap<Address, AddressDataModel>();
            CreateMap<PersonDataModel, Person>();
            CreateMap<Person, PersonDataModel>()
                  .ForMember(dest => dest.AddressName, act => act.MapFrom(src => src.Address.AddressName));


        }
    }
}
