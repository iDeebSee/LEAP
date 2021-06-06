package ap.be.backend.config;

import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
@Configuration
public class AppConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean 
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();
        //host
        mailSenderImpl.setHost("smtp.gmail.com");
        mailSenderImpl.setPort(587);

        mailSenderImpl.setUsername("noreply.leap.ap@gmail.com");
        mailSenderImpl.setPassword("ypwdtstdkbeoozte");

        Properties props = mailSenderImpl.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");

        return mailSenderImpl;
    }
}
