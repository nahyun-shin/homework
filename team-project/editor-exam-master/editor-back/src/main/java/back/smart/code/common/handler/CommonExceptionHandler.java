package back.smart.code.common.handler;


import back.smart.code.common.dto.ApiErrorResponse;
import back.smart.code.common.dto.ErrorCodeEnum;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class CommonExceptionHandler {
    /**
     * 메서드 파라메터 항목이 틀렸을 경우
     * @ReuqestBody 일 때 @Valid 를 통해서 에러 남
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("==== MethodArgumentNotValidException : {} ====", e.getMessage());
        List< ApiErrorResponse.FileError> filedErrors =
                e.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(ApiErrorResponse.FileError::error)
                        .toList();

        ApiErrorResponse apiErrorResponse = getApiErrorResponse(ErrorCodeEnum.INVALID_PARAMETER, filedErrors);

        return ResponseEntity
                .status(ErrorCodeEnum.INVALID_PARAMETER.getStatus())
                .body(apiErrorResponse);
    }

    /**
     *
     * @param e
     * @return
     */
    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<ApiErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
        log.error("==== ConstraintViolationException : {} ====", e.getMessage());
        List< ApiErrorResponse.FileError> filedErrors =
                e.getConstraintViolations()
                        .stream()
                        .map(ApiErrorResponse.FileError::error)
                        .toList();

        ApiErrorResponse apiErrorResponse = getApiErrorResponse(ErrorCodeEnum.INVALID_PARAMETER, filedErrors);

        return ResponseEntity
                .status(ErrorCodeEnum.INVALID_PARAMETER.getStatus())
                .body(apiErrorResponse);
    }

    /**
     * get > query String 방식에서 파라메터를 부여하지 않을 경우
     * @param e
     * @return
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    protected ResponseEntity<ApiErrorResponse>
    handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        log.error("==== MissingServletRequestParameterException : {} ====", e.getMessage());
        ApiErrorResponse.FileError fileError =
                ApiErrorResponse.FileError.error(e.getParameterName(), "",  e.getMessage());

        ApiErrorResponse apiErrorResponse =
                getApiErrorResponse(ErrorCodeEnum.INVALID_PARAMETER, List.of(fileError));

        return ResponseEntity
                .status(ErrorCodeEnum.INVALID_PARAMETER.getStatus())
                .body(apiErrorResponse);
    }


    private ApiErrorResponse  getApiErrorResponse(ErrorCodeEnum errorCodeEnum) {
        return ApiErrorResponse
                .error(errorCodeEnum.getErrorCode(), errorCodeEnum.getMessage());
    }


    private ApiErrorResponse  getApiErrorResponse(ErrorCodeEnum errorCodeEnum,
                                                  List<ApiErrorResponse.FileError> fileErrors) {

        return ApiErrorResponse
                .error(errorCodeEnum.getErrorCode(), errorCodeEnum.getMessage(), fileErrors);
    }

}
