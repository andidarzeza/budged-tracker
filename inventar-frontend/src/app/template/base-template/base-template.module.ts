import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTemplateComponent } from './base-template.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SideBarModule } from './side-bar/side-bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [BaseTemplateComponent],
  imports: [
    CommonModule,
    NavBarModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    SideBarModule,
  ],
  exports: [
    BaseTemplateComponent
  ]
})
export class BaseTemplateModule { }
