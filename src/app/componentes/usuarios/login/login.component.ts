import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private navegar: Router) { }

  email: string;
  password: string;
  ngOnInit() {
  }

  ingresar(){
    console.log('iniciando sesion '+this.email + " " + this.password)
    if(this.verificarCampos()){
      this.usuariosService.iniciarSesion(this.email,this.password).subscribe((response) => {
        let usuario = JSON.stringify(response);
        let us = JSON.parse(usuario);
        localStorage.setItem('token', us.token);
        this.navegar.navigate(['inicio']);
      })
    }else{
      alert('complete los campos.')
    }
  }

  verificarCampos(): boolean{
    if(this.email && this.password){ return true }
    else{ return false }
  }

}
