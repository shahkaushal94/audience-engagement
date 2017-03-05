(function(window){
	var SpeechAnalysis = function(){
	  var hostString = "cog-web-wu.azurewebsites.net";
    var appRoot = "cognitive-services";
    var endpoint = "/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false"
    var uri =  `wss://${hostString}/${appRoot}${endpoint}`;
    var sentimentUrl = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
    var sentiStats = [];

    //var uri = "https://speechjs.azurewebsites.net"

    var speech = new Speech(uri);
    window.textToDisplay = "";
    window.statsToDiaplay = "";

    if (!speech.isListening) {
            document.body.className = "listening";

            speech.startListening(
                function(partialTxt) {
                	console.log("Parital: " + partialTxt);
                  document.getElementById('outputText').innerHTML 
                  = ` 
                  <span class='full'>${textToDisplay}</span> <span class='partial'>${partialTxt}</span>
                  `;                    
                }, 
                function(fullText) {
                    axios({
                        method: 'post',
                        url: sentimentUrl,
                        headers: {
                            'Content-Type': 'application/json',
                            'Ocp-Apim-Subscription-Key': 'a93372a510884c518b6dd44028aacfe6'
                        },
                        data: {
                         "documents": [
                                {
                                 "language": "en",
                                 "id": "1",
                                 "text": fullText
                             }
                         ]
                        }
                    })
                      .then(function (response) {
                        console.log("Fulltext: " + fullText);
                        statsToDiaplay = `${statsToDiaplay} ${response.data.documents[0].score}`
                        sentiStats.push(response.data.documents[0].score);
                        window.sentiStats = sentiStats;
                        textToDisplay = `${textToDisplay} ${fullText}`;
                        document.getElementById('outputText').innerHTML 
                        = ` 
                        <div>
                            <div id="sentimentStats">${statsToDiaplay}</div>
                            <span class='full'>${textToDisplay}</span>
                        </div>
                        `;
                    })
                      .catch(function (error) {
                        console.log(error);
                      });
                }, 
                function(err) {
                    document.body.className = "";
                    console.log("Error: " + err);
                }
            );

        } else {
            document.body.className = "";
            speech.stopListening();
        }
	}

 window.SpeechAnalysis = SpeechAnalysis;

})(window)