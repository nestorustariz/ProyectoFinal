using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Producto
    {
        [Key]
        public string CodProducto { get; set; }
        public string Descripcion { get; set; }   
        public string Marca { get; set; }      
        public int Cantidad { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string Categoria { get; set; }
    }
}
