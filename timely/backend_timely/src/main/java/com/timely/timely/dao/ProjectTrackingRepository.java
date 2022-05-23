package com.timely.timely.dao;

import com.timely.timely.domain.ProjectTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTrackingRepository extends JpaRepository<ProjectTracking, Integer> {
}
