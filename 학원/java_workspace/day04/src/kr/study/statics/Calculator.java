package kr.study.statics;

public class Calculator {
	
	//상수 - 바뀌지 않는 값 상수를 만들때에는 public으로 만듬 접근제한을 두지않음
	//상수는 모든 문자를 대문자로 표현
	//음절은 언더마(_)를 사용하여 이어 쓴다.
	public static final double PI = 3.14;
	
	
	//일반변수 또는 메서드는 static 메서드에서 사용하지 못함.
	//static은 메모리에 바로 올라가는데 인스턴스는 class안에 있는 변수이기 때문에 언제 메모리에 올라갈지 몰라서 사용하지 못함.
	//private int r;
	
	
	public static double getCircleWidth(int r) {
		return (r*r)*3.14;
	}
	
	
}
