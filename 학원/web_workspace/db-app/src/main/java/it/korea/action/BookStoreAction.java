package it.korea.action;

import java.util.List;

import it.korea.service.BookStoreService;
import it.korea.vo.BookStoreVO;

public class BookStoreAction {

	public static void main(String[] args) {
		BookStoreService service = new BookStoreService();
		List<BookStoreVO> list = service.getAllBookStore();
		for(BookStoreVO vo:list) {
			StringBuilder sb = new StringBuilder();
			
			sb.append("아이디 : ").append(vo.getBookId());
			sb.append(", 도서명 : ").append(vo.getBookName());
			sb.append(", 카테고리 : ").append(vo.getGenre());
			sb.append(", 가격 : ").append(vo.getPrice());
			
			System.out.println(sb.toString());
		}
		System.out.println("=================================================");
		
		BookStoreVO store = service.getBookStore();
		
		StringBuilder sb = new StringBuilder();
		
		sb.append("아이디 : ").append(store.getBookId());
		sb.append(", 도서명 : ").append(store.getBookName());
		sb.append(", 카테고리 : ").append(store.getGenre());
		sb.append(", 가격 : ").append(store.getPrice());
		
		System.out.println(sb.toString());

	}

}
