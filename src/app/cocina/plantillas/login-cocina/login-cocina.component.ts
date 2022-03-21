import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../servicios/api/app.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-login-cocina',
  templateUrl: './login-cocina.component.html',
  styleUrls: ['./login-cocina.component.css']
})
export class LoginCocinaComponent implements OnInit {

  constructor( private _api:AppService, private _router:Router ) { }

  errorMsg!:string
  titulo = "Cocina"

  ngOnInit(): void {
  }

  logIn(loginData:any) {
    //Armo body para post en api (campo ususario diferente para cada uno (admin, mozo, cocina))
    let body = {
      usuarioCocina : loginData["usuario"],
      password : loginData["password"]
    }
    this.quitarEspaciosFinales(body)
    this._api.auth(body).subscribe({
      next: (x) => {
        if(x.status == "ok") {
          localStorage.setItem("tokenCocina", x.result.token)
          this._router.navigateByUrl("cocina/gestion-pedidos");
        } else {
          this.errorMsg = x.result["error_msg"];            
        }       
      }, 
      error: (err) => {console.log(err)}      
    })    
  }

  quitarEspaciosFinales(json:any){
    let keys = Object.keys(json);
    keys.forEach(key => {
      if(typeof json[`${key}`] == 'string') {
        json[`${key}`] = json[`${key}`].trim()
      }
    });    
  }

}
