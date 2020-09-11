import '@k2oss/k2-broker-core';
const DebugTag = "=== USTS-IATA: ";

const Language_Analytics_API = "text/analytics/v3.0/languages";
const Sentiment_Analytics_API = "text/analytics/v3.0/sentiment";
const Key_Phrases_Analytics_API = "text/analytics/v3.0/keyPhrases";
const Entity_Analytics_API = "text/analytics/v3.0/entities/recognition/general";

metadata = {
    systemName: "ImmersionAzureTextAnalytics",
    displayName: "Azure Text Analytics",
    description: "Azure Text Analytics",
    "configuration": {
        "Subscription Key": {
            "displayName": "Subscription Key",
            "type": "string",
            "required": true
        },
    "Service Endpoint": {
        "displayName": "Service Endpoint",
        "type": "string",
        "required": true
    }

    }
};

ondescribe = async function({configuration}): Promise<void> {
    postSchema({
        objects: {
            "Sentiment": {
                displayName: "Sentiment Analytics",
                description: "Text Analytics - Sentiment Analysis v3.0",
                properties: {
                    "language": {
                        displayName: "Language",
                        type: "string"
                    },
                    "value": {
                        displayName: "Value",
                        type: "extendedString",
                        extendedType: "k2.com/2019/memo"
                    },
                    "text": {
                        displayName: "Text",
                        type: "extendedString",
                        extendedType: "k2.com/2019/memo"
                    },
                    "sentiment": {
                        displayName: "Sentiment",
                        type: "string"
                    },
                    "positive": {
                        displayName: "positive",
                        type: "decimal"
                    },
                    "neutral": {
                        displayName: "neutral",
                        type: "decimal"
                    },
                    "negative": {
                        displayName: "negative",
                        type: "decimal"
                    }
                },
                methods: {
                    "GetSentiment": {
                        displayName: "Get Sentiment",
                        type: "read",
                        inputs: [ "language","value" ],
                        requiredInputs: ["value"],
                        outputs: ["sentiment", "positive", "neutral", "negative"]
                    },
                    "GetSentiments": {
                        displayName: "Get Sentiments",
                        type: "list",
                        inputs: [ "language","value" ],
                        requiredInputs: ["value"],
                        outputs: ["text","sentiment", "positive", "neutral", "negative"]
                    }

                }
            },
            "Language": {
                displayName: "Language Analysis",
                description: "Language Analysis",
                properties: {
                    "text": {
                        displayName: "Text",
                        type: "extendedString",
                        extendedType: "k2.com/2019/memo"
                    },
                    "language": {
                        displayName: "Language",
                        type: "string"
                    },
                    "code": {
                        displayName: "iso 639-1 Name",
                        type: "string"
                    },
                    "score": {
                        displayName: "Confidence Score",
                        type: "decimal"
                    }
                },
                methods: {
                    "GetLanguage": {
                        displayName: "Get Language",
                        type: "read",
                        inputs: [ "text" ],
                        requiredInputs: ["text"],
                        outputs: ["language", "code", "score"]
                    }

                }
            },
            "KeyPhrases": {
                displayName: "Key Phrases Analytics",
                description: "Text Analytics - Key Phrases Analysis v3.0",
                properties: {
                    "language": {
                        displayName: "Language",
                        type: "string"
                    },
                    "value": {
                        displayName: "value",
                        type: "extendedString",
                        extendedType: "k2.com/2019/memo"
                    },
                    "keyPhrases": {
                        displayName: "keyPhrases",
                        type: "string",
                    },
                },
                methods: {
                    "GetKeyPhrasesString": {
                        displayName: "Get Key Phrases",
                        type: "read",
                        inputs: [ "language","value" ],
                        requiredInputs: ["value"],
                        outputs: ["keyPhrases"]
                    },
                    "ListKeyPhrases": {
                        displayName: "List Key Prases",
                        type: "list",
                        inputs: [ "language","value" ],
                        requiredInputs: ["value"],
                        outputs: ["keyPhrases"]
                    }

                }
            },
            "Entities": {
                displayName: "Entities Analysis",
                description: "Entities Analysis",
                properties: {
                    "value": {
                        displayName: "Value",
                        type: "extendedString",
                        extendedType: "k2.com/2019/memo"
                    },
                    "language": {
                        displayName: "Language",
                        type: "string"
                    },
                    "text": {
                        displayName: "Text",
                        type: "string"
                    },
                    "category": {
                        displayName: "Category",
                        type: "string"
                    },
                    "score": {
                        displayName: "Confidence Score",
                        type: "decimal"
                    }
                },
                methods: {
                    "GetEntities": {
                        displayName: "Get Entities",
                        type: "list",
                        inputs: [ "language", "value" ],
                        requiredInputs: ["value"],
                        outputs: ["text", "category", "score"]
                    }

                }
            }



        }
    });
}

