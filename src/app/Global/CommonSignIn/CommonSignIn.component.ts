import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cridentials } from 'src/app/shared/model/cridentials.model';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { RefreshToken } from 'src/app/shared/model/refresh-token.model';
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
        StorageUtil.setAuthObject(res);
        console.log(+ new Date());
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

  getNewTokenWithRefreshToken() {
    const authObject = StorageUtil.getAuthObject();
    const creadtedAt = authObject.created_at;
    const now = + new Date();
    const experationTime = (creadtedAt + 7200) * 1000;
    if (now > experationTime) {
      const refreshToken = authObject.refresh_token;
      const refreTokenObject = new RefreshToken();
      refreTokenObject.refresh_token = refreshToken;
      this.authenticationService.authenticatedWithRefreshToken(refreTokenObject).subscribe(res => {
        StorageUtil.setAuthObject(res);
        this.authenticationService.setAutheneticated(true);
      }, err => {
        StorageUtil.removeAuthObject();
        StorageUtil.removeAuthToken();
        this.authenticationService.setAutheneticated(false);
      });
    }
  }


}
