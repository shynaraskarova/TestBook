import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {NzModalService} from 'ng-zorro-antd';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  listOfData: Array<any> = [];
  isVisible = false;
  loading = false;
  isNew = false;

  public dataEditForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'name': new FormControl([null, [Validators.required]])
  });

  constructor(private app_service: AppService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.loading = true;
    this.loadData();
  }

  loadData(): void {
    this.app_service.getAllCategories((dict) => {
      this.listOfData = dict;
      this.loading = false;
    });
  }

  showModal(e): void {
    if (!isNullOrUndefined(e)) {
      this.isNew = false;
      this.dataEditForm.controls['id'].setValue(e.id);
      this.dataEditForm.controls['name'].setValue(e.name);
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
      nzOnOk: () => this.app_service.deleteCategory(e, (res) => {
        this.loading = true;
        this.loadData();
      }),
      nzCancelText: 'Нет'
    });
  }

  handleSave(e): void {
    this.loading = true;
    this.app_service.setCategory(e, (res) => {
      this.loadData();
    });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
