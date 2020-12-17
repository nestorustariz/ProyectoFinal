using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class DocenteRequest
    {
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Programa { get; set; }
        public string CodAsignatura { get; set; }

        public class DocenteConsultaResponse
        {
            public DocenteConsultaResponse(DocenteView docenteView)
            {
                DocenteView = docenteView;
            }

            public DocenteView DocenteView { get; set; }
        }
    }
}
