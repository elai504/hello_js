package app;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import app.MailService;
import lombok.extern.slf4j.Slf4j;
import model.MailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndpointController {

    @Autowired
    private MailService mailService;

    @RequestMapping(method = RequestMethod.GET, value = "/")
    public ModelAndView startup() {
        return new ModelAndView("/index.html");
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendMail")
    public boolean sendMail(@Valid @RequestBody MailRequest request, HttpServletResponse response) {
        if (!mailService.sendMail(request)) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return false;
        }

        return true;
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/simulator_mailgun")
    public boolean sendMailgun(@Valid @RequestBody MailRequest request, HttpServletResponse response) {
        
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

        return false;
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/simulator_sendgrid")
    public boolean sendGrid(@Valid @RequestBody MailRequest request, HttpServletResponse response) {
        
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

        return false;
    }
}