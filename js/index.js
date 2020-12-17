function getOutput() {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
    };

    fetch("https://o0n0b9xkik.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => {
        var list = JSON.parse(result);
        var outputText = "<ol>";
        for (var i = 0; i <= list.length; i++) {
            console.log(list[i]);
            if (list[i] != null) 
                outputText += "<li>" + list[i]["first_name"] + "; " + list[i]["last_name"] + "</li>";
            i++;
        }
        // list.array.forEach(element => {
        //     outputText += "<li>" + element['first_name'] + "; " + element['last_name'] + "</li>";
        // });
        outputText += "</ol>"
        console.log(outputText);
        //document.getElementById("output_field").innerHTML = outputText;
        document.getElementById("firstName").value = list[0]["first_name"];
        document.getElementById("lastName").value = list[0]["last_name"];
    })
    //.then(result => alert(result))
    .catch(error => console.log('error', error));
    ;
}

function redirect() {
    var claimNo = document.getElementById("warranty-number").value;
    var email = document.getElementById("email").value;
    //window.cookie = "claimNo=" + claimNo + "; email=" + email;
    var url = "amendment.html?claimNo=" + claimNo + "&email=" + email;
    window.location = url;
}

