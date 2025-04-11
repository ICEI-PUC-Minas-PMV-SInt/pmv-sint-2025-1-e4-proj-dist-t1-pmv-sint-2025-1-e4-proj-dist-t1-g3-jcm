using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projeto_jcm_g3_eixo_4_2025_1.Models;

namespace Projeto_jcm_g3_eixo_4_2025_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CachorrosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CachorrosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Cachorros.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Cachorro model)
        {
            if (model.Nascimento <= 0)
            {
                return BadRequest(new { message = "Ano de Nascimento deve ser maior que zero" });
            }

            _context.Cachorros.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new {id = model.Id}, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Cachorros
                .Include(t => t.Alimentacoes)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (model == null) return NotFound();


            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Cachorro model)
        {
            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Cachorros.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Cachorros.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Cachorros.FindAsync(id);

            if (model == null) return NotFound();

            _context.Cachorros.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void GerarLinks(Cachorro model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));
        }

    }
}
