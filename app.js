document.getElementById('getWeather').addEventListener('click', function () {
    // Get the city entered by the user
    const city = document.getElementById('city').value.trim();

    // Validate input
    if (!city) {
        document.getElementById('weather').innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    // Backend URL
    const url = `http://127.0.0.1:5000/weather?city=${city}`;

    // Fetch weather data from the backend
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle errors from backend
            if (data.error) {
                document.getElementById('weather').innerHTML = `<p>${data.error}</p>`;
                return;
            }

            // Display weather information
            document.getElementById('weather').innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;

            // Get weather condition
            const condition = data.weather[0].main.toLowerCase();
            const videoElement = document.getElementById('background-video');

            // Fallback to image if no video is available
            function setBackground(videoSrc, imageSrc) {
                if (videoElement && videoSrc) {
                    videoElement.src = videoSrc;
                    videoElement.style.display = 'block';
                    videoElement.play();
                } else {
                    videoElement.style.display = 'none'; // Hide video element
                    document.body.style.backgroundImage = `url('${imageSrc}')`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center';
                }
            }

            // Set background based on condition
            if (condition.includes('cloud')) {
                setBackground('videos/cloudy.mp4', 'images/cloudy.jpg');
            } else if (condition.includes('rain')) {
                setBackground('videos/rainy.mp4', 'images/rainy.jpg');
            } else if (condition.includes('clear')) {
                setBackground('videos/sunny.mp4', 'images/sunny.jpg');
            } else if (condition.includes('snow')) {
                setBackground('videos/snowy.mp4', 'images/snowy.jpg');
            } else if (condition.includes('thunderstorm')) {
                setBackground('videos/thunderstorm.mp4', 'images/thunderstorm.jpg');
            } else {
                setBackground(null, 'images/default.jpg'); // Default fallback image
            }
        })
        .catch(error => {
            // Handle fetch errors
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});
