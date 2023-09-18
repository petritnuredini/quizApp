using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public PlayersController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            if (_context.Players == null)
            {
                return NotFound("There are no players.");
            }

            return await _context.Players.Include(t=>t.Team).ToListAsync();
        }


        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await _context.Players.Include(p=>p.Team).FirstOrDefaultAsync(m=>m.PlayerId==id);

            if (player == null)
            {
                return NotFound("The specified player does not exist.");
            }

            return player;
        }

        // PUT: api/Players/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(int id, EditPlayersDto playerDto)
        {
            var existingPlayer = await _context.Players.FindAsync(id);

            if (existingPlayer == null)
            {
                return NotFound("The specified player does not exist.");
            }

            var teamExists = await _context.Teams.AnyAsync(t => t.TeamId == playerDto.TeamId);

            if (!teamExists)
            {
                return NotFound("The specified team does not exist.");
            }

            existingPlayer.PlayerName = playerDto.PlayerName;
            existingPlayer.PlayerSurname = playerDto.PlayerSurname;
            existingPlayer.PlayerId = playerDto.PlayerId;
            existingPlayer.TeamId = playerDto.TeamId;

       
                await _context.SaveChangesAsync();
           

            return NoContent();
        }



        // POST: api/Players
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(PlayerDto playerDto)
        {
            if (_context.Players == null)
            {
                return Problem("Entity set 'QuizDbContext.Players' is null.");
            }

            // Check if a player with the same name and surname already exists
            var existingPlayer = await _context.Players.FirstOrDefaultAsync(p =>
                p.PlayerName == playerDto.PlayerName &&
                p.PlayerSurname == playerDto.PlayerSurname);

            if (existingPlayer != null)
            {
                return BadRequest("A player with the same name and surname already exists.");
            }

            var player = new Player
            {
                PlayerName = playerDto.PlayerName,
                PlayerSurname = playerDto.PlayerSurname,
                TeamId = playerDto.TeamId
            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            return Ok("Created Successfully");
        }


        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null)
            {
                return NotFound("The specified player does not exist.");
            }

            _context.Players.Remove(player);
        
                await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
