package com.sannong.infrastructure.mail;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.log4j.Logger;


import jodd.mail.*;


public class EmailSender {
    private static final Logger logger = Logger.getLogger(EmailSender.class);
	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml){
		try
		{
		SendMailHander handler=new SendMailHander(receiver, subject, content, isHtml);
		Thread myThread = new Thread(handler); 
		myThread.start();
		myThread.join();
		return true;		
		}catch(Exception err)
		{
			System.out.println(err.getMessage());
			logger.error(err);
			return false;
		}
	}

	
	
	public static boolean isValidEmailAddress(String email) {
		   boolean result = true;
		   try {
		      InternetAddress emailAddr = new InternetAddress(email);
		      emailAddr.validate();
		   } catch (AddressException ex) {
		      result = false;
		   }
		   return result;
		}

}
