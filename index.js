var message = document.getElementById("message");
var cityId = document.getElementById("city");
var tempId = document.getElementById("temp");
var descId = document.getElementById("desc");
var iconId = document.getElementById("icon");
var countryId = document.getElementById("country");
var alertBox = document.querySelector('.alert.alert-danger')

//gets the geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        message.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// show time 
setInterval(() => {
    var currentTime = new Date();
    var currentTimeString = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById('time').innerHTML = currentTimeString;
}, 1000);

//show position function
function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    alertBox.style.display = 'none';

    //fetchAPI
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=1c6c7f1ade86699b29702d4240d16803`)
        .then(response => response.json())
        .then(tempData => {

            let desc = tempData.weather[0].description;
            let icon = tempData.weather[0].icon;
            let temp = tempData.main.temp;
            let country = tempData.sys.country;
            let city = tempData.name;


            document.querySelector('.weatherCon').innerHTML =
                `
                <div class="box">
                    <h2 id="city">${city}
                        <sup id="country">${country}</sup>
                    </h2>
                    <p id="temp">${temp}&#8451;</p>
                    <img id="icon" src="img/${icon}.png" alt="img" />
                    <p id="desc">${desc}</p>
                    <p id='time'></p>
                </div>
            `;



        })
        .catch((error) => {
            console.error('Error is:', error);
            alertBox.style.display = 'block';
            message.innerHTML = "Error: " + error;
        });

}

//show error function if any
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alertBox.style.display = 'block';
            message.innerHTML = "User denied the request for Geolocation,Please Allow location"

            break;
        case error.POSITION_UNAVAILABLE:
            alertBox.style.display = 'block';
            message.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            alertBox.style.display = 'block';
            message.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            alertBox.style.display = 'block';
            message.innerHTML = "An unknown error occurred."
            break;
    }
}




// 1c6c7f1ade86699b29702d4240d16803