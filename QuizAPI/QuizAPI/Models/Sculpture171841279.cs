using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Sculpture171841279
    {
        [Key]
        public int SculptureId { get; set; }
        public string Title { get; set; }
        public string Material { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("SculptorId")]
        public Sculptor171841279 Sculptor { get; set; }
        public int SculptorId { get; set; }
    }

    public class CreateSculptureDto
    {
        public string Title { get; set; }
        public string Material { get; set; }
        public int SculptorId { get; set; }
    }

}
