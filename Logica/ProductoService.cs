using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class ProductoService
    {
        private readonly UpcLabContext _context;

        public ProductoService(UpcLabContext context)
        {
            _context = context;
        }

        public GuardarProductoResponse GuardarProducto(Producto producto)
        {
            try
            {
                var productoConsultado = _context.Productos.Find(producto.CodProducto);
                if (productoConsultado != null)
                {
                    return new GuardarProductoResponse($"El producto con codigo { producto.CodProducto } ya se encuentra registrado");
                }
                _context.Productos.Add(producto);
                _context.SaveChanges();
                return new GuardarProductoResponse(producto);
            }
            catch (Exception e)
            {
                return new GuardarProductoResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public class GuardarProductoResponse
        {
            public GuardarProductoResponse(Producto producto)
            {
                Error = false;
                Producto = producto;
            }
            public GuardarProductoResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Producto Producto { get; set; }
        }

        public class ConsultarProductosResponse
        {
            public ConsultarProductosResponse(List<Producto> productos)
            {
                Error = false;
                Productos = productos;
            }
            public ConsultarProductosResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<Producto> Productos { get; set; }
        }

        public ConsultarProductosResponse ConsultarProductos()
        {
            try
            {
                var productos = _context.Productos.ToList();

                if (productos == null)
                {
                    return new ConsultarProductosResponse("No hay elementos en la lista");
                }
                return new ConsultarProductosResponse(productos);
            }
            catch (Exception e)
            {
                return new ConsultarProductosResponse($"Error de la aplicacion: {e.Message}");
            }
        }
    }
}
