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
    public class SculptorsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public SculptorsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Sculptors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sculptor171841279>>> GetSculptors()
        {
            return await _context.Sculptors.ToListAsync();
        }

        // GET: api/Sculptors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sculptor171841279>> GetSculptor(int id)
        {
            var sculptor = await _context.Sculptors.FindAsync(id);

            if (sculptor == null)
            {
                return NotFound();
            }

            return sculptor;
        }

        // PUT: api/Sculptors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSculptor(int id, Sculptor171841279 sculptor)
        {
            if (id != sculptor.SculptorId)
            {
                return BadRequest();
            }

            _context.Entry(sculptor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SculptorExists(id))
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

        // POST: api/Sculptors
        [HttpPost]
        public async Task<ActionResult<Sculptor171841279>> CreateSculptor(Sculptor171841279 sculptor)
        {
            _context.Sculptors.Add(sculptor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSculptor), new { id = sculptor.SculptorId }, sculptor);
        }

        // DELETE: api/Sculptors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSculptor(int id)
        {
            var sculptor = await _context.Sculptors.FindAsync(id);
            if (sculptor == null)
            {
                return NotFound();
            }

            sculptor.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SculptorExists(int id)
        {
            return _context.Sculptors.Any(e => e.SculptorId == id);
        }
    }
}
