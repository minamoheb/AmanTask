using AutoMapper;

using RepositoryLayer.Repository;
using RepositoryLayer.UnitOfWork;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Aman.Core;
using Aman.Core.Data;

namespace Aman.Services.CustomService
{
    public class CustomService<TDataModel, T> : ICustomService<TDataModel> where TDataModel : class where T : class
    {
        protected readonly IUnitOfWork<ApplicationDbContext> _uow;
        protected readonly IMapper _mapper;
        protected IRepository<T> Repository { get; }
        public CustomService(IUnitOfWork<ApplicationDbContext> uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
            Repository = _uow.GetRepository<T>();
        }

        public virtual async Task<TDataModel> Get(object id)
        {
            var data = await Repository.Find(id);
            if (data == null)
                return null;
            var mappedData = _mapper.Map<TDataModel>(data);
            return mappedData;
        }

        public virtual async Task<IEnumerable<TDataModel>> GetAll()
        {
            var data = await Repository.GetList();
            if (data == null)
                return null;
            var mappedData = _mapper.Map<IEnumerable<TDataModel>>(data);
            return mappedData;
        }

   

   
    }
}
