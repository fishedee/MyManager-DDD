package com.fishedee.mymanager_ddd.framework;

import com.fishedee.jpa_boost.CurdPageOffset;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class CurdAntdPageDTO {

    @NotNull
    @Min(1L)
    @Max(500L)
    private int current;

    @NotNull
    @Min(1L)
    @Max(1000L)
    private int pageSize;

    public CurdPageOffset getPageable() {
        return new CurdPageOffset((this.current-1)*this.pageSize, this.pageSize);
    }
}
