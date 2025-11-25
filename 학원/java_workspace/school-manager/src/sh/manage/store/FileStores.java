package sh.manage.store;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import sh.manage.data.Student;

public class FileStores {
	
	private final String FILE_NAME ="student.txt";//
	
	//학생 리스트 가져오기
	public List<Student> getAllList() throws Exception{
		List<Student> list = new ArrayList<>();
		//파일 존재 유무 확인.
		if(!isFileCheck()) {
			throw new FileNotFoundException("파일 없음");
		}
		//Reader사용
		try(FileReader r = new FileReader(FILE_NAME);
			BufferedReader br = new BufferedReader(r);){
			String line = "";
			
			while((line = br.readLine())!=null) {
				//한줄에 띄어쓰기로 구분하여 넣어져 있을 것. 그래서 띄어쓰기로 자른다.
				//순서는 이름 국어 영어 수학 총점 평균 순으로 들어있따고 가정하자.
				String[] arr = line.split(" ");
				Student st = new Student();
				st.setMyName(arr[0]);
				//String->정수타입 int변환
				st.setKor(Integer.parseInt(arr[1]));
				st.setEng(Integer.parseInt(arr[2]));
				st.setMath(Integer.parseInt(arr[3]));
				
				list.add(st);
			}
			
		}catch (Exception e) {
			System.out.println("파일 읽기 실패!!");
		}
		return list;
	}
	
	public void writeStudent(List<Student> list) throws Exception{
		if(list == null) {
			throw new NullPointerException("학생 리스트가 존재하지 않음");
		}
		try(FileWriter w = new FileWriter(FILE_NAME);
				BufferedWriter bw = new BufferedWriter(w);){
			
			for(Student st : list) {
				
				bw.write(st.getMyName()+" ");
				bw.write(st.getEng()+" ");
				bw.write(st.getKor()+" ");
				bw.write(st.getMath()+"\n");
			}
			
			System.out.println("학생정보 저장이 완료되었습니다.");
			
		}catch (Exception e) {
			
			System.out.println("파일 쓰기 실패");
		}
	}
	/**
	 * 파일이 존재하는지 확인하는 메서드
	 * 해당 메서드는 외부노출이 필요없기 때문에 private
	 * @return
	 */
	
	
	private boolean isFileCheck() {
		return new File(FILE_NAME).exists();
	}
}
