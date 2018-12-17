import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('form') signInForm: NgForm;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.signinUser(this.signInForm.value.mail, this.signInForm.value.password);
    this.signInForm.reset();
    this.router.navigate(['/recipes']);
  }

}
