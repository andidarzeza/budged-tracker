import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';
import { MONTHS } from 'src/environments/environment';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('500ms ease-out', style({opacity: 1 }))
          ]
        )
      ]
    ),
    trigger(
      'datePickerAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('200ms ease-out', 
                    style({opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('200ms ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class BudgetInfoComponent implements OnInit, OnDestroy {

  constructor(public accountService: AccountService, public sharedService: SharedService) { }
  public account: Account;
  private accountSubscription: Subscription = null;
  public hideBalance: boolean = false;
  public hiddenBalance: string = '';
  public months = MONTHS;
  showDatePicker: boolean = false;
  dateFrom = new Date();
  dateTo = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth() + 1);
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.hideBalance = (localStorage.getItem("hideBalance") === 'true');
    this.emitSelectedDate();
    this.accountSubscription = this.accountService.getAccount().subscribe((response: any) => {
      this.account = response.body;
      if(this.hideBalance) {
        this.generateHiddenBalanceValue();
      }
    });
  }

  switchDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  emitSelectedDate(): void {
    this.dateSelected.emit({
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    })
  }

  public toggleHideBalance(): void {
    if(!this.hideBalance) {
      this.generateHiddenBalanceValue();
    } else {
      this.hiddenBalance = "";
    }
    this.hideBalance = !this.hideBalance;
    localStorage.setItem("hideBalance", this.hideBalance.toString());
  }

  private generateHiddenBalanceValue(): void {
    for(let i = 0;i<this.account?.balance?.toString().length + 3;i++) {
      this.hiddenBalance += "*";
    }
  }

  public onDateSelected(date: Date): void {
    this.dateFrom = date;
    this.dateTo = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth() + 1)
    this.showDatePicker = false;
    this.emitSelectedDate();
  }
  
  ngOnDestroy(): void {
    this.accountSubscription?.unsubscribe();
  }
}
