package kr.study.array;

import java.util.Arrays;

public class ArrayTest02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int max = Integer.MIN_VALUE;
		int min = Integer.MAX_VALUE; //
		
		int[]arr =  new int[10];
		//랜덤함수를 이용해서 배열 값넣기
		for(int i = 0; i < arr.length; i++) {
			arr[i] = (int)(Math.random()*100)+1;
			
			if (max < arr[i]){
				max = arr[i];
			}
			if (min > arr[i]){
				min = arr[i];
			}
			
			
		}
		
		//Arrays는 배열의 도우미 클래스 여러 기능들이 있다. loop를 돌리지 않아도 배열을 출력할 수 있다.
		
		System.out.println(Arrays.toString(arr));
		System.out.println("최소 : "+ min +", 최대 : "+ max);

	}

}
