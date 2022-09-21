import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenServiceService } from '../services/token/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Declaracion de variables
  public email : string = '';
  public password : string = '';

  constructor(private TokenService : TokenServiceService, private router : Router) {}

  ngOnInit(): void {}

  /**
   * Función para validar existencia del usuario en el backend
   */
  async login() {
    /**
     *  Generar token CSRF para poder enviar el formulario al backend
     *  Si el usuario es valido navegamos al listado de facturas
     *  Si no es valido mostramos un mensaje y refrescamos la pagina 
     */
    if(await this.TokenService.generateToken(this.email, this.password)){
      this.router.navigate(['/listadoFacturas']);
    }else{
      alert("Usuario invalido");
      location.reload();
    }

  }

}
