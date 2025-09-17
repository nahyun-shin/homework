package it.korea.app_boot.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    @GetMapping("/login")
    public ModelAndView loginView(){
        ModelAndView view = new ModelAndView();
        view.setViewName("views/user/loginForm");

        return view;
    }

    @GetMapping("/login/error")
    public ModelAndView loginErrorView(@RequestParam (value = "msg")String msg) {
        ModelAndView view = new ModelAndView();
        view.addObject("msg", msg);
        view.setViewName("views/user/error");
        return view;
    }
    
    
    
}
