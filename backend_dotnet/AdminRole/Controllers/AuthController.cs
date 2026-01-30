using AdminRole.Dtos;
using AdminRole.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdminRole.Controllers
{
    [ApiController]
    [Route("api/admin/auth")]
    public class AuthController : ControllerBase
    {
        private readonly JavaApiService _javaApi;

        public AuthController(JavaApiService javaApi)
        {
            _javaApi = javaApi;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _javaApi.AdminLogin(dto);
            return Ok(token);
        }
    }
}
