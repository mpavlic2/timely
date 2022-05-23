package com.timely.timely.service;

import com.timely.timely.dao.ProjectTrackingRepository;
import com.timely.timely.domain.ProjectTracking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectTrackingService {

    @Autowired
    private ProjectTrackingRepository projectTrackingRepository;

    public List<ProjectTracking> getAll(){
        return projectTrackingRepository.findAll();
    }

    public ProjectTracking startNewProject(){
        ProjectTracking startedProject = new ProjectTracking(null, LocalDateTime.now(), null);
        return projectTrackingRepository.save(startedProject);
    }

    public Optional<ProjectTracking> getById(int id){
        return projectTrackingRepository.findById(id);
    }

    public ProjectTracking update(ProjectTracking timelyProject){
        try{
            ProjectTracking updatingTimelyProject = projectTrackingRepository.getReferenceById(timelyProject.getId());

            LocalDateTime timeEndDate = LocalDateTime.now();
            updatingTimelyProject.setProjectName(timelyProject.getProjectName().equals("") ? null : timelyProject.getProjectName());
            updatingTimelyProject.setEndDate(timeEndDate);
            updatingTimelyProject.setDuration(updatingTimelyProject.getDuration());
            projectTrackingRepository.save(updatingTimelyProject);
            return timelyProject;
        }catch (Exception e){
            return timelyProject;
        }
    }

    public void deleteById(int id) {
        if(getById(id).isPresent()){
            projectTrackingRepository.deleteById(id);
        } else {
            throw  new RuntimeException("Not a valid ID:" + id);
        }
    }

}
