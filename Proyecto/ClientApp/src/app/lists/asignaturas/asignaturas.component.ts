import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  @Output() seleccionado = new EventEmitter<Asignatura>();
  constructor(private asignaturaService:AsignaturaService) { }
  asignaturas:Asignatura[];
  filterAsignatura = '';
  ngOnInit() {
    this.getAllAsignaturas();
  }

  getAllAsignaturas()
  {
    this.asignaturaService.consultar().subscribe(result => {
      this.asignaturas = result;
      
    });
  }

  seleccionar(asignatura:Asignatura)
  {
    this.seleccionado.emit(asignatura);
  }
}
