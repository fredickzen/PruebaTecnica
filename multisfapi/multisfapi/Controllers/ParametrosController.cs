using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using multisfapi.Models;

namespace multisfapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParametrosController : ControllerBase
    {
        [Route("Regiones")]
        [HttpGet]
        public async Task<IActionResult> Regiones()
        {
            IEnumerable<Region> data = null;

            using (var db = new bdPersonasContext())
            {
                var query = from d in db.Region
                           select d;

                data = await query.ToListAsync();
            }
            return Ok(data);

        }

        [Route("Ciudades")]
        [HttpGet]
        public async Task<IActionResult> Ciudades()
        {
            IEnumerable<Ciudad> data = null;

            using (var db = new bdPersonasContext())
            {
                var query = from d in db.Ciudad
                            select d;

                data = await query.ToListAsync();
            }
            return Ok(data);

        }

        [Route("Comunas")]
        [HttpGet]
        public async Task<IActionResult> Comunas()
        {
            IEnumerable<Comuna> data = null;

            using (var db = new bdPersonasContext())
            {
                var query = from d in db.Comuna
                            select d;

                data = await query.ToListAsync();
            }
            return Ok(data);

        }

        [Route("Sexos")]
        [HttpGet]
        public async Task<IActionResult> Sexos()
        {
            IEnumerable<Sexo> data = null;

            using (var db = new bdPersonasContext())
            {
                var query = from d in db.Sexo
                            select d;

                data = await query.ToListAsync();
            }
            return Ok(data);

        }
    }

}
