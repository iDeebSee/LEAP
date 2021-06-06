package ap.be.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSender {
    
    @Autowired
    JavaMailSender javaMailSender;

    Logger logger = LoggerFactory.getLogger(MailSender.class);

    public void sendMail(String to, String subject, String body) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("Leap.noreply@gmail.com");
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(body);

        logger.info("Sending...");

        javaMailSender.send(mail);

        logger.info("Done!");
    }
}
