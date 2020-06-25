using System;
using System.Collections.Generic;

namespace PruebaTecnicaMiltiSF.Model
{
    public partial class Sexo
    {
        public Sexo()
        {
            Persona = new HashSet<Persona>();
        }

        public short Codigo { get; set; }
        public string Nombre { get; set; }
        public string Letra { get; set; }

        public virtual ICollection<Persona> Persona { get; set; }
    }
}
