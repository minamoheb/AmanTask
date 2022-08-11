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

    public class AddressDataController : Controller
    {
        private readonly AddressService _AddressData;


        #region constractor
        public AddressDataController(AddressService AddressData)
        {
            _AddressData = AddressData;
        }
        #endregion


        #region API
        [HttpPost]
        public async Task<IActionResult> post(AddressDataModel model)
        {
            try
            {
               var retdata = _AddressData.Insert(model);
                var isSuccess = retdata != "-1";
                return Ok(new { success = isSuccess, id = retdata.Substring(1) });

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
     
        [HttpPut]
        public async Task<IActionResult> put(AddressDataModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         
            try
            {
                var retdata=  _AddressData.Update(model);
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
                var model = await _AddressData.Get(id).ConfigureAwait(false);
                if (model == null) throw new Exception("id is incorrect");
                var retdata = _AddressData.Delete(model);
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
          
            
                var data = await _AddressData.GetAll().ConfigureAwait(false);
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
                var data = await _AddressData.Get(id).ConfigureAwait(false);
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
