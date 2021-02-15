import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Ingrese un email valido' }
    ],
    'password': [
      { type: 'required', message: 'contraseña requerida' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 caracteres' }
    ]
  };

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.storage.set("isLoginShowed",true);
      this.navCtrl.navigateForward("/menu/home");
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register")
  }

}
