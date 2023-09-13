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
    public class TeamsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public TeamsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            if (_context.Teams == null)
            {
                return NotFound("There are no Teams.");
            }
            return await _context.Teams.ToListAsync();
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            if (_context.Teams == null)
            {
                return NotFound();
            }
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound("The specified team does not exist.");
            }

            return team;
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, TeamDto teamDto)
        {
            var existingTeam = await _context.Teams.FindAsync(id);

            if (existingTeam == null)
            {
                return NotFound("The specified team does not exist.");
            }

            existingTeam.TeamName = teamDto.TeamName;


            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(TeamDto teamDto)
        {
            if (_context.Teams == null)
            {
                return Problem("Entity set 'QuizDbContext.Teams' is null.");
            }

            var existingTeam = await _context.Teams.FirstOrDefaultAsync(t => t.TeamName == teamDto.TeamName);

            if (existingTeam != null)
            {
                return BadRequest("A team with the same name already exists.");
            }

            var team = new Team
            {
                TeamName = teamDto.TeamName
            };

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            return Ok("Created Successfully");
        }



        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound("The specified team does not exist.");
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{teamId}/Players")]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetTeamPlayers(int teamId)
        {
            var team = await _context.Teams
                .Include(t => t.Players)
                .FirstOrDefaultAsync(t => t.TeamId == teamId);

            if (team == null)
            {
                return NotFound("The specified team does not exist.");
            }

            var players = team.Players.Select(p => new PlayerDto
            {
                PlayerName = p.PlayerName,
                PlayerSurname = p.PlayerSurname,
                TeamId = p.TeamId
            }).ToList();

            return players;
        }


        private bool TeamExists(int id)
        {
            return (_context.Teams?.Any(e => e.TeamId == id)).GetValueOrDefault();
        }
    }
}
