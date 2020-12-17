import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMonitores'
})
export class FiltroMonitoresPipe implements PipeTransform {

  transform(value: any, arg:any): any{
    if(arg === '' || arg.length < 2)return value;
    const resultMonitores = [];
    for(const monitor of value){
  if(monitor.identificacion.indexOf(arg) > -1 || monitor.nombre.toLowerCase()
  .indexOf(arg.toLowerCase()) !== -1){
    resultMonitores.push(monitor);
        }
    }
    return resultMonitores;
  }

}
