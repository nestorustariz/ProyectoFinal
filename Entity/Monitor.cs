using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Monitor
    {
        [Key]
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string Identificacion { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "El apellido es requerido")]
        public string Apellido { get; set; }
        [Required(ErrorMessage = "El programa es requerido")]
        public string Programa { get; set; }
        [MaxLength(10)]
        public string Celular { get; set; }
        public DateTime FechaReg { get; set; }
        [ValidationSexo( ErrorMessage="El Sexo de ser F o M")]
        public string Sexo { get; set; }


        public class ValidationSexo : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                if ((value.ToString().ToUpper() == "M") || (value.ToString().ToUpper() == "F"))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage);
                }
            }
        }
    }
}
