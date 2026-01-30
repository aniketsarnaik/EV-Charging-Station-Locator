namespace AdminRole.Dtos
{
    public class BookingDto
    {
        public long Id { get; set; }
        public string UserEmail { get; set; }
        public string StationName { get; set; }
        public string Status { get; set; }
        public DateTime BookingTime { get; set; }
    }
}
