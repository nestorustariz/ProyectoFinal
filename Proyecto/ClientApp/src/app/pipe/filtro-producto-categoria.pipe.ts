import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'filtroProductoCategoria'
})
export class FiltroProductoCategoriaPipe implements PipeTransform {

  transform(producto: Producto[],  searchTextCat: string): any {
    if(searchTextCat === 'Todos' || searchTextCat === '') return producto;
    return producto.filter(p =>
      p.categoria == searchTextCat);
  
    }
}
