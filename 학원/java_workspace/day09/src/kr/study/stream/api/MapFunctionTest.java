package kr.study.stream.api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class MapFunctionTest {

	public static void main(String[] args) {
		
		
		
		
		
		
		
		
		
		
		List<Integer> list = new ArrayList<> (List.of(1,2,3,4,5,6));
		//리스트에 있는 각각의 값에 2씩 더하여 저장하라.
		//stream api 원본은 건들지 않습니다.
		//데이터의 흐름을 보여주는 api기술이라서 원본은 유지
		//그래서 변형시킨list를 다른 변수를 만들어서 저장해야함.
		
		//map함수 -> for문과 유사합니다.
		//Collections.sort(list, "comparator를 상속받아서 comapre를 루현한 자식 또는 compre가 구현된 comparator 익명클래스");
		
		//함수형인터페이스 익명클래스
		//sort가 원하는 결과를 함수로 넣어준건데 o1.intValue() > o2.intValue()비교시 맞으면1, 아니면 -1
		//map은 함수에 매개변수를 줌
		Collections.sort(list, (o1, o2)->o1.intValue() > o2.intValue() ? 1:-1);
		
		System.out.println(list);
		//map 함수는 반복을 돌면서 매개 변수인 함수형 인터페이스에게
		//값을 하나씩 전달한다.
		//map이 매개변수로 사용하는 함수형 인터페이스는
		//매개변수의 타이비과, 리턴타입을 다르게 설정할 수 있다.
		//map 함수를 사용하여 결과를 받는 왼쪽 left value의 타입에 따라
		//map함수의 매개변수로 가지는 함수형 인터페이스의 return 타입도 결정된다.
		List<Integer> newList = 
				list.stream()
				//상자를 뜯지 않고(원본은 유지한채) 뚜껑을 열어서 각각의 숫자를 알려줌. 그리고 list에게 적은 숫자를 다시 박스를 만들어 준다.
				.map(val -> val*2)
				.collect(Collectors.toList());
		
		
//		System.out.println(newList);
//		
//		List<Integer> newList2 = 
//				list.stream()
//				//상자를 뜯지 않고(원본은 유지한채) 뚜껑을 열어서 각각의 숫자를 알려줌. 그리고 list에게 적은 숫자를 다시 박스를 만들어 준다.
//				.map(val -> val*2)
//				.collect(Collectors.toList());
//		
//		
//		System.out.println(newList2);
		
		
		
		
		
		
		
		
		
		
		
		
		
		List<String> list2 = new ArrayList<> (List.of("1","8","3","9","5","10"));
		
		//문자타입의 숫자데이터를 가지는 list의 값들을 int 타입으로 변형하여,
		//int 타입의 list에 저장하라.
		List<Integer>intList = new ArrayList<Integer>();
		
//		for(String val : list2) {
//			intList.add(Integer.parseInt(val));
//		}
		
		//stream api의 map함수를 이요해보자.
		
		intList = list2.stream()
				.map(str -> Integer.parseInt(str))
				.collect(Collectors.toList());
		
		System.out.println(list2);
		
		
		
		
		
		
		
		
		
		
		
		
		
		List<String> list3 = new ArrayList<> (List.of("1","8","1","9","1","10"));
		
//		map 함수가 사용하는
//		람다식 항상 동일한 메서드를 호출 할 경우
//		메서드 참조문법을 사용 가능하다.
//		호출되는 메서드의 형태(매서드가 지닌 매개 변수)가 항상 동일할 때 가능
		
		intList = list3.stream()
				//뒤에있는 parseInt함수가 static일때에만 가능 앞에가 class면 뒤는 다 static.
				.map(Integer::parseInt)
				.collect(Collectors.toList());
		
		
		System.out.println(list3);
		
				
		
	}

}
