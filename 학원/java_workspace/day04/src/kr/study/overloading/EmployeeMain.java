package kr.study.overloading;

public class EmployeeMain {

	public static void main(String[] args) {
		//기본 생성자를 통한 객체 선언
		Employee em01 = new Employee();
		
		em01.setMyName("김홍도");
		em01.setCompany("홍도컴퍼니");
		em01.setSalary("500만원");
		
		
		//생성자를 통한 데이터 주입
		
		Employee em02 = new Employee("김철수", "카카오", "450만원");
		
		System.out.println("이름 : "+ em01.getMyName() + ", 회사 : "+ em01.getCompany()+ ", 월금 : "+em01.getSalary());
		System.out.println("이름 : "+ em02.getMyName() + ", 회사 : "+ em02.getCompany()+ ", 월금 : "+em02.getSalary());
		
		


	}

}
