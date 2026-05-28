const dobInput = document.getElementById("dob");
const result = document.getElementById("result");

let timer;

function calculateAge() {
  const value = dobInput.value;

  if (!value) {
    result.innerHTML = "Please select your birth date";
    return;
  }

  const birthDate = new Date(value);

  if (birthDate > new Date()) {
    result.innerHTML = "Birth date cannot be in the future";
    return;
  }

  clearInterval(timer);

  function updateAge() {
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      ).getDate();

      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    result.innerHTML = `
      <span>Your Age</span><br><br>

      ${years} Years<br>
      ${months} Months<br>
      ${days} Days<br><br>

      ${hours}h :
      ${minutes}m :
      ${seconds}s
    `;
  }

  updateAge();

  timer = setInterval(updateAge, 1000);
}