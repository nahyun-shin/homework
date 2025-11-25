package kr.study.constructor;

public class MultiCastingExam {

	public static void main(String[] args) {
		//클래스 상속에서는 잘 사용하진 않지만 가끔 쓴다.
		
		Person em01 = new Employee();//부모타입으로 자식클래스를 선언
		
		//부모자식을 떠나서 그냥 어떤 객체를 본인 말고 다른 타입으로 선언하면
		//선언 할 때 지정한 클래스가 가진 기능 또는 변수만 사용 가능
		//예를 들어 emp가 가진salaray 나 company 는 사용 불가
		//Person 이 지닌 것만 가능
		//이유는 본질은 직장인이지만 대표 타입은 Person 이기 때문
		
		em01.setMyName("김똘똘");
		em01.setMygender("남자");
		
		//강제 형변환을 통한 타입 변경
		//본인이 가진 타입만 가능
		Employee me = (Employee)em01;
		
		me.setCompnay("코리아IT");
		me.setSalary("400만원");
		
		
		System.out.println(me);

	}

}
