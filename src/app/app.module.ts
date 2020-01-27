import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaynLayoutComponent} from './shared/components/mayn-layout/mayn-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import {AuthService} from './admin/shared/services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


registerLocaleData(ruLocale, 'ru')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MaynLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
