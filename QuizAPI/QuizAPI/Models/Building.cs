using System;
using System.Collections.Generic;

namespace QuizAPI.Models
{
    public class Building
    {
        public int BuildingId { get; set; } // Auto-incremented ID
        public string Name { get; set; } // Building name
        public DateTime DateOfAdmission { get; set; } // Admission date

        // Navigation property for related Elevators
        public List<Elevator> Elevators { get; set; } = new List<Elevator>();
    }
}
