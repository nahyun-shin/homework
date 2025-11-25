package kr.study.loop;

public class DoubleLoopTest03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//이중 루프를 이용해서 지각 삼각형을 *을 이용하여 만들어보자
		
		//j는 진행하면서 +1 만큼 반복횟수가 매번 증가
		
		for(int i=1; i<=7; i++) {
			for(int j=0; j<i; j++) {
				System.out.print("*");
			}
			System.out.println();

		}

	}
}