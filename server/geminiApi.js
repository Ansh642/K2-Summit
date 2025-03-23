require("dotenv").config();

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      hhistory: [
        {
          role: "user",
          parts: [
            {text: "customer table\ncustomer_id\tfirst_name\tlast_name\temail\tcreated_at\n1\tAnsh\tAgarwal\tansh@example.com\t2025-03-21T18:52:04.514Z\n2\tJohn\tDoe\tjohn@example.com\t2025-03-21T18:52:04.514Z\n\norder table\norder_id\tcustomer_id\tfirst_name\tlast_name\torder_date\ttotal_amount\n1\t1\tAnsh\tAgarwal\t2025-03-21T18:52:04.514Z\t100.50\n2\t2\tJohn\tDoe\t2025-03-21T18:52:04.514Z\t200.75\n\n\nrevenue Table \nrevenue_id\torder_id\tcustomer_id\ttotal_amount\trevenue_amount\trecorded_at\n1\t1\t1\t100.50\t100.50\t2025-03-21T18:52:04.514Z\n2\t2\t2\t200.75\t200.75\t2025-03-21T18:52:04.514Z\n\n\nnow what you have to do is generate a 3-4 words short description of coulmn names for eg if someone passes you some column nma e called revenue_id you have to generate just 3-4 words short description for it thats it nothing more\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. Here's how I would describe each of those column names in 3-4 words:\n\n**Customer Table:**\n\n*   **customer_id:** Unique customer identifier\n*   **first_name:** Customer's given name\n*   **last_name:** Customer's family name\n*   **email:** Customer's email address\n*   **created_at:** Customer account creation\n\n**Order Table:**\n\n*   **order_id:** Unique order identifier\n*   **customer_id:** Customer placing order\n*   **first_name:** Customer's first name\n*   **last_name:** Customer's last name\n*   **order_date:** Date order placed\n*   **total_amount:** Order total value\n\n**Revenue Table:**\n\n*   **revenue_id:** Unique revenue identifier\n*   **order_id:** Associated order ID\n*   **customer_id:** Customer linked revenue\n*   **total_amount:** Original order amount\n*   **revenue_amount:** Recorded revenue value\n*   **recorded_at:** Revenue record timestamp\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "dont just always generate same description generate something new evry time and also not 3 create 4-5 lines description please"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"table\": \"customer\",\n    \"columns\": {\n      \"customer_id\": \"Unique identifier of customer\",\n      \"first_name\": \"Customer's given first name\",\n      \"last_name\": \"Customer's family last name\",\n      \"email\": \"Customer's contact email address\",\n      \"created_at\": \"Date and time account created\"\n    }\n  },\n  {\n    \"table\": \"order\",\n    \"columns\": {\n      \"order_id\": \"Distinct identifier for order\",\n      \"customer_id\": \"Customer placing this specific order\",\n      \"first_name\": \"First name of ordering customer\",\n      \"last_name\": \"Last name of ordering customer\",\n      \"order_date\": \"Date on which the order placed\",\n      \"total_amount\": \"Total monetary value for order\"\n    }\n  },\n  {\n    \"table\": \"revenue\",\n    \"columns\": {\n      \"revenue_id\": \"Specific revenue record identifier\",\n      \"order_id\": \"Order linked to the revenue\",\n      \"customer_id\": \"Customer corresponding this revenue\",\n      \"total_amount\": \"Gross amount before deductions\",\n      \"revenue_amount\": \"Actual amount after calculations\",\n      \"recorded_at\": \"Timestamp for recorded revenue\"\n    }\n  }\n]"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  }

module.exports = run;