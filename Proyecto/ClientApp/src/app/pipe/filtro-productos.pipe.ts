import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'filtroProductos'
})
export class FiltroProductosPipe implements PipeTransform {

  transform(producto: Producto[],  searchText: string): any {
    if (searchText === undefined || searchText === '' ) return producto;
      return producto.filter(p =>
      p.codProducto.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1 || p.descripcion.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1);
  
    }
  

}
