using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prueba_tecnica.Models;

namespace prueba_tecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComunasController : ControllerBase
    {
        private readonly prueba_tecnicaContext _context;

        public ComunasController(prueba_tecnicaContext context)
        {
            _context = context;
        }

        // GET: api/Comunas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComuna()
        {
            return await _context.Comuna.ToListAsync();
        }

        // GET: api/Comunas/5
        [HttpGet("{region}/{ciudad}")]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComuna(short region, short ciudad)
        {
            return await _context.Comuna.Where(x => x.RegionCodigo.Equals(region) && x.CiudadCodigo.Equals(ciudad)).ToListAsync();
        }

    }
}
