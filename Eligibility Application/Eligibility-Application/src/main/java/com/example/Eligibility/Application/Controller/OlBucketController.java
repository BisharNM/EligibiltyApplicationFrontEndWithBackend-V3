package com.example.Eligibility.Application.Controller;

import com.example.Eligibility.Application.Entity.OlBucket1;
import com.example.Eligibility.Application.Entity.OlBucket2;
import com.example.Eligibility.Application.Entity.OlBucket3;
import com.example.Eligibility.Application.Service.OLSubjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("olsubejct/")
public class OlBucketController {
    
    @Autowired
    private OLSubjectService olBucketService;
    
    @GetMapping("Subject1")
    public List<OlBucket1> getOlBucket1(){
        return olBucketService.getAllBucket1();
    }
    @GetMapping("Subject2")
    public List<OlBucket2> getOlBucket2(){
        return olBucketService.getAllBucket2();
    }
    @GetMapping("Subject3")
    public List<OlBucket3> getOlBucket3(){
        return olBucketService.getAllBucket3();
    }
    @PostMapping("Subject1")
    public List<OlBucket1> saveOlBucket1(@RequestBody List<OlBucket1> OlBucket1s){
        return olBucketService.saveAllBucket1(OlBucket1s);
    }
    @PostMapping("Subject2")
    public List<OlBucket2> saveOlBucket2(@RequestBody List<OlBucket2> OlBucket2s){
        return olBucketService.saveAllBucket2(OlBucket2s);
    }
    @PostMapping("Subject3")
    public List<OlBucket3> saveOlBucket3(@RequestBody List<OlBucket3> OlBucket3s){
        return olBucketService.saveAllBucket3(OlBucket3s);
    }
    @PutMapping("Subject1")
    public List<OlBucket1> updateOlBucket1(@RequestBody List<OlBucket1> OlBucket1s){
        return olBucketService.updateAllBucket1(OlBucket1s);
    }
    @PutMapping("Subject2")
    public List<OlBucket2> updateOlBucket2(@RequestBody List<OlBucket2> OlBucket2s){
        return olBucketService.updateAllBucket2(OlBucket2s);
    }
    @PutMapping("Subject3")
    public List<OlBucket3> updateOlBucket3(@RequestBody List<OlBucket3> OlBucket3s){
        return olBucketService.updateAllBucket3(OlBucket3s);
    }
    @DeleteMapping("Subject1/{id}")
    public List<OlBucket1> deleteOlBucket1(@PathVariable int id){
        return olBucketService.deleteBucket1(id);
    }
    @DeleteMapping("Subject2/{id}")
    public List<OlBucket2> deleteOlBucket2(@PathVariable int id){
        return olBucketService.deleteBucket2(id);
    }@DeleteMapping("Subject3/{id}")
    public List<OlBucket3> deleteOlBucket3(@PathVariable int id){
        return olBucketService.deleteBucket3(id);
    }
    @DeleteMapping("Subject1")
    public void deleteAllOlBucket1(){
         olBucketService.deleteAllBucket1();
    }
    @DeleteMapping("Subject2")
    public void deleteAllOlBucket2(){
        olBucketService.deleteAllBucket2();
    }
    @DeleteMapping("Subject3")
    public void deleteAllOlBucket3(){
        olBucketService.deleteAllBucket3();
    }
    
    
}
