import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinComponent} from './spin/spin.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SpinComponent
  ],
  exports: [
    SpinComponent
  ],
  providers: [

  ]
})
export class SharedComponentModule {
}
