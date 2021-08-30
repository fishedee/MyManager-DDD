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
public class CardDTO {
    @NotNull
    private Long userId;

    @NotBlank
    private String userName;

    @NotBlank
    private String bank;

    @NotBlank
    private String card;

    @NotNull
    private BigDecimal money;

    private String remark = "";
}
