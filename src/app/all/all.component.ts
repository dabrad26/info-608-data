import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  data = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    fetch('/assets/data.json').then(response => response.json()).then(data => {
      this.data = data;
    });
  }

  handleClick(data) {
    this.router.navigate([`/${data.date}`]);
    console.log(data);
  }

  viewCodes(event) {
    event.preventDefault();
    this.router.navigate([`/codes`]);
  }
}
