import { Component, Input } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  currentId = 0;
  @Input() post!: IPost;
  @Input() index!: number;

  randColor(id: number) {
    let r = 0,
      g = 0,
      b = 0;
    console.log('id', id, 'current', this.currentId);

    if (this.currentId !== id) {
      this.currentId = id;

      (r = Math.floor(Math.random() * 256)),
        (g = Math.floor(Math.random() * 256)),
        (b = Math.floor(Math.random() * 256));
    }

    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  }
}
