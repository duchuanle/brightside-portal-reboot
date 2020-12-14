function getInfo(policyNumber) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var pnum = JSON.stringify({"policy_number" : policyNumber})
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: pnum
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
        outputText += "</ol>"
        console.log(outputText);
        document.getElementById("firstName").value = list[0]["first_name"];
        document.getElementById("lastName").value = list[0]["last_name"];
    })
    .catch(error => console.log('error', error));
    ;
}

function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch("https://o0n0b9xkik.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => {
        var list = JSON.parse(result);
        console.log(list);

        for (var key of Object.keys(list[0])) {
            // console.log(key);
            if (document.getElementById(key) != null)
                document.getElementById(key).value = list[0][key];
        }
        document.getElementById("claimNo").value = list[0]["id"];

        var product_purchase_date = new Date(list[0]["product_purchase_date"]);
        document.getElementById("product_purchase_day").value = product_purchase_date.getDate();
        document.getElementById("product_purchase_month").value = product_purchase_date.getMonth()+1;
        document.getElementById("product_purchase_year").value = product_purchase_date.getFullYear();

        var expiry = new Date(list[0]["expiry"]);
        document.getElementById("expiry_day").value = expiry.getDate();
        document.getElementById("expiry_month").value = expiry.getMonth()+1;
        document.getElementById("expiry_year").value = expiry.getFullYear();

        try {
            for (var key of Object.keys(list[0])) {
                // console.log(key);
                if (document.getElementById(key) != null)
                    document.getElementById(key).value = list[0][key];
                else if (key != 'id') 
                    throw key;
            }
        }
        catch (err){
            window.alert(key + " is empty");
        }
    })
    .catch(error => console.log('error', error));
    ;    
}

function sendUpdates() {
    var contents =  document.querySelectorAll('input');   
    var object = {};
    //console.log(contents);
    for (var i = 0; i < contents.length; i++){
        console.log(contents[i].value);
        object[contents[i].id] = contents[i].value;
    }
    object['action'] = 'POST';
    var raw = JSON.stringify(object);
    console.log(JSON.stringify(object));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://d0x83sym95.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}
    
