function getSearchImages(queryString, callback) {
    var params = {
            // Request parameters
            'q' : queryString
        };
        
        $.post({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","multipart/form-data");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","22e1a66378f34b84b9aecac858361442");
            },
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            return callback(data.value[0].contentUrl);
        })
        .fail(function(err) {
            console.log(err);
        });
    }
