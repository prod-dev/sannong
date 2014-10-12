package com.sannong.service;

import java.util.List;

import com.sannong.model.LineInfo;
import com.sannong.model.Ticket;

public interface ITicketService {

	List<Ticket> getTickets();

	List<LineInfo> getLines();

}
