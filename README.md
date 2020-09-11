# JSSP-AzureTextAnalytics
 ## JSSP Broker for AzureTextAnalytics
 Sample K2 JSSP Broker connecting K2 to Azure Text Analytics service based on Text Analytics API Version 3 (text/analytics/v3.0/sentiment). This is only a sample broker and is not supported by the product. Use at your own risk, Happy Coding.
  
 ## Features
 This broker currently supports the following:
 (currently only support single documemt)
 
 ### Setiment Analysis
 - Get Sentiment: returns a single record of the overall sentiment scores.
 - Get Sentiments: returns a List of sentiment scores broken down by sentences.
 
Additional Information:  [API Reference](https://westus2.dev.cognitive.microsoft.com/docs/services/TextAnalytics-v3-0/operations/Sentiment)

### Language Analysis
 - Get Language: returns language of the input text with confidence score.

Additional Information:  [API Reference](https://westus2.dev.cognitive.microsoft.com/docs/services/TextAnalytics-v3-0/operations/Languages)

### Key Phrases Analysis
 - Get Key Phrases as a string: returns the identified key phrases in submitted text as a comma separated string.
 - List Key Phrases: returns a list of key phrases based on the submitted text.

Additional Information:  [API Reference](https://westus2.dev.cognitive.microsoft.com/docs/services/TextAnalytics-v3-0/operations/KeyPhrases)

### Entities Analysis
 - Get Entities: returns a list of identifed entities and confidence scores.

Additional Information:  [API Reference](https://https://westus2.dev.cognitive.microsoft.com/docs/services/TextAnalytics-v3-0/operations/EntitiesRecognitionGeneral)

## What is required to create a K2 Service Instance:
1. Azure Service Endpoint (e.g. https://eastus.api.cognitive.microsoft.com)
2. Service API Key from Azure
