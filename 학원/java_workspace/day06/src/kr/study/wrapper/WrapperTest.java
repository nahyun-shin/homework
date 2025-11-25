package kr.study.wrapper;

public class WrapperTest {

	public static void main(String[] args) {
		//Integer
		Integer num = 10;
		Integer num02 = Integer.valueOf(10);
		
		//형변환
		Integer num03 = Integer.valueOf("10");
		Integer num04 = Integer.parseInt("10");
		
		Double duVal = Double.valueOf("30.11");
		Double duVal02 = Double.parseDouble("30.11");
		
		//char 배열 -> String
		char[] chArr= {'h','e','l','l','o'};
		
		String str = String.valueOf(chArr);
		
		//비교
		//wrapper 클래스는 String을 제외하고 동등비교(==)가 가능하지만
		//정확한 비교를 위하여 동등비교는 하지 않는다.
		System.out.println(num.equals(num02));
		System.out.println(num.intValue()==num02.intValue());
		

	}

}
