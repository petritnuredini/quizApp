using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Building> Buildings { get; set; } // Add this line
        public DbSet<Elevator> Elevators { get; set; } // And this line

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Elevator>()
         .HasOne(e => e.Building)
         .WithMany(b => b.Elevators)
         .HasForeignKey(e => e.BuildingId);
        }
    }
}