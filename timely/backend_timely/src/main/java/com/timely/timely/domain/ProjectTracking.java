package com.timely.timely.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
// @Data is lombok annotation that automatically generates getters/setters
@Data
public class ProjectTracking {
    @Id
    @GeneratedValue(strategy = AUTO)
    private int id;
    private String projectName;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime startDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime endDate;

    long duration;

    public ProjectTracking(){
    }

    public ProjectTracking(String projectName, LocalDateTime startDate, LocalDateTime endDate){
        this.projectName = projectName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public long getDuration(){
        if(Objects.nonNull(startDate) && Objects.nonNull(endDate)){
            return Duration.between(startDate, endDate).toMillis();
        }
        return 0;
    }

    public void setDuration(long duration){
        this.duration = duration;
    }
}
