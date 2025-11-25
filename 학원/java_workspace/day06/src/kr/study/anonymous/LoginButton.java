package kr.study.anonymous;

public class LoginButton implements ButtonClickEvent { //같은 클래스와 인터페이스가 아니므로 implements를 사용

	@Override
	public void click() {
		System.out.println("로그인!");
		
	}
	
}
