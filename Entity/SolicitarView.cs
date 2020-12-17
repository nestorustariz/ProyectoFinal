using System;

namespace Entity
{
    public class SolicitarView
    {
        public int CodigoSolicitud { get; set; }
        public string IdentificacionD { get; set; }
        public string CodAsignatura { get; set; }
        public string NombreAsignatura { get; set; }
        public string NombreD { get; set; }
        public DateTime FechaPedido { get; set; }
        public string JsonProductos { get; set; }
        public string IdentificacionM { get; set; }
        public string NombreM { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string Estado { get; set; }
    }
}
