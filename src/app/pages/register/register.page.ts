import { Component, OnInit } from '@angular/core';
import { AuthService } from '../..//services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  image: string;
  name: string;
  email: string;
  password: string;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Se requiere nombre de usuario'},
    ],
    'email': [
      { type: 'required', message: 'Se requiere email.' },
      { type: 'pattern', message: 'Ingrese un email valido.' }
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 digitos.' }
    ]
  }
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
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

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((ImageData) => {
      this.image = 'data:image/jpeg;base64,' + ImageData;
      
    }, (err) => {
      console.log(err);
    })   
  }

  tryRegister(){
    this.authService.register(this.email,this.password, this.name, this.image)
     .then(res => {       
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
       
       this.navCtrl.navigateForward("/menu/home");
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goToLogin(){
    this.navCtrl.navigateForward("/login");
  }

}
