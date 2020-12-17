using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductoController(UpcLabContext context)
        {
            _productoService = new ProductoService(context);
        }

        [HttpPost]
        public ActionResult<Producto> Post(Producto producto)
        {
            Producto productoMapeado = MapearProducto(producto);
            var response = _productoService.GuardarProducto(productoMapeado);
            if (response.Error)
            {   
                ModelState.AddModelError("Producto",response.Mensaje);
                
            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState){
                    Status = StatusCodes.Status400BadRequest,
                };
                return  BadRequest(problemDetails);
            }
            return  Ok(response.Producto);
        }

        private Producto MapearProducto(Producto producto)
        {
           var productoM = new Producto{
               CodProducto = producto.CodProducto,
               Descripcion = producto.Descripcion,
               Cantidad = producto.Cantidad,
               Categoria = producto.Categoria,
               Marca = producto.Marca,
               FechaRegistro = DateTime.Now
           } ;
           return productoM;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Producto>> Productos()
        {
            var response = _productoService.ConsultarProductos();
            if (response.Error)
            {
                ModelState.AddModelError("Mensaje", response.Mensaje);
            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }

            return Ok(response.Productos);
        }
    }
}
