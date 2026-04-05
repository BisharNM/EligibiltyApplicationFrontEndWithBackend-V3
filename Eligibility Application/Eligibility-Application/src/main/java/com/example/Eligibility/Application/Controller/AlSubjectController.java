package com.example.Eligibility.Application.Controller;

import com.example.Eligibility.Application.Entity.AlSubject1;
import com.example.Eligibility.Application.Entity.AlSubject2;
import com.example.Eligibility.Application.Entity.AlSubject3;
import com.example.Eligibility.Application.Service.ALSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping( "api/v1/alsubejct")
public class AlSubjectController {

    @Autowired
    private ALSubjectService alSubjectService;

    @GetMapping("/Subject1")
    public List<AlSubject1> getAlsubject1(){
        return alSubjectService.getAllAlSubject1();
    }
    @GetMapping("/Subject2")
    public List<AlSubject2> getAlsubject2(){
        return alSubjectService.getAllAlSubject2();
    }
    @GetMapping("/Subject3")
    public List<AlSubject3> getAlsubject3(){
        return alSubjectService.getAllAlSubject3();
    }
    @PostMapping("/Subject1")
    public List<AlSubject1> saveAlsubject1(@RequestBody List<AlSubject1> alSubject1s){
        return alSubjectService.saveAllAlSubject1(alSubject1s);
    }
    @PostMapping("/Subject2")
    public List<AlSubject2> saveAlsubject2(@RequestBody List<AlSubject2> alSubject2s){
        return alSubjectService.saveAllAlSubject2(alSubject2s);
    }
    @PostMapping("/Subject3")
    public List<AlSubject3> saveAlsubject3(@RequestBody List<AlSubject3> alSubject3s){
        return alSubjectService.saveAllAlSubject3(alSubject3s);
    }
    @PutMapping("/Subject1")
    public List<AlSubject1> updateAlsubject1(@RequestBody List<AlSubject1> alSubject1s){
        return alSubjectService.updateAllAlSubject1(alSubject1s);
    }
    @PutMapping("/Subject2")
    public List<AlSubject2> updateAlsubject2(@RequestBody List<AlSubject2> alSubject2s){
        return alSubjectService.updateAllAlSubject2(alSubject2s);
    }
    @PutMapping("/Subject3")
    public List<AlSubject3> updateAlsubject3(@RequestBody List<AlSubject3> alSubject3s){
        return alSubjectService.updateAllAlSubject3(alSubject3s);
    }
    @DeleteMapping("/Subject1/{id}")
    public List<AlSubject1> deleteAlsubject1(@PathVariable int id){
        return alSubjectService.deleteAlSubject1(id);
    }
    @DeleteMapping("/Subject2/{id}")
    public List<AlSubject2> deleteAlsubject2(@PathVariable int id){
        return alSubjectService.deleteAlSubject2(id);
    }@DeleteMapping("/Subject3/{id}")
    public List<AlSubject3> deleteAlsubject3(@PathVariable int id){
        return alSubjectService.deleteAlSubject3(id);
    }
    @DeleteMapping("/Subject1")
    public void deleteAllSubject1() {
        alSubjectService.deleteAllSubject1();
    }
    @DeleteMapping("/Subject2")
    public void deleteAllSubject2() {
        alSubjectService.deleteAllSubject2();
    }
    @DeleteMapping("/Subject3")
    public void deleteAllSubject3() {
        alSubjectService.deleteAllSubject3();
    }


}
