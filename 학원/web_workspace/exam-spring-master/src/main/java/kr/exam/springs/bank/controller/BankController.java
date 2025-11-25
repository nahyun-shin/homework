package kr.exam.springs.bank.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

import kr.exam.springs.bank.service.BankService;
import kr.exam.springs.bank.vo.Bank;

import kr.exam.springs.user.vo.Users;
import lombok.RequiredArgsConstructor;


@Controller
@RequestMapping("/bank")
@RequiredArgsConstructor

public class BankController {	
	
	  private final BankService service;
	
	@RequestMapping("/list.do")
	public ModelAndView bankListView(@RequestParam(name = "currentPage",
									defaultValue = "0")int currentPage) {
		ModelAndView view = new ModelAndView("bank/bankList");
		view.addObject("currentPage", currentPage);
		return view;
	}
	
	
	
	
	@ResponseBody
	@GetMapping("/list/data.do")
	public Map<String, Object> getListData(@RequestParam(name="currentPage",
	defaultValue = "0")int currentPage){
		Map<String, Object> dataMap = new HashMap<>();
		
		try {
			
			dataMap.put("currentPage", currentPage);
			dataMap = service.getBankList(dataMap);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return dataMap;
	}
	
	
	
	@GetMapping("/detail.do")
	public ModelAndView getBankDetailView(@RequestParam("accNum") String accNum,
	                                      @RequestParam("currentPage") int currentPage) {
	    ModelAndView view = new ModelAndView("bank/bankDetail");
	    Bank.Detail detail = null;
	    try {
	        detail = service.getBank(accNum);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    view.addObject("vo", detail);
	    view.addObject("currentPage", currentPage);

	    return view;
	}
	
	
	
	@PostMapping("/update.do")
	public ModelAndView  updateBank(@ModelAttribute Bank.Request request)  {
	
		int result = 0;
		String msg = "";
		
		ModelAndView view = new ModelAndView();
		view.setViewName("bank/result");
		try {
			
			result = service.updateBank(request);
			msg =  result > 0 ? "글이 수정되었습니다." : "글수정이 실패했습니다.";
					
		}catch (Exception e) {
			msg = "글수정 중에 오류가 발생했습니다.";
			e.printStackTrace();
		}finally {
			view.addObject("msg", msg);
		}
		
		
		return view;
	}
	
	
	
}

