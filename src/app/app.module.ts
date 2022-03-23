import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';
import { UserService } from 'src/service/user.service';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    StatisticsComponent,
    MenuComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    AccordionModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
