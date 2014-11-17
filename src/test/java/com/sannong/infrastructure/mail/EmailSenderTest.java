package com.sannong.infrastructure.mail;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.sannong.infrastructure.util.AppConfig;


public class EmailSenderTest {
	


	@Test
	public void testSendMail() {
		System.out.println("***********************************test***************************");
		StringBuilder sb=new StringBuilder();
		sb.append("this is line 1");
		sb.append("\n");
		sb.append("this is line 2");
		EmailSender.sendMail("techmio@qq.com", "mail test", sb.toString(), false);
		
	}
	
	@Test
	public void testSendMailWithVelocity() throws Exception
	{
		AppConfig appConfig=new AppConfig();
		 Map<Object, Object> velocityParameters = new HashMap<Object, Object>();
	      velocityParameters.put("province", "广东省");
	      velocityParameters.put("city", "深圳市");
	      velocityParameters.put("district", "光明区");
	      velocityParameters.put("realname", "刘备");
	      velocityParameters.put("mobile", "13128818478");
	      velocityParameters.put("time", getNow());
	      VelocityTemplate vt=new VelocityTemplate();
	      EmailSender.sendMail(appConfig.getProperty("newApp-admin-email"), appConfig.getProperty("newApp-email-title"), vt.getTemplate(appConfig.getPath()+"../classes/template/", "newapp.html", velocityParameters),true);

	}
	
	
	public static String getNow() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date Now = new Date();
		return formatter.format(Now);
		}
	
	

}
