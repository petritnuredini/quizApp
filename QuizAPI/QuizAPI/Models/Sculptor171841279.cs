using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Models
{
    public class Sculptor171841279
    {
        [Key]
        public int SculptorId { get; set; }
        public string Name { get; set; }
        public int BirthYear { get; set; }
        public bool IsDeleted { get; set; }
    }
}
