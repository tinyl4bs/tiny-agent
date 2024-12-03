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

Question: how was the ETH performance during the last week?
Thought: I need to retrieve the ETH historical data for the past week to analyze its performance.
Action: DATABASE[SELECT close FROM full_1h_history_perp WHERE symbol = 'ETH' AND time >= NOW() - INTERVAL '7 days']
Observation: []
Thought: The database query returned no results, possibly indicating an issue with the query or data availability. I need to verify the query syntax and check for data for ETH within the last week.
Action: DATABASE[SELECT close FROM (SELECT DISTINCT symbol, close, time FROM full_1h_history_perp WHERE symbol = 'ETH' AND time >= NOW() - INTERVAL '7 days') AS subquery ORDER BY time DESC]
Observation: []
Thought: The database query is returning empty results, which suggests there might be an error in query syntax or data availability for ETH for the past week.
Action: DATABASE[SELECT close, time FROM full_1h_history_perp WHERE symbol = 'ETH' ORDER BY time DESC LIMIT 168]
Observation: [{"close":"3083.6","time":"2024-11-19T12:00:00.000Z"},{"close":"3134.32","time":"2024-11-19T11:00:00.000Z"},{"close":"3128.58","time":"2024-11-19T10:00:00.000Z"},{"close":"3122.37","time":"2024-11-19T09:00:00.000Z"},{"close":"3112.62","time":"2024-11-19T08:00:00.000Z"},{"close":"3121.33","time":"2024-11-19T07:00:00.000Z"},{"close":"3120.42","time":"2024-11-19T06:00:00.000Z"},{"close":"3132.77","time":"2024-11-19T05:00:00.000Z"},{"close":"3137.43","time":"2024-11-19T04:00:00.000Z"},{"close":"3132.11","time":"2024-11-19T03:00:00.000Z"},{"close":"3150.89","time":"2024-11-19T02:00:00.000Z"},{"close":"3159.51","time":"2024-11-19T01:00:00.000Z"},{"close":"3145.95","time":"2024-11-19T00:00:00.000Z"},{"close":"3158.21","time":"2024-11-18T23:00:00.000Z"},{"close":"3210.48","time":"2024-11-18T22:00:00.000Z"},{"close":"3151.4","time":"2024-11-18T21:00:00.000Z"},{"close":"3149.94","time":"2024-11-18T20:00:00.000Z"},{"close":"3157.36","time":"2024-11-18T19:00:00.000Z"},{"close":"3129.3","time":"2024-11-18T18:00:00.000Z"},{"close":"3167.5","time":"2024-11-18T17:00:00.000Z"},{"close":"3178.38","time":"2024-11-18T16:00:00.000Z"},{"close":"3171.68","time":"2024-11-18T15:00:00.000Z"},{"close":"3146.14","time":"2024-11-18T14:00:00.000Z"},{"close":"3089.51","time":"2024-11-18T13:00:00.000Z"},{"close":"3069.3","time":"2024-11-18T12:00:00.000Z"},{"close":"3088.47","time":"2024-11-18T11:00:00.000Z"},{"close":"3058.16","time":"2024-11-18T10:00:00.000Z"},{"close":"3118.2","time":"2024-11-18T09:00:00.000Z"},{"close":"3110.01","time":"2024-11-18T08:00:00.000Z"},{"close":"3124.61","time":"2024-11-18T07:00:00.000Z"},{"close":"3133.35","time":"2024-11-18T06:00:00.000Z"},{"close":"3149.57","time":"2024-11-18T05:00:00.000Z"},{"close":"3121.13","time":"2024-11-18T04:00:00.000Z"},{"close":"3103.23","time":"2024-11-18T03:00:00.000Z"},{"close":"3114.72","time":"2024-11-18T02:00:00.000Z"},{"close":"3113.21","time":"2024-11-18T01:00:00.000Z"},{"close":"3117.66","time":"2024-11-18T00:00:00.000Z"},{"close":"3100.08","time":"2024-11-17T23:00:00.000Z"},{"close":"3078.09","time":"2024-11-17T22:00:00.000Z"},{"close":"3069.94","time":"2024-11-17T21:00:00.000Z"},{"close":"3064.47","time":"2024-11-17T20:00:00.000Z"},{"close":"3075.63","time":"2024-11-17T19:00:00.000Z"},{"close":"3100.31","time":"2024-11-17T18:00:00.000Z"},{"close":"3083.07","time":"2024-11-17T17:00:00.000Z"},{"close":"3108.97","time":"2024-11-17T16:00:00.000Z"},{"close":"3095.08","time":"2024-11-17T15:00:00.000Z"},{"close":"3088.25","time":"2024-11-17T14:00:00.000Z"},{"close":"3090.2","time":"2024-11-17T13:00:00.000Z"},{"close":"3106.05","time":"2024-11-17T12:00:00.000Z"},{"close":"3123.82","time":"2024-11-17T11:00:00.000Z"},{"close":"3107.8","time":"2024-11-17T10:00:00.000Z"},{"close":"3140.55","time":"2024-11-17T09:00:00.000Z"},{"close":"3142.47","time":"2024-11-17T08:00:00.000Z"},{"close":"3147.61","time":"2024-11-17T07:00:00.000Z"},{"close":"3139.22","time":"2024-11-17T06:00:00.000Z"},{"close":"3136.18","time":"2024-11-17T05:00:00.000Z"},{"close":"3105.2","time":"2024-11-17T04:00:00.000Z"},{"close":"3128.36","time":"2024-11-17T03:00:00.000Z"},{"close":"3081.83","time":"2024-11-17T02:00:00.000Z"},{"close":"3067.03","time":"2024-11-17T01:00:00.000Z"},{"close":"3086.43","time":"2024-11-17T00:00:00.000Z"},{"close":"3150.94","time":"2024-11-16T23:00:00.000Z"},{"close":"3134.72","time":"2024-11-16T22:00:00.000Z"},{"close":"3134.76","time":"2024-11-16T21:00:00.000Z"},{"close":"3156.48","time":"2024-11-16T20:00:00.000Z"},{"close":"3151.79","time":"2024-11-16T19:00:00.000Z"},{"close":"3170.89","time":"2024-11-16T18:00:00.000Z"},{"close":"3182.32","time":"2024-11-16T17:00:00.000Z"},{"close":"3169.01","time":"2024-11-16T16:00:00.000Z"},{"close":"3147.22","time":"2024-11-16T15:00:00.000Z"},{"close":"3143.18","time":"2024-11-16T14:00:00.000Z"},{"close":"3170.55","time":"2024-11-16T13:00:00.000Z"},{"close":"3174.94","time":"2024-11-16T12:00:00.000Z"},{"close":"3177.86","time":"2024-11-16T11:00:00.000Z"},{"close":"3197.38","time":"2024-11-16T10:00:00.000Z"},{"close":"3128.8","time":"2024-11-16T09:00:00.000Z"},{"close":"3118.79","time":"2024-11-16T08:00:00.000Z"},{"close":"3122.06","time":"2024-11-16T07:00:00.000Z"},{"close":"3108.59","time":"2024-11-16T06:00:00.000Z"},{"close":"3115.78","time":"2024-11-16T05:00:00.000Z"},{"close":"3131.8","time":"2024-11-16T04:00:00.000Z"},{"close":"3135.53","time":"2024-11-16T03:00:00.000Z"},{"close":"3156.49","time":"2024-11-16T02:00:00.000Z"},{"close":"3112.45","time":"2024-11-16T01:00:00.000Z"},{"close":"3100.09","time":"2024-11-16T00:00:00.000Z"},{"close":"3086.66","time":"2024-11-15T23:00:00.000Z"},{"close":"3091.75","time":"2024-11-15T22:00:00.000Z"},{"close":"3102.6","time":"2024-11-15T21:00:00.000Z"},{"close":"3092.1","time":"2024-11-15T20:00:00.000Z"},{"close":"3092.4","time":"2024-11-15T19:00:00.000Z"},{"close":"3042.01","time":"2024-11-15T18:00:00.000Z"},{"close":"3022.58","time":"2024-11-15T17:00:00.000Z"},{"close":"3038.3","time":"2024-11-15T16:00:00.000Z"},{"close":"3036.75","time":"2024-11-15T15:00:00.000Z"},{"close":"3025.07","time":"2024-11-15T14:00:00.000Z"},{"close":"3061.1","time":"2024-11-15T13:00:00.000Z"},{"close":"3104.61","time":"2024-11-15T12:00:00.000Z"},{"close":"3105.73","time":"2024-11-15T11:00:00.000Z"},{"close":"3105.91","time":"2024-11-15T10:00:00.000Z"},{"close":"3102.45","time":"2024-11-15T09:00:00.000Z"},{"close":"3098.08","time":"2024-11-15T08:00:00.000Z"},{"close":"3071.75","time":"2024-11-15T07:00:00.000Z"},{"close":"3041.19","time":"2024-11-15T06:00:00.000Z"},{"close":"3065.88","time":"2024-11-15T05:00:00.000Z"},{"close":"3058.5","time":"2024-11-15T04:00:00.000Z"},{"close":"3027.49","time":"2024-11-15T03:00:00.000Z"},{"close":"3084.85","time":"2024-11-15T02:00:00.000Z"},{"close":"3083.55","time":"2024-11-15T01:00:00.000Z"},{"close":"3066.43","time":"2024-11-15T00:00:00.000Z"},{"close":"3063.25","time":"2024-11-14T23:00:00.000Z"},{"close":"3061.03","time":"2024-11-14T22:00:00.000Z"},{"close":"3089.56","time":"2024-11-14T21:00:00.000Z"},{"close":"3121.0","time":"2024-11-14T20:00:00.000Z"},{"close":"3101.14","time":"2024-11-14T19:00:00.000Z"},{"close":"3147.72","time":"2024-11-14T18:00:00.000Z"},{"close":"3134.43","time":"2024-11-14T17:00:00.000Z"},{"close":"3132.01","time":"2024-11-14T16:00:00.000Z"},{"close":"3172.77","time":"2024-11-14T15:00:00.000Z"},{"close":"3079.25","time":"2024-11-14T14:00:00.000Z"},{"close":"3110.91","time":"2024-11-14T13:00:00.000Z"},{"close":"3168.67","time":"2024-11-14T12:00:00.000Z"},{"close":"3184.33","time":"2024-11-14T11:00:00.000Z"},{"close":"3187.09","time":"2024-11-14T10:00:00.000Z"},{"close":"3182.12","time":"2024-11-14T09:00:00.000Z"},{"close":"3205.99","time":"2024-11-14T08:00:00.000Z"},{"close":"3204.54","time":"2024-11-14T07:00:00.000Z"},{"close":"3219.66","time":"2024-11-14T06:00:00.000Z"},{"close":"3187.87","time":"2024-11-14T05:00:00.000Z"},{"close":"3224.53","time":"2024-11-14T04:00:00.000Z"},{"close":"3238.24","time":"2024-11-14T03:00:00.000Z"},{"close":"3219.56","time":"2024-11-14T02:00:00.000Z"},{"close":"3212.16","time":"2024-11-14T01:00:00.000Z"},{"close":"3217.25","time":"2024-11-14T00:00:00.000Z"},{"close":"3181.99","time":"2024-11-13T23:00:00.000Z"},{"close":"3188.9","time":"2024-11-13T22:00:00.000Z"},{"close":"3181.72","time":"2024-11-13T21:00:00.000Z"},{"close":"3153.79","time":"2024-11-13T20:00:00.000Z"},{"close":"3170.06","time":"2024-11-13T19:00:00.000Z"},{"close":"3160.21","time":"2024-11-13T18:00:00.000Z"},{"close":"3272.49","time":"2024-11-13T17:00:00.000Z"},{"close":"3276.61","time":"2024-11-13T16:00:00.000Z"},{"close":"3287.3","time":"2024-11-13T15:00:00.000Z"},{"close":"3312.05","time":"2024-11-13T14:00:00.000Z"},{"close":"3321.96","time":"2024-11-13T13:00:00.000Z"},{"close":"3217.68","time":"2024-11-13T12:00:00.000Z"},{"close":"3166.01","time":"2024-11-13T11:00:00.000Z"},{"close":"3169.66","time":"2024-11-13T10:00:00.000Z"},{"close":"3169.33","time":"2024-11-13T09:00:00.000Z"},{"close":"3164.37","time":"2024-11-13T08:00:00.000Z"},{"close":"3161.43","time":"2024-11-13T07:00:00.000Z"},{"close":"3162.99","time":"2024-11-13T06:00:00.000Z"},{"close":"3129.28","time":"2024-11-13T05:00:00.000Z"},{"close":"3143.86","time":"2024-11-13T04:00:00.000Z"},{"close":"3192.39","time":"2024-11-13T03:00:00.000Z"},{"close":"3210.61","time":"2024-11-13T02:00:00.000Z"},{"close":"3255.15","time":"2024-11-13T01:00:00.000Z"},{"close":"3273.88","time":"2024-11-13T00:00:00.000Z"},{"close":"3251.47","time":"2024-11-12T23:00:00.000Z"},{"close":"3245.98","time":"2024-11-12T22:00:00.000Z"},{"close":"3290.6","time":"2024-11-12T21:00:00.000Z"},{"close":"3280.54","time":"2024-11-12T20:00:00.000Z"},{"close":"3287.98","time":"2024-11-12T19:00:00.000Z"},{"close":"3275.36","time":"2024-11-12T18:00:00.000Z"},{"close":"3284.76","time":"2024-11-12T17:00:00.000Z"},{"close":"3230.76","time":"2024-11-12T16:00:00.000Z"},{"close":"3255.9","time":"2024-11-12T15:00:00.000Z"},{"close":"3263.4","time":"2024-11-12T14:00:00.000Z"},{"close":"3287.85","time":"2024-11-12T13:00:00.000Z"}]
Thought: I have successfully retrieved ETH's historical price data for the past week. I need to analyze the price change to determine the performance.
Action: CALCULATOR[(3083.6 - 3287.85) / 3287.85 * 100]
Observation: -6.212266374682543
Thought: I have calculated the percentage change in ETH's price over the last week.
Final Answer: The ETH price decreased by approximately 6.21% over the last week.

