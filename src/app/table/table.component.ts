import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/table.service';
import { IPost } from './post/post.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  result!: IPost[][];
  firstUser = 0;

  constructor(public tableService: TableService) {}

  ngOnInit() {
    this.tableService.getPosts().subscribe((posts) => (this.result = posts));
  }
}
