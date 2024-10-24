let requestOptions = {
    method: 'POST',
    headers : {
        //"Host": "postman-echo.com",
        //"Content-Type": "application/x-www-form-urlencoded",
        //"Content-Length": 27
        "Content-Type": "application/json",
    },
    //body : "field1=value1&field2=value2"
    body : JSON.stringify({field1: "value1", field2: "value2"})
  };
  
  fetch("http://postman-echo.com/post", requestOptions)
    .then(response => response.json())
    .then(objResponse => {console.log(objResponse.headers); return objResponse;})
    .then(objResponse => console.log("-->", objResponse.data))
    .catch(error => console.log('error', error));
