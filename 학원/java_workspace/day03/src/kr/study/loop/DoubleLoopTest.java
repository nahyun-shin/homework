package kr.study.loop;

public class DoubleLoopTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//구구단을 2~9단까지 만들어보자

		for(int i=2; i<10; i++) {
			for(int j=1; j<10; j++) {
				System.out.print(i+"X"+j+"="+(i*j)+"\t");
			}
			//줄을 바꾼다
			System.out.println();
		}
	}

}
