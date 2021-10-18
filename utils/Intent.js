const dialogflow = require('@google-cloud/dialogflow');
// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    sessionId,
    projectId
  );
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries( queries, languageCode) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  sessionId=process.env.SESSIONID
  projectId=process.env.PROJECTID
  let responses=[]
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      responses.push(intentResponse)
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  }

  return responses
}

module.exports.executeQueries = executeQueries