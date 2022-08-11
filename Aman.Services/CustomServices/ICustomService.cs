using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aman.Services.CustomService
{
    public interface ICustomService<TDataModel> where TDataModel : class
    {
        Task<IEnumerable<TDataModel>> GetAll();
        Task<TDataModel> Get(object id);


    }
}
