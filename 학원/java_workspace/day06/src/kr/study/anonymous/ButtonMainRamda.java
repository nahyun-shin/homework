package kr.study.anonymous;

public class ButtonMainRamda {
	public static void main(String[] args) {

		Button login = new Button();

		

		ButtonClickEvent loginEvt = () -> System.out.println("로그인");
		 

		login.click(loginEvt);
		
		//결론적으로 아래로 가능
		
		//login.click(() -> System.out.println("로그인"));
	}

}
