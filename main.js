let curr_track = document.createElement('audio'); 
let titleName = document.getElementById("title");
let musicName = document.getElementById("music");

let seek_slider = document.querySelector(".seek_slider"); 
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".total-duration"); 

let photo = document.querySelector(".image")

let track_index = 0; 
let isPlaying = false; 
let updateTimer; 

let trackList = [{
    name: "My Bloody Valentine",
    currentMusic: "Only Shallow",
    path: "./audio/mbv1.mp3",
    image: "./images/index.jpg"
},{ name: "My Bloody Valentine",
    currentMusic: "Loomer",
    path: "./audio/mbv2.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "Touched",
    path: "./audio/mbv3.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "To Here Knows When",
    path: "./audio/mbv4.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "When You Sleep",
    path: "./audio/mbv5.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: " I Only Said",
    path: "./audio/mbv6.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "Come in Alone",
    path: "./audio/mbv7.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "Sometimes",
    path: "./audio/mbv8.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "Blown a Wish",
    path: "./audio/mbv9.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "What You Want",
    path: "./audio/mbv10.mp3",
    image: "./images/index.jpg"
},{
    name: "My Bloody Valentine",
    currentMusic: "Soon",
    path: "./audio/mbv11.mp3",
    image: "./images/index.jpg"
},]

function nextTrack(){
    if(track_index == trackList.length - 1){
        track_index = 0;
    }else{
        track_index += 1;
    }

    loadTrack(track_index);
    playTrack();
}

function seekTo() { 
    // Calculate the seek position by the 
    // percentage of the seek slider  
    // and get the relative duration to the track 
    seekto = curr_track.duration * (seek_slider.value / 100); 
    
    // Set the current track position to the calculated seek position 
    curr_track.currentTime = seekto; 
  }

function seekUpdate() { 
    let seekPosition = 0; 
    
    // Check if the current track duration is a legible number 
    if (!isNaN(curr_track.duration)) { 
      seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
      seek_slider.value = seekPosition; 
    
      // Calculate the time left and the total duration 
      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
      // Add a zero to the single digit time values 
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
      // Display the updated duration 
      curr_time.textContent = currentMinutes + ":" + currentSeconds; 
      total_duration.textContent = durationMinutes + ":" + durationSeconds; 
    } 
} 

function resetValues(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    photo.style.backgroundImage = "url(" + trackList[track_index].image + ")"
    curr_track.src = trackList[track_index].path
    curr_track.load();
    titleName.innerHTML = trackList[track_index].name
    musicName.innerHTML = trackList[track_index].currentMusic

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack) 

} 

loadTrack(track_index)

function playpauseTrack() { 
  if (!isPlaying) playTrack(); 
  else pauseTrack(); 
} 

function playTrack(){
    curr_track.play();
    isPlaying = true
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false
}

