package com.sannong.infrastructure.mail;

import com.sannong.infrastructure.util.AppConfig;
import jodd.mail.Email;
import jodd.mail.SendMailSession;
import jodd.mail.SimpleAuthenticator;
import jodd.mail.SmtpServer;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

public class SendMailHander extends Thread {
    private static final Logger logger = Logger.getLogger(EmailSender.class);
    private String receiver;
    private String subject;
    private String content;
    private boolean isHtml;
    @Autowired
    private AppConfig appConfig;

    public SendMailHander(String receiver, String subject, String content, boolean isHtml) {
        this.receiver = receiver;
        this.subject = subject;
        this.content = content;
        this.isHtml = isHtml;
    }

    public void run() {
        try {
            Email email = Email.create()
                    .from(appConfig.getProperty("smtp-sender"))
                    .to(receiver)
                    .subject(subject);
            if (!isHtml) {
                email.addText(content);
            }
            else {
                email.addHtml(content);
            }
            SmtpServer smtpServer =
                    new SmtpServer(appConfig.getProperty("smtp-server"),
                            new SimpleAuthenticator(appConfig.getProperty("smtp-account"), appConfig.getProperty("smtp-password")));
            SendMailSession session = smtpServer.createSession();
            session.open();
            session.sendMail(email);
            session.close();
        } catch (Exception e) {
            logger.error(e);
        }

    }
}