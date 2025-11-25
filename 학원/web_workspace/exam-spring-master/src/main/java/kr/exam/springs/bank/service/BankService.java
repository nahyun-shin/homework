package kr.exam.springs.bank.service;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import kr.exam.springs.bank.mapper.BankMapper;
import kr.exam.springs.bank.vo.Bank;
import kr.exam.springs.bank.vo.Bank.Detail;
import kr.exam.springs.common.page.PageVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BankService {
	
	private final BankMapper mapper;
	
	
	public Map<String, Object> getBankList(Map<String, Object> param) throws Exception {
	    Map<String, Object> map = new HashMap<>();
	    int currentPage = (int) param.get("currentPage");
	    
	    int total = mapper.getBankTotal();
	    PageVO pageVO = new PageVO();
	    pageVO.setData(currentPage, total);
	    
	    List<Bank.Response> bankList = new ArrayList<>();
	    if (total > 0) {
	        param.put("offSet", pageVO.getOffSet());
	        param.put("count", pageVO.getCount());
	        bankList = mapper.getBankList(param);
	    }
	    
	    map.put("currentPage", currentPage);
	    map.put("dataList", bankList);
	    map.put("total", total);
	    map.put("pageHTML", pageVO.pageHTML());
	    
	    return map;
	}
	/**
	 * 상세화면 데이터 가져오기 
	 * @param brdId
	 * @return
	 * @throws Exception
	 */
	public Bank.Detail getBankDetail(String accNum) throws Exception {
	    return mapper.getBank(accNum);
	}
	
	@Transactional(
		    rollbackFor = Exception.class,
		    propagation = Propagation.REQUIRED,
		    isolation = Isolation.READ_COMMITTED
		)
		public int updateBank(Bank.Request request) throws Exception {
		    Bank.Detail detail = mapper.getBank(request.getAccNum());
		    
		    detail.setBalance(request.getBalance());
		    detail.setUseYN(request.getUseYN());
		    
		    int result = mapper.updateBank(detail);
		    
		    if (result == 0) {
		        throw new RuntimeException("계좌 수정 실패: 영향 받은 행이 없습니다.");
		    }
		    
		    return result;
		}
	
	
	public Detail getBank(String accNum) throws Exception {
		
		return mapper.getBank(accNum);
	}
	
}
