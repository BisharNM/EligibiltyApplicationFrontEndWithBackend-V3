package com.example.Eligibility.Application.Entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdditionalQualConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer configId;

    private String inputLabel;
    private String inputType; // text, radio, file
    private String fileCountLimit; // "1", "ANY"

    @ManyToOne
    @JoinColumn(name = "sub_course_id")
    @JsonIgnore
    @JsonBackReference
    private SubCourse subCourse;
}
