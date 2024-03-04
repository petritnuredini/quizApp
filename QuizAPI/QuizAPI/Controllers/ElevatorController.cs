using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuizAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging; // Make sure you have this using directive


namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElevatorsController : ControllerBase
    {
        private readonly QuizDbContext _context;
        private readonly ILogger<ElevatorsController> _logger; // Declare the logger

        // Consolidate into a single constructor
        public ElevatorsController(QuizDbContext context, ILogger<ElevatorsController> logger) // Include both dependencies
        {
            _context = context;
            _logger = logger; // Initialize the logger
        }

        // GET: api/Elevators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElevatorCreateDto>>> GetElevators()
        {
            var elevators = await _context.Elevators
                .Select(e => new ElevatorCreateDto
                {
                    ElevatorId = e.ElevatorId,
                    Name = e.Name,
                    BuildingId = e.BuildingId // Include only the building ID
                })
                .ToListAsync();

            return elevators;
        }
        // GET: api/Elevators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ElevatorCreateDto>> GetElevator(int id)
        {
            var elevator = await _context.Elevators
                .Select(e => new ElevatorCreateDto
                {
                    ElevatorId = e.ElevatorId,
                    Name = e.Name,
                    BuildingId = e.BuildingId
                })
                .FirstOrDefaultAsync(e => e.ElevatorId == id);

            if (elevator == null)
            {
                return NotFound();
            }

            return elevator;
        }

        // POST: api/Elevators
        [HttpPost]
        public async Task<ActionResult<Elevator>> PostElevator([FromBody] ElevatorCreateDto elevatorDto)
        {
            var elevator = new Elevator
            {
                Name = elevatorDto.Name,
                BuildingId = elevatorDto.BuildingId
            };

            _logger.LogInformation($"ModelState IsValid: {ModelState.IsValid}");
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                _logger.LogError($"Error: {error.ErrorMessage}");
            }

            if (!BuildingExists(elevator.BuildingId))
            {
                return BadRequest("Building ID does not exist.");
            }

            _context.Elevators.Add(elevator);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetElevator), new { id = elevator.ElevatorId }, elevator);
        }


        // PUT: api/Elevators/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElevator(int id, ElevatorCreateDto elevatorDto)
        {
            if (id != elevatorDto.ElevatorId)
            {
                return BadRequest();
            }

            var elevator = await _context.Elevators.FindAsync(id);

            if (elevator == null)
            {
                return NotFound();
            }

            elevator.Name = elevatorDto.Name;
            elevator.BuildingId = elevatorDto.BuildingId;

            if (!BuildingExists(elevator.BuildingId))
            {
                return BadRequest("Building ID does not exist.");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElevatorExists(id))
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


        // DELETE: api/Elevators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElevator(int id)
        {
            var elevator = await _context.Elevators.FindAsync(id);
            if (elevator == null)
            {
                return NotFound();
            }

            _context.Elevators.Remove(elevator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ElevatorExists(int id)
        {
            return _context.Elevators.Any(e => e.ElevatorId == id);
        }

        private bool BuildingExists(int id)
        {
            return _context.Buildings.Any(b => b.BuildingId == id);
        }
    }
}
