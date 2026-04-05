package com.example.Eligibility.Application.Service;



import com.example.Eligibility.Application.Entity.*;
import com.example.Eligibility.Application.Repo.CourseRepository;
import com.example.Eligibility.Application.Repo.SubCourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseManagementService {

    @Autowired private CourseRepository courseRepo;


    // --- COURSE CRUD ---
    public List<Course> getAllCourses() { return courseRepo.findAll(); }

    public Course saveCourse(Course course) {
        List<SubCourse> subCourses = course.getSubCourses();
        for (SubCourse subCourse :subCourses ){
            if(subCourse.getAlRules()!=null){
                for(AlQualificationRule alQualificationRule: subCourse.getAlRules()){
                    alQualificationRule.setSubCourse(subCourse);
                }
            }
            if(subCourse.getOlRules()!=null){
                for(OlQualificationRule olQualificationRule: subCourse.getOlRules()){
                    olQualificationRule.setSubCourse(subCourse);
                }
            }
            if(subCourse.getAdditionalConfigs()!=null){
                for(AdditionalQualConfig additionalQualConfig :subCourse.getAdditionalConfigs()){
                    additionalQualConfig.setSubCourse(subCourse);
                }
            }
            if(subCourse.getQualificationCount()!=null){
                subCourse.getQualificationCount().setSubCourse(subCourse);
            }
            subCourse.setCourse(course);
        }

        return courseRepo.save(course);
    }

    public Course upadteCourse(Course course) {

        List<SubCourse> subCourses = course.getSubCourses();
        for (SubCourse subCourse :subCourses ){
            if(subCourse.getAlRules()!=null){
                for(AlQualificationRule alQualificationRule: subCourse.getAlRules()){
                    alQualificationRule.setSubCourse(subCourse);
                }
            }
            if(subCourse.getOlRules()!=null){
                for(OlQualificationRule olQualificationRule: subCourse.getOlRules()){
                    olQualificationRule.setSubCourse(subCourse);
                }
            }
            if(subCourse.getAdditionalConfigs()!=null){
                for(AdditionalQualConfig additionalQualConfig :subCourse.getAdditionalConfigs()){
                    additionalQualConfig.setSubCourse(subCourse);
                }
            }
            if(subCourse.getQualificationCount()!=null){
                subCourse.getQualificationCount().setSubCourse(subCourse);
            }
            subCourse.setCourse(course);
        }

        return courseRepo.save(course);
    }

    public void deleteCourse(Integer id) { courseRepo.deleteById(id); }
    
    public void deleteAllCourses() {
        courseRepo.deleteAll();
    }





}
