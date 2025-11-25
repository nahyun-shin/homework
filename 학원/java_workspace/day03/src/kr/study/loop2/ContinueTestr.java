package kr.study.loop2;

public class ContinueTestr {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int sum=0;
		int count=0;
		for(int i =0; i<10; i++) { 										//i가 10번 반복 될 때까지 loop
			int rand =(int) (Math.random()*20)+1;						 //1~20까지의 숫자들로 구성되는 랜덤 공식
			count++; 													//랜덤 공식이 실행 될 때마다 count라는 변수가 1씩 증가하게 한다. (총 시도 횟수)
			if(rand %2==1) { 											//홀수면 실행 될 수 있도록 
				i--; 													//짝수의 수가 10번 나올때에만 더해져야 하기에 홀수가 나오면 다시 loop가 돌아갈 수 있도록 i의 값을 -1해준다.
				continue; 												//위와 같이 홀수가 나왔다면 위의 공식으로 실행 되고 홀수에 대한 실행문 출력 x
			}
			System.out.print(rand +"\t");								//짝수의 수가 나올 경우에는 출력하고 tab 출력
			sum += rand; 												//짝수의 총 출력 된 합계

		}
		System.out.println();
		System.out.println("시도횟수:"+count+",합"+sum);

	}
}