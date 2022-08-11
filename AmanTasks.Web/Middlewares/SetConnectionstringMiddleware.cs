
using Aman.Core.Data;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmanTasks.Web.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class SetConnectionstringMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly IOptions<List<conn>> _GlobalStaticConn;
        public SetConnectionstringMiddleware(RequestDelegate next)
        {
            _next = next;
            //_GlobalStaticConn = GlobalStaticConn;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            /// Commented for develping phase. Uncomment after that

                    //var userConnectionstring = _GlobalStaticConn.Value.ToList().SingleOrDefault(c => c.id == int.Parse(keyid)).Connectionst;
                 //   AngaznyDeilveryDBContext.ConnectionString = userConnectionstring;
                    //ADOHELPER.staticConnString = userConnectionstring;
                    //var userConnectionstring = httpContext.User.Claims.FirstOrDefault(u => u.Type == nameof(UserInfo.UserConnectionString)).Value;
                    //  ApplicationDbContext.ConnectionString = userConnectionstring;
                
                
             
            

            //// for development only 
            //IMASDbContext.ConnectionString = "Server=T-SVR;Database=TEBAS_IMAS_ONCE_TEST;User Id=GATSONCEUser;Password=GATSONCEUser;ConnectRetryCount=0;";
            //IdentityDataContext.ConnectionString = "Server=T-SVR;Database=TEBAS_IMAS_ONCE_TEST;User Id=GATSONCEUser;Password=GATSONCEUser;ConnectRetryCount=0;";
            await _next.Invoke(httpContext);
            //return _next(httpContext);
        }
    }
}
