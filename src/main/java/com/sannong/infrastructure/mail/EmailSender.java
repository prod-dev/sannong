package com.sannong.infrastructure.mail;

import com.sannong.infrastructure.util.AppConfig;
import jodd.mail.Email;
import jodd.mail.SendMailSession;
import jodd.mail.SimpleAuthenticator;
import jodd.mail.SmtpServer;
import org.apache.log4j.Logger;

public class EmailSender {
    private static final Logger logger = Logger.getLogger(EmailSender.class);

	public boolean sendMail(String receiver, String subject, String content, boolean isHtml){
        try{
            Sender sender = new Sender(receiver, subject, content, isHtml);
            Thread senderThread = new Thread(sender);
            senderThread.start();
            senderThread.join();
        }catch(Exception err){
            logger.error(err);
            return false;
        }
		return true;		
	}

    public class Sender extends Thread {
        private final Logger logger = Logger.getLogger(Sender.class);
        private String receiver;
        private String subject;
        private String content;
        private boolean isHtml;


        public Sender(String receiver, String subject, String content, boolean isHtml) {
            this.receiver = receiver;
            this.subject = subject;
            this.content = content;
            this.isHtml = isHtml;
        }

        public void run() {
            try {
                AppConfig appConfig = new AppConfig();
                String[] emails = receiver.split(";");
                Email email = Email.create()
                        .from(appConfig.getProperty("smtp-sender"))
                        .to(emails)
                        .subject(subject);
                if (!isHtml) {
                    email.addText(content);
                }
                else {
                    email.addHtml(content);
                }
                SmtpServer smtpServer =
                        new SmtpServer(appConfig.getProperty("smtp-server"),
                                new SimpleAuthenticator(
                                        appConfig.getProperty("smtp-account"), appConfig.getProperty("smtp-password")));
                SendMailSession session = smtpServer.createSession();
                session.open();
                session.sendMail(email);
                session.close();
            } catch (Exception e) {
                logger.error(e);
            }

        }
    }

}
