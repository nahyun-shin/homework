package kr.study.inter;

public class RemoteMain {

	public static void main(String[] args) {
		//인터페이스 - 클래스 관계의 경우
		//기능정의 - 기능 구현 관계가 많다.
		//그래서 객체 선언 시 인터페이스 a=new Class(); 관계로 선언하는 경우가 많다.
		
		RemoteControl remote = new LGRemote();
		remote.turnOn();
		remote.turnOff();

	}

}
