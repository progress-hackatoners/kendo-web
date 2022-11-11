import { Component, Input } from '@angular/core';

import '../../../../src/index';
import './hello-world'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular';
  @Input() count: string = '0';

  increment() {
    this.count = `${parseInt(this.count) + 1}`;
  }
}
