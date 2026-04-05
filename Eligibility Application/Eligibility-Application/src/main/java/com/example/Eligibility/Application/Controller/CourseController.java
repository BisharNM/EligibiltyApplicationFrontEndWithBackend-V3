
package com.example.Eligibility.Application.Controller;

import com.example.Eligibility.Application.Entity.AlYears;
import com.example.Eligibility.Application.Entity.Course;
import com.example.Eligibility.Application.Entity.Deadline;
import com.example.Eligibility.Application.Repo.AlYearsRepo;
import com.example.Eligibility.Application.Repo.DeadlineRepo;
import com.example.Eligibility.Application.Service.CourseManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("Courses/")
@CrossOrigin
public class CourseController {
    @Autowired
    private CourseManagementService courseManagementService;
    @Autowired
    private DeadlineRepo deadlineRepo;
    @Autowired
    private AlYearsRepo alYearsRepo;

    @GetMapping()
    public List<Course> getCourses(){
        return courseManagementService.getAllCourses();
    }
    @PostMapping
    public Course saveCourse(@RequestBody Course course){
        return courseManagementService.saveCourse(course);

    }
    @PutMapping
    public Course upadteCourse(@RequestBody Course course){
        return courseManagementService.upadteCourse(course);

    }


    @GetMapping("deadline")

    public Optional<Deadline> getDeadline(){
        return deadlineRepo.findById(1);
    }
    @PostMapping("deadline")
    public Deadline saveDeadline(@RequestBody Deadline deadline){
        deadline.setId(1);
        return deadlineRepo.save(deadline);
    }
    @DeleteMapping("deadline")
    public void deleteDeadline( ){
        deadlineRepo.deleteAll();
    }

    @GetMapping("AlYears")
    public Optional<AlYears> getAlYears(){return alYearsRepo.findById(1);}

    @PostMapping("AlYears")
    public AlYears saveAlyears(@RequestBody  AlYears alYears){
        alYears.setId(1);
        return alYearsRepo.save(alYears);
    }
    @DeleteMapping("AlYears")
    public void deleteAlYears(){
        alYearsRepo.deleteAll();
    }
    // Inside CourseController class

    @DeleteMapping("{id}")
    public void deleteCourse(@PathVariable Integer id) {
        courseManagementService.deleteCourse(id);
    }
    @DeleteMapping
    public void deleteAllCourses() {
        courseManagementService.deleteAllCourses();
    }
}
