package com.example.Eligibility.Application.Entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subCourseId;

    private String subCourseName;
    private String mediumLanguage;

    @ManyToOne

    @JoinColumn(name = "course_id")
    @JsonBackReference // Child side - prevents infinite loop
    private Course course;

    // 1. Academic Rules (One-to-Many)
    @OneToMany(mappedBy = "subCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference

    private List<AlQualificationRule> alRules;

    @OneToMany(mappedBy = "subCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference

    private List<OlQualificationRule> olRules;

    // 2. Qualification Counts (One-to-One)
    @OneToOne(mappedBy = "subCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference

    private QualificationCount qualificationCount;

    // 3. Dynamic Form Config (One-to-Many)
    @OneToMany(mappedBy = "subCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference

    private List<AdditionalQualConfig> additionalConfigs;
}
