using System;
using System.Collections.Generic;

namespace Entity
{
    public class SolicitarRequest
    {
        public int CodigoSolicitud { get; set; }
        public string CodAsignatura { get; set; }
        public string JsonProductos { get; set; }
        public DateTime FechaPedido { get; set; }
        public string IdentificacionM { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string Estado { get; set; }

        public class ConsultaSolicitudRequest
        {
            public ConsultaSolicitudRequest(SolicitarView solicitarView)
            {
                SolicitarView = solicitarView;
            }

            public SolicitarView SolicitarView { get; set; }
        }
    }
}
