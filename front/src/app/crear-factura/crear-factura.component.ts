import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  //Declaracion de variables
  private token : any = (localStorage.getItem("token")) ? localStorage.getItem("token") : '';
  //Variables Añadir Item
  nueva_descripcion : string = "";
  nueva_cantidad : number = 0;
  nuevo_valor_unitario : number = 0;

  //Variables Form
  nit_emisor : number = 0;
  emisor : string = "";
  receptor : string = "";
  nit_receptor : number = 0;

  items : any[] = [];
  
  subtotal : number = 0;
  iva : number = 0;
  total : number = 0;

  constructor(private router : Router) { }

  ngOnInit(): void {}

  /**
   * Funcion para añadir items a la factura
   */
  addItem(){
    let nuevo_total = this.nueva_cantidad * this.nuevo_valor_unitario;
    this.items.push({
      cantidad : this.nueva_cantidad,
      descripcion : this.nueva_descripcion,
      val_total : nuevo_total,
      val_unit : this.nuevo_valor_unitario,
    });
    //Esperamos un segundo para poder actualizar los valores de la factura
    setInterval(() => {this.calcularValorTotalFactura()}, 1000);
    //Limpiamos los campos
    this.nueva_descripcion = "";
    this.nueva_cantidad = 0;
    this.nuevo_valor_unitario = 0;
  }

  /**
   * Funcion para crear la factura mediante la api "saveBill", enviamos los datos de la factura y el token de seguridad
   * Una vez creada nos redirigimos al listado de facturas
   */
  async crear(){
    try {
      let dataFactura = {
        token: this.token,
        nit_emisor: this.nit_emisor,
        emisor: this.emisor,
        nit_receptor: this.nit_receptor,
        receptor: this.receptor,
        valor_ant_iva: this.subtotal,
        iva: this.iva,
        valor_pagar: this.total,
        items : JSON.stringify(this.items)
      };
      
      let res = await axios({
        url: '/api/saveBill',
        method: 'post',
        timeout: 8000,
        data: dataFactura
      });

      if(res.status == 200){
        alert(res.data);
        this.router.navigate(['/listadoFacturas']);
      }else{
        location.reload();
      }

    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if(err.response.status == 401){
          this.router.navigate(['/login']);
        }
      }
    }
  }

  /**
   * Funcion para calcular el valor total de la factura cada vez que se añaden items, se modifica la cantidad o el valor unitario de uno de los items
   */
  calcularValorTotalFactura(){

    let val_total_item_element = document.getElementsByClassName("val_total_item");
    this.subtotal = 0;

    Object.entries(val_total_item_element).forEach(([key, value]) => {
      this.subtotal += +value.innerHTML;
    });
    
    this.iva = this.subtotal * 0.19;
    this.total = this.subtotal + this.iva;
  }

  /**
   * Funcion para modificar la descripcion de un item
   */
  modDescripcion(keyItem:any, element:any){
    let desc = element.srcElement.value;
    this.items[keyItem].descripcion = desc;
  }

  /**
   * Funcion para modificar la cantidad de un item y a su vez calcula el valor total del item y modifica el valor total de la factura
   */
  calcularCantidad(keyItem:any, element:any){
    let cantidad = element.srcElement.value;
    this.items[keyItem].cantidad = cantidad;
    this.items[keyItem].val_total = this.items[keyItem].cantidad * this.items[keyItem].val_unit;
    this.calcularValorTotalFactura();
  }

  /**
   * Funcion para modificar el valor unitario de un item y a su vez calcula el valor total del item y modifica el valor total de la factura
   */
  calcularValorUnitario(keyItem:any, element:any){
    let val_unit = element.srcElement.value;
    this.items[keyItem].val_unit = val_unit;
    this.items[keyItem].val_total = this.items[keyItem].cantidad * this.items[keyItem].val_unit;
    this.calcularValorTotalFactura();
  }

  /**
   * Funcion para eliminar un item de la factura
   */
  eliminarItem(keyItem:any){
    this.items.splice(keyItem, 1);
    setInterval(() => {this.calcularValorTotalFactura()}, 1000);
  }

}
