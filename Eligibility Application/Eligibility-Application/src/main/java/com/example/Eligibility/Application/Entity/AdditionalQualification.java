package com.example.Eligibility.Application.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdditionalQualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // link to Applicant
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stu_id", nullable = false)
    private Applicant applicant;

    // store label name (or better: store configId + join to AdditionalQualConfig)
    @Column(nullable = false)
    private String labelName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdditionalValueType valueType;

    // For TEXT input
    @Column(columnDefinition = "TEXT")
    private String valueText;

    // For checkbox/radio boolean
    private Boolean valueBool;

    // For FILE (PDF) upload
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] fileData;

    private String fileName;        // "certificate.pdf"
    private String fileContentType; // "application/pdf"
}