package kr.study.sorting;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

public class ArraySortTest {

	public static void main(String[] args) {
		
		//만약 배열을 Arrays를 사용해서 sort 할려면 wrapper 클래스 타입을 쓰는게 좋다.
		//이유는 내림차순 때문임..
		//Arrays는 Collections 보고 만들어서 오름차순 괜찮은데 내림차순은 클래스 타입 데이터를 사용함
		Integer[] arr = {10, 1, 9, 8, 6, 3,2,7,5,4,}; //wrapper타입으로 선언해야 아래를 사용할 수 있다.
		
		
		//arrays 를 이용한 오름차순
		Arrays.sort(arr);
		System.out.println(Arrays.toString(arr));
		
		
		//내림차순
		Arrays.sort(arr, Comparator.reverseOrder());
		Arrays.sort(arr, Collections.reverseOrder());
		System.out.println(Arrays.toString(arr));
	}

}
