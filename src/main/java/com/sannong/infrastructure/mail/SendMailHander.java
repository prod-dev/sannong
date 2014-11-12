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
    private String mailContent =
                        "管理员:" +
                        "xxx省xxx市xxx村 xxx(名字) 与 xxx (时间) 提交了项目申请, 请尽快联系该项目申请人, 以便项目申请人更快的完成后续工作, 推动项目进展." +
                        "该项目申请人的联系方式是: 手机: xxxxxxxx" +
                        "三农平台";


    public SendMailHander(String receiver, String subject, String content, boolean isHtml) {
        this.receiver = receiver;
        this.subject = subject;
        this.content = content;
        this.isHtml = isHtml;
    }

    public void run() {
        try {
            AppConfig appConfig = new AppConfig();
            String[] emails=receiver.split(";");
            Email email = Email.create()
                    .from(appConfig.getProperty("smtp-sender"))
                    .to(emails)
                    .subject(subject);
            if (!isHtml) {
                email.addText(mailContent);
            }
            else {
                email.addHtml(mailContent);
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