package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.AdditionalQualification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdditionalQualificationRepository extends JpaRepository<AdditionalQualification, Long> {
    List<AdditionalQualification> findByApplicant_StuId(Integer stuId);
}