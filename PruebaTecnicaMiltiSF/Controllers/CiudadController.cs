using System.Collections.Generic;
using System.Linq;
using PruebaTecnicaMiltiSF.Model;
using Microsoft.AspNetCore.Mvc;
using System;


namespace PruebaTecnicaMiltiSF.Controllers
{
 
    [Route("api/v1/Ciudad")]
    public class CiudadController : Controller
    {
        private readonly PruebaTecnicaMiltiSFDbContext _context;

        public CiudadController(PruebaTecnicaMiltiSFDbContext context)
        {
            _context = context; 
        }
    
        [HttpGet]
        public List<Ciudad> Get(){
            return _context.Ciudad.ToList();

        }

        //Search by ID
        [HttpGet("{id}")]
        public IActionResult GetAuthorById(int id){
        
        var ciudades = this._context.Ciudad.SingleOrDefault(ct=> ct.Codigo == id);
            if(ciudades != null){
                return Ok(ciudades);
            }else{
                return NotFound();
            }

        }
        
    }
}