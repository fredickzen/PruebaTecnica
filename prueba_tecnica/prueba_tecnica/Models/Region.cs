using System;
using System.Collections.Generic;

namespace prueba_tecnica.Models
{
    public partial class Region
    {
        public Region()
        {
            Ciudad = new HashSet<Ciudad>();
        }

        public short Codigo { get; set; }
        public string Nombre { get; set; }
        public string NombreOficial { get; set; }
        public int CodigoLibroClaseElectronico { get; set; }

        public virtual ICollection<Ciudad> Ciudad { get; set; }
    }
}
