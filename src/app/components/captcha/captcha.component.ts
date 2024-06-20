import { Token } from '@angular/compiler';
import { Component, inject } from '@angular/core';
// import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [],
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent {

  // recaptchaService = inject[ReCaptchaV3Service];

  executeRecapta() {
    // this.recaptchaService.execute('').subscribe((tokeng) => {
    //   console.log(token)

    // })
  }

}
