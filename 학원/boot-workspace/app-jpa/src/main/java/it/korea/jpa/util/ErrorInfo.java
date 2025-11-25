package it.korea.jpa.util;

public class ErrorInfo {
    public int code;
    public String message;

    public ErrorInfo(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
