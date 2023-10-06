import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../authetication.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  constructor(public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ],
      ],
      password: ['',
        Validators.required,
        // Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}'),
      ],
    });
  }
  get errorControl() {
    return this.loginForm?.controls;
  }

  async logIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      if (this.loginForm?.valid) {
        const user = await this.authService
          .loginUser(this.loginForm.value.email, this.loginForm.value.password)
          .catch((error) => {
            console.log(error);
            loading.dismiss();
          });
          if(user){
            loading.dismiss()
            this.router.navigate(['/home'])
          }else{
            console.log('loi')
          }
      }
    }
  }
}
