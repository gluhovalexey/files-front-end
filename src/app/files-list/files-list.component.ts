import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	OnChanges,
	SimpleChange,
	Inject
} from '@angular/core';
import {FilesService, FILES_PATH_URL} from '../files/files.service';
import {MatTableDataSource, MatPaginator, MatTable} from "@angular/material";
import {SelectionModel} from '@angular/cdk/collections';
import {File} from "../files/file.model";
import {Subject} from 'rxjs/Subject';
import * as $ from 'jquery';

@Component({
	selector : 'app-files-list', templateUrl : './files-list.component.html', styleUrls : ['./files-list.component.css']
})
export class FilesListComponent implements OnInit, OnChanges {
	dataSource;
	displayedColumns: string[] = [
		'name',
		'size',
		'date',
		'delete'
	];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@Input() files: File[];
	@Output() renderFilesList = new EventEmitter<boolean>()
	@ViewChild(MatTable) table: MatTable<any>;

	constructor(private filesService: FilesService, @Inject(FILES_PATH_URL) private filesPathUrl: string) {}

	ngOnInit() {}

	ngOnChanges(changes: { [propName: string]: SimpleChange }) {
		changes.files && this.updateTableRows(changes.files);
	}

	/**
	 * Обновить записи таблицы
	 * @param files
	 */
	updateTableRows(files): void {
		let data: File[] = files.currentValue;
		this.dataSource = new MatTableDataSource(data);
		this.dataSource.paginator = this.paginator;
		let paginator = this.dataSource.paginator;
		// Если файл был последним на странице, то осуществляется переход на первую страницу
		!files.firstChange && files.previousValue && files.previousValue.length > files.currentValue.length && files.currentValue.length % this.dataSource.paginator.pageSize == 0 && this.dataSource.paginator.firstPage();
	}

	/**
	 * Обработка нажатия на имя файла
	 */
	onNameCellClick(file: File): void {

		const link = this.getFileLink(file);
		if (this.isFilePreviewAvailable(file)){
			let embed;

			if (file.contentType.indexOf('image') >= 0) {
				embed = `<img src="${link}" alt="${file.fileName}" style="width: 100%; height: auto;">`;
			} else {
				embed = `<iframe id="previewLink" style="margin: 0; padding: 0; width: 100%; height: 100%;" src="https://docs.google.com/gview?url=${link}&embedded=true"></iframe>`;
			}
			let newTab = window.open();
			let newTabBody = newTab && newTab.document.body;

			embed && $(newTabBody).append('<div id="previewLinkBody">' + embed + '</div>');
		} else {
			window.location.href = link;
		}
	}

	/**
	 * Определяет возможность предпросмотра файла
	 */
	isFilePreviewAvailable(file) {
		const previewFormatsExtesions = ['doc','docx','ods','xls','xlsx', 'rtf', 'pdf'];
		const path = file.path
		const fileExtension = path.substring(path.lastIndexOf('.') + 1);

		return (file.contentType.indexOf('image') >= 0 || previewFormatsExtesions.indexOf(fileExtension) >= 0);
	}

	/**
	 * Обработка нажатия кнопки "удалить"
	 * @param id
	 */
	onDeleteFile(id): void {
		this.filesService.deleteFile(id).subscribe(responce => {
			this.renderFilesList.emit();
		});
	}

	/**
	 *  Получение пути нахождения файла

	 */
	getFileLink(file: File): string {
		return `${this.filesPathUrl}/${file.path}`;
	}
}