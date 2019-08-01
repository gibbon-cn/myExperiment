import { Component } from '@angular/core';
import * as Mousetrap from 'mousetrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstAngularApp';
  ngOnInit() {
    Mousetrap.bind("ctrl+s", this.onKey);
  }

  onKey(e, des) {
      console.log(des);
      return false;
  }
}
