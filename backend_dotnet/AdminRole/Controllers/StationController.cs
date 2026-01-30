using AdminRole.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdminRole.Controllers
{
    [ApiController]
    [Route("api/admin/stations")]
    public class StationsController : ControllerBase
    {
        private readonly JavaApiService _javaApi;

        public StationsController(JavaApiService javaApi)
        {
            _javaApi = javaApi;
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingStations(
            [FromHeader(Name = "Authorization")] string token)
        {
            var result = await _javaApi.GetPendingStations(token.Replace("Bearer ", ""));
            return Ok(result);
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveStation(
            long id,
            [FromHeader(Name = "Authorization")] string token)
        {
            await _javaApi.ApproveStation(id, token.Replace("Bearer ", ""));
            return Ok("Station approved");
        }

        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectStation(
            long id,
            [FromHeader(Name = "Authorization")] string token)
        {
            await _javaApi.RejectStation(id, token.Replace("Bearer ", ""));
            return Ok("Station rejected");
        }
    }
}
