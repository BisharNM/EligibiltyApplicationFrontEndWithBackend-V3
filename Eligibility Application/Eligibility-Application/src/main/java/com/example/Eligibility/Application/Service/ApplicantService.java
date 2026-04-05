package com.example.Eligibility.Application.Service;


import com.example.Eligibility.Application.Entity.AdditionalQualification;
import com.example.Eligibility.Application.Entity.AdditionalValueType;
import com.example.Eligibility.Application.Entity.Applicant;
import com.example.Eligibility.Application.Repo.AdditionalQualificationRepository;
import com.example.Eligibility.Application.Repo.ApplicantRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicantService {

    private final ApplicantRepository applicantRepo;
    private final AdditionalQualificationRepository addRepo;

    public ApplicantService(ApplicantRepository applicantRepo, AdditionalQualificationRepository addRepo) {
        this.applicantRepo = applicantRepo;
        this.addRepo = addRepo;
    }

    public List<Applicant> getAll() {
        return applicantRepo.findAll();
    }

    public Applicant getById(Integer id) {
        return applicantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found: " + id));
    }

    public Applicant create(Applicant applicant) {
        if (applicant.getALMedium()==null){
            applicant.setALMedium("Sinhala");
        }
        if(applicant.getOLMedium()==null){
            applicant.setOLMedium("Sinhala");
        }
        // link child rows to parent
        if (applicant.getAdditionalQualifications() != null) {
            for (AdditionalQualification aq : applicant.getAdditionalQualifications()) {
                aq.setApplicant(applicant);
            }
        }
        return applicantRepo.save(applicant);
    }

    public Applicant update(Integer id, Applicant payload) {
        Applicant db = getById(id);

        // update fields (you can extend this list as needed)
        db.setNICNumber(payload.getNICNumber());
        db.setFullName(payload.getFullName());
        db.setDOB(payload.getDOB());
        db.setIsMarried(payload.getIsMarried());
        db.setGender(payload.getGender());

        db.setALYear(payload.getALYear());
        db.setZScore(payload.getZScore());
        db.setALMedium(payload.getALMedium());
        db.setALSubject1(payload.getALSubject1());
        db.setALSubject1Grade(payload.getALSubject1Grade());
        db.setALSubject2(payload.getALSubject2());
        db.setALSubject2Grade(payload.getALSubject2Grade());
        db.setALSubject3(payload.getALSubject3());
        db.setALSubject3Grade(payload.getALSubject3Grade());

        db.setOLMedium(payload.getOLMedium());
        db.setFritsLanguageAndLiterature(payload.getFritsLanguageAndLiterature());
        db.setReligion(payload.getReligion());
        db.setReligionGrade(payload.getReligionGrade());
        db.setMathematics(payload.getMathematics());
        db.setScience(payload.getScience());
        db.setEnglish(payload.getEnglish());
        db.setHistory(payload.getHistory());

        db.setBucket1(payload.getBucket1());
        db.setBucket1Grade(payload.getBucket1Grade());
        db.setBucket2(payload.getBucket2());
        db.setBucket2Grade(payload.getBucket2Grade());
        db.setBucket3(payload.getBucket3());
        db.setBucket3Grade(payload.getBucket3Grade());

        // Replace additional qualifications list (orphanRemoval=true will delete removed ones)
        db.getAdditionalQualifications().clear();
        if (payload.getAdditionalQualifications() != null) {
            for (AdditionalQualification aq : payload.getAdditionalQualifications()) {
                aq.setApplicant(db);
                db.getAdditionalQualifications().add(aq);
            }
        }

        return applicantRepo.save(db);
    }

    public void delete(Integer id) {
        applicantRepo.delete(getById(id));
    }

    // -------- PDF uploads (recommended approach) --------

    public Applicant uploadCharacterCertificate(Integer id, MultipartFile file) throws Exception {
        Applicant db = getById(id);
        validatePdf(file);
        db.setCharacterCertificate(file.getBytes());
        return applicantRepo.save(db);
    }

    public Applicant uploadHealthCertificate(Integer id, MultipartFile file) throws Exception {
        Applicant db = getById(id);
        validatePdf(file);
        db.setHealthCertificate(file.getBytes());
        return applicantRepo.save(db);
    }

    public AdditionalQualification addTextQualification(Integer applicantId, String labelName, String valueText) {
        Applicant applicant = getById(applicantId);

        AdditionalQualification aq = new AdditionalQualification();
        aq.setApplicant(applicant);
        aq.setLabelName(labelName);
        aq.setValueType(AdditionalValueType.TEXT);
        aq.setValueText(valueText);

        return addRepo.save(aq);
    }

    public AdditionalQualification addBooleanQualification(Integer applicantId, String labelName, Boolean valueBool) {
        Applicant applicant = getById(applicantId);

        AdditionalQualification aq = new AdditionalQualification();
        aq.setApplicant(applicant);
        aq.setLabelName(labelName);
        aq.setValueType(AdditionalValueType.BOOLEAN);
        aq.setValueBool(valueBool);

        return addRepo.save(aq);
    }

    public AdditionalQualification addFileQualification(Integer applicantId, String labelName, MultipartFile file) throws Exception {
        Applicant applicant = getById(applicantId);
        validatePdf(file);

        AdditionalQualification aq = new AdditionalQualification();
        aq.setApplicant(applicant);
        aq.setLabelName(labelName);
        aq.setValueType(AdditionalValueType.FILE);
        aq.setFileData(file.getBytes());
        aq.setFileName(file.getOriginalFilename());
        aq.setFileContentType(file.getContentType());

        return addRepo.save(aq);
    }

    private void validatePdf(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new RuntimeException("File is empty");
        String ct = file.getContentType();
        if (ct == null || !ct.equalsIgnoreCase("application/pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }
    }
    public AdditionalQualification getAdditionalQualification(Integer applicantId, Long qualId) {
        AdditionalQualification aq = addRepo.findById(qualId)
                .orElseThrow(() -> new RuntimeException("AdditionalQualification not found: " + qualId));

        if (!aq.getApplicant().getStuId().equals(applicantId)) {
            throw new RuntimeException("This file does not belong to applicant " + applicantId);
        }
        return aq;
    }
    public void deleteAll() {
        applicantRepo.deleteAll();
    }

    public void deleteByStatus(String status) {
        // 1. Fetch All
        List<Applicant> allApps = applicantRepo.findAll();

        // 2. Filter in Java (Case Insensitive)
        List<Applicant> targets = allApps.stream()
                .filter(a -> {
                    // Handle nulls safely
                    if (a.getStatus() == null) return false;
                    return a.getStatus().equalsIgnoreCase(status);
                })
                .collect(Collectors.toList());

        // 3. Delete
        if (!targets.isEmpty()) {
            applicantRepo.deleteAll(targets);
        }
    }
}