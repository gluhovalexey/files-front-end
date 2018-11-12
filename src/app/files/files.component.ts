import { Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from './files.service';
import { File } from './file.model';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
    files: File[];

    constructor(
        private filesService: FilesService
        ) { }

    ngOnInit() {
        this.renderFilesList();
    }

	/**
     *  Отобразить файлы
     */
     renderFilesList() {
         this.filesService.getFilesList().subscribe(
            files  => { 
                this.files = files;
            },
            error => {
                this.files = null;
            }
         );
     }
 }
