import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginStateService } from '../../services/login-state.service';

/**
 * This is a login modal window to sign in or out a user.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements AfterViewInit {
  /**
   * A variable to depict if the login modal should be shown.
   */
  @Input() public isLoginModalVisible: boolean;

  /**
   * Getting the login-form so one could operate with it.
   */
  @ViewChild('loginForm') private loginFormCredentials: NgForm;

  /**
   * Getting the email input of the login form.
   */
  @ViewChild('email_ref') private loginFormElement: ElementRef;

  /**
   * Service message to notify the user if there was something wrong during logging in.
   */
  public statusMessage: string;

  constructor(private loginStateService: LoginStateService, private auth: AuthService) { }

  /**
   * Once the content of the modal is rendered, focusing on email input.
   */
  public ngAfterViewInit(): void {
    this.loginFormElement.nativeElement.focus();
  }

  /**
   * Closing the login modal window.
   */
  public closeLoginModal(): void {
    this.loginStateService.noKeyboardPagination = false;
    this.loginStateService.loginModalVisibility = false;
  }

  /**
   * Submitting the user login data.
   */
  public submitForm(): void {
    if (!this.loginFormCredentials.valid) {
      return;
    }
    this.auth.signIn(this.loginFormCredentials.value.email, this.loginFormCredentials.value.password)
      .then(message => {
        if (message.status === 'error') {
          this.statusMessage = message['errorMessage'];
        } else {
          this.loginFormCredentials.reset();
          this.closeLoginModal();
        }
      });
  }
}
