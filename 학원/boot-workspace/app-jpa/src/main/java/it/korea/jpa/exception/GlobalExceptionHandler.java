package it.korea.jpa.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import it.korea.jpa.util.ErrorAsciiArtUtil;
import it.korea.jpa.util.ErrorInfo;
import it.korea.jpa.util.JavaScriptErrorFormatter;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
public void handleAllExceptions(Exception ex) {
    ErrorInfo errorInfo = new ErrorInfo(500, ex.getMessage()); // 예외 정보를 JS와 유사하게 만듦
    System.out.println(JavaScriptErrorFormatter.consoleErrorMsg(errorInfo));
    logger.error("Unhandled Exception: ", ex);
}
}
