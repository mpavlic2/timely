package com.timely.timely;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TimelyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimelyApplication.class, args);
		System.out.println("Project loaded!");
	}

}
