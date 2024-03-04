using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public BuildingsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Buildings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BuildingDto>>> GetBuildings()
        {
            var buildings = await _context.Buildings
                .Select(b => new BuildingDto
                {
                    BuildingId = b.BuildingId,
                    Name = b.Name,
                    DateOfAdmission = b.DateOfAdmission,
                    Elevators = b.Elevators.Select(e => new ElevatorCreateDto
                    {
                        ElevatorId = e.ElevatorId,
                        Name = e.Name,
                        BuildingId = e.BuildingId
                    }).ToList()
                })
                .ToListAsync();

            return buildings;
        }


        // GET: api/Buildings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Building>> GetBuilding(int id)
        {
            var building = await _context.Buildings.Include(b => b.Elevators).FirstOrDefaultAsync(b => b.BuildingId == id);

            if (building == null)
            {
                return NotFound();
            }

            return building;
        }

        // POST: api/Buildings
        [HttpPost]
        public async Task<ActionResult<Building>> PostBuilding(Building building)
        {
            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBuilding), new { id = building.BuildingId }, building);
        }

        // PUT: api/Buildings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuilding(int id, Building building)
        {
            if (id != building.BuildingId)
            {
                return BadRequest();
            }

            _context.Entry(building).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuildingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Buildings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound();
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BuildingExists(int id)
        {
            return _context.Buildings.Any(e => e.BuildingId == id);
        }
    }
}
