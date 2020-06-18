using System;
using System.Collections.Generic;

namespace multisfapi.Models
{
    public partial class Ciudad
    {
        public Ciudad()
        {
            Comuna = new HashSet<Comuna>();
        }

        public short RegionCodigo { get; set; }
        public short Codigo { get; set; }
        public string Nombre { get; set; }

        public virtual Region RegionCodigoNavigation { get; set; }
        public virtual ICollection<Comuna> Comuna { get; set; }
    }
}
