package com.sannong.util;

import static org.junit.Assert.*;

import java.io.UnsupportedEncodingException;

import org.junit.Test;

public class SmsUtilTest {

	@Test
	public void testSms() throws UnsupportedEncodingException {
		
		String ret=SmsUtil.SendSms("13128818478", "welcome you register our website, �����֤����123456");
	    Integer result=new Integer(ret);
    	assertTrue("test success", result>0);
	}

}
