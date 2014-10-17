package com.sannong.util;
import jodd.core.*;
import jodd.mail.*;

public class EmailUtil {
	
	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml)
	{
		try
		{
			Email email = Email.create()
			        .from("sannong system <pactera99@163.com>")
			        .to(receiver)
			        .subject(subject);
			if(!isHtml)
				email.addText(content);
			else
				email.addHtml(content);
			SmtpServer smtpServer =
			        new SmtpServer("smtp.163.com",
			            new SimpleAuthenticator("pactera99", "pact_123"));
			    SendMailSession session = smtpServer.createSession();
			    session.open();
			    session.sendMail(email);
			    session.close();
		}catch(Exception e)
		{
			return false;
		}
		
		return true;
		
	}

}
