package com.sannong.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.model.LineInfo;
import com.sannong.model.SearchCondition;
import com.sannong.model.Ticket;
import com.sannong.service.ITicketService;

@Controller
public class IndexController {

	@Autowired
	ITicketService ticketService;

	private static final Logger LOG = Logger.getLogger(IndexController.class);

	@RequestMapping(value = "index", method = RequestMethod.GET)
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("================");
		Map<String, Object> models = new HashMap<String, Object>();
		List<Ticket> tickets = ticketService.getTickets();
		models.put("tickets", tickets);
		LOG.debug("This is a log test");
		return new ModelAndView("index", models);
	}
}
