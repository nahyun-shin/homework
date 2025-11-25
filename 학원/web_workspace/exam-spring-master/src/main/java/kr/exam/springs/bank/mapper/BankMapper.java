package kr.exam.springs.bank.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.exam.springs.bank.vo.Bank;


@Mapper
public interface BankMapper {
	/**
	 * 게시글 전체 개수
	 * @return
	 */
	int getBankTotal();
	
	
	/**
	 * 게시글 리스트 가져오기 
	 * @param param
	 * @return
	 */
	List<Bank.Response> getBankList(Map<String, Object> param);
	
	//게시글 상세
	Bank.Detail getBank(@Param("accNum") String accNum);
	
	//게시글 수정
		int updateBank(Bank.Detail detail);
		
}
