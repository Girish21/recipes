import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AppRouter} from '../../app-routing.module';
import {SharedModule} from '../../Model/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRouter
  ],
  exports: [
    AppRouter,
    HeaderComponent
  ]
})
export class CoreModule {}
