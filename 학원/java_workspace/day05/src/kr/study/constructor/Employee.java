package kr.study.constructor;

public class Employee extends Person{
	
	private String compnay;
	private String salary;
	
	public Employee() {
		//안보이지만 자동으로 부모클래스 기본생성자 호출됨 super()
	
	}

	public Employee(String myName, String gender, String companu, String salary) {
		//부모클래스 생성자에 매개변수로 넣을 수 있는 애들
		//1 생성자가 가진 매개변수
		//2 static 변수 및 메서드 return 값
		super(myName, gender);// 부모클래스 생성자 호출
		//코드
		
		this.setCompnay(salary);
		this.setSalary(salary);
	}

	public String getCompnay() {
		return compnay;
	}

	public void setCompnay(String compnay) {
		this.compnay = compnay;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}
	
	
	public String toString() {
		String str = "이름 :"+this.getMyName()+",";
		str += "성별 : "+this.getMygender()+", ";
		str += "회사 : "+this.getCompnay()+", ";
		str += "월급 : "+this.getSalary();
		
		return str;
				
	}
	
	
}
