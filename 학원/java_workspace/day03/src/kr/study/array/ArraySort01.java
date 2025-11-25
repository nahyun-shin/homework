package kr.study.array;

import java.util.Arrays;

public class ArraySort01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int[]arr = {5,1,9,10,4,3,8,6,7,2};
		
		//임시변수
		int temp;
		
		for(int i=0; i< arr.length; i++) {
			for(int j =0; j<(arr.length-i)-1; j++) {
				if(arr[j] > arr[j+1]) {
					//앞과 뒤의 값 위치 변경
					temp = arr [j+1];
					arr[j+1] = arr[j];
					arr[j]= temp;
				}
			}
		}
		
		System.out.println(Arrays.toString(arr));
	}
	
	

}
