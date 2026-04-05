package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.AlSubject1;
import com.example.Eligibility.Application.Entity.AlSubject2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlSubject1Repository extends JpaRepository<AlSubject1, Integer> {}