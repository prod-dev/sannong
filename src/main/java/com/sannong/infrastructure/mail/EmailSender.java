package com.sannong.infrastructure.mail;
import org.apache.log4j.Logger;

import com.sannong.infrastructure.util.MyConfig;
import com.sannong.presentation.controller.LoginController;

import jodd.mail.*;

public class EmailSender {

	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml)
	{
		
		
		SendMailHander handler=new SendMailHander(receiver, subject, content, isHtml);
		Thread myThread = new Thread(handler); 
		myThread.start();
		return true;		
		
	}
	
	

}
