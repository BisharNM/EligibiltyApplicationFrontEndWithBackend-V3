package com.example.Eligibility.Application.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Applicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer stuId;
    private String NICNumber;
    private String fullName;
    private LocalDate DOB;
    private Boolean  isMarried;
    private Integer courseId;
    private String courseName;
    private Integer subCourseId;
    private String subCourseName;
    private String selectedMedium;
    private Boolean Gender;

    private String status = "pending";
    private LocalDate appliedDate = LocalDate.now();
    private String ALYear;
    private String ZScore;
    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'Sinhala'")
    private String ALMedium ="Sinhala";
    private String ALSubject1;
    private Character ALSubject1Grade;
    private String ALSubject2;
    private Character ALSubject2Grade;
    private String ALSubject3;
    private Character ALSubject3Grade;
    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'Sinhala'")
    private String OLMedium ="Sinhala";
    private String fritsLanguageAndLiterature;
    private Character OLMediumGrade;
    private String Religion;
    private String ReligionGrade;
    private Character mathematics;
    private Character science;
    private Character english;
    private Character history;
    private String bucket1;
    private Character bucket1Grade;
    private String bucket2;
    private Character bucket2Grade;
    private String bucket3;
    private Character bucket3Grade;

    @JsonIgnore
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] characterCertificate;

    @JsonIgnore
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] healthCertificate;

    @OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdditionalQualification> additionalQualifications = new ArrayList<>();



}
