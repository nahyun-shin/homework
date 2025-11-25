package kr.study.array;

public class ArrayTest01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//c언어는 방에 있는 쓰레기 값을 초기화해주어야 하지만 java는 auto 초기화가 되어 있어서 0으로 되어 있음
		int[] arr01 = new int[5];
		int[] arr02 = {1,2,3,4,5};//선언 시에만 가능
		
		//배열은 만들되 공간을 주지 않은 경우...근데 배열은 거의 이렇게 안씀.
		int[] arr03 = null; 
		
		//값 넣기
		arr01[0] = 1;
		arr01[1] = 10;
		//loop 이용
		for(int i = 0; i< arr01.length; i++) {
			arr01[i] = (int)(Math.random()*30)+1;
		}
		
		for(int i = 0; i< arr01.length; i++) {
			System.out.print(arr01[i]+",");
		}
		
		System.out.println("\n arr01=" + arr01); //배열의 주소(진짜 주소는 아니지만 주소라고 해도 틀리지 않음 16진수)

	}

}
