const mdm = document.getElementById("madicineName");
const mdt = document.getElementById("madicineTime");
const list = document.getElementById("reminderList");
const audio = document.getElementById("ringtone");

let reminders = [];

document.addEventListener(
  "click",
  () => {
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  },
  { once: true }
);

function addReminder() {
  const name = mdm.value.trim();
  const time = mdt.value;

  if (!name || !time) {
    alert("Please enter medicine name and time.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${name} - ${time}`;
  list.appendChild(li);

  checkReminder(time, name);

  mdm.value = "";
  mdt.value = "";
}

function checkReminder(time, name) {
  const interval = setInterval(() => {
    const now = new Date();

    const currentTime =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    if (currentTime === time) {
      audio.loop = true;
      audio.play().catch(() => {});
      alert(`💊 Time to take your medicine: ${name}`);
      clearInterval(interval);
      reminders = reminders.filter((id) => id !== interval);
    }
  }, 1000);

  reminders.push(interval);
}

function Reset() {
  list.innerHTML = "";
  mdm.value = "";
  mdt.value = "";

  reminders.forEach((id) => clearInterval(id));
  reminders = [];

  stopSound();
}

function stopSound() {
  audio.pause();
  audio.currentTime = 0;
  audio.loop = false;
}