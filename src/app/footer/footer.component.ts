import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  showError: boolean = false;

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSubmit() {
    if (this.email.valid) {
      // Handle valid email submission
      console.log('Email submitted:', this.email.value);
      this.showError = true;
    } else {
      // Show error message
      this.showError = true;
    }
  }
}


