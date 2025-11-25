package kr.study.anonymous;

public class ButtonMain {

	public static void main(String[] args) {
		
		Button login = new Button();
		
		//위와 아래 같은 기능
		//ButtonClickEvent = new LoginButton();
		//login.Click(LoginButton());
		
		//login.Click(new LoginButton());
		
		ButtonClickEvent loginEvt = new ButtonClickEvent() {
			
			@Override
			public void click() {
				System.out.println("로그인");
				
			}
		}; //마무리할때 세미콜론이 꼭 들어가야함
		
		login.click(loginEvt);
	}

}
