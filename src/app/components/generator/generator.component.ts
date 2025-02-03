import { Component, ViewChild } from '@angular/core';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorEvent } from 'ngx-color';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  imports: [ColorChromeModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {

  @ViewChild('memeCanvas', {static: false}) myCanvas: any;
  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000000';
  bgColor: string = '#F9F9FB';

  preview(event: any) {
    console.log('event:: ', event)
    this.fileEvent = event;
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(event.target.files[0]);

    render.onload = function (eve: any ) {
      const img = new Image();
      img.src = eve.target.result as string;

      img.onload = function() {
        ctx.drawImage(img, 50, 150, 600, 500);
      }
    }

  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(this.fileEvent) this.preview(this.fileEvent);
    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width/2, 100);
    ctx.fillText(this.bottomText, canvas.width/2, 750);
  }

  canvasTextColor(event: ColorEvent) {
    this.textColor = event.color.hex;
    this.drawText();
  }

  canvasBgColor(event: ColorEvent) {
    this.bgColor = event.color.hex;
    this.drawText();
  }

  download() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.download = 'memeImg.png';
    link.href = image;
    link.click();
  }
}
