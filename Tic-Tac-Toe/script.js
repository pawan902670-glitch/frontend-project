let turnO = true;

const boxes = document.querySelectorAll(".box");
const reset = document.getElementById("resetBtn");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      boxes[a].style.backgroundColor = "#ff4d4d";
      boxes[b].style.backgroundColor = "#ff4d4d";
      boxes[c].style.backgroundColor = "#ff4d4d";

      boxes[a].style.boxShadow = "0 0 15px red, 0 0 30px red";
      boxes[b].style.boxShadow = "0 0 15px red, 0 0 30px red";
      boxes[c].style.boxShadow = "0 0 15px red, 0 0 30px red";

      boxes[a].style.transform = "scale(1.1)";
      boxes[b].style.transform = "scale(1.1)";
      boxes[c].style.transform = "scale(1.1)";

      setTimeout(() => {
        alert(`Winner is ${boxes[a].innerText}!`);
      }, 100);

      disableBoxes();
      return;
    }
  }

  let allFilled = true;

  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    setTimeout(() => {
      alert("It's a Draw!");
    }, 100);

    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    checkWinner();
  });
});

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
    box.style.backgroundColor = "";
    box.style.boxShadow = "";
    box.style.transform = "";
  });

  turnO = true;
});