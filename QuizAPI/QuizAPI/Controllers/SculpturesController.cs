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
    public class SculpturesController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public SculpturesController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Sculptures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sculpture171841279>>> GetSculptures()
        {
            return await _context.Sculptures
                .Include(s => s.Sculptor)
                .ToListAsync();
        }

        // GET: api/Sculptures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sculpture171841279>> GetSculpture(int id)
        {
            var sculpture = await _context.Sculptures
                .Include(s => s.Sculptor)
                .FirstOrDefaultAsync(s => s.SculptureId == id);

            if (sculpture == null)
            {
                return NotFound();
            }

            return sculpture;
        }

        // PUT: api/Sculptures/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSculpture(int id, Sculpture171841279 sculpture)
        {
            if (id != sculpture.SculptureId)
            {
                return BadRequest();
            }

            if (!SculptorExists(sculpture.SculptorId))
            {
                return NotFound("Sculptor not found.");
            }

            _context.Entry(sculpture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SculptureExists(id))
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

        // POST: api/Sculptures
        [HttpPost]
        public async Task<ActionResult<Sculpture171841279>> CreateSculpture(CreateSculptureDto sculptureDto)
        {
            if (!SculptorExists(sculptureDto.SculptorId))
            {
                return NotFound("Sculptor not found.");
            }

            var sculpture = new Sculpture171841279
            {
                Title = sculptureDto.Title,
                Material = sculptureDto.Material,
                SculptorId = sculptureDto.SculptorId,
                IsDeleted = false // or set this as default in the model constructor
            };

            _context.Sculptures.Add(sculpture);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSculpture), new { id = sculpture.SculptureId }, sculpture);
        }


        // DELETE: api/Sculptures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSculpture(int id)
        {
            var sculpture = await _context.Sculptures.FindAsync(id);
            if (sculpture == null)
            {
                return NotFound();
            }

            sculpture.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SculptureExists(int id)
        {
            return _context.Sculptures.Any(e => e.SculptureId == id);
        }

        private bool SculptorExists(int id)
        {
            return _context.Sculptors.Any(e => e.SculptorId == id);
        }
    }
}
