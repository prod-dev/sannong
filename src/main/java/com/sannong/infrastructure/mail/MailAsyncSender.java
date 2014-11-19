package com.sannong.infrastructure.mail;

import com.sannong.infrastructure.util.AppConfig;
import jodd.mail.Email;
import jodd.mail.SendMailSession;
import jodd.mail.SimpleAuthenticator;
import jodd.mail.SmtpServer;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeUtility;

/**
 * Created by Bright Huang on 11/17/14.
 */
@Component
public class MailAsyncSender {
    private final Logger logger = Logger.getLogger(MailAsyncSender.class);

    @Autowired
    private TaskExecutor taskExecutor;

    public MailAsyncSender() {
    }

    public MailAsyncSender(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    public void sendMail(String mailContent){
        try{
            AppConfig appConfig = new AppConfig();
            String smtpSender = appConfig.getProperty("smtp-sender");
            String smtpServerName = appConfig.getProperty("smtp-server");
            String smtpAccount = appConfig.getProperty("smtp-account");
            String smtpPassword = appConfig.getProperty("smtp-password");
            String mailOfReceivers = appConfig.getProperty("newApp-admin-email");
            String mailSubject = appConfig.getProperty("newApp-email-subject");

            taskExecutor.execute(new SendTask(smtpSender, smtpServerName, smtpAccount,
                    smtpPassword, mailOfReceivers, mailContent, mailSubject));

        }catch(Exception ex){
            logger.error(ex.getMessage());
        }

    }

    private class SendTask implements Runnable {
        private String smtpSender;
        private String smtpServerName;
        private String smtpAccount;
        private String smtpPassword;
        private String mailOfReceivers;
        private String mailSubject;
        private boolean isHtml = false;
        private String mailContent;
        private SendMailSession session;

        public SendTask(String smtpSender, String smtpServer, String smtpAccount, String smtpPassword,
                      String mailOfReceivers, String mailContent, String mailSubject) throws Exception{
            this.smtpSender = smtpSender;
            this.smtpServerName = smtpServer;
            this.smtpAccount = smtpAccount;
            this.smtpPassword = smtpPassword;
            this.mailOfReceivers = mailOfReceivers;
            this.mailContent = mailContent;
            this.mailSubject = mailSubject;
        }

        public void run() {
            try {
                String[] emails = mailOfReceivers.split(";");
                Email email = Email.create()
                        .from(smtpSender)
                        .to(emails)
                        .subject(MimeUtility.encodeText(mailSubject, "gb2312", "B"));
                if (!isHtml) {
                    email.addText(mailContent);
                }
                else {
                    email.addHtml(mailContent);
                }
                SmtpServer smtpServer =
                        new SmtpServer(smtpServerName,
                                new SimpleAuthenticator(
                                        smtpAccount, smtpPassword));

                session = smtpServer.createSession();
                session.open();
                session.sendMail(email);
                session.close();
            } catch (Exception e) {
                logger.error(e);
            }
            finally {
                if (session != null){
                    session.close();
                }
            }
        }

    }
}
