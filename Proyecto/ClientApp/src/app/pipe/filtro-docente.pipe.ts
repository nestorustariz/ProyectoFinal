import { Pipe, PipeTransform } from '@angular/core';
import { Docente } from '../models/docente';


@Pipe({
  name: 'filtroDocente'
})
export class FiltroDocentePipe implements PipeTransform {

  /*transform(docente: Docente[],  searchText: string): any {
    if (searchText === undefined || searchText === '') return docente;
      return docente.filter(p =>
      p.identificacion.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1||p.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }*/
 
    transform(value: any, arg:any): any{
      if(arg === '' || arg.length < 2)return value;
      const resultDocentes = [];
      for(const docente of value){
    if(docente.identificacion.indexOf(arg) > -1 || docente.nombre.indexOf(arg) > -1){
      resultDocentes.push(docente);
          }
      }
      return resultDocentes;
    }
  
}
