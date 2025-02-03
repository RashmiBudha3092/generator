import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meme-editor',
  imports: [FormsModule],
  templateUrl: './meme-editor.component.html',
  styleUrl: './meme-editor.component.css'
})
export class MemeEditorComponent {
  @ViewChild('memeCanvas', { static: true }) memeCanvas!: ElementRef<HTMLCanvasElement>;
  topText: string = '';
  bottomText: string = '';
  private ctx!: CanvasRenderingContext2D;
  private img!: HTMLImageElement;

  ngAfterViewInit() {
    this.ctx = this.memeCanvas.nativeElement.getContext('2d')!;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.img.src = e.target?.result as string;
        this.img.onload = () => this.drawMeme();
      };
      reader.readAsDataURL(file);
    }
  }

  drawMeme() {
    const canvas = this.memeCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    this.ctx.drawImage(this.img, 0, 0);
    this.ctx.font = '30px Impact';
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 3;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.topText, canvas.width / 2, 50);
    this.ctx.strokeText(this.topText, canvas.width / 2, 50);
    this.ctx.fillText(this.bottomText, canvas.width / 2, canvas.height - 20);
    this.ctx.strokeText(this.bottomText, canvas.width / 2, canvas.height - 20);
  }

  downloadMeme() {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = this.memeCanvas.nativeElement.toDataURL();
    link.click();
  }
}
