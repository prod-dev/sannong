package com.sannong.dao;

import java.util.List;

import com.sannong.model.LineInfo;
import com.sannong.model.Ticket;

public interface ITicketDao {

	List<Ticket> getTickets();

	List<LineInfo> getLines();

}
