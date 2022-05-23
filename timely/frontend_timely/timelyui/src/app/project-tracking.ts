export class ProjectTracking {
    public id: number;
    public projectName: string;
    public startDate!: Date;
    public endDate!: Date;
    public duration: number;

    constructor(id: number, projectName: string, duration: number){
        this.id = id;
        this.projectName = projectName;
        this.duration = duration;
    }
}
