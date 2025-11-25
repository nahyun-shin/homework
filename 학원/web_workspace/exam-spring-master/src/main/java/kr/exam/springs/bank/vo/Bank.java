package kr.exam.springs.bank.vo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;

import kr.exam.springs.bank.vo.Bank;
import lombok.Data;

public class Bank {
	
	
	@Data
	public static class Request {
		private String accNum;
		private String accName;
		private int balance;
		private String useYN;
		
		
	}
	
	@Data
	public static class Response{
		private String accNum;
		private String accName;
		private int balance;
		
		private String useYN;
		
		
		
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
		private LocalDateTime createDate;

		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
		private LocalDateTime updateDate;
		
		
		
		
		
	}
	
	@Data
	public static class Detail{
		private String accNum;
		private String accName;
		private int balance;
		private String useYN;
		private LocalDateTime createDate;
	    private LocalDateTime updateDate;
	}
	
}
