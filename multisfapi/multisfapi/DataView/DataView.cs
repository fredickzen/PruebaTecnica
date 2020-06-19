using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace multisfapi.DataView
{
   
    public class PersonaDateView
    {
        public Guid? Id { get; set; }
        public string Run { get; set; }
        public int RunCuerpo { get; set; }

        [Required]
        [StringLength(1)]
        public string RunDigito { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombres { get; set; }

        [Required]
        [StringLength(100)]
        public string ApellidoPaterno { get; set; }

        [Required]
        [StringLength(100)]
        public string ApellidoMaterno { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public short SexoCodigo { get; set; }

        [Required]
        public DateTime? FechaNacimiento { get; set; }
        public short? RegionCodigo { get; set; }
        public short? CiudadCodigo { get; set; }
        public short? ComunaCodigo { get; set; }
        public string Direccion { get; set; }
        public int? Telefono { get; set; }
        public string Observaciones { get; set; }
    }

    public class IdPersonaDateView
    {
        [Required]
        public Guid Id { get; set; }
    }

    public class PaginatePersonaDateView
    {
        [Required]
        public int PageIndex { get; set; }

        [Required]
        public int PageSize { get; set; }
    }
}
