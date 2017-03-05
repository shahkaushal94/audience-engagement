
(function() {

    var hostString = "cog-web-wu.azurewebsites.net";
    var appRoot = "cognitive-services";
    var endpoint = "/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false"
    var uri =  `wss://${hostString}/${appRoot}${endpoint}`;
    var sentimentUrl = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

    //var uri = "https://speechjs.azurewebsites.net"

    var speech = new Speech(uri);
    window.textToDisplay = "";
    window.statsToDiaplay = "";

    document.getElementById('toggleMic').addEventListener('click', function(e) {

        if (!speech.isListening) {
            document.body.className = "listening";

            speech.startListening(
                function(partialTxt) {
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
                                 "text": partialTxt
                             }
                         ]
                        }
                    })
                      .then(function (response) {
                        console.log("Partial: " + partialTxt);
                        statsToDiaplay = `${statsToDiaplay} ${response.data.documents[0].score}`
                        document.getElementById('outputText').innerHTML 
                        = ` 
                        <div>
                            <div>${statsToDiaplay}</div>
                            <span class='full'>${textToDisplay}</span> <span class='partial'>${partialTxt}</span>
                        </div>
                        `;
                    })
                      .catch(function (error) {
                        console.log(error);
                      });
                }, 
                function(fullText) {
                    console.log("Full: " + fullText);
                    textToDisplay = `${textToDisplay} ${fullText}`;

                    document.getElementById('outputText').innerHTML 
                    =  `
                    <div>
                        <div>15</div>
                        <span class='full'>${textToDisplay}</span>
                    </div>
                    `;
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

    }.bind(this));


})();