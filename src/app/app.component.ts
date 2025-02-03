import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { GeneratorComponent } from './components/generator/generator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memes-generator';
}
