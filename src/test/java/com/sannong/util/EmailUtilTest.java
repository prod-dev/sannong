package com.sannong.util;

import static org.junit.Assert.*;

import org.junit.Test;


public class EmailUtilTest {
	


	@Test
	public void testSendMail() {
		StringBuilder sb=new StringBuilder();
		sb.append("this is line 1");
		sb.append("\n");
		sb.append("this is line 2");
		EmailUtil.sendMail("techmio@qq.com", "mail test",sb.toString() , false);
		
	}
	
	

}
