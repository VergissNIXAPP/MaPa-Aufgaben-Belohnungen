
let points = parseInt(localStorage.getItem("points")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([
      { title: "🧹 Zimmer aufräumen", pts: 10 },
      { title: "🦷 Zähne putzen", pts: 5 },
      { title: "📚 Hausaufgaben machen", pts: 15 }
    ]));
  }

  if (!localStorage.getItem("rewards")) {
    localStorage.setItem("rewards", JSON.stringify([
      { title: "🎮 30 Minuten Zocken", cost: 50 },
      { title: "🍦 1 Eis", cost: 30 }
    ]));
  }

  updateDisplay();
});

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const pts = parseInt(document.getElementById("taskPoints").value);
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.push({ title, pts });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  alert("Aufgabe gespeichert.");
}

function addReward() {
  const title = document.getElementById("rewardTitle").value;
  const cost = parseInt(document.getElementById("rewardPoints").value);
  const rewardList = JSON.parse(localStorage.getItem("rewards")) || [];
  rewardList.push({ title, cost });
  localStorage.setItem("rewards", JSON.stringify(rewardList));
  alert("Belohnung gespeichert.");
}

function updateDisplay() {
  const taskContainer = document.getElementById("taskList");
  const rewardContainer = document.getElementById("rewardList");
  if (taskContainer) {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskContainer.innerHTML = '';
    taskList.forEach((task, index) => {
      const el = document.createElement("div");
      el.innerHTML = `<strong>${task.title}</strong> – ${task.pts} Punkte 
        <button onclick="completeTask(${index}, ${task.pts})">✅ Erledigt</button>`;
      taskContainer.appendChild(el);
    });
  }

  if (rewardContainer) {
    const rewardList = JSON.parse(localStorage.getItem("rewards")) || [];
    rewardContainer.innerHTML = '';
    rewardList.forEach((reward, index) => {
      const el = document.createElement("div");
      el.className = "reward-item";
      el.innerHTML = `<strong>${reward.title}</strong> – ${reward.cost} Punkte 
        <button onclick="claimReward(${index}, ${reward.cost})">🎁 Einlösen</button>`;
      rewardContainer.appendChild(el);
    });
  }

  const pointDisplay = document.getElementById("pointDisplay");
  if (pointDisplay) pointDisplay.textContent = points;
}

function completeTask(index, pts) {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  points += pts;
  localStorage.setItem("points", points);
  updateDisplay();
}

function claimReward(index, cost) {
  if (points >= cost) {
    points -= cost;
    localStorage.setItem("points", points);
    const rewardList = JSON.parse(localStorage.getItem("rewards")) || [];
    const rewardTitle = rewardList[index].title;
    rewardList.splice(index, 1);
    localStorage.setItem("rewards", JSON.stringify(rewardList));
    showRewardAnimation(rewardTitle);
    updateDisplay();
  } else {
    alert("Nicht genug Punkte!");
  }
}

function showRewardAnimation(title) {
  const anim = document.createElement("div");
  anim.className = "reward-animation";
  anim.textContent = `🎉 Belohnung erhalten: ${title}`;
  document.body.appendChild(anim);
  setTimeout(() => {
    anim.classList.add("fadeout");
    setTimeout(() => anim.remove(), 1000);
  }, 2000);
}
