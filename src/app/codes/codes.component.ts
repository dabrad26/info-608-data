import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {
  codeList: Map<string, Array<string>> = new Map();
  keys = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    fetch('/assets/data.json').then(response => response.json()).then(data => {
      data.forEach(entry => {
        entry.codes.forEach(code => {
          if (!this.codeList.get(code.code)) {
            this.codeList.set(code.code, []);
          }
          this.codeList.get(code.code).push(`${code.text} ~${entry.date}`);
        });
      });
      this.setCodeKeys();
    });
  }

  setCodeKeys() {
    this.codeList.forEach((code, key) => {
      this.keys.push(key);
    });
    this.keys = this.keys.sort();
  }

  goHome(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  viewCharts(event) {
    event.preventDefault();
    this.router.navigate([`/charts`]);
  }

  getItemsFromCode(code) {
    return this.codeList.get(code);
  }

  goToEntry(event, entry) {
    event.preventDefault();
    console.log(entry);
    const date = entry.split('~')[1];
    this.router.navigate([`/${date}`]);
  }

}
