using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Docente
    {
        [Key]
        public string Identificacion { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "Apellido es obligatorio")]
        public string Apellido { get; set; }
        [Required(ErrorMessage = "Programa es obligatorio")]
        public string Programa { get; set; }
        public DateTime FechaReg { get; set; }
        
    }
}
