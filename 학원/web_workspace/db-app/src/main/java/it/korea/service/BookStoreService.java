package it.korea.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import it.korea.mapper.BookStoreMapper;
import it.korea.mapper.BookStoreMapperImpl;
import it.korea.vo.BookStoreVO;

public class BookStoreService {
	private BookStoreMapper mapper;
	
	public BookStoreService() {
		this.mapper = new BookStoreMapperImpl();
	}
	
	//도서 목록 전체 가져오기
	public List<BookStoreVO> getAllBookStore(){
		return mapper.getAllBookStore();
	}
	//도서 목록 한개 가져오기
	public BookStoreVO getBookStore() {
		Map<String, Object> param = new HashMap<>();
		param.put("bookId", "6");
		return mapper.getBookStore(param);
	}
}
