// ReAct Examples
const reactExamples = 
    `# Use the following format:
Question: How old was Barak Obama when the 2001 9/11 incident happened?
Thought: I need to find out when Obama was born
Action: SEARCH[Barak Obama birth date]
Observation: Early life and career. Obama was born on August 4, 1961, at Kapiolani Medical Center for Women and Children in Honolulu, Hawaii.
Thought: I need to calculate the difference between the 2001 9/11 incident and 1961 to figure out how old was Obama at the time
Action: CALCULATOR[2001-1961]
Observation: 40
Thought: I now know the final answer
Final Answer: Barak Obama was 40 years old when the 2001 9/11 incident happened.

Question: what was my last trade on $ETH?
Thought: I need to find out my last trade on $ETH
Action: DATABASE[SELECT * FROM trades WHERE symbol = 'ETH' ORDER BY timestamp DESC LIMIT 1]
Observation: { "timestamp": "2024-11-25T10:00:00.000Z", "symbol": "ETH", "quantity": 1, "price": 2000 }
Thought: I now know the final answer
Final Answer: My last trade on $ETH was 1 ETH at 2000 USD.

Question: What is my current PNL on $NEAR?
Thought: I need to find out the price at which I entered my last trade on NEAR and the current price to calculate the PNL.
Action: DATABASE[SELECT * FROM positions_1d WHERE symbol = 'NEAR' ORDER BY timestampin DESC LIMIT 1]
Observation: [{"id": 2062, "status": 2, "symbol": "NEAR", "direction":"longonly", "timestampin": "2024-11-16 00:00:00.000000", "strategy": "breakout", "pricein" :5.949, "timestampfill":"2024-11-17 00:03:57.118000","pricefill":5.976, "timestampout" :null, "priceout": null}]
Thought:I need to find the current price of NEAR to calculate the PNL using the entry price.
Action: TICKER_PRICE [NEARUSDT]
Observation: {"symbol": "NEARUSDT", "price":"6.75100000"}
Thought: I need to calculate the PNL by comparing the entry price with the current price.
Action: CALCULATOR[(6.751 - 5.949) / 5.949 * 100]
Observation: 13.481257354177181
Thought: I now know the final answer
Final Answer: Your current PNL on $NEAR is approximately 13.50%

Question: when i opened my last trade on $NEAR?
Thought: I need to find the timestamp of my last trade on NEAR.
Action: DATABASE[SELECT timestampin FROM positions_1d WHERE symbol = 'NEAR' ORDER BY timestampin DESC LIMIT 1]
Observation: [{"timestampin":"2024-11-16 00:00:00.000000"}]
Thought: I now know the final answer
Final Answer: You opened your last trade on NEAR on 2024-11-16 at 00:00:00.000000

Question: What was my last trade on NEAR?
Thought: I need to find the details of my last trade on NEAR.
Action: DATABASE[SELECT * FROM positions_1d WHERE symbol = 'NEAR' ORDER BY timestampin DESC LIMIT 1]
Observation: [{"id":2062,"status":2,"symbol":"NEAR","direction":"longonly","timestampin":"2024-11-16 00:00:00.000000","strategy":"breakout","pricein":5.949,"timestampfill":"2024-11-17 00:03:57.118000","pricefill":5.976,"timestampout":null,"priceout":null}]
Thought: I now know the final answer
Final Answer: Your last trade on NEAR was a 'long only' strategy, initiated at a price of 5.949, filled on 2024-11-17 at a price of 5.976.


Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{{toolsList}}], formatted as Action[action input]
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

`;


export const reactTemplate = 
    `# GOAL: Answer the following question/Solve the following problem as best you can, your answer should address ONLY the question/problem and nothing else. Proceed STEP BY STEP, DO NOT RUSH to conclusion.

# You have access to the following tools:
{{tools}}

# IMPORTANT: Each tool has a specific input format, make sure to use the correct format for each tool. For example don not use text for the input format of the calculator tool.

# Relevant context information:
{{providersData}}


${reactExamples}

# Here's the ONLY steps you can use to solve the problem:
- Thought
- Action
- FinalAnswer

# IMPORTANT: If you struggle to find the answer, make sure to do at least 5 iterations per question before you give your final answer.

# Message history:
{{messageHistory}}

# TASK: Produce the next Thought/Action cycle for the following question/problem context:
{{scratchpad}}

# IMPORTANT: The result should be outputted in a JSON block, with the following format:
\`\`\`json
{ "thought": "<string>", "action": "<string | null>", "actionInput": "<string | null>", "finalAnswer": "<string | null>"}
\`\`\`

# EXAMPLE OUTPUT:
\`\`\`json
{ "thought": "I need to find out when Obama was born", "action": "SEARCH", "actionInput": "Barak Obama birth date", "finalAnswer": null}
\`\`\`
`;
