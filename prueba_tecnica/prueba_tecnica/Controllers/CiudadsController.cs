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
    public class CiudadsController : ControllerBase
    {
        private readonly prueba_tecnicaContext _context;

        public CiudadsController(prueba_tecnicaContext context)
        {
            _context = context;
        }

        // GET: api/Ciudads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetCiudad()
        {
            return await _context.Ciudad.ToListAsync();
        }

        // GET: api/Ciudads/5
        [HttpGet("{region}")]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetCiudad(short region)
        {
            return await _context.Ciudad.Where(x => x.RegionCodigo.Equals(region)).ToListAsync();
        }


    }
}
