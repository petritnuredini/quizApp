using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace QuizAPI.Models
{
    [Table("Bank")]
    public class Team
    {
        [Key]
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        [JsonIgnore]
        public ICollection<Player> Players { get; set; }
    }
    public class TeamDto
    {
        public int TeamId { get; set; }

        public string TeamName { get; set; }
    }
}
