package com.example.Eligibility.Application.Controller;


import com.example.Eligibility.Application.Entity.AdditionalQualification;
import com.example.Eligibility.Application.Entity.Applicant;
import com.example.Eligibility.Application.Service.ApplicantService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/applicants")
public class ApplicantController {

    private final ApplicantService service;

    public ApplicantController(ApplicantService service) {
        this.service = service;
    }

    // -------- CRUD Applicant --------
    @GetMapping
    public List<Applicant> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Applicant getOne(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Applicant create(@RequestBody Applicant applicant) {
        return service.create(applicant);
    }

    @PutMapping("/{id}")
    public Applicant update(@PathVariable Integer id, @RequestBody Applicant applicant) {
        return service.update(id, applicant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // -------- Upload certificates (PDF) --------
    @PostMapping(value = "/{id}/character-certificate", consumes = "multipart/form-data")
    public Applicant uploadCharacter(@PathVariable Integer id,
                                     @RequestParam("file") MultipartFile file) throws Exception {
        return service.uploadCharacterCertificate(id, file);
    }

    @PostMapping(value = "/{id}/health-certificate", consumes = "multipart/form-data")
    public Applicant uploadHealth(@PathVariable Integer id,
                                  @RequestParam("file") MultipartFile file) throws Exception {
        return service.uploadHealthCertificate(id, file);
    }

    // -------- Additional qualifications --------

    @PostMapping("/{id}/additional/text")
    public AdditionalQualification addText(@PathVariable Integer id,
                                           @RequestParam String labelName,
                                           @RequestParam String valueText) {
        return service.addTextQualification(id, labelName, valueText);
    }

    @PostMapping("/{id}/additional/boolean")
    public AdditionalQualification addBool(@PathVariable Integer id,
                                           @RequestParam String labelName,
                                           @RequestParam Boolean valueBool) {
        return service.addBooleanQualification(id, labelName, valueBool);
    }

    @PostMapping(value = "/{id}/additional/file", consumes = "multipart/form-data")
    public AdditionalQualification addFile(@PathVariable Integer id,
                                           @RequestParam String labelName,
                                           @RequestParam("file") MultipartFile file) throws Exception {
        return service.addFileQualification(id, labelName, file);
    }
    @GetMapping("/{id}/character-certificate")
    public ResponseEntity<byte[]> viewCharacter(@PathVariable Integer id) {
        Applicant a = service.getById(id);

        if (a.getCharacterCertificate() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"character-certificate.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(a.getCharacterCertificate());
    }

    @GetMapping("/{id}/health-certificate")
    public ResponseEntity<byte[]> viewHealth(@PathVariable Integer id) {
        Applicant a = service.getById(id);

        if (a.getHealthCertificate() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"health-certificate.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(a.getHealthCertificate());
    }
    @PostMapping(value = "/{id}/certificates", consumes = "multipart/form-data")
    public Applicant uploadCertificates(
            @PathVariable Integer id,
            @RequestPart(value = "charCert", required = false) MultipartFile charCert,
            @RequestPart(value = "healthCert", required = false) MultipartFile healthCert
    ) throws Exception {
         service.uploadCharacterCertificate(id, charCert);
         return service.uploadHealthCertificate(id,healthCert);
    }
    @GetMapping("/{applicantId}/additional/{qualId}/file")
    public ResponseEntity<byte[]> viewAdditionalFile(@PathVariable Integer applicantId,
                                                     @PathVariable Long qualId) {

        AdditionalQualification aq = service.getAdditionalQualification(applicantId, qualId);

        if (aq.getFileData() == null) return ResponseEntity.notFound().build();

        String fileName = aq.getFileName() != null ? aq.getFileName() : "additional.pdf";
        String contentType = aq.getFileContentType() != null ? aq.getFileContentType() : "application/pdf";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(aq.getFileData());
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Applicant> updateStatus(
            @PathVariable Integer id,
            @RequestParam String status // "APPROVED" or "REJECTED"
    ) {
        Applicant app = service.getById(id);
        app.setStatus(status.toUpperCase()); // Ensure consistency
        Applicant updated = service.create(app); // Re-use your repository save
        return ResponseEntity.ok(updated);
    }
    // DELETE by Status (e.g. /api/applicants?status=PENDING)
// If status is "ALL", it deletes everything.
    @DeleteMapping
    public ResponseEntity<String> deleteByStatus(@RequestParam(required = false) String status) {
        if (status == null || status.equalsIgnoreCase("ALL")) {
            service.deleteAll(); // You need to implement this in service
            return ResponseEntity.ok("All applicants deleted.");
        } else {
            service.deleteByStatus(status.toUpperCase()); // Implement this
            return ResponseEntity.ok("Deleted all " + status + " applicants.");
        }
    }
}