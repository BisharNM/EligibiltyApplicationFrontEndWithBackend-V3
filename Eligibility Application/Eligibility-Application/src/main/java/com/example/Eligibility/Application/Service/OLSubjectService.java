package com.example.Eligibility.Application.Service;

import com.example.Eligibility.Application.Entity.OlBucket1;
import com.example.Eligibility.Application.Entity.OlBucket2;
import com.example.Eligibility.Application.Entity.OlBucket3;
import com.example.Eligibility.Application.Repo.OlBucket1Repository;
import com.example.Eligibility.Application.Repo.OlBucket2Repository;
import com.example.Eligibility.Application.Repo.OlBucket3Repository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OLSubjectService {

    @Autowired
    private OlBucket1Repository olBucket1Repository;
    @Autowired
    private OlBucket2Repository olBucket2Repository;
    @Autowired
    private OlBucket3Repository olBucket3Repository;

    public List<OlBucket1> getAllBucket1(){
        return olBucket1Repository.findAll();
    }
    public List<OlBucket2> getAllBucket2(){
        return olBucket2Repository.findAll();
    }
    public List<OlBucket3> getAllBucket3(){
        return olBucket3Repository.findAll();
    }
    public List<OlBucket1> saveAllBucket1(List<OlBucket1> olBucket1s ){
        return olBucket1Repository.saveAll(olBucket1s);
    }
    public List<OlBucket2> saveAllBucket2(List<OlBucket2> olBucket2s){
        return olBucket2Repository.saveAll(olBucket2s);
    }
    public List<OlBucket3> saveAllBucket3(List<OlBucket3> olBucket3s){
        return olBucket3Repository.saveAll(olBucket3s);
    }
    public List<OlBucket1> updateAllBucket1(List<OlBucket1> olBucket1s ){
        return olBucket1Repository.saveAll(olBucket1s);
    }
    public List<OlBucket2> updateAllBucket2(List<OlBucket2> olBucket2s){
        return olBucket2Repository.saveAll(olBucket2s);
    }
    public List<OlBucket3> updateAllBucket3(List<OlBucket3> olBucket3s){
        return olBucket3Repository.saveAll(olBucket3s);
    }
    public List<OlBucket1> deleteBucket1(int id){
        olBucket1Repository.deleteById(id);
        return olBucket1Repository.findAll();
    }
    public List<OlBucket2> deleteBucket2(int id){
        olBucket2Repository.deleteById(id);
        return olBucket2Repository.findAll();
    }
    public List<OlBucket3> deleteBucket3(int id){
        olBucket3Repository.deleteById(id);
        return olBucket3Repository.findAll();
    }
    public void deleteAllBucket1(){
        olBucket1Repository.deleteAll();
    }
    public void deleteAllBucket2(){
        olBucket2Repository.deleteAll();
    }
    public void deleteAllBucket3(){
        olBucket3Repository.deleteAll();
    }

}
