import {NgModule} from '@angular/core';
import {LibraryRoutingModule} from './library-routing.module';
import {LibraryComponent} from './library.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CategoryComponent} from './category/category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BookComponent} from './book/book.component';
import {SharedComponentModule} from '../../shared/shared.component.module';

@NgModule({
  imports: [
    LibraryRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    SharedComponentModule,
    CommonModule,
    FormsModule
  ],
  declarations: [LibraryComponent, CategoryComponent, BookComponent],
  exports: [LibraryComponent]
})
export class LibraryModule { }
