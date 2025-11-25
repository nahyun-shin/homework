package kr.study.loop2;

public class WhileLoopTest02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int i = 0;
		
		
		
		while(i < 7) {
			for(int j = 0; j<(i+1); j++) {
				System.out.print("*");
			}
			
			System.out.println();
			i++;
		}
	}

}
