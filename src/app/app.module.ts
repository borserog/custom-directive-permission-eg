import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UserService } from './user.service';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, HasPermissionDirective ],
  bootstrap:    [ AppComponent ],
  providers: [UserService]
})
export class AppModule { }
