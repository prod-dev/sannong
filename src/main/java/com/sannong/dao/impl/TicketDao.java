package com.sannong.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sannong.dao.ITicketDao;
import com.sannong.model.LineInfo;
import com.sannong.model.Ticket;

@Component
public class TicketDao implements ITicketDao {

	private String getT() {
		// Http.requestGet("", null); // get from service
		return "[{seatNo:'1',price:'12'},{seatNo:'2',price:'12'}]";
	}

	public List<Ticket> getTickets() {
		Gson gson = new Gson();
		List<Ticket> tickets = gson.fromJson(getT(), new TypeToken<List<Ticket>>() {
		}.getType());
		return tickets;
	}

	public List<LineInfo> getLines() {
		Gson gson = new Gson();
		List<LineInfo> lines = gson.fromJson(getLine(), new TypeToken<List<LineInfo>>() {
		}.getType());
		return lines;
	}

	private String getLine() {
		String str = "[{lineNo:'1',startTime:'12:00',arriveTime:'第二天12:00',fromStation:'沙井中心客运站',toStation:'南宁安吉站',carType:'豪华大巴',price:'180'},"
				+ "{lineNo:'2',startTime:'13:00',arriveTime:'第二天13:00',fromStation:'沙井中心客运站',toStation:'南宁安吉站',carType:'普通大巴',price:'120'}]";
		return str;
	}

}
