import { Injectable } from '@angular/core';
import axios from 'axios';
import { CsrfServiceService } from '../csrf/csrf-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  /**
   * Al momento de cargar el componente se ejecutara el constructor generando el codigo CSRF en el backend
   * permitiendonos realizar envios de formularios
   */
  constructor(private CsrfService : CsrfServiceService) {}

  /**
   * Función para validar la existencia del usuario en el backend y almacenar el token en el 
   * localstorage del navegador en caso tal de que exista
   * param string email
   * param string password
   * return boolean
   */
  async generateToken(email:string, password:string){
    try {
      let res = await axios({
        url: '/api/validateUserExist',
        method: 'post',
        timeout: 8000,
        data: { email, pass : password }
      });

      if(res.status = 200){
        localStorage.setItem("token", res.data);
        return true;
      }else{
        return false;
      }

    }
    catch (err) {
        console.error(err);
        return false;
    }
  }

}
