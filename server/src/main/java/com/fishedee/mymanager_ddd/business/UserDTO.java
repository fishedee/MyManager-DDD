package com.fishedee.mymanager_ddd.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @NotBlank
    private String name;

    @NotNull
    private User.Role roles;

    @NotNull
    private String remark = "";

    @NotNull
    private User.IsEnabeld isEnabled;
}
