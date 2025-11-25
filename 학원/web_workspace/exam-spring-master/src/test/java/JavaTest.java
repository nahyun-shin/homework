import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import kr.exam.springs.bank.mapper.BankMapper;
import kr.exam.springs.bank.service.BankService;
import kr.exam.springs.bank.vo.Bank;



@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = {
	    "file:src/main/webapp/WEB-INF/spring/root-context.xml", 
	    "file:src/main/webapp/WEB-INF/spring/servlet-context.xml"
})
@Transactional
@Rollback
public class JavaTest {
	@Autowired
	BankService service;
	
	@Autowired
	BankMapper mapper;
	
	@BeforeEach
	void setUp() throws Exception{
		
	}
	@Test
	void testGetBoardList() throws Exception {
		//given
		Map<String, Object> param =new HashMap<>();
		param.put("currentPage", 0);
		//when
		Map<String, Object> result = service.getBankList(param);
		List<Bank.Response> list = (List<Bank.Response>)result.get("dataList");
		//then
		assertNotNull(result);
		assertNotNull(list);
		
		
	}
		
	
}
