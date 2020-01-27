import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../../shared/components/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  submitted = false;
  upSub: Subscription;

  constructor(
    private  route: ActivatedRoute,
    private postService: PostService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  ngOnDestroy(): void {
    if (this.upSub) {
      this.upSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.upSub = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false;
      this.alert.warning('Пост изменен');
    });
  }
}
