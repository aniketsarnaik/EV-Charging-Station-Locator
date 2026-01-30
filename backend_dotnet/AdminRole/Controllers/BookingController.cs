using AdminRole.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdminRole.Controllers
{
    [ApiController]
    [Route("api/admin/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly JavaApiService _javaApi;

        public BookingsController(JavaApiService javaApi)
        {
            _javaApi = javaApi;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings(
            [FromHeader(Name = "Authorization")] string token)
        {
            var result = await _javaApi.GetAllBookings(
                token.Replace("Bearer ", ""));

            return Ok(result);
        }
    }
}
