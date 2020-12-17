using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Proyecto.Hubs;

namespace Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocenteController : ControllerBase
    {
        private readonly DocenteService _docenteService;
        private readonly IHubContext<SignalHub> _hubContext;

        public DocenteController(UpcLabContext context, IHubContext<SignalHub> hubContext)
        {
            _hubContext = hubContext;
            _docenteService = new DocenteService(context);
        }

        [HttpPost]
        public  async Task<ActionResult<Docente>> PostDocente(Docente docente)
        {
            Docente docenteMapeadp = MapearDocente(docente);
            var response = _docenteService.GuardarDocente(docenteMapeadp);
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
            await _hubContext.Clients.All.SendAsync("RegistrarDocente", response.Docente);
            return Ok(response.Docente);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Docente>> Docentes()
        {
            var response = _docenteService.ConsultarDocentes();
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

            return Ok(response.Docentes);
        }

        private Docente MapearDocente(Docente docente)
        {
            var _docente = new Docente
            {
                Identificacion = docente.Identificacion,
                Nombre = docente.Nombre,
                Apellido = docente.Apellido,
                Programa = docente.Programa,
                FechaReg = DateTime.Now
            };
            return _docente;
        }
    }
}
