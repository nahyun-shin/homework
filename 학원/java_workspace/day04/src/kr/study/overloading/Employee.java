package kr.study.overloading;

public class Employee {
	//private으로 선언하는 이유는 외부에서만이 아니라 내부에서도 이용해 setter와 getter를 통해서 데이터를 넣고 꺼내기 위해
	private String myName;
	private String company;
	private String salary;
	
	//기본생성자
	public Employee() {}
	
	//생성자 오버로딩
	//생성자를 통해서 객체의 데이터를 받는다
	public Employee(String myName, String company, String salary) {
		this.setCompany(company);
		this.setMyName(myName);
		this.setSalary(salary);
	}

	public String getMyName() {
		return myName;
	}

	public void setMyName(String myName) {
		this.myName = myName;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}
	
	
	
	
	

}
