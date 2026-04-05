package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.OlBucket1;
import com.example.Eligibility.Application.Entity.OlBucket2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OlBucket2Repository extends JpaRepository<OlBucket2, Integer> {}