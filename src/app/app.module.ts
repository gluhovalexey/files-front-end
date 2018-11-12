import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatPaginatorModule,
	MatCheckboxModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {FILES_PROVIDERS} from './files/files.service';
import {FilesComponent} from './files/files.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FilesListComponent} from './files-list/files-list.component';

@NgModule({
	declarations : [
		AppComponent,
		FilesComponent,
		FileUploadComponent,
		FilesListComponent,
	], 
	imports : [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatPaginatorModule,
		MatCheckboxModule
	], 
	providers : [FILES_PROVIDERS], 
	bootstrap : [AppComponent]
})
export class AppModule {}
