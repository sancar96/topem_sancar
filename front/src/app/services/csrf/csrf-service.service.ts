import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CsrfServiceService {
  //Declaracion de Variables
  private csrfToken : any;

  /**
   * Al momento de invocar el servicio ingresamos a la funcion para generar el CSRF
   */
  constructor() { 
    this.generateCSRF();
  }

  /**
   * Función para consumir el servicio del backend y generar el codigo CSRF
   */
  async generateCSRF() {
    try {
       let res = await axios({
            url: '/api/generateCSRF',
            method: 'get',
            timeout: 8000
        });

        this.csrfToken = res.data;
    }
    catch (err) {
        console.error(err);
    }
  }

}
