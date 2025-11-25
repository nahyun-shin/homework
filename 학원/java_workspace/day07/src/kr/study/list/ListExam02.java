package kr.study.list;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class ListExam02 {
	public static void add(int... scores) {
		int sum = 0;
		for(int s:scores) {
			sum +=s;
		}
	}

	public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		Random rand = new Random();
		
		for(int i =0; i<10; i++) {
			list.add(rand.nextInt(50)+1);
		}
		
		System.out.println("리스트 값 : "+list);
		System.out.println("10 이 존재하는가? : "+list.contains(10));
		
		//sort
		//일반 데이터 sort는 쉽습니다.
		//오름차순
		Collections.shuffle(list);
		System.out.println("shuffle 후 리스트 값 : "+list);
		
		//최대값
		int max = Collections.max(list);
		System.out.println("최대 값 : "+max);
		
		//버블정렬할 때 필요한 기능
		Collections.swap(list, 0, 1);
		System.out.println("swap 후 리스트 값 : "+list);
		
		//오름차순
		Collections.sort(list);
		System.out.println("오름차순 정렬 후 리스트 값 : "+list);
		
		// 오름 차순 후 reverse(); - 단점 원본은 유지 / 먼저 오름차순 정렬을 해야함
		list = list.reversed();
		System.out.println("reversed 후 리스트 값 : "+list.reversed());
		
		
		//진짜 내림차순
		Collections.sort(list, Collections.reverseOrder());
		System.out.println("내림차순 후 리스트 값 : "+list);
		
		
		
		
		
		
		List<Integer> list1 = List.of(1,2,10,11,20,30,45);
		List<Integer> list2 = List.of(1,2,12,11,22,33,45);
		
		List<Integer> intersection = new ArrayList<>(list1);
		
		//교집합 만들기(로또 당첨 숫자 골라낼때)
		intersection.retainAll(list2);
		System.out.println("대상 1 : "+list1);
		System.out.println("대상 2 : "+list2);
		System.out.println("교집합 : "+intersection);
		
		
		
		
	}

}
