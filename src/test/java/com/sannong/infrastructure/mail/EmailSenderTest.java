package com.sannong.infrastructure.mail;

import java.util.Date;

import org.junit.Test;


public class EmailSenderTest {
	


	@Test
	public void testSendMail() {
		StringBuilder sb=new StringBuilder();
		sb.append("this is line 1");
		sb.append("\n");
		sb.append("this is line 2");
		String receiver="techmio@qq.com;hnglng@live.com;zhangwei20460@163.com";
		EmailSender.sendMail(receiver, "mail test "+(new Date().toString()), sb.toString(), false);
		System.out.print("A test email was sent to "+receiver);
		
	}
	
	

}
