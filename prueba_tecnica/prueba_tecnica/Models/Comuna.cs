using System;
using System.Collections.Generic;

namespace prueba_tecnica.Models
{
    public partial class Comuna
    {
        public Comuna()
        {
            Persona = new HashSet<Persona>();
        }

        public short RegionCodigo { get; set; }
        public short CiudadCodigo { get; set; }
        public short Codigo { get; set; }
        public string Nombre { get; set; }
        public int CodigoPostal { get; set; }
        public int CodigoLibroClaseElectronico { get; set; }

        public virtual Ciudad Ciudad { get; set; }
        public virtual ICollection<Persona> Persona { get; set; }
    }
}
