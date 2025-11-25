package kr.study.time;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeTest {

	public static void main(String[] args) {
		
		LocalDateTime now = LocalDateTime.now();
		
		System.out.println(now);
		
		LocalDateTime time01 = LocalDateTime.parse("2025-06-01 10:50:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		LocalDateTime time02 = LocalDateTime.parse("2025-06-10 15:50:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		System.out.println(time01);
		
		
		System.out.println("연도 : "+ now.getYear());
		System.out.println("월(숫자) : "+ now.getMonthValue());
		System.out.println("월(영어) : "+ now.getMonth());
		System.out.println("일 : "+ now.getDayOfMonth());
		System.out.println("시 : "+ now.getHour());
		System.out.println("분 : "+ now.getMinute());
		System.out.println("초 : "+ now.getSecond());
		System.out.println("365일 중 몇 일 : "+ now.getDayOfYear());
		
		
		LocalDate date = now.toLocalDate();
		LocalTime localTime = now.toLocalTime();
		
		//다시 연/월/일 시분초
		LocalDateTime merge = LocalDateTime.of(date, localTime);
		System.out.println(merge);
		
		
	}

}
