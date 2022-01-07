package br.com.mybreakfast.cafeDaManha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class CafeDaManhaApplication {

	@GetMapping
	public ModelAndView swaggerUi() {
		return new ModelAndView("redirect:/swagger-ui/");
	}
		
	public static void main(String[] args) {
		SpringApplication.run(CafeDaManhaApplication.class, args);
	}

}
