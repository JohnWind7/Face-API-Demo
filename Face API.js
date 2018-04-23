document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){

	
	$("#face_img").attr('src', $('input').val());

	var reqBody = {
	        "url": $('input').val()
	   
	};

	var params = {
	    "returnFaceId": "true",
	    "returnFaceLandmarks": "false",
	    "returnFaceAttributes": "age,gender",
	};

	var myHeader =  new Headers({
	    'Content-Type': 'application/json',
	    'Ocp-Apim-Subscription-Key': '376aae64d0fe4d45bbfff6ada1a5d446'
	    
	});

	var initObject = {
	    method: 'POST',
	    body: JSON.stringify(reqBody),
	    headers: myHeader
	}

	var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'+"?"+$.param(params), initObject);


	fetch(request).then(function(response){
	    if(response.ok){
	        return response.json();
	    }
	    else{
	        return Promise.reject(new Error(response.statusText));
	    }
	}).then(function(response){
	    document.getElementById("output").innerHTML = "Gender: "+response[0].faceAttributes.gender+"<br>Age: "+response[0].faceAttributes.age;
	}).catch(function(err){
	    alert(err);  
	    document.getElementById("output").innerHTML = "";
	});

}
