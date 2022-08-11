using Aman.Core;
using Aman.Core.Data;
using Aman.Core.Entities;
using Aman.Core.Models;
using Aman.Services.CustomService;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Repository;
using RepositoryLayer.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aman.Services
{
    public class PersonService : CustomService<PersonDataModel, Person>
    {
        public PersonService(IUnitOfWork<ApplicationDbContext> uow, IMapper mapper) : base(uow, mapper)
        {
        }

        public override async Task<IEnumerable<PersonDataModel>> GetAll()
        {
            var data = await Repository.GetList(null, null,
              t => t?
               .Include(c => c.Address)
                );
            if (data == null)
                return null;
            var mappedData = _mapper.Map<IEnumerable<PersonDataModel>>(data);
            return mappedData;


        }

        public override async Task<PersonDataModel> Get(object id)
        {
            var data = await Repository.GetList(predicate: c => c.Id == Convert.ToInt32(id), null,
              t => t?
               .Include(c => c.Address)
                );
            if (data.FirstOrDefault() == null)
                return null;
            var mappedData = _mapper.Map<PersonDataModel>(data.FirstOrDefault());
            return mappedData;


        }

        public string Insert(PersonDataModel model)
        {

            var entity = _mapper.Map<Person>(model);
            if (entity != null)
            {
                Repository.Insert(entity);
                Repository.SaveChanges();
            }
            return "S" + entity.Id;
        }

        public string Update(PersonDataModel model)
        {

            var entity = _mapper.Map<Person>(model);
            Repository.Update(entity);
            return "S" + entity.Id;
        }

        public string Delete(PersonDataModel model)
        {

            var entity = _mapper.Map<Person>(model);
            Repository.Delete(entity);
            return "S" + 1;
        }


    }
}
