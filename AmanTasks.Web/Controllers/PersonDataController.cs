using System;
using System.Linq;
using System.Threading.Tasks;
using Aman.Core.Models;
using Aman.Services;
using Microsoft.AspNetCore.Mvc;


namespace AdminProjects.Controllers.MasterFiles
{
    [Route("api/[controller]")]
    [ApiController]

    public class PersonDataController : Controller
    {
        private readonly PersonService _PersonData;


        #region constractor
        public PersonDataController(PersonService PersonData)
        {
            _PersonData = PersonData;
        }
        #endregion


        #region API
        [HttpPost]
        public async Task<IActionResult> post(PersonDataModel model)
        {
            try
            {
            var retdata=_PersonData.Insert(model);
                var isSuccess = retdata != "-1";
                return Ok(new { success = isSuccess, id = retdata.Substring(1) });

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
     
        [HttpPut]
        public async Task<IActionResult> put(PersonDataModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         
            try
            {
            var retdata=_PersonData.Update(model);

                var isSuccess = retdata != "-1";
                return Ok(new { success = isSuccess, id = retdata.Substring(1) });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
         
        }
      
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete( int id)
        {
            try
            {
                var model = await _PersonData.Get(id).ConfigureAwait(false);
                if (model == null) throw new Exception("id is incorrect");
                var retdata= _PersonData.Delete(model);
                var isSuccess = retdata != "-1";
                return Ok(new { success = isSuccess, id = retdata.Substring(1) });
               


            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public async Task<ActionResult<AddressDataModel>> Get()
        {
            try
            {
          
            
                var data = await _PersonData.GetAll().ConfigureAwait(false);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet, Route("{id}")]
        public async Task<ActionResult<AddressDataModel>> Get(int id)
        {
            try
            {
                var data = await _PersonData.Get(id).ConfigureAwait(false);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        #endregion
    }
}
