using System;
using System.Collections.Generic;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UserController(UpcLabContext context)
        {
            _usuarioService = new UsuarioService(context);
        }

        [HttpPost]
        public ActionResult<Usuario> GuardarUsuario(Usuario usuario)
        {
            Usuario user = MapearUsuario(usuario);
            var response = _usuarioService.Guardar(user);
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
            return Ok(response.Usuario);
        }

        private Usuario MapearUsuario(Usuario usuario)
        {
            var _usuario = new Usuario
            {
                Identificacion = usuario.Identificacion,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                FechaReg = DateTime.Now,
                Correo = usuario.Correo,
                UserName = usuario.UserName,
                Password = usuario.Password,
                Tipo = usuario.Tipo
            };
            return _usuario;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> Usuarios()
        {
            var response = _usuarioService.ConsultarUsuarios();
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

            return Ok(response.Usuarios);
        }
    }
}
