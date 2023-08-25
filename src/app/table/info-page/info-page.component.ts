import { Component } from '@angular/core';
import { TableService } from 'src/app/shared/table.service';
import { IPost } from '../post/post.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent {
  post?: IPost;
  constructor(
    public tableService: TableService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tableService
      .getPosts()
      .pipe(
        map((res) => {
          const findedElement = res.map((el) =>
            el.find((el) => el.id + '' == id)
          );
          return findedElement.filter((el) => el);
        })
      )
      .subscribe((res: any) => (this.post = res[0]));
  }

  goBack(): void {
    this.location.back();
  }
}
