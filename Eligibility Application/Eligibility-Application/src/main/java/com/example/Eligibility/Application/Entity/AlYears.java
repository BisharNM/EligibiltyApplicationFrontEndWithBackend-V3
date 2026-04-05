package com.example.Eligibility.Application.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AlYears {

    @Id
    private Integer id;
    private String firstAlYear;
    private String secondAlYear;
}
