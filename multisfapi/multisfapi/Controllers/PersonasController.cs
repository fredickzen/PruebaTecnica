using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using multisfapi.DataView;
using multisfapi.Models;
using multisfapi.Utiles;

namespace multisfapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody()] PersonaDateView parameters)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity("Debe incluir los parámetros");
            }

            var id = Guid.NewGuid();

            using (var db = new bdPersonasContext())
            {
                var personas = db.Set<Models.Persona>();
                personas.Add(new Models.Persona {
                    Id = id,
                    Run = parameters.Run,
                    RunCuerpo = parameters.RunCuerpo,
                    RunDigito = parameters.RunDigito,
                    Nombre = parameters.Nombre,
                    Nombres = parameters.Nombres,
                    ApellidoPaterno = parameters.ApellidoPaterno,
                    ApellidoMaterno = parameters.ApellidoMaterno,
                    Email = parameters.Email,
                    SexoCodigo = parameters.SexoCodigo,
                    FechaNacimiento = parameters.FechaNacimiento,
                    RegionCodigo = parameters.RegionCodigo,
                    CiudadCodigo = parameters.CiudadCodigo,
                    ComunaCodigo = parameters.ComunaCodigo,
                    Direccion = parameters.Direccion,
                    Telefono = parameters.Telefono,
                    Observaciones = parameters.Observaciones,
                });

                await db.SaveChangesAsync();
            }

            return Ok(true);
        }

        [Route("Update")]
        [HttpPost]
        public async Task<IActionResult> Update([FromBody()] PersonaDateView parameters)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity("Debe incluir los parámetros");
            }

            Models.Persona persona = null;

            using (var db = new bdPersonasContext())
            {
                persona = db.Persona.SingleOrDefault(b => b.Id == parameters.Id);
                if (persona != null)
                {
                    persona.Id = parameters.Id;
                    persona.Run = parameters.Run;
                    persona.RunCuerpo = parameters.RunCuerpo;
                    persona.RunDigito = parameters.RunDigito;
                    persona.Nombre = parameters.Nombre;
                    persona.Nombres = parameters.Nombres;
                    persona.ApellidoPaterno = parameters.ApellidoPaterno;
                    persona.ApellidoMaterno = parameters.ApellidoMaterno;
                    persona.Email = parameters.Email;
                    persona.SexoCodigo = parameters.SexoCodigo;
                    persona.FechaNacimiento = parameters.FechaNacimiento;
                    persona.RegionCodigo = parameters.RegionCodigo;
                    persona.CiudadCodigo = parameters.CiudadCodigo;
                    persona.ComunaCodigo = parameters.ComunaCodigo;
                    persona.Direccion = parameters.Direccion;
                    persona.Telefono = parameters.Telefono;
                    persona.Observaciones = parameters.Observaciones;

                    await db.SaveChangesAsync();
                }
            }

            if(persona != null)
            {
                return Ok(true);
            }
            else
            {
                return NotFound("Persona no encontrada");
            }

            
        }

        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody()] IdPersonaDateView parameters)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity("Debe incluir los parámetros");
            }

            Models.Persona persona = null;

            using (var db = new bdPersonasContext())
            {
                persona = db.Persona.SingleOrDefault(b => b.Id == parameters.Id);
                if (persona != null)
                {
                    db.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;

                    await db.SaveChangesAsync();
                }
            }

            if (persona != null)
            {
                return Ok(true);
            }
            else
            {
                return NotFound("Persona no encontrada");
            }


        }

        [Route("Get")]
        [HttpGet]
        public IActionResult Get([FromQuery()] int PageIndex, int PageSize)
        {
            if (PageIndex <= 0 && PageSize <= 0)
            {
                return UnprocessableEntity("PageSize y PageSize deben ser mayor a cero.");
            }

            Paging.PagedResult<Models.Persona> personas = null;

            using (var db = new bdPersonasContext())
            {
                personas = Paging.GetPaged<Models.Persona>(db.Persona, PageIndex, PageSize);

            }
            return Ok(personas);

        }

        

    }
}
