package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.SubCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCourseRepository extends JpaRepository<SubCourse, Integer> {}