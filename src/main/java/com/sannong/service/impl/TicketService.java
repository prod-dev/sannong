package com.sannong.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sannong.dao.ITicketDao;
import com.sannong.model.LineInfo;
import com.sannong.model.Ticket;
import com.sannong.service.ITicketService;

@Component
public class TicketService implements ITicketService {

	@Autowired
	private ITicketDao ticketDao;

	public List<Ticket> getTickets() {
		return ticketDao.getTickets();
	}

	public List<LineInfo> getLines() {
		return ticketDao.getLines();
	}

}
