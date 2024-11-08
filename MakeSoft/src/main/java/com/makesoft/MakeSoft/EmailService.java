package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String subject, String name, String section,boolean isStudent ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("peerreview.makesoft@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        if(isStudent){
            message.setText(createStudentMessage(name,section));
        }else{
            message.setText(createWelcomeEmailBody(name, section));

        }

        mailSender.send(message);
    }

    private String createWelcomeEmailBody(String instructorName, String section) {
        return "Dear " + instructorName + ",\n\n" +
                "Welcome to the Peer Review Platform! We're excited to have you onboard.\n\n" +
                "Here are your details:\n" +
                "Section: " + section + "\n\n" +
                "You can log in and start managing peer reviews for your class. If you have any questions, feel free to reach out to our support team.\n\n" +
                "Best regards,\n" +
                "The Peer Review Platform Team";
    }

    private String createStudentMessage(String name, String section) {
        return "Dear " + name + ",\n\n" +
                "Welcome to the Peer Review Platform! We're excited to have you onboard.\n\n" +
                "Here are your details:\n" +
                "Section: " + section + "\n\n" +
                "You can log in and start reviewing your teammates. If you have any questions, feel free to reach out to our support team.\n\n" +
                "Best regards,\n" +
                "The Peer Review Platform Team";
    }
}
