import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {
	FormBuilder, FormGroup, AbstractControl, Validators
} from '@angular/forms'
import {FilesService} from '../files/files.service';
@Component({
	selector : 'app-file-upload',
	templateUrl : './file-upload.component.html',
	styleUrls : ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
	uploadFileForm: FormGroup;
	file: AbstractControl;
	fileName: AbstractControl;
	@Output() renderFilesList = new EventEmitter<boolean>()

	constructor(
		private fb: FormBuilder,
		private filesService: FilesService
	) {
		this.uploadFileForm = this.fb.group({
			'file': ['', Validators.required ],
		});
		this.file = this.uploadFileForm.controls['file'];
	}

	ngOnInit() {}

	/**
	 * Обработка нажатия кнопки "Загрузить"
	 * @param elements
	 */
	onUploadFileFormSubmit(elements): void {
		let data: File = elements.file && elements.file.files && elements.file.files[0];		
		data && this.onUploadFile(data);
	}

	/**
	 * Отправка файла на загрузку
	 * @param {File} data
	 */
	onUploadFile(data: File) {
		this.uploadFileForm.valid && this.filesService.uploadFile(data).subscribe(
			responce => {
				this.uploadFileForm.reset();
            	this.renderFilesList.emit();
			});
	}

}
