package com.sannong.infrastructure.mail;

public class EmailSender {

	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml){
		
		SendMailHander handler=new SendMailHander(receiver, subject, content, isHtml);
		Thread myThread = new Thread(handler); 
		myThread.start();
		return true;		
	}
}
