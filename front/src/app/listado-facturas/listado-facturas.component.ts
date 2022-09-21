import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError } from 'axios';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css'],
  providers: [DatePipe]
})
export class ListadoFacturasComponent implements OnInit, OnDestroy {
  //Declaracion de variables
  public facturas : any;
  private token : any = (localStorage.getItem("token")) ? localStorage.getItem("token") : '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router : Router, private datePipe: DatePipe, private httpClient: HttpClient) { }

  ngOnInit(): void {
    //Inicializamos la configuracion del DataTable Listado Facturas
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    //Obtenemos la informacion para llenar el DataTable por medio de la api "getbills"
    this.httpClient.post<any>('/api/getbills', { token: this.token })
    .subscribe((data) => {
      //Una vez obtenemos la informacion la asignamos a la variable que estamos recorriendo en el HTML
      this.facturas =  this.formatCreatedAt(data);
      this.dtTrigger.next(data);
    }, (error)=> {
      (error.status == 401) ? this.router.navigate(['/login']) : null;
    });
  }

  /**
   * Función para formatear las fechas de Creacion y Actualizacion de las facturas
   */
  formatCreatedAt(data:object){

    let array : any[] = [];

    Object.entries(data).forEach(([key, value]) => {

      let objectTemp = {
        emisor: value.emisor,
        id: value.id,
        items: value.items, 
        iva: value.iva,
        nit_emisor: value.nit_emisor,
        nit_receptor: value.nit_receptor,
        num_factura: value.num_factura,
        receptor: value.receptor, 
        status: value.status, 
        valor_ant_iva: value.valor_ant_iva, 
        valor_pagar: value.valor_pagar, 
        created_at: this.datePipe.transform( new Date(value.created_at), 'yyyy-MM-dd hh:mm:ss'),
        updated_at: this.datePipe.transform( new Date(value.updated_at), 'yyyy-MM-dd hh:mm:ss')
      };
      
      array.push(objectTemp);

    });
    return array;
  }

  /**
  * Funcion que elimina una factura especifica mediante la api "deleteBill" enviando el Token y el idFactua
  * En caso de que funcione se muestra un mensaje con la informacion y se recarga la pagina
  */
  async eliminarFactura(idFactura:any){
    try{
      let res = await axios({
        url: '/api/deleteBill',
        method: 'post',
        timeout: 8000,
        data: { token: this.token, id: idFactura }
      });

      if(res.status == 200){
        alert(res.data);
        location.reload();
      }else if(res.status == 401){
        console.log("else");
        this.router.navigate(['/login']);
      }

    }catch(error){
      const err = error as AxiosError;
      if (err.response) {
        if(err.response.status == 401){
          this.router.navigate(['/login']);
        }
      }
    }
  }

  //Desuscribimos la tabla
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  logout(){
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
    }
  }

}
