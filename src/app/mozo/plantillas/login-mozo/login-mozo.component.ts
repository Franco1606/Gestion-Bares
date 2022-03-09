import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../servicios/api/app.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-login-mozo',
  templateUrl: './login-mozo.component.html',
  styleUrls: ['./login-mozo.component.css']
})
export class LoginMozoComponent implements OnInit {

  constructor( private _api:AppService, private _router:Router ) { }

  errorMsg!:string
  titulo = "Mozos"

  ngOnInit(): void {
  }

  logIn(loginData:any) {
    //Armo body para post en api (campo ususario diferente para cada uno (admin, mozo, cocina))
    let body = {
      usuarioMozo : loginData["usuario"],
      password : loginData["password"]
    }
    this.quitarEspaciosFinales(body)
    this._api.auth(body).subscribe({
      next: (x) => {
        if(x.status == "ok") {
          localStorage.setItem("tokenMozo", x.result.token)
          this._router.navigateByUrl("home");
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
