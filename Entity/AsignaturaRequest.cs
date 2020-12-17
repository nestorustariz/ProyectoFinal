using System;

namespace Entity
{
    public class AsignaturaRequest
    {
        public string CodAsignatura { get; set; }
        public string NombreAsignatura { get; set; }
        public string IdentificacionD { get; set; }

        public class ConsultaAsignaturaRequest
        {
            public ConsultaAsignaturaRequest(AsignaturaView asignatura)
            {
                Asignatura = asignatura;
            }
            public AsignaturaView Asignatura { get; set; }
        }
    }
}
