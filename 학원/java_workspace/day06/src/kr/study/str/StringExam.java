package kr.study.str;

import java.util.Arrays;

public class StringExam {

	public static void main(String[] args) {
		
		String str = "사과";
		String str2 = "Apple";
		
		//값을 비교 equals(비교대상)
		
		System.out.println(str.equals("사과"));
		System.out.println(str2.equals("Apple"));
		//equals는 대소문자까지 비교합니다.
		System.out.println(str2.equals("apple"));
		//대소문자는 무시하고 철자로만 비교
		System.out.println(str2.equalsIgnoreCase("apple"));
		
		
		
		
		
		
		//문자열 치환 replace / replaceAll
		//둘다 기능은 동일 단 replaceAll 이 정규표현식 사용이 가능함. (문자의 패턴)
		//정규표현식
		//원본은 변경되지 않는다.
		
		String str3 = "# 은 아침을 먹습니다.";
		System.out.println(str3.replaceAll("#", "민수"));
		System.out.println(str3);
		
		//정규식
		String str4 = "I1L2O3V4E5Y6O7U";
		
		System.out.println(str4.replaceAll("[0-9]", " ")); //숫자만 지우는것
		//System.out.println(str4.replaceAll("[^0-9]", " ")); //숫자가 아닌것만 지우는것
		
		
		
		
		
		
		
		
		//문자열을 지정된 범위만큼 자르기
		//substring(beginIndex); 시작위치부터 끝까지
		//substring(beginIndex, endIndex); beginIndex 부터 endIndex -1 까지
		String str5= "요즘 날씨가 매우 덥습니다. 일교차가 크니 감기에 조심하세요.";
		System.out.println(str5.substring(16));
		System.out.println(str5.substring(0,16));
		
		
		
		
		
		
		
		//format 기능 c 언어의 printf 랑 비슷하다.
		String exam = "오늘 온도는 %f 이고, %s 날씨는 매우 덥다.";
		String exam2 = "오늘 온도는 %2$.2f 이고, %1$s 날씨는 매우 덥다.";
		
		//실수 f는 고정으로 소수점 6자리
		//실수 소수점 자리는 .2f 식으로 표현하고 나머지는 반올림 처리
		System.out.println(String.format(exam, 30.21, "서울"));
		System.out.println(String.format(exam2, "서울",30.21 ));
		
		
		
		
		
		
		
		//배열 ->String 으로 변환
		String[] arr = {"사과","바나나","배"};
		String arrStr = String.join(",",arr);
		System.out.println("arry -> String : "+arrStr);
		
	 	//특정문자를 기준으로 문자열 -> 배열 split(delimeter);
		String[] fruits = arrStr.split(", ");
		System.out.println(Arrays.toString(fruits));
		
		
		//주의사항 따옴표 다음문단에 적어야 한다.
		//첫 글자를 기준으로 출력되기 때문에 기준점을 잘 잡아준다.
		String longStr = """ 
				문장을 한번에 여러줄 쓸 수 있어요
				최근 기능입니다.
				길게 한문장으로 쓸 수 있어요;
				""";
		
		System.out.println(longStr);
		
	}

}
