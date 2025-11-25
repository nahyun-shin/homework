package sh.manage.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import sh.manage.data.Student;
import sh.manage.store.FileStores;

public class ManageService {
	private Scanner scan;
	private FileStores store;
	private List<Student>list;
	
	/*
	 * 생성자에서 객체 선언 하는 이유는
	 * service를 사용할 때 메모리에 올리기 위해서
	 * 서비스 사용전에는 정의만 해놓는데 이때는 메모리에
	 * 등록되지는 않는다.
	 */
	
	public ManageService() {
		scan = new Scanner(System.in);
		store = new FileStores();
		list =new ArrayList<>();
		

		
	}
	
	private void initData() throws Exception{
		list = store.getAllList();
	}
	
	public void start() {
		try {
			
			int menu;
			System.out.println("================================");
			System.out.println("|                              |");
			System.out.println("|        학 생 관 리 프로그램       |");
			System.out.println("|                              |");
			System.out.println("================================");
			
			//미리 학생 리스트 가져오기
			initData();
			
			//레이블을 사용하면 밖의 루프를 종료 할 수 있다.
			loop:
				while(true) {
				
					try {
						menu = this.getMenu();
						switch(menu) {
						case 1:
							this.newStudent();
							break;
						case 2:
							printAllStudent();
							break;
						case 3:
							searchStudent();
							break;
						case 4:
							deleteStudent();
							break;
							
						case 5:
							System.out.println("프로그램이 종료됩니다.");
							break loop;
							//프로그램 강제종료
						}
					}catch (Exception e) {
						scan.nextLine();
						System.out.println(e.getMessage() == null ?"키 입력 오류":e.getMessage());
						}
					
				}
				
		}catch (Exception e) {
			//에러메시지가 없으면 기본메시지를 출력하고있다면 에러메시지 출력
			System.out.println(e.getMessage() == null ?"에러!!":e.getMessage());
		}
	}
	//메뉴선택
	private int getMenu() throws Exception{
		int menu = 0;
		System.out.println("===============================");
		System.out.println("1.등록 2.전체목록 3.검색 4.삭제 5.종료");
		System.out.println("===============================");
		
		menu = scan.nextInt();
		scan.nextLine();
		return menu;
		
	}
	//학생등록
	private void newStudent() throws Exception{
		
		Student st = new Student();
		System.out.println("등록 할 학생 이름 : ");
		st.setMyName(scan.nextLine());
		System.out.println("등록 할 학생 국어");
		st.setKor(scan.nextInt());
		System.out.println("등록 할 학생 영어");
		st.setEng(scan.nextInt());
		System.out.println("등록 할 학생 수학");
		st.setMath(scan.nextInt());
		
		list.add(st);
		store.writeStudent(list);
		
		
	}
	
	
	//학생정보조회
	private void printAllStudent() throws Exception{
		if (list == null ||list.size()==0) {
			System.out.println("학생 정보가 존재하지 않습니다.");
			return;// 이건 데이터 리턴이 아니다. 여기서 종료 평서문의 break와 같다.
		}
		for(Student st : list) {
			System.out.println(st);
		}
	}
	
	
	
	
	
	private void searchStudent() throws Exception{
		if (list == null ||list.size()==0) {
			System.out.println("학생 정보가 존재하지 않습니다.");
			return;// 이건 데이터 리턴이 아니다. 여기서 종료 평서문의 break와 같다.
		}
		
		System.out.println("검색할 이름 : ");
		String searchName = scan.nextLine();
		
		//동명의 학생이 있을 수 있으니 리스트에 저장한다.
		List<Student> searchStd = new ArrayList<>();
		
		
		for(Student st : list) {
			if(st.getMyName().equals(searchName)) {
				searchStd.add(st);
			}
		}
		if(searchStd.size()==0) {
			System.out.println("찾는 이름의 학생이 없습니다.");
			return;
		}
		for(Student st : searchStd) {
			System.out.println(st);
		}
	}
	
	private void deleteStudent() throws Exception{
		if (list == null ||list.size()==0) {
			System.out.println("학생 정보가 존재하지 않습니다.");
			return;// 이건 데이터 리턴이 아니다. 여기서 종료 평서문의 break와 같다.
		}
		
		System.out.println("삭제할 이름 : ");
		String searchName = scan.nextLine();
		
		//동명의 학생이 있을 수 있으니 리스트에 저장한다.
		List<Student> searchStd = 
				list.stream()
				.filter(std ->std.getMyName().equals(searchName))
				.collect(Collectors.toList());//고칠 수 있음 toList() 못고침..버려..
		
		
		
		if(searchStd == null||searchStd.size()==0) {
			System.out.println("삭제할 이름의 학생이 없습니다.");
			return;
		}
		list.removeAll(searchStd);
		//파일 업데이트
		store.writeStudent(list);
		System.out.println(searchName+"이름의 학생이 삭제되었습니다.");
	}
}
