import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Location} from '@angular/common';

@Injectable()
export class AppService {

  constructor(private http: HttpClient,
              private message: NzMessageService,
              private _location: Location) {
  }


  getAllCategories(callback: (result: any) => void) {
    return this.http.get('api/Library/GetAllCategories')
      .subscribe(
        (data: any) => {
          callback(data);
        },
        (err) => {
          if (isDevMode()) {
            console.log(err);
          } else {
            this._location.back();
          }
        }
      );
  }
  setCategory(dictData: any, callback: (result: any) => void) {
    return this.http.post('/api/Library/SetCategory', dictData)
      .subscribe(
        (data) => {
          this.message.success('Успешно сохранено!');
          callback(data);
        }, (err) => {
          this.message.error('Ошибка сохранения!');
          callback(err);
        }
      );
  }
  deleteCategory(id: number, callback: (result: any) => void) {
    return this.http.get(`/api/Library/DeleteCategory?id=${id}`)
      .subscribe(
        (data) => {
          this.message.success('Успешно удалено!');
          callback(data);
        }, (err) => {
          this.message.error('Ошибка удаления!');
          callback(err);
        }
      );
  }
  getAllBooks(callback: (result: any) => void) {
    return this.http.get('api/Library/GetAllBooks')
      .subscribe(
        (data: any) => {
          callback(data);
        },
        (err) => {
          if (isDevMode()) {
            console.log(err);
          } else {
            this._location.back();
          }
        }
      );
  }
  setBook(dictData: any, callback: (result: any) => void) {
    return this.http.post('/api/Library/SetBook', dictData)
      .subscribe(
        (data) => {
          this.message.success('Успешно сохранено!');
          callback(data);
        }, (err) => {
          this.message.error('Ошибка сохранения!');
          callback(err);
        }
      );
  }
  deleteBook(id: number, callback: (result: any) => void) {
    return this.http.get(`/api/Library/DeleteBook?id=${id}`)
      .subscribe(
        (data) => {
          this.message.success('Успешно удалено!');
          callback(data);
        }, (err) => {
          this.message.error('Ошибка удаления!');
          callback(err);
        }
      );
  }
}
