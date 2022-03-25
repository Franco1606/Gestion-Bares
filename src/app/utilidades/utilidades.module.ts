import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSelectModule } from "@angular/material/select"
import { MatMenuModule } from "@angular/material/menu"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatDialogModule } from "@angular/material/dialog"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { NgxMatColorPickerModule, MAT_COLOR_FORMATS,  NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker'
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const modules = [
  MatInputModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatCheckboxModule,
  NgxMatColorPickerModule,
  ClipboardModule,
  MatTabsModule,
  MatSlideToggleModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, 
      useValue: NGX_MAT_COLOR_FORMATS 
    }   
  ]
})
export class UtilidadesModule { }
