const medicineName = document.getElementById("medicineName");
const medicineTime = document.getElementById("medicineTime");
const reminderList = document.getElementById("reminderList");
const audio = document.getElementById("ringtone");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
let intervals = [];

document.addEventListener(
  "click",
  () => {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  },
  { once: true }
);

renderReminders();

function addReminder() {

  const name = medicineName.value.trim();
  const time = medicineTime.value;

  if (!name || !time) {
    alert("Please enter medicine name and time.");
    return;
  }

  reminders.push({
    name,
    time
  });

  saveData();

  medicineName.value = "";
  medicineTime.value = "";

  renderReminders();
}

function renderReminders() {

  reminderList.innerHTML = "";

  intervals.forEach(id => clearInterval(id));
  intervals = [];

  reminders.forEach((item,index)=>{

    const li=document.createElement("li");

    li.innerHTML=`
      <span>💊 ${item.name} (${item.time})</span>
      <button class="delete" onclick="deleteReminder(${index})">
      Delete
      </button>
    `;

    reminderList.appendChild(li);

    startReminder(item);
  });

}

function startReminder(reminder){

    const id=setInterval(()=>{

        const now=new Date();

        const current=
        String(now.getHours()).padStart(2,"0")+
        ":"+
        String(now.getMinutes()).padStart(2,"0");

        if(current===reminder.time){

            audio.loop=true;

            audio.play().catch(()=>{});

            alert(`💊 Time to take ${reminder.name}`);

            clearInterval(id);

        }

    },1000);

    intervals.push(id);
}

function deleteReminder(index){

    reminders.splice(index,1);

    saveData();

    renderReminders();

}

function resetAll(){

    reminders=[];

    saveData();

    renderReminders();

    stopSound();

}

function stopSound(){

    audio.pause();

    audio.currentTime=0;

    audio.loop=false;

}

function saveData(){

    localStorage.setItem(
        "reminders",
        JSON.stringify(reminders)
    );

}