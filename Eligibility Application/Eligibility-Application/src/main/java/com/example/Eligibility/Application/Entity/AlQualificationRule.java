package com.example.Eligibility.Application.Entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlQualificationRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer alRuleId;

    private String alSubject;
    private String grade; // A, B, C, S
    private Boolean status; // True = Compulsory

    @ManyToOne
    @JoinColumn(name = "sub_course_id")
    @JsonBackReference
    private SubCourse subCourse;
}
