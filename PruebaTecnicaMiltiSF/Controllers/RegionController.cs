using System.Collections.Generic;
using System.Linq;
using PruebaTecnicaMiltiSF.Model;
using Microsoft.AspNetCore.Mvc;
using System;


namespace PruebaTecnicaMiltiSF.Controllers
{
 
    [Route("api/v1/Region")]
    public class RegionController : Controller
    {
        private readonly PruebaTecnicaMiltiSFDbContext _context;

        public RegionController(PruebaTecnicaMiltiSFDbContext context)
        {
            _context = context; 
        }
    
        [HttpGet]
        public List<Region> Get(){
            return _context.Region.ToList();

        }

        //Search by ID
        [HttpGet("{id}")]
        public IActionResult GetAuthorById(int id){
        
        var regiones = this._context.Region.SingleOrDefault(ct=> ct.Codigo == id);
            if(regiones != null){
                return Ok(regiones);
            }else{
                return NotFound();
            }

        }
        
    }
}