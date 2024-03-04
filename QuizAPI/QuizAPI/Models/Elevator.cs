using QuizAPI.Models;

public class Elevator
{
    public int ElevatorId { get; set; }
    public string Name { get; set; }
    public int BuildingId { get; set; } // Ensure this is correctly annotated to indicate a foreign key relationship

    // This should NOT have a [Required] annotation or similar
    public virtual Building Building { get; set; }
}
