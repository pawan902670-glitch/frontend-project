let mdm = document.getElementById("madicineName");

let mdt = document.getElementById("madicineTime");

let list = document.getElementById("reminderList");

let audio = document.getElementById("ringtone");

// IMPORTANT: activate audio on first click

document.addEventListener("click", function () {

  audio.play().then(() => {

    audio.pause();

    audio.currentTime = 0;

  }).catch(() => {});

}, { once: true });

function addReminder() {

  let name = mdm.value.trim();

  let time = mdt.value.trim();

  if (name === '' || time === '') {

    alert("please enter the name and time");

    return;

  }

  let li = document.createElement("li");

  li.textContent = name + " - " + time;

  list.appendChild(li);

  checkReminder(time, name);

  mdm.value = "";

  mdt.value = "";

}

function checkReminder(time, name) {

  let alarm = setInterval(function () {

    let now = new Date();

    let currentTime =

      now.getHours().toString().padStart(2, "0") +

      ":" +

      now.getMinutes().toString().padStart(2, "0");

    if (currentTime === time) {

      audio.loop = true;   // keep ringing

      audio.play();

      alert("Time to take your medicine: " + name);

      clearInterval(alarm);

    }

  }, 1000);

}

function Reset() {

  list.innerHTML = "";

  mdm.value = "";

  mdt.value = "";

}

function stopSound() {

  audio.pause();

  audio.currentTime = 0;

  audio.loop = false;

}