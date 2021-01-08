const url = new URL(window.location.href);

function fetchData() {
    var myHeaders = new Headers();
    var claimNo = url.searchParams.get("claimNo");
    var email = url.searchParams.get("email");
    document.getElementById("claimNo").value = claimNo;
    document.getElementById("modifiedBy").value = email;

    var raw = JSON.stringify({"claimNo" : claimNo});
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    var destination = "https://o0n0b9xkik.execute-api.ap-southeast-2.amazonaws.com/dev/claims";
    fetch(destination, requestOptions)
    .then(response => response.text())
    .then(result => {
        var list = JSON.parse(result);

        for (var key of Object.keys(list[0])) {
            if (document.getElementById(key) != null)
                document.getElementById(key).value = list[0][key];
        }

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
                if (document.getElementById(key) != null)
                    document.getElementById(key).value = list[0][key];
                else if (key != 'id') 
                    throw key;
            }
        }
        catch (err){
            console.log("Empty fields error");
        }
    })
    .catch(error => console.log('error', error));
    ;    
}

function sendUpdates() {
    var contents =  document.querySelectorAll('input');   
    var object = {};
    try {
        for (var i = 0; i < contents.length; i++){
            if (contents[i].value === "") {
                var message =  contents[i].id + " is empty";
                throw message;
            } else 
                object[contents[i].id] = contents[i].value;
        }
    }
    catch (err) {
        window.alert(err);
        return;
    }
    
    object['action'] = 'POST';
    var raw = JSON.stringify(object);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://d0x83sym95.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
    .catch(error => console.log('error', error));

    window.alert("Updates sent");
    window.location = 'index.html';
}
    
