package kr.study.loop;

public class forExam {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
//		int sum = 0;
//		
//		for(int i = 0; i <10; i++) {
//			int rand = (int)(Math.random()*50)+1;
//			
//			//짝수일때 출려과 더하기를 하면 됨.
//			if (rand %2==0) {
//				System.out.print(rand+"\t");
//				sum +=rand;
//			}
//		}
//		
//		//총 합
//		System.out.println("\n총 합 : "+sum);
		
		
		int sum = 0;
		
		for(int i=0; i<10; i++) {
			int random = (int)(Math.random()*101)+50;//50~150까지
			if (random % 2 == 1) {
				System.out.print(random+"\t");
				sum +=random;
			}
			
		}
		
		System.out.println("\n총 합 : "+sum);
		
	}

}
