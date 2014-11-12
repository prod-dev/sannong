package com.sannong.infrastructure.mail;

import org.apache.log4j.Logger;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

public class EmailSender {
    private static final Logger logger = Logger.getLogger(EmailSender.class);

	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml){
        try{
            SendMailHander handler=new SendMailHander(receiver, subject, content, isHtml);
            Thread myThread = new Thread(handler);
            myThread.start();
            myThread.join();
        }catch(Exception err){
            logger.error(err);
            return false;
        }
		return true;		
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
