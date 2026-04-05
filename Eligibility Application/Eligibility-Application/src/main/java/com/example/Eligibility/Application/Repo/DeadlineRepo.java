package com.example.Eligibility.Application.Repo;

import com.example.Eligibility.Application.Entity.Deadline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeadlineRepo extends JpaRepository<Deadline , Integer> {


}
