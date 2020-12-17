using System;
using Datos;
using Entity;
using System.Linq;
using System.Collections.Generic;

namespace Logica
{
    public class UsuarioService
    {
        private readonly UpcLabContext _upcLabContext;

        public UsuarioService(UpcLabContext upcLabContext)
        {
            _upcLabContext = upcLabContext;
        }

        public GuardarUsuarioResponse Guardar(Usuario usuario){
            try
            {
                var usuarioById = _upcLabContext.Usuarios.Find(usuario.Identificacion);
                if (usuarioById != null)
                {
                    return new GuardarUsuarioResponse("Ya hay un usuario con la misma identificacion");
                }
                var usuarioBus = _upcLabContext.Usuarios.Where(c => c.UserName.Trim() == usuario.UserName.Trim()).FirstOrDefault();
                if (usuarioBus != null)
                {
                    return new GuardarUsuarioResponse("Ya hay un usuario con el mismo userName");
                }
                if (usuario.Tipo == "docente")
                {
                    var docenteBus = _upcLabContext.Docentes.Find(usuario.Identificacion);
                    if (docenteBus == null)
                    {
                        return new GuardarUsuarioResponse("El docente no existe, no se encontro");
                    }
                }
                if (usuario.Tipo == "monitor")
                {
                    var monitorBus = _upcLabContext.Monitores.Where(c=>c.Identificacion.Trim() == usuario.Identificacion.Trim()).FirstOrDefault();
                    if (monitorBus == null)
                    {
                        return new GuardarUsuarioResponse("El monitor no existe, no se encontro");
                    }
                }
                _upcLabContext.Usuarios.Add(usuario);
                _upcLabContext.SaveChanges();
                return new GuardarUsuarioResponse(usuario);
            }
            catch (Exception e)
            {
                return new GuardarUsuarioResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public Usuario Validate(string userName,string password)
        {
            return _upcLabContext.Usuarios.FirstOrDefault(c=>c.UserName.Trim() == userName && c.Password.Trim() == password);
        }

        public class GuardarUsuarioResponse
        {
            public GuardarUsuarioResponse(string mensaje)
            {
                Mensaje = mensaje;
                Error = true;
            }

            public GuardarUsuarioResponse(Usuario usuario)
            {
                Usuario = usuario;
                Error = false;
            }
            public string Mensaje { get; set; }
            public bool Error { get; set; }
            public Usuario Usuario { get; set; }
        }

        public ConsultarUsuarioResponse ConsultarUsuarios()
        {
            try
            {
                var usuarios = _upcLabContext.Usuarios.ToList();

                if (usuarios == null)
                {
                    return new ConsultarUsuarioResponse("No hay elementos en la lista");
                }
                return new ConsultarUsuarioResponse(usuarios);
            }
            catch (Exception e)
            {
                return new ConsultarUsuarioResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public class ConsultarUsuarioResponse
        {
            public ConsultarUsuarioResponse(List<Usuario> usuarios)
            {
                Error = false;
                Usuarios = usuarios;
            }
            public ConsultarUsuarioResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<Usuario> Usuarios { get; set; }
        }
    }
}