package com.example.Eligibility.Application.Entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AlSubject1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
}
// Repeat for AlSubject2, OlBucket1, etc.
