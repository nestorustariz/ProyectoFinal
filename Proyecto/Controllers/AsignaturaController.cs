using System;
using System.Collections.Generic;
using System.Linq;
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
    public class AsignaturaController : ControllerBase
    {
        private readonly AsignaturaService _asignaturaService;

        public AsignaturaController(UpcLabContext context)
        {
            _asignaturaService = new AsignaturaService(context);
        }

        [HttpPost]
        public ActionResult<Asignatura> Post(AsignaturaRequest asignatura)
        {
            var response = _asignaturaService.Guardar(asignatura);
            if (response.Error)
            {
                ModelState.AddModelError("Asignatura", response.Mensaje);

            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Asignatura);
        }

        [HttpGet]
        public  ActionResult<IEnumerable<AsignaturaView>> Gets()
        {
            var response = _asignaturaService.ConsultarTodas();
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
                return  BadRequest(problemDetails);
            }

            return Ok(response.Asignaturas);
        }

        [HttpGet("{identificacionD}")]
        public  ActionResult<IEnumerable<AsignaturaView>> AsignaturasByIdDocente(string identificacionD)
        {
            var response = _asignaturaService.GetAsignaturasByIdDocente(identificacionD);
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
                return  BadRequest(problemDetails);
            }

            return Ok(response.Asignaturas);
        }
    }
}