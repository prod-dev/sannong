package com.sannong.infrastructure.mail;

import org.junit.Test;


public class EmailSenderTest {
	


	@Test
	public void testSendMail() {
		StringBuilder sb=new StringBuilder();
		sb.append("this is line 1");
		sb.append("\n");
		sb.append("this is line 2");
		EmailSender.sendMail("techmio@qq.com", "mail test", sb.toString(), false);
		
	}
	
	

}
