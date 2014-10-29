package com.sannong.infrastructure.mail;
import com.sannong.infrastructure.util.MyConfig;

import jodd.mail.*;

public class EmailSender {
	
	public static boolean sendMail(String receiver,String subject,String content, boolean isHtml)
	{
		try
		{
			Email email = Email.create()
			        .from(MyConfig.getConfig("smtp-sender"))
			        .to(receiver)
			        .subject(subject);
			if(!isHtml)
				email.addText(content);
			else
				email.addHtml(content);
			SmtpServer smtpServer =
			        new SmtpServer(MyConfig.getConfig("smtp-server"),
			            new SimpleAuthenticator(MyConfig.getConfig("smtp-account"), MyConfig.getConfig("smtp-password")));
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
