import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { AuthService } from '../../services/auth.service';
import { UserAuthenticationModel } from '../../models/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public version: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.version = `${environment.developedBy} ${environment.infoVersion}`
  }

  ngOnInit(): void {
    const token = UserAuthenticationModel.loadCache()?.user.token || null;

    if (token !== null) {
      this.router.navigate(['/dashboard']);
    }

    this._setupForm();
  }

  private _setupForm(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get form() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.userName.invalid) {
      this.toastr.warning(`Usuario es <strong>requerido</strong>.`);
    }

    if (this.form.password.invalid) {
      this.toastr.warning(`Contraseña es <strong>requerida</strong>.`);
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.auth(this.form.userName.value, this.form.password.value).subscribe(res => {
      this.router.navigate(['/dashboard']).then();
    });

  }

  openSupplier(): void {
    this.router.navigate(['/suppliers-portal']);
  }

}
