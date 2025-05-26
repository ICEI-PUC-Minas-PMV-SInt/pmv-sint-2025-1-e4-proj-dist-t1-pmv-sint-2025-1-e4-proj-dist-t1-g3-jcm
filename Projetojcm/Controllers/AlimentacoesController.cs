using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projeto_jcm_g3_eixo_4_2025_1.Models;

namespace Projeto_jcm_g3_eixo_4_2025_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlimentacoesController(AppDbContext context)
        {
            _context = context;
        }

        /*        [HttpGet]
                public async Task<ActionResult> GetAll()
                {
                    var model = await _context.Alimentacoes.ToListAsync();
                    return Ok(model);
                }
        */

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alimentacao>>> GetAll()
        {
            var alimentacoes = await _context.Alimentacoes
                                             .Include(a => a.Cachorro) // 🔹 Garante que os dados do cachorro sejam carregados
                                             .ToListAsync();

            return Ok(alimentacoes);
        }


        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<Alimentacao>>> BuscarAlimentacoes(
            [FromQuery] string? nomeCachorro,
            [FromQuery] TipoAlimentacao? tipo,
            [FromQuery] DateTime? data)
        {
            var query = _context.Alimentacoes
                                .Include(a => a.Cachorro) // 🔹 Inclui os dados do cachorro na consulta
                                .AsQueryable();

            if (!string.IsNullOrEmpty(nomeCachorro))
                query = query.Where(a => a.Cachorro.Nome.Contains(nomeCachorro)); // 🔹 Filtra por nome

            if (tipo.HasValue)
                query = query.Where(a => a.Tipo == tipo.Value);

            if (data.HasValue)
                query = query.Where(a => a.Hora.Date == data.Value.Date);

            var resultados = await query.ToListAsync();

            if (!resultados.Any())
                return NotFound("Nenhuma alimentação encontrada para os filtros aplicados.");

            return Ok(resultados);
        }


        [HttpPost]
        public async Task<ActionResult> Create(Alimentacao model)
        {

            _context.Alimentacoes.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Alimentacoes
                .FirstOrDefaultAsync(c => c.Id == id);
            if (model == null) return NotFound();

            GerarLinks(model);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Alimentacao model)
        {
            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Alimentacoes.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Alimentacoes.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Alimentacoes.FindAsync(id);

            if (model == null) return NotFound();

            _context.Alimentacoes.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void GerarLinks(Alimentacao model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));
        }
    }
}
