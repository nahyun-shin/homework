package it.back.back_app.common.dto;


import it.back.back_app.common.utils.TimeFormatUtils;
import lombok.Getter;

@Getter
public class ApiResponse<T> {

    private String date;
    private int status;
    private T response;

    public ApiResponse(int status, T response) {
        this.status = status;
        this.response = response;
        this.date = TimeFormatUtils.getDateTime();
    }

    public static <T> ApiResponse<T> ok(T response) {
        return new ApiResponse<>(200, response);
    }

    public static <T> ApiResponse<T> error(String message) {
    return new ApiResponse<>(400, null);  // response는 null 처리
}



   
}
