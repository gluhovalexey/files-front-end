import {Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export const FILES_API_URL = 'http://localhost:3000/api';
export const FILES_PATH_URL = 'http://localhost:3000';

@Injectable({
	providedIn : 'root'
})
export class FilesService {

	constructor(
		private httpClient: HttpClient, 
		@Inject(FILES_API_URL) private apiUrl: string
		) { }

	/**
	* Загрузка файла на сервер
	* @param {File} fileToUpload
	* @returns {Subscription}
	*/
	uploadFile(fileToUpload: File): Observable<any> {
		let formData: FormData = new FormData();
		let queryUrl: string = `${this.apiUrl}/file/upload`;
		formData.append('file', fileToUpload);

		return this.httpClient.post(queryUrl, formData).map( responce => responce).catch(this.errorHandler);
	}

	/**
	 * Получение json с файламиs
	 * @returns {Observable<any>}
	 */

	 getFilesList(): Observable<any> {
	 	let queryUrl: string = `${this.apiUrl}/file/list`;

	 	return this.httpClient.get(queryUrl).map(responce => { return responce }).catch(this.errorHandler);
	 }

	/**
	* Удаление файла
	* @param {number} id
	* @returns {{}}
	*/
	deleteFile(id: number) {
		let queryUrl: string = `${this.apiUrl}/file/delete/${id}`;
		return this.httpClient.delete(queryUrl).map(responce => responce).catch(this.errorHandler);
	}
	
	/**
    *  Функция для отлова ошибок]
    * @param {HttpErrorResponse} error текст ошибки
    */

    private errorHandler(error: HttpErrorResponse) {
    	let message = error.error;

    	return Observable.throw(message);
    }
}

export const FILES_PROVIDERS: Array<any> = [
{provide : FilesService, useClass : FilesService},
{provide : FILES_API_URL, useValue : FILES_API_URL},
{provide : FILES_PATH_URL, useValue : FILES_PATH_URL}
];