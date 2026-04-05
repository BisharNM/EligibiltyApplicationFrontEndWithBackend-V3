package com.example.Eligibility.Application.Entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OlQualificationRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer olRuleId;

    private String olSubject;
    private String grade;
    private Boolean status;
    private Boolean isBucket;

    @ManyToOne
    @JoinColumn(name = "sub_course_id")
    @JsonBackReference
    private SubCourse subCourse;
}
