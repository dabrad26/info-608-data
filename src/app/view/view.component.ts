import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data = [];
  pastCodes = [];
  entry: any = {};
  codes;
  stringify = JSON.stringify;
  entryIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    fetch('/assets/data.json').then(response => response.json()).then(data => {
      this.data = data;
      this.entry = data.filter((item, index) => {
        if (item.date === id) {
          this.entryIndex = index;
          return true;
        }
      })[0];
      this.codesToText();
      this.getPastCodes();
    });
  }

  goHome(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  goPrevious(event) {
    event.preventDefault();
    this.entryIndex--;
    this.router.navigate([`/${this.data[this.entryIndex].date}`]);
    this.entry = this.data[this.entryIndex];
    this.codesToText();
  }

  goNext(event) {
    event.preventDefault();
    this.entryIndex++;
    this.router.navigate([`/${this.data[this.entryIndex].date}`]);
    this.entry = this.data[this.entryIndex];
    this.codesToText();
  }

  viewCodes(event) {
    event.preventDefault();
    this.router.navigate([`/codes`]);
  }

  getPastCodes() {
    this.pastCodes = [];
    this.data.forEach(entry => {
      entry.codes.forEach(code => {
        if (this.pastCodes.indexOf(code.code) === -1) {
          this.pastCodes.push(code.code);
        }
      });
    });
  }

  codesToText() {
    let textCode = '';
    if (!this.entry.codes) {
      return;
    }

    this.entry.codes.forEach((code, index) => {
      const addNl = this.entry.codes.length - 1 > index;
      textCode += `${code.code}: ${code.text}${addNl ? '\n' : ''}`;
    });
    this.codes = textCode;
  }

  getCodes() {
    if (!this.codes) {
      return [];
    }
    const eachCode = this.codes.split('\n');
    return eachCode.map(code => {
      const codeParts = code.split(': ');
      return {code: codeParts[0], text: codeParts[1]};
    });
  }

  selectAll() {
    window.getSelection().selectAllChildren(
      document.getElementById('code-area')
  );
  }
}
