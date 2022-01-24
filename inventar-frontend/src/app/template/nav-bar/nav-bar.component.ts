import { Component, OnDestroy, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/core/Theme';
import { IConfiguration } from 'src/app/models/IConfiguration';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SharedService } from 'src/app/services/shared.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  interval = null;
  currentDate = new Date();
  configuration: IConfiguration;

  public themesArray: Theme[] = [
    {
      name: 'Default',
      color: '#00695c'
    },
    {
      name: 'Pink & Blue-grey',
      color: '#e91e63'
    },
    {
      name: 'Amber',
      color: '#673ab7'
    },
    {
      name: 'Indigo Pink',
      color: '#3f51b5'
    }
  ]

  constructor(
    public sharedService: SharedService,
    public authenticationService: AuthenticationService,
    public sidebarService: SideBarService,
    private configurationService: ConfigurationService
  ) { 
  }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.setInitialTheme();
    this.configurationService.getConfiguration().subscribe((configuration: IConfiguration) => {
      this.configuration = configuration;
      this.sharedService.theme = configuration.darkMode? 'dark' : 'light';
    });
  }

  private setInitialTheme(): void {
    const theme: string = localStorage.getItem("themeColor");
    if(theme) this.changeThemeColor(theme);
  }

  ngOnDestroy(): void {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  logout(): void {
    this.authenticationService.logout();
  }

  toggleDarkMode(): void {
    this.configuration.darkMode = !this.configuration.darkMode;
    this.sharedService.activateLoadingSpinner();
    this.configurationService.updateConfiguration(this.configuration).subscribe(() => {
      this.sharedService.changeTheme(this.configuration.darkMode);
      this.sharedService.checkLoadingSpinner();
    });
  }

  changeThemeColor(color: string): void {
    const root: any = document.documentElement;
    root.style.setProperty('--light', color);
    localStorage.setItem("themeColor", color);
  }
}
