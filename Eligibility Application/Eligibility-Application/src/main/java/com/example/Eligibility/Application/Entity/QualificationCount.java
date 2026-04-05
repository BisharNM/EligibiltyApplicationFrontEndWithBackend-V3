package com.example.Eligibility.Application.Entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QualificationCount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer countId;

    private Integer alSubjectCount;
    private Integer olSubjectCount;

    @OneToOne
    @JoinColumn(name = "sub_course_id")
    @JsonBackReference
    private SubCourse subCourse;
}