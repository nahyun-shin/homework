package kr.study.loop2;

public class BreakTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int sum=0;
		//랜덤함수 이용
		//합이 50이 넘으면 종료
		for(int i =0; i<10; i++) {
			int rand =(int) (Math.random()*20)+1;
			sum +=rand;
			
			
			System.out.print(rand+"\t");
			if(sum > 50) {
				break; //현재 loop 종료
			}
		}
		
		System.out.println("\n"+sum);
	}

}
