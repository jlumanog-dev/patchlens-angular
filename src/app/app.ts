import { Component, computed, signal, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Displayone } from './dummy/displayone/displayone';
import { UpperCasePipe } from '@angular/common';
import { Templatefragement } from './dummy/templatefragement/templatefragement';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  headerTitle = "patchlense"
  title = "patchwise";



/*   textFromChildComponet = viewChild(Displayone);
  textDisplay = computed(()=> this.textFromChildComponet()?.stringValueFromChild())
 */
}
