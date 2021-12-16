import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';

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
    )
  ]
})
export class BudgetInfoComponent implements OnInit {

  constructor(public accountService: AccountService) { }
  public account: Account;
  public hideBalance: boolean = false;
  public hiddenBalance: string = '';
  dateFrom = new Date(2021, 11, 1);
  dateTo = new Date();
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    console.log(localStorage.getItem("hideBalance"));
    
    this.hideBalance = (localStorage.getItem("hideBalance") === 'true');
    this.emitSelectedDate();
    this.accountService.getAccount("61b614acf563e554ee4ebb9c").subscribe((response: any) => {
      this.account = response.body;
      if(this.hideBalance) {
        this.generateHiddenBalanceValue();
      }
    });
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

}
