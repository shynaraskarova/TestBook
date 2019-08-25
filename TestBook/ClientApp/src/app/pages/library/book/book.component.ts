import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {NzModalService} from 'ng-zorro-antd';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  listOfData: Array<any> = [];
  categoriesList: Array<any> = [];
  isVisible = false;
  loading = false;
  isNew = false;
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfDisplayData = [...this.listOfData];

  public dataEditForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'name': new FormControl([null, [Validators.required]]),
    'year': new FormControl(),
    'category_id': new FormControl(null, Validators.required)
  });

  constructor(private appService: AppService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.loading = true;
    this.loadData();
    this.appService.getAllCategories((dict) => {
      this.categoriesList = dict;
    });
    this.dataEditForm.controls['year'].setValidators([
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4)
    ]);
  }

  loadData(): void {
    this.appService.getAllBooks((dict) => {
      this.listOfData = dict;
      this.listOfDisplayData =  [...this.listOfData];
      this.loading = false;
    });
  }

  showModal(e): void {
    if (!isNullOrUndefined(e)) {
      this.isNew = false;
      this.dataEditForm.controls['id'].setValue(e.id);
      this.dataEditForm.controls['name'].setValue(e.name);
      this.dataEditForm.controls['year'].setValue(e.year);
      this.dataEditForm.controls['category_id'].setValue(e['category']['id']);
    } else {
      this.isNew = true;
      this.dataEditForm.reset(e);
      this.dataEditForm.controls['id'].setValue(0);
    }
    this.isVisible = true;
  }

  deleteItem(e): void {
    this.modalService.confirm({
      nzTitle: 'Вы уверены, что хотите удалить этот элемент?',
      nzOkText: 'Да',
      nzOkType: 'default',
      nzOnOk: () => this.appService.deleteBook(e, (res) => {
        this.loading = true;
        this.loadData();
      }),
      nzCancelText: 'Нет'
    });
  }

  handleSave(e): void {
    this.loading = true;
    this.appService.setBook(e, (res) => {
      this.loadData();
    });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  search(): void {
    const filterFunc = (item: { name: string;}) => {
      return (
        item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
      );
    };
    const data = this.listOfData.filter((item: { name: string; }) => filterFunc(item));
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
        ? 1
        : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
    );
  }

}
