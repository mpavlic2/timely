import { Component, OnInit, Input } from '@angular/core';
import { NgtimelyserviceService } from '../ngtimelyservice.service';
import {Router} from '@angular/router';
import { ProjectTracking } from '../project-tracking';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-timelyprojectlist',
  templateUrl: './timelyprojectlist.component.html',
  styleUrls: ['./timelyprojectlist.component.css']
})
export class TimelyprojectlistComponent implements OnInit {

  projects: Array<ProjectTracking> = [];
  public pageSlice = this.projects.slice(0, 3);
  public numberOfProjects: number = 0;
  pass = false;
  project = new ProjectTracking(0, "", 0);
  closeResult = '';
  private current_id = '';
  startingIndex: number = 0;
  endingIndex: number = 3;

  constructor(private _route: Router, private _service: NgtimelyserviceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProjectList();
  }

  loadProjectList(){
    this._service.getAll().subscribe(
      data => {
        this.projects = data;
        this.numberOfProjects = data.length;
        this.pageSlice = data.slice(this.startingIndex, this.endingIndex);
      }
    )
  }

  onStartNewProject() {
    this._service.start(this.project).subscribe(
      data =>{
        console.log("Project started!" + data);
        this.project = data;
        this.loadProjectList();
      },
      error => console.log(error)
    )
    this.pass = true;
  }

  onStopNewProject(){
    this.project.projectName = ((document.getElementById("projectNameBinding") as HTMLInputElement).value);
    // otvoriti window da upise podatke za projekt
    this._service.update(this.project).subscribe(
      data =>{
        this.loadProjectList();
      },
      error => {
        console.log("Error");
      }
    )
    this.pass = false;
  }

  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.numberOfProjects){
      endIndex = this.numberOfProjects + 1;
    }
    this.startingIndex = startIndex;
    this.endingIndex = endIndex;
    this.pageSlice = this.projects.slice(startIndex, endIndex);
  }

  goToDismissedModalWindow(){
    this.pass = true;
  }

  goToDismissedModalWindowRevert(){
    this.pass = false;
  }

  projectNameBinding = '';
  onRequestForModalWindow(project: ProjectTracking){
    this._service.getById(project.id).subscribe(
      data => {
        this.project = data;
        this.projectNameBinding = data.projectName;
      }
    )
  }

  onDeleteProject(){
      this._service.delete(this.project.id).subscribe(
        data => {
          this.loadProjectList();
        },
         error => {
           console.log("Ne brise dobro");
          }
      )
  }

  projNameBeautify(projName: string): string{
    if(projName != null){
      return projName;
    }
    return "...";
  }

  convertTimeMS(timeMS: number): string {
    if(timeMS != (null || 0)){
      const seconds = Math.floor(timeMS / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
    
      let str: string = '';
    
      if(hours > 0) {
        str = str + hours.toString() + 'h ';
      }
      if(minutes%60 > 0) {
        str = str + Number(minutes%60).toString() + 'm ';
      }
      if(seconds%60 > 0) {
        str = str + Number(seconds%60).toString() + 's ';
      }
      return str;
    }
  return "..."
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
