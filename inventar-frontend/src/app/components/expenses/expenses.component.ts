import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { TableActionInput } from 'src/app/shared/base-table/table-actions/TableActionInput';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog.service';
import { CategoryType, ColumnDefinition, Expense, ResponseWrapper } from 'src/app/models/models';
import { FilterOptions } from 'src/app/shared/base-table/table-actions/filter/filter.models';
import { buildParams } from 'src/app/utils/param-bulder';
import { ExpenseService } from 'src/app/services/pages/expense.service';
import { CategoriesService } from 'src/app/services/pages/categories.service';
import { AccountService } from 'src/app/services/account.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ColumnDefinitionService } from 'src/app/core/services/column-definition.service';
import { BaseTable } from 'src/app/core/BaseTable';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent extends BaseTable<Expense> {
  createComponent = AddExpenseComponent;

  columnDefinition: ColumnDefinition[] = this.columnDefinitionService.columnDefinitions.get("EXPENSE");
  public tableActionInput: TableActionInput = {
    pageName: "Expenses",
    icon: 'attach_money'
  };

  filterOptions: FilterOptions[] = [
    {
      field: "category",
      label: "Category",
      type: "select",
      matSelectOptions: undefined
    },
    {
      field: "description",
      label: "Description",
      type: "text"
    },
    {
      field: "expense",
      label: "Expense",
      type: "number"
    }
  ];

  constructor(
    public sharedService: SharedService,
    private expenseService: ExpenseService,
    public dialog: DialogService,
    private categoryService: CategoriesService,
    protected toaster: ToastrService,
    protected accountService: AccountService,
    public sideBarService: SideBarService,
    public navBarService: NavBarService,
    public columnDefinitionService: ColumnDefinitionService
  ) {
    super(sharedService, dialog, expenseService, toaster, accountService);
  }

  ngOnInit(): void {
    this.sideBarService.displaySidebar = true;
    this.navBarService.displayNavBar = true;
    this.categoryService.findAll(buildParams(0, 9999).append("categoryType", CategoryType.EXPENSE).append("account", this.accountService?.getAccount())).subscribe((res: ResponseWrapper) => {
      const item = this.filterOptions.filter(filterOpt => filterOpt.field == "category")[0];
      const index = this.filterOptions.indexOf(item);
      this.filterOptions[index].matSelectOptions = {
        options: res.data,
        displayBy: "category",
        valueBy: "id"
      };
    });
    this.query();
  }

  query(): void {
    this.expenseService
      .findAll(buildParams(this.page, this.size, this.sort, this.previousFilters).append("account", this.accountService?.getAccount()))
      .pipe(takeUntil(this.subject))
      .subscribe((res: ResponseWrapper) => this.onQuerySuccess(res));
  }

}
