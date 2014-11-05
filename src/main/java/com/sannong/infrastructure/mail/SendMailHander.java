package com.sannong.infrastructure.mail;

import org.apache.log4j.Logger;

import jodd.mail.Email;
import jodd.mail.SendMailSession;
import jodd.mail.SimpleAuthenticator;
import jodd.mail.SmtpServer;

import com.sannong.infrastructure.util.MyConfig;

public class  SendMailHander extends Thread
{
	private static final Logger logger = Logger.getLogger(EmailSender.class);
	private String receiver;
	private String subject;
	private String content;
	private boolean  isHtml;
	
	public SendMailHander(String receiver,String subject,String content, boolean isHtml)
	{
		this.receiver=receiver;
		this.subject=subject;
		this.content=content;
		this.isHtml=isHtml;			
	}
	
	public void run()
	{
	try
	{
		String[] emails=receiver.split(";");	
		Email email = Email.create()
		        .from(MyConfig.getConfig("smtp-sender"))
		        .to(emails)
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
		logger.error(e);
	}

}
}