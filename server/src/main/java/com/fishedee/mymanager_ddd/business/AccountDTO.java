package com.fishedee.mymanager_ddd.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long userId;

    private String userName;

    @NotBlank
    private String name;

    @Min(0)
    private BigDecimal money;

    @NotNull
    private Long categoryId;

    @NotBlank
    private String categoryName;

    @NotNull
    private Long cardId;

    @NotBlank
    private String cardName;

    private Account.Type type;

    private String remark = "";
}
