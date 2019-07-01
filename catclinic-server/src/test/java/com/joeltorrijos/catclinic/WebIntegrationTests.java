package com.joeltorrijos.catclinic;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.util.Arrays;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.web.DiagnosisForm;
import com.joeltorrijos.catclinic.web.PrescriptionForm;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebIntegrationTests {

	@Autowired WebApplicationContext context;
	@Autowired private ObjectMapper mapper;

	MockMvc mvc;

	@Before
	public void setUp() {
		this.mvc = MockMvcBuilders.webAppContextSetup(context).build();
	}

	@Test
	public void appointmentPayment() throws Exception {
		Map<String, String> payment = new HashMap<>();
		payment.put("amountPaid", "300.00");
		
		String json = mapper.writeValueAsString(payment);
		mvc.perform(post("/api/appointments/1/pay")
						.accept(MediaType.APPLICATION_JSON)
						.content(json)
						.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.amountPaid").value(300.0))
			.andExpect(MockMvcResultMatchers.jsonPath("$.status").value(Status.PAID.name()));
	}
	
	@Test
	public void appointmentDiagnose() throws Exception {
		final String SUBJECTIVE = "headache, throbbing radiating to the side of the head; tearing, blurring of vision";
		final String OBJECTIVE = "VOU: 20/50 (which means blurred vision); No conjunctival congestion, no discharge";
		List<Integer> conditions = new ArrayList<>();
		conditions.add(1);
		conditions.add(2);
		conditions.add(3);
		List<Integer> procedures = new ArrayList<>();
		procedures.add(1);
		procedures.add(2);
		List<PrescriptionForm> prescriptionForms = new ArrayList<>();
		prescriptionForms.add(new PrescriptionForm("test1",1));
		prescriptionForms.add(new PrescriptionForm("test2",2));
		
		DiagnosisForm diagnosis = new DiagnosisForm(SUBJECTIVE, OBJECTIVE, conditions, procedures, prescriptionForms);
		
		String json = mapper.writeValueAsString(diagnosis);
		mvc.perform(post("/api/appointments/1/diagnose")
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.subjective").value(SUBJECTIVE))
		.andExpect(MockMvcResultMatchers.jsonPath("$.objective").value(OBJECTIVE))
		.andExpect(MockMvcResultMatchers.jsonPath("$.status").value(Status.FOR_PAYMENT.name()));
	}
	
	@Test
	public void appointmentCancel() throws Exception {
		String json = "";
		mvc.perform(post("/api/appointments/1/cancel")
				.accept(MediaType.APPLICATION_JSON)
				.content(json)
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.status").value(Status.CANCELLED.name()));
	}
}