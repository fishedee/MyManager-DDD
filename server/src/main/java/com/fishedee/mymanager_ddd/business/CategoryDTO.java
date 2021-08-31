package com.fishedee.mymanager_ddd.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long userId;

    private String userName;

    @NotBlank
    private String name;

    private String remark = "";
}
