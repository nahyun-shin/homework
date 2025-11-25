package it.korea.mapper;

import java.util.List;
import java.util.Map;

import it.korea.vo.BookStoreVO;

public interface BookStoreMapper {
	List<BookStoreVO> getAllBookStore();
	
	BookStoreVO getBookStore(Map<String, Object> param);
}
