import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DragAndDropDirective {
  @Input() private allowedExtensions: Array<string> = [];
  @Output() private filesChangedEmitter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmitter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#eee';

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files = evt.dataTransfer.files;
    const validFiles: Array<File> = [];
    const invalidFiles: Array<File> = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files.item(i);
        const ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
        if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      }
      this.filesChangedEmitter.emit(validFiles);
      this.filesInvalidEmitter.emit(invalidFiles);
    }
  }
}
