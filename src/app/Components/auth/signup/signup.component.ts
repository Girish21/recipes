import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('form') signUpForm: NgForm;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.signupUser(this.signUpForm.value.mail, this.signUpForm.value.password);
    this.signUpForm.reset();
    this.router.navigate(['/recipes']);
  }

}
