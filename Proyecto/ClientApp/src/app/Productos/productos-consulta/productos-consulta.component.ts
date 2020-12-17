import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-consulta',
  templateUrl: './productos-consulta.component.html',
  styleUrls: ['./productos-consulta.component.css']
})
export class ProductosConsultaComponent implements OnInit {

  productos:Producto[];
  searchTextCat = "";
  searchText = "";
 
  constructor(private service:ProductoService) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this.service.consultarProductos().subscribe(result => {
      this.productos = result;
    });
  }

}
