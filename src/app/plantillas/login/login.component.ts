import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  @Input() titulo!:string
  @Input() errorMsg!:string
  @Output() enviarDatos = new EventEmitter<any>();

  form:FormGroup = new FormGroup({
    "usuario" : new FormControl("", Validators.required),
    "password" : new FormControl("", Validators.required)
  })
  
  saludo = "hola"

  ngOnInit(): void {
  }  

  pasarData(loginData:any) {
    this.enviarDatos.emit(loginData)
  }

}
