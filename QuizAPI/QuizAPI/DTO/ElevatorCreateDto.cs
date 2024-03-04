public class BuildingDto
{
    public int BuildingId { get; set; }
    public string Name { get; set; }
    public DateTime DateOfAdmission { get; set; }
    public List<ElevatorCreateDto> Elevators { get; set; }
}

public class ElevatorCreateDto
{
    public int ElevatorId { get; set; }
    public string Name { get; set; }
    public int BuildingId { get; set; } // Include only the building ID
}
