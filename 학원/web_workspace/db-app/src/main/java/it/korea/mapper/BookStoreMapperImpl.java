package it.korea.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import it.korea.config.MybatisConfig;
import it.korea.vo.BookStoreVO;

public class BookStoreMapperImpl implements BookStoreMapper{
	
	//세션 객체
	SqlSession session = null;
	//인터페이스 객체
	BookStoreMapper mapper =null;
	
	//생성자를 통한 객체 선언
	public BookStoreMapperImpl() {
		this.session = MybatisConfig.getSqlSessionFactory().openSession();
		//마이바티스 session과 연동된 매퍼 객체를 받는다.
		this.mapper =session.getMapper(BookStoreMapper.class);
	}
	
	@Override
	public List<BookStoreVO> getAllBookStore() {
		return mapper.getAllBookStore();
	}

	@Override
	public BookStoreVO getBookStore(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return mapper.getBookStore(param);
	}

}
