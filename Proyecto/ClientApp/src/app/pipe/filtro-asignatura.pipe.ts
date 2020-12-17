import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAsignatura'
})
export class FiltroAsignaturaPipe implements PipeTransform {

  transform(value: any, arg:any): any{
    if(arg === '' || arg.length < 2)return value;
    const resultAsignaturas = [];
    for(const asignatura of value){
  if(asignatura.codAsignatura.toLowerCase()
  .indexOf(arg.toLowerCase()) !== -1){
    resultAsignaturas.push(asignatura);
        }
    }
    return resultAsignaturas;
  }


}