// =================================  Filter by Object
onexecute = async function({objectName, methodName, parameters, properties, configuration, schema}): Promise<void> {
    switch (objectName)
    {
        case "Sentiment": await onexecuteTextAnalytics(methodName, properties, parameters, configuration); break;
        case "Language": await onexecuteLanguageAnalytics(methodName, properties, parameters, configuration); break;
        case "KeyPhrases": await onexecuteKeyPhrases(methodName, properties, parameters, configuration); break;
        case "Entities": await onexecuteEntities(methodName, properties, parameters, configuration); break;

        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

// =================================  Filter by Object+Method
async function onexecuteTextAnalytics(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration:SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "GetSentiment": await onexecuteGetSentiment(parameters, properties, configuration); break;
        case "GetSentiments": await onexecuteGetSentimentBySentence(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}
async function onexecuteLanguageAnalytics(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration:SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "GetLanguage": await onexecuteGetLanguage(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}
async function onexecuteKeyPhrases(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration:SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "GetKeyPhrasesString": await onexecuteGetKeyPhrases(parameters, properties, configuration); break;
        case "ListKeyPhrases": await onexecuteListKeyPhrases(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}
async function onexecuteEntities(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration:SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "GetEntities": await onexecuteGetEntities(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}


// =================================  Method Implementation
function onexecuteGetSentiment(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteGetSentiment");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                postResult({
                    "sentiment": obj.documents[0].sentiment,
                    "positive": obj.documents[0].confidenceScores.positive,
                    "neutral":obj.documents[0].confidenceScores.neutral,
                    "negative":obj.documents[0].confidenceScores.negative
                });
                resolve();
            } catch (e) {
                reject(e);
            }
        };

        //var url = "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.0/sentiment"
        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Sentiment_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"language": properties["language"],"id": "1", "text": properties["value"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}

function onexecuteGetSentimentBySentence(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteGetSentimentBySentence");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                postResult(obj.documents[0].sentences.map(x => {
                    return {
                    "text": x.text,
                    "sentiment": x.sentiment,
                    "positive": x.confidenceScores.positive,
                    "neutral":x.confidenceScores.neutral,
                    "negative":x.confidenceScores.negative
                }}));
                resolve();
            } catch (e) {
                reject(e);
            }
        };

        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Sentiment_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"language": properties["language"],"id": "1", "text": properties["value"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}

function onexecuteGetLanguage(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteGetLanguage");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                postResult({
                    "language": obj.documents[0].detectedLanguage.name,
                    "code": obj.documents[0].detectedLanguage.iso6391Name,
                    "score":obj.documents[0].detectedLanguage.confidenceScore
                });
                resolve();
            } catch (e) {
                reject(e);
            }
        };

        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Language_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"id": "1", "text": properties["text"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}

function onexecuteGetKeyPhrases(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteGetKeyPhrases");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                var phrases = ',';
                var phrasesAry = obj.documents[0].keyPhrases;
                for (var key in phrasesAry) {
                    phrases += ',' + phrasesAry[key];
                }
                postResult(
                    {
                        "keyPhrases": phrases.slice(1)
                    });

                resolve();
            } catch (e) {
                reject(e);
            }
        };

        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Key_Phrases_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"language": properties["language"],"id": "1", "text": properties["value"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}

function onexecuteListKeyPhrases(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteListKeyPhrases");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                var phrases = obj.documents[0].keyPhrases;
                for (var key in phrases) {
                    postResult(
                        {
                            "keyPhrases": phrases[key]
                        });
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        };

        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Key_Phrases_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"language": properties["language"],"id": "1", "text": properties["value"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}

function onexecuteGetEntities(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();

        console.log(DebugTag+"onexecuteGetEntities");

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                postResult(obj.documents[0].entities.map(x => {
                    return {
                    "text": x.text,
                    "category": x.category,
                    "score":x.confidenceScore
                }}));
                resolve();
            } catch (e) {
                reject(e);
            }
        };

        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Entity_Analytics_API;

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));

        /* Call 1 document at a time */
        var bodyData = JSON.stringify({"documents": [{"id": "1", "text": properties["value"]}]});
        console.log(DebugTag+"body: "+bodyData);

        xhr.send(bodyData);
    });
}
