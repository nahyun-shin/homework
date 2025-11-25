package it.korea.config;

import java.io.Reader;

import javax.management.RuntimeErrorException;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MybatisConfig {
	//커넥션 만드는 공장
	private static SqlSessionFactory SqlSessionFactory;
	
	//전역 선언  - 클래스가 최초 생성 될 때 1번 실행
	static {
		try {
			Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
			SqlSessionFactory = new SqlSessionFactoryBuilder().build(reader, "dev");	
		}catch (Exception e) {
			throw new RuntimeException("error initializing SqlSessionFactory :" + e.getMessage(), e);
		}
		
	}
	
	public static SqlSessionFactory getSqlSessionFactory() {
		return SqlSessionFactory;
	}
}
