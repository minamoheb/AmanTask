using Aman.Core;
using Aman.Core.Data;
using Aman.Core.Entities;
using Aman.Core.Models;
using Aman.Services.CustomService;
using AutoMapper;
using RepositoryLayer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aman.Services
{
    public class AddressService : CustomService<AddressDataModel, Address>
    {
        public AddressService(IUnitOfWork<ApplicationDbContext> uow, IMapper mapper) : base(uow, mapper)
        {
        }

        public string Insert(AddressDataModel model)
        {
            var entity = _mapper.Map<Address>(model);
            if (entity != null)
            {

                Repository.Insert(entity);
                Repository.SaveChanges();
            }
            return "S" + entity.Id;
        }
        public string Update(AddressDataModel model)
        {
            var entity = _mapper.Map<Address>(model);
            Repository.Update(entity);
            return "S" + entity.Id;
        }

        public string Delete(AddressDataModel model)
        {
            var entity = _mapper.Map<Address>(model);
            Repository.Delete(entity);
            return "S" + 1;
        }
    }
}