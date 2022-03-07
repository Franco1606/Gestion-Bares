import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor( private _router:Router ) { }

  @Input() usuario!:string
  @Input() usuarioID!:number 

  ngOnInit(): void {
  }

  closeSesion(){ 
    localStorage.removeItem("tokenAdmin")       
    this._router.navigateByUrl("admin/login")
  }

}
