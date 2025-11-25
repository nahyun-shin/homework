package kr.study.stream.api;

import java.util.ArrayList;
import java.util.List;

public class FilterFunctionTest {

	public static void main(String[] args) {
//		Stream API는 collection framework에 들어있는 데이터를
//		함수형 인터페이스와 람다식을 이용하여 함수스타일을 모방하여
//		데이터를 처리하기 위한 기술
//		실제로 map filter 같은 기능은 함수형 프로그램인 자바스크립트의 주용기능
//		map과 filter는 중복하여 사용할 수 있다.
		
		
		List<Integer> list = new ArrayList<> (List.of(1,2,3,4,5,6,7,8,10));
		
//		filter는 말그대로 조건이 만족하는 값만 return해주는 기능이다.
//		filter 는 람다식의 결과가 true 또는 false로 나오도록 한다.
//		jdk11부터 리스트로 만드는 메서드는 toList()생김
		
		//2의 배수만 리스트로 출력
		List<Integer>result =
				list.stream()
				.filter(x-> x%2 == 0)
				.toList();
		
		System.out.println(result);
		
		
//		자체적으로 loop도 가능
		list.stream()
		.filter(x-> x%2 == 0)
		.forEach(x->System.out.print(x+", "));
//		
//		list.stream()
//		.filter(x-> x%2 == 0)
//		.forEach(x->System.out.print(x+""));
		System.out.println();
		
//		map 또는 filter는 영속적인 연산이 가능하다.
		List<String> list2 = new ArrayList<> (List.of("1","8","3","9","5","10"));
		
//		문자타입의 숫자를 리스트로 가지고 있을 때 형변환하여 해당값중 짝수만 가지는 리스트를 만들어 보아라
		result =
				list2.stream()
				.map(Integer::parseInt)
				.filter(x-> x%2 == 0)
				.toList();
		
		System.out.println(result);
		
	}

}