Question: What’s was the lowest price of the week for BTC?
Thought: I need to retrieve BTC's historical price data for the past week to determine the lowest price.
Action: DATABASE[SELECT low FROM full_1h_history_perp WHERE symbol = 'BTC' ORDER BY time DESC LIMIT 168]
Observation: [{"low":"91071.4"},{"low":"91717.6"},{"low":"91591.0"},{"low":"91559.8"},{"low":"91250.0"},{"low":"91456.0"},{"low":"91655.2"},{"low":"91654.5"},{"low":"91292.5"},{"low":"91315.3"},{"low":"91230.7"},{"low":"90766.0"},{"low":"90666.0"},{"low":"90405.6"},{"low":"90280.0"},{"low":"90966.9"},{"low":"91220.1"},{"low":"90467.2"},{"low":"89706.2"},{"low":"90100.0"},{"low":"90970.2"},{"low":"91173.9"},{"low":"90301.0"},{"low":"89471.1"},{"low":"89422.1"},{"low":"90153.8"},{"low":"90077.7"},{"low":"91762.0"},{"low":"91720.0"},{"low":"91641.3"},{"low":"91500.0"},{"low":"90687.6"},{"low":"90503.4"},{"low":"90502.1"},{"low":"90350.1"},{"low":"90461.5"},{"low":"89933.7"},{"low":"89666.9"},{"low":"89358.0"},{"low":"88736.1"},{"low":"89036.7"},{"low":"89525.6"},{"low":"89713.7"},{"low":"89868.2"},{"low":"90195.2"},{"low":"90123.0"},{"low":"90152.1"},{"low":"89935.7"},{"low":"90371.1"},{"low":"90692.3"},{"low":"90564.7"},{"low":"90946.0"},{"low":"91019.1"},{"low":"90523.3"},{"low":"90422.0"},{"low":"90415.1"},{"low":"90423.5"},{"low":"90194.2"},{"low":"89816.5"},{"low":"89400.1"},{"low":"90050.0"},{"low":"90627.5"},{"low":"90375.0"},{"low":"90350.3"},{"low":"90763.3"},{"low":"90702.3"},{"low":"91000.6"},{"low":"90882.2"},{"low":"90552.9"},{"low":"90250.0"},{"low":"90120.0"},{"low":"90665.8"},{"low":"90735.0"},{"low":"90530.0"},{"low":"91050.0"},{"low":"91280.0"},{"low":"91280.2"},{"low":"91076.2"},{"low":"91132.1"},{"low":"91205.0"},{"low":"91198.5"},{"low":"91107.4"},{"low":"90993.0"},{"low":"91187.5"},{"low":"90988.1"},{"low":"90900.0"},{"low":"90927.0"},{"low":"91114.4"},{"low":"91111.0"},{"low":"90371.1"},{"low":"89290.4"},{"low":"89251.8"},{"low":"89198.1"},{"low":"88428.9"},{"low":"87815.0"},{"low":"88640.0"},{"low":"89320.3"},{"low":"89633.3"},{"low":"89189.4"},{"low":"89000.0"},{"low":"88084.8"},{"low":"87418.4"},{"low":"87660.6"},{"low":"87642.3"},{"low":"87326.5"},{"low":"87111.0"},{"low":"88157.2"},{"low":"87781.8"},{"low":"87437.1"},{"low":"87302.4"},{"low":"86714.0"},{"low":"87073.2"},{"low":"87061.3"},{"low":"87623.8"},{"low":"89142.2"},{"low":"88952.0"},{"low":"88619.7"},{"low":"87555.0"},{"low":"87855.0"},{"low":"88710.0"},{"low":"90613.9"},{"low":"90965.0"},{"low":"90500.0"},{"low":"90867.3"},{"low":"90394.3"},{"low":"90370.0"},{"low":"89095.5"},{"low":"89311.1"},{"low":"89692.3"},{"low":"89333.8"},{"low":"89567.2"},{"low":"89706.1"},{"low":"89531.7"},{"low":"89736.8"},{"low":"89300.0"},{"low":"88390.5"},{"low":"88005.1"},{"low":"89311.0"},{"low":"90005.8"},{"low":"91928.7"},{"low":"91800.0"},{"low":"91525.2"},{"low":"90505.3"},{"low":"88691.6"},{"low":"87584.8"},{"low":"87551.0"},{"low":"87501.4"},{"low":"87175.0"},{"low":"87132.4"},{"low":"87152.1"},{"low":"86525.0"},{"low":"86180.0"},{"low":"86510.2"},{"low":"86252.1"},{"low":"87100.1"},{"low":"87061.6"},{"low":"87713.8"},{"low":"87627.9"},{"low":"87384.6"},{"low":"87630.3"},{"low":"88182.5"},{"low":"88715.8"},{"low":"88658.1"},{"low":"86956.2"},{"low":"86908.7"},{"low":"85792.5"},{"low":"86158.6"},{"low":"85271.5"}]
Thought: I need to find the lowest price from the retrieved BTC data of the past week.
Action: CALCULATOR[Math.min(91071.4, 91717.6, 91591.0, 91559.8, 91250.0, 91456.0, 91655.2, 91654.5, 91292.5, 91315.3, 91230.7, 90766.0, 90666.0, 90405.6, 90280.0, 90966.9, 91220.1, 90467.2, 89706.2, 90100.0, 90970.2, 91173.9, 90301.0, 89471.1, 89422.1, 90153.8, 90077.7, 91762.0, 91720.0, 91641.3, 91500.0, 90687.6, 90503.4, 90502.1, 90350.1, 90461.5, 89933.7, 89666.9, 89358.0, 88736.1, 89036.7, 89525.6, 89713.7, 89868.2, 90195.2, 90123.0, 90152.1, 89935.7, 90371.1, 90692.3, 90564.7, 90946.0, 91019.1, 90523.3, 90422.0, 90415.1, 90423.5, 90194.2, 89816.5, 89400.1, 90050.0, 90627.5, 90375.0, 90350.3, 90763.3, 90702.3, 91000.6, 90882.2, 90552.9, 90250.0, 90120.0, 90665.8, 90735.0, 90530.0, 91050.0, 91280.0, 91280.2, 91076.2, 91132.1, 91205.0, 91198.5, 91107.4, 90993.0, 91187.5, 90988.1, 90900.0, 90927.0, 91114.4, 91111.0, 90371.1, 89290.4, 89251.8, 89198.1, 88428.9, 87815.0, 88640.0, 89320.3, 89633.3, 89189.4, 89000.0, 88084.8, 87418.4, 87660.6, 87642.3, 87326.5, 87111.0, 88157.2, 87781.8, 87437.1, 87302.4, 86714.0, 87073.2, 87061.3, 87623.8, 89142.2, 88952.0, 88619.7, 87555.0, 87855.0, 88710.0, 90613.9, 90965.0, 90500.0, 90867.3, 90394.3, 90370.0, 89095.5, 89311.1, 89692.3, 89333.8, 89567.2, 89706.1, 89531.7, 89736.8, 89300.0, 88390.5, 88005.1, 89311.0, 90005.8, 91928.7, 91800.0, 91525.2, 90505.3, 88691.6, 87584.8, 87551.0, 87501.4, 87175.0, 87132.4, 87152.1, 86525.0, 86180.0, 86510.2, 86252.1, 87100.1, 87061.6, 87713.8, 87627.9, 87384.6, 87630.3, 88182.5, 88715.8, 88658.1, 86956.2, 86908.7, 85792.5, 86158.6, 85271.5)]
Observation: 85271.5
Thought: I have found the lowest price of the week for BTC.
Final Answer: The lowest price of the week for BTC was 85271.5.

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

# TASK: Produce the next Thought/Action cycle for the following question/problem context, do not get stuck in a infinite loop:
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
