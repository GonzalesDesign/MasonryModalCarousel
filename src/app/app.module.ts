


/*---= Angular Core Modules =---*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*---= MAT & MDC Material Modules =---*/
import { MatModule } from './mat.module';
import { MDCModule } from './mdc.module';

/*---= Project Modules =---*/
import { MasonModalCarouselComponent } from './mason-modal-carousel/mason-modal-carousel.component';
import { PopUpComponent } from './mason-modal-carousel/pop-up/pop-up.component';
import { LoaderSvgComponent } from './loader-svg/loader-svg.component';


@NgModule({
  declarations: [
    AppComponent,
    MasonModalCarouselComponent,
    PopUpComponent,
    LoaderSvgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatModule,
    MDCModule
  ],
  entryComponents: [
    // PopDialogComponent
    PopUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
