package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicantRepository extends JpaRepository<Applicant, Integer> {
    boolean existsByNICNumber(String NICNumber);
}