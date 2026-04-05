package com.example.Eligibility.Application.Service;


import com.example.Eligibility.Application.Entity.AlSubject1;
import com.example.Eligibility.Application.Entity.AlSubject2;
import com.example.Eligibility.Application.Entity.AlSubject3;
import com.example.Eligibility.Application.Repo.AlSubject1Repository;
import com.example.Eligibility.Application.Repo.AlSubject2Repository;
import com.example.Eligibility.Application.Repo.AlSubject3Repository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ALSubjectService {

    @Autowired
    private AlSubject1Repository alSubject1Repository;
    @Autowired
    private AlSubject2Repository alSubject2Repository;
    @Autowired
    private AlSubject3Repository alSubject3Repository;

    public List<AlSubject1> getAllAlSubject1(){
        return alSubject1Repository.findAll();
    }
    public List<AlSubject2> getAllAlSubject2(){
        return alSubject2Repository.findAll();
    }
    public List<AlSubject3> getAllAlSubject3(){
        return alSubject3Repository.findAll();
    }
    public List<AlSubject1> saveAllAlSubject1(List<AlSubject1> AlSubject1s ){
        return alSubject1Repository.saveAll(AlSubject1s);
    }
    public List<AlSubject2> saveAllAlSubject2(List<AlSubject2> AlSubject2s){
        return alSubject2Repository.saveAll(AlSubject2s);
    }
    public List<AlSubject3> saveAllAlSubject3(List<AlSubject3> AlSubject3s){
        return alSubject3Repository.saveAll(AlSubject3s);
    }
    public List<AlSubject1> updateAllAlSubject1(List<AlSubject1> AlSubject1s ){
        return alSubject1Repository.saveAll(AlSubject1s);
    }
    public List<AlSubject2> updateAllAlSubject2(List<AlSubject2> AlSubject2s){
        return alSubject2Repository.saveAll(AlSubject2s);
    }
    public List<AlSubject3> updateAllAlSubject3(List<AlSubject3> AlSubject3s){
        return alSubject3Repository.saveAll(AlSubject3s);
    }
    public List<AlSubject1> deleteAlSubject1(int id){
        alSubject1Repository.deleteById(id);
        return alSubject1Repository.findAll();
    }
    public List<AlSubject2> deleteAlSubject2(int id){
        alSubject2Repository.deleteById(id);
        return alSubject2Repository.findAll();
    }
    public List<AlSubject3> deleteAlSubject3(int id){
        alSubject3Repository.deleteById(id);
        return alSubject3Repository.findAll();
    }
    public void deleteAllSubject1() {
        alSubject1Repository.deleteAll();
    }
    public void deleteAllSubject2() {
        alSubject2Repository.deleteAll();
    }
    public void deleteAllSubject3() {
        alSubject3Repository.deleteAll();
    }

}
