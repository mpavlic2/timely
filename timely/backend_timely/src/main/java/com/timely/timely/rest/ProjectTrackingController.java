package com.timely.timely.rest;

import com.timely.timely.domain.ProjectTracking;
import com.timely.timely.service.ProjectTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping(value = "project-tracking")
public class ProjectTrackingController {

    @Autowired
    private ProjectTrackingService projectTrackingService;

    @GetMapping()
    public List<ProjectTracking> getAll(){
        // takes all projects and sorts them according to start date
        return projectTrackingService.getAll().stream()
                                     .sorted(Comparator.comparing(ProjectTracking :: getStartDate).reversed())
                                     .collect(Collectors.toList());
    }

    @PostMapping("/start")
    public ProjectTracking start(){
        return projectTrackingService.startNewProject();
    }

    @GetMapping("/{id}")
    public ProjectTracking getById(@PathVariable("id") int id){
        return projectTrackingService.getById(id).orElse(null);
    }

    @PutMapping()
    public ProjectTracking edit(@RequestBody ProjectTracking project){
        return projectTrackingService.update(project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
         projectTrackingService.deleteById(id);
    }

}
