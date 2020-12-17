using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Solicitar
    {
        [Key]
        public int CodigoSolicitud { get; set; }
        public virtual Asignatura Asignatura { get; set; }
        public string JsonProductos { get; set; }
        public DateTime FechaPedido { get; set; }
        public virtual Monitor Monitor { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string Estado { get; set; }
        
    }
}
