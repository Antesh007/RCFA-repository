package com.sts.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.modal.Rcfamodal;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class RcfaController {
	
	@GetMapping("/login")
	public String handleTest()
	{
		return "Main.html";
	}
	
	@PostMapping("/rcfa/submitFile")
	@ResponseBody
	public Map<String, Object> submitFile(@ModelAttribute Rcfamodal rcfa, HttpServletRequest request) {
		
		
//		Map<String, Object> map = new HashMap<>();
		System.out.println("Working fine");
		
		return null;
	}
	
	

}
