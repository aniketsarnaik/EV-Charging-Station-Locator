using AdminRole.Dtos;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace AdminRole.Services
{
    public class JavaApiService
    {
        private readonly HttpClient _http;

        public JavaApiService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _http.BaseAddress = new Uri(config["JavaBackend:BaseUrl"]);
        }

        // ✅ ADMIN LOGIN
        public async Task<string> AdminLogin(LoginDto dto)
        {
            var response = await _http.PostAsJsonAsync("auth/login", dto);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        // ✅ GET PENDING STATIONS
        public async Task<List<StationDto>> GetPendingStations(string token)
        {
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            return await _http.GetFromJsonAsync<List<StationDto>>(
                "admin/stations/pending");
        }

        // ✅ APPROVE STATION
        public async Task ApproveStation(long id, string token)
        {
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            await _http.PutAsync($"admin/stations/{id}/approve", null);
        }

        // ✅ REJECT STATION
        public async Task RejectStation(long id, string token)
        {
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            await _http.PutAsync($"admin/stations/{id}/reject", null);
        }

        public async Task<List<BookingDto>> GetAllBookings(string token)
        {
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            return await _http.GetFromJsonAsync<List<BookingDto>>(
                "admin/bookings");
        }

    }
}
