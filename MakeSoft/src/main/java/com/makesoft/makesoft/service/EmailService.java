package com.makesoft.makesoft.service;

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


    public void sendStudentTeaminfo(String to, String subject, String name, String section, String teamName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("peerreview.makesoft@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(createTeamAssignmentEmailBody(name, section,teamName));

        mailSender.send(message);
    }

    private String createTeamAssignmentEmailBody(String studentName, String section, String teamName) {
        return "Dear " + studentName + ",\n\n" +
                "You have been successfully added to a team in the Peer Review Platform.\n\n" +
                "Here are your team details:\n" +
                "Team Name: " + teamName + "\n" +
                "Section: " + section + "\n\n" +
                "Please log in to the platform to review your teammates and collaborate effectively. If you have any questions, feel free to contact your instructor.\n\n" +
                "Best regards,\n" +
                "The Peer Review Platform Team";
    }

}
