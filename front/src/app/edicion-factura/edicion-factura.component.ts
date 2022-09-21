import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-edicion-factura',
  templateUrl: './edicion-factura.component.html',
  styleUrls: ['./edicion-factura.component.css']
})
export class EdicionFacturaComponent implements OnInit {
  //Declaracion de variables
  idFactura: number  = 0;
  private sub: any;
  detalleFactura: any;
  private token : any = (localStorage.getItem("token")) ? localStorage.getItem("token") : '';

  //Variables Añadir Item
  nueva_descripcion : string = "";
  nueva_cantidad : number = 0;
  nuevo_valor_unitario : number = 0;

  //Variables Form
  num_factura : number = 0;
  nit_emisor : number = 0;
  emisor : string = "";
  receptor : string = "";
  nit_receptor : number = 0;

  items : any[] = [];
  
  subtotal : number = 0;
  iva : number = 0;
  total : number = 0;

  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    //Obtenemos el id de la factura enviado en la URL
    this.sub = this.route.params.subscribe(params => {
      this.idFactura = +params['idFactura'];
    });
    //Obtenemos el detalle de la factura segun el id especifico
    this.obtenerDetalleFactura();
  }

  /**
   * Funcion para obtener el detalle de una factura especifica mediante la api "getSpecificBill"
   * Enviamos como parametros POST el token y el id de la factura
   * Luego asignamos los valores a la variable global detalleFactura y ejecutamos la funcion asignarValores
   */
  async obtenerDetalleFactura(){

    try {
      let res = await axios({
        url: '/api/getSpecificBill',
        method: 'post',
        timeout: 8000,
        data: { token: this.token, idFactura : this.idFactura }
      });
      this.detalleFactura = res.data;
      this.asignarValores();
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
   * Funcion para asignar los valores a las variables y asi poder mostrar la informacion en el HTML
   */
  asignarValores(){
    this.num_factura = this.detalleFactura.num_factura;
    this.nit_emisor = this.detalleFactura.nit_emisor;
    this.emisor = this.detalleFactura.emisor;
    this.nit_receptor = this.detalleFactura.nit_receptor;
    this.receptor = this.detalleFactura.receptor;
    
    this.items = JSON.parse(this.detalleFactura.items);
    
    this.subtotal = this.detalleFactura.valor_ant_iva,
    this.iva = this.detalleFactura.iva;
    this.total = this.detalleFactura.valor_pagar;
  }

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
    setInterval(() => {this.calcularValorTotalFactura()}, 1000);
    //Limpiamos los campos
    this.nueva_descripcion = "";
    this.nueva_cantidad = 0;
    this.nuevo_valor_unitario = 0;
  }

  /**
   * Funcion para editar la factura mediante la api "editBill" pasamos como parametros, toda la data de 
   * la factura incluyendo el token de validacion
   * Una vez actialzada la factura nos motrara un mensaje y recargara la pagina
   */
  async editar(){
    try {
      let dataFactura = {
        id : this.idFactura,
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
        url: '/api/editBill',
        method: 'post',
        timeout: 8000,
        data: dataFactura
      });

      if(res.status == 200){
        alert(res.data);
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

  //Eliminamos la suscripcion de la ruta
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
