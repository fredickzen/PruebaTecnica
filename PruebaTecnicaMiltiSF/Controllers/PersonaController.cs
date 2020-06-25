using System.Collections.Generic;
using System.Linq;
using PruebaTecnicaMiltiSF.Model;
using Microsoft.AspNetCore.Mvc;
using System;


namespace PruebaTecnicaMiltiSF.Controllers
{
 
    [Route("api/v1/Persona")]
    public class PersonaController : Controller
    {
        private readonly PruebaTecnicaMiltiSFDbContext _context;

        public PersonaController(PruebaTecnicaMiltiSFDbContext context)
        {
            _context = context; 
        }
    
        [HttpGet]
        public List<Persona> Get(){
            return _context.Persona.ToList();

        }

        //Search by ID
        [HttpGet("{id}")]
        public IActionResult GetAuthorById(Guid id){
        
        var persona = this._context.Persona.SingleOrDefault(ct=> ct.Id == id);
            if(persona != null){
                return Ok(persona);
            }else{
                return NotFound();
            }

        }
        
         //AddAuthors
        [HttpPost]
        public IActionResult AddAuthors([FromBody] Persona persona){
        
            if(!this.ModelState.IsValid){
                return BadRequest();
            }
            persona.Id = Guid.NewGuid();
            this._context.Persona.Add(persona);
            this._context.SaveChanges();
            return Created($"authors/{persona.Id}", persona);
        }
        
        //UpdateAuthors
        [HttpPut("{id}")]
        public IActionResult PutAuthors(Guid id, [FromBody] Persona persona){

        var target = _context.Persona.FirstOrDefault(ct=> ct.Id == id);
            if(target == null)
            {
                return NotFound();
            }
            else
            {
                target.Id = persona.Id;
                target.RunCuerpo = persona.RunCuerpo;
                target.RunDigito = persona.RunDigito;
                target.Nombres = persona.Nombres;
                target.ApellidoMaterno = persona.ApellidoMaterno;
                target.ApellidoPaterno = persona.ApellidoPaterno;
                target.Email = persona.Email;
                target.SexoCodigo = persona.SexoCodigo;
                target.FechaNacimiento = persona.FechaNacimiento;
                target.RegionCodigo = persona.RegionCodigo;
                target.CiudadCodigo = persona.CiudadCodigo;
                target.ComunaCodigo = persona.ComunaCodigo;
                target.Direccion = persona.Direccion;
                target.Telefono = persona.Telefono;
                target.Observaciones = persona.Observaciones;
                _context.Persona.Update(target);
                _context.SaveChanges();
                return new NoContentResult();
            }

        }

        //Delete Authors
        [HttpDelete("{id}")]
        public IActionResult DeleteAuthors(Guid id){
            var target = _context.Persona.FirstOrDefault(ct=> ct.Id == id);
            if(!this.ModelState.IsValid){
                return BadRequest();
            }
            else{
                _context.Persona.Remove(target);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}