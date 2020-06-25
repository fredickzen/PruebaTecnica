using System.Collections.Generic;
using System.Linq;
using PruebaTecnicaMiltiSF.Model;
using Microsoft.AspNetCore.Mvc;
using System;


namespace PruebaTecnicaMiltiSF.Controllers
{
 
    [Route("api/v1/Sexo")]
    public class SexoController : Controller
    {
        private readonly PruebaTecnicaMiltiSFDbContext _context;

        public SexoController(PruebaTecnicaMiltiSFDbContext context)
        {
            _context = context; 
        }
    
        [HttpGet]
        public List<Sexo> Get(){
            return _context.Sexo.ToList();

        }

        //Search by ID
        [HttpGet("{id}")]
        public IActionResult GetAuthorById(int id){
        
        var sexos = this._context.Sexo.SingleOrDefault(ct=> ct.Codigo == id);
            if(sexos != null){
                return Ok(sexos);
            }else{
                return NotFound();
            }

        }
        
    }
}