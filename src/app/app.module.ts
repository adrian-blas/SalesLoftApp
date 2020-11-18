import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Extra modules
// url to help https://github.com/VadimDez/ngx-order-pipe
import { OrderModule } from 'ngx-order-pipe';

// Services
import { PeopleService } from './services/people.service';

// Rutas
import { APP_ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { PeopleComponent } from './pages/people/people.component';
import { FrequencyComponent } from './pages/frequency/frequency.component';
import { SimilarityComponent } from './pages/similarity/similarity.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PeopleComponent,
    FrequencyComponent,
    SimilarityComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    APP_ROUTES,
    HttpClientModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
