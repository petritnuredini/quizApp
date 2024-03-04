using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace QuizAPI.Models
{
    public class Player
    {
        [Key]
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public int Number { get; set; }
        public string BirthYear { get; set; }
        [JsonIgnore]
        public int TeamId { get; set; }
        [ForeignKey("TeamId")]
        public Team Team { get; set; }
    }
    public class PlayerDto
    {
        public string PlayerName { get; set; }
        public int Number { get; set; }
        public string BirthYear { get; set; }
        public int TeamId { get; set; }
    }
    public class EditPlayersDto
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public int Number { get; set; }
        public string BirthYear { get; set; }
        public int TeamId { get; set; }
    }
}
