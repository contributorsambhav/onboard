import { Hono } from "hono";
import { cors } from 'hono/cors';
import { paymanPaymentAgent } from "./payment-agent";


const app = new Hono<{ Bindings: Env }>();
app.use(
	'/*',
	cors({
		origin: '*',
	}),
);

app.post('/api/v1/anaylze-query', async (c) => {
	try {
		let { recipients } = await c.req.json();
		// due to model limitation
		recipients = recipients.slice(0, 2);
		const paymentAgentPrompt = `
					Analyze the following recipients' data and determine:
					1. If this is a request for a cross-border transaction
					2. Extract any recipient details such as name, country, and payment method
					3. Identify the best possible way for cross-border transactions (e.g., bank transfer, cryptocurrency, PayPal, etc.)
					4. Provide a reason for the selected method based on the recipient's country and payment preferences
		
					Recipients' data: "${JSON.stringify(recipients)}"
		
					Respond in the following format:
					[
						{
							"name": "extracted name or null",
							"country": "extracted country or null",
							"email: "extracted email or null",
							"paymentMethod": "extracted payment method or null",
							"amount": "extracted amount or null",
							"optimalTransactionMethod": "best possible method for transaction or null"
						}
					]
					Please ensure that the response is in valid JSON format. no additional text or explanation is needed.
					Do not include any other information or context. Just provide the JSON response.
					Please focus on the format and ensure that the JSON is valid and well-structured.
				`;

		const payment = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
			messages: [
				{
					role: 'system',
					content: `
					You are a precise entity extraction system. Extract exactly what is asked and respond in valid JSON. You have to respond in the following format:
					[
						{
							"name": "extracted name or null",
							"country": "extracted country or null",
							"paymentMethod": "extracted payment method or null",
							"optimalTransactionMethod": "best possible method for transaction or null"
						}
					]
					Analyze the recipients' data and determine:
					1. If this is a request for a cross-border transaction
					2. Extract recipient details such as name, country, and payment method
					3. Identify the best possible way for cross-border transactions (e.g., bank transfer, cryptocurrency, PayPal, etc.)
					4. Provide a reason for the selected method based on the recipient's country and payment preferences.
					`,
				},
				{
					role: 'user',
					content: paymentAgentPrompt,
				},
			],
		});

		console.log(payment);
		// @ts-ignore
		const recipientsData = JSON.parse(payment.response);
		console.log(recipientsData);

		// Assuming `payment` contains the modified array of recipients with the optimal transaction method
		// return c.json(
		// 	{
		// 		success: true,
		// 		data: recipientsData,
		// 	},
		// 	200
		// );
		// const mailData = JSON.parse(mail.response);
		// if (mailData.recipientMail && mailData.mailBody && mailData.mailSubject) {
		// 	return await initilizeMailAgent(c, mailData.recipientMail, mailData.mailBody, mailData.mailSubject);
		// }
		// @ts-ignore
		if (recipientsData && recipientsData.length) {
			return await paymanPaymentAgent(c, recipientsData);
		}
	} catch (err) {
		console.log(err);
		return c.json(
			{
				success: false,
				message: 'Internal Server Error',
			},
			500,
		);
	}
});

export default app;

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;
