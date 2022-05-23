import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectTracking } from './project-tracking';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NgtimelyserviceService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<ProjectTracking[]>{
    return this._http.get<any>(`${environment.apiUrl}/project-tracking`);
  }

  getById(id: number): Observable<ProjectTracking>{
    return this._http.get<any>(`${environment.apiUrl}/project-tracking/${id}`);
  }

  start(project: ProjectTracking): Observable<ProjectTracking>{
    return this._http.post<any>(`${environment.apiUrl}/project-tracking/start`, project);
  }

  update(project: ProjectTracking): Observable<ProjectTracking>{
    return this._http.put<any>(`${environment.apiUrl}/project-tracking`, project);
  }

  delete(id: number): Observable<any>{
    return this._http.delete<any>(`${environment.apiUrl}/project-tracking/${id}`);
  }

}
