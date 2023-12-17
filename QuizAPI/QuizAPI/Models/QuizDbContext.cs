using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options):base(options)
        { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Participant> Participants { get; set; }

        public DbSet<Sculptor171841279> Sculptors { get; set; }
        public DbSet<Sculpture171841279> Sculptures { get; set; }

    }
}
