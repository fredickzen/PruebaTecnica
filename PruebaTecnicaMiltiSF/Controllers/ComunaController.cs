using System.Collections.Generic;
using System.Linq;
using PruebaTecnicaMiltiSF.Model;
using Microsoft.AspNetCore.Mvc;
using System;


namespace PruebaTecnicaMiltiSF.Controllers
{
 
    [Route("api/v1/Comuna")]
    public class ComunaController : Controller
    {
        private readonly PruebaTecnicaMiltiSFDbContext _context;

        public ComunaController(PruebaTecnicaMiltiSFDbContext context)
        {
            _context = context; 
        }
    
        [HttpGet]
        public List<Comuna> Get(){
            return _context.Comuna.ToList();

        }

        //Search by ID
        [HttpGet("{id}")]
        public IActionResult GetAuthorById(int id){
        
        var comunas = this._context.Comuna.SingleOrDefault(ct=> ct.Codigo == id);
            if(comunas != null){
                return Ok(comunas);
            }else{
                return NotFound();
            }

        }
        
    }
}