import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesComponent } from './incomes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddIncomingComponent } from './add-incoming/add-incoming.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IncomesRoutingModule } from './incomes-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IncomeDetailsComponent } from './income-details/income-details.component';



@NgModule({
  declarations: [
    IncomesComponent, AddIncomingComponent, IncomeDetailsComponent
  ],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class IncomesModule { }
