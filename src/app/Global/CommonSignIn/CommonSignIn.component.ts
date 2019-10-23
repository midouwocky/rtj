import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cridentials } from 'src/app/shared/model/cridentials.model';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { Router } from '@angular/router';

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {

  usernameControl: FormControl = new FormControl(null, Validators.required);
  passwordControl: FormControl = new FormControl(null, Validators.required);
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.intiLoginForm();
  }

  intiLoginForm() {
    this.loginFormGroup = this.fb.group({
      username: this.usernameControl,
      password: this.passwordControl
    });
  }


  login() {
    if (this.loginFormGroup.valid) {
      const cridentials = new Cridentials();
      cridentials.username = this.usernameControl.value;
      cridentials.password = this.passwordControl.value;
      this.authenticationService.login(cridentials).subscribe(res => {
        StorageUtil.setAuthToken(res.access_token);
        this.getAccountInfos();
      });
    }
  }


  getAccountInfos() {
    this.authenticationService.getAccount().subscribe(res => {
      console.log(res);
      if (res) {
        this.router.navigate(['/products']);
      }
    });
  }

}
