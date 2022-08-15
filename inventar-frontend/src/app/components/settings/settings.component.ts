import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IConfiguration } from 'src/app/models/models';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { SharedService } from 'src/app/services/shared.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  configuration: IConfiguration = null;
  private configurationSubscription: Subscription = null;
  private updateConfigurationSubscription: Subscription = null;
  private spinnerSubscription: Subscription = null;
  constructor(
    public sharedService: SharedService, 
    private configurationService: ConfigurationService,
    public sideBarService: SideBarService,
    public navBarService: NavBarService
  ) { }

  ngOnInit(): void {
    this.sideBarService.displaySidebar = true;
    this.navBarService.displayNavBar = true;
    this.sharedService.activateLoadingSpinner();
    this.configurationSubscription = this.configurationService.getConfiguration().subscribe((configuration: IConfiguration) => {
      this.configuration = configuration;
      this.sharedService.theme = configuration.darkMode? 'dark' : 'light';
      this.sharedService.checkLoadingSpinner();
    },
    () => {
      this.sharedService.checkLoadingSpinner();
    });
  }

  changeTheme(): void {
    this.updateConfigurationSubscription?.unsubscribe();
    this.configuration.darkMode = !this.configuration.darkMode;
    this.sharedService.activateLoadingSpinner();
    this.updateConfigurationSubscription = this.configurationService.updateConfiguration(this.configuration).subscribe(() => {
      this.sharedService.changeTheme(this.configuration.darkMode);
      this.sharedService.checkLoadingSpinner();
    },
    () => {
      this.sharedService.checkLoadingSpinner();
    });
  }

  setAnimationLoading(): void {
    this.spinnerSubscription?.unsubscribe();
    this.configuration.animationMode = !this.sharedService.isSpinnerEnabled;
    this.sharedService.activateLoadingSpinner();
    this.spinnerSubscription = this.configurationService.updateConfiguration(this.configuration).subscribe(() => {
      this.sharedService.isSpinnerEnabled = this.configuration.animationMode;
      this.sharedService.checkLoadingSpinner();
    },
    () => {
      this.sharedService.checkLoadingSpinner();
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription?.unsubscribe();
    this.updateConfigurationSubscription?.unsubscribe();
    this.configurationSubscription?.unsubscribe();
  }
}
