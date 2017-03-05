function getSearchImages(callback) {
    var params = {
            // Request parameters
            'q' : 'silly cats'
        };
        
        $.post({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","multipart/form-data");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a83e41c436674949a3b3798fa1391761");
            },
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            if (callback) {
                return callback(data.value[0].contentUrl);
            }
        })
        .fail(function(err) {
            console.log(err);
        });
    }