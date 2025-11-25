package kr.study.two;

public class DoubleArrayTest01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int[][]arr01 = new int[5][5]; 
		int[][]arr02 = new int[5][];
		int[][]arr03 = {{1,2,3},{4,5,6,},{7,8,9}};
		
		//열을 비우고 만들었을 때는 사용전에
		//각 행에 대한 열을 만들어 줘야합니다.
		
		for(int i = 0; i < arr02.length; i++) {
			//2차배열은 각 1차배열에 각각의 2번째 배열이 있는 것
			arr02[i] = new int[5];
		}
		
		//2차배열에 값을 입력
		for (int i =0; i < arr01.length; i++) {
			for (int j=0; j<arr01[i].length; j++) {
				arr01[i][j] = (int)(Math.random()*50)+1;
				System.out.print(arr01[i][j]+" ");
			}
			System.out.println();
		}
		
		System.out.println("arr01 + "+arr01);
		System.out.println("arr01[0] + "+arr01[0]);
		System.out.println("arr01[0][1] + "+ arr01[0][1]);
		
		//프린트를 위해서만 짠 코딩
//		for (int i =0; i < arr01.length; i++) {
//			for (int j=0; j<arr01[i].length; j++) {
//				System.out.print(arr01[i][j]+" ");
//			}
//			System.out.println();
//		}

	}

}
