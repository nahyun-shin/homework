package it.korea.app_boot.common.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class TimeFormatUtils {

    private static final String DATETIME_FORMAT ="yyyy-MM-dd HH:mm:ss";
    
    public static String getDateTime(){
       return LocalDateTime.now().format(DateTimeFormatter.ofPattern(DATETIME_FORMAT));
    }
    public static String getDateTime(LocalDateTime time){
        return time.format(DateTimeFormatter.ofPattern(DATETIME_FORMAT));
    }
}
