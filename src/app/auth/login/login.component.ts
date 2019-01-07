import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

form: FormGroup;
message: Message;

  constructor(
    private userservice: UserService,
    private authservice: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
    .subscribe((params: Params) => {
      /* console.log ('few', params); */
      if (params['nowCanLogin']) {
        this.showmessage({
          text: 'Теперь Вы можете зайти в систему',
          type: 'success'});
      }

    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  showmessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
  onSubmit() {
    const formData = this.form.value;
    this.userservice.getUserByEmail(formData.email)
    .subscribe((user: User) => {
    if (user) {
      if (user.password) {
        this.message.text = '';
        window.localStorage.setItem('user', JSON.stringify(user));
        this.authservice.login();
        this.router.navigate(['/system', 'bill']);
      } else {
        this.showmessage({
          text: 'Пароль неверный',
          type: 'danger'});
      }
    } else {
      this.showmessage({
        text: 'Такого пользователя не существует',
        type: 'danger'});
    }
    });
  }
}
