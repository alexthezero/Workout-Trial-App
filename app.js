const STORAGE_KEYS = {
  workouts: "workoutBuilder_savedWorkouts_v1",
  history: "workoutBuilder_history_v1"
};

let savedWorkouts = [];
let workoutHistory = [];

let editingWorkoutId = null;
let activeSession = null;

let timerInterval = null;
let timerSeconds = 0;
let timerPaused = false;
let lastTimerSeconds = 0;

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupTabs();
  setupButtons();

  addExerciseCard();
  renderSavedWorkouts();
  renderHistory();
});

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-page").forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      $(btn.dataset.tab).classList.add("active");

      renderSavedWorkouts();
      renderHistory();
    });
  });
}

function setupButtons() {
  $("addExerciseBtn").addEventListener("click", () => addExerciseCard());
  $("saveWorkoutBtn").addEventListener("click", saveWorkout);
  $("clearBuilderBtn").addEventListener("click", clearBuilder);

  $("closeWorkoutBtn").addEventListener("click", closeWorkoutScreen);
  $("finishWorkoutBtn").addEventListener("click", finishWorkout);

  $("pauseTimerBtn").addEventListener("click", togglePauseTimer);
  $("resetTimerBtn").addEventListener("click", resetTimer);
  $("skipTimerBtn").addEventListener("click", skipTimer);

  $("clearHistoryBtn").addEventListener("click", clearHistory);
}

function loadData() {
  savedWorkouts = JSON.parse(localStorage.getItem(STORAGE_KEYS.workouts)) || [];
  workoutHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.history)) || [];
}

function saveData() {
  localStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(savedWorkouts));
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(workoutHistory));
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/* -----------------------------
   BUILDER
----------------------------- */

function addExerciseCard(data = {}) {
  const list = $("exerciseList");
  const card = document.createElement("div");
  card.className = "exercise-card";

  card.innerHTML = `
    <div class="exercise-head">
      <div class="exercise-number"></div>
      <button class="remove-exercise">Remove</button>
    </div>

    <label>Exercise Name</label>
    <input class="exercise-name" type="text" placeholder="Example: Bench Press" value="${escapeHTML(data.name || "")}" />

    <div class="grid-2">
      <div>
        <label>Sets</label>
        <input class="exercise-sets" type="number" min="1" value="${data.sets || 3}" />
      </div>
      <div>
        <label>Reps</label>
        <input class="exercise-reps" type="text" placeholder="8-12" value="${escapeHTML(data.reps || "8-12")}" />
      </div>
    </div>

    <div class="grid-2">
      <div>
        <label>Weight</label>
        <input class="exercise-weight" type="text" placeholder="Optional" value="${escapeHTML(data.weight || "")}" />
      </div>
      <div>
        <label>Rest Seconds</label>
        <input class="exercise-rest" type="number" min="0" value="${data.rest || 60}" />
      </div>
    </div>

    <label>Exercise Notes</label>
    <textarea class="exercise-notes" rows="2" placeholder="Form cues, tempo, machine setting, etc.">${escapeHTML(data.notes || "")}</textarea>
  `;

  card.querySelector(".remove-exercise").addEventListener("click", () => {
    card.remove();
    updateExerciseNumbers();
  });

  list.appendChild(card);
  updateExerciseNumbers();
}

function updateExerciseNumbers() {
  document.querySelectorAll(".exercise-card").forEach((card, index) => {
    card.querySelector(".exercise-number").textContent = index + 1;
  });
}

function getBuilderData() {
  const name = $("workoutName").value.trim();
  const type = $("workoutType").value;
  const notes = $("workoutNotes").value.trim();

  const exerciseCards = Array.from(document.querySelectorAll(".exercise-card"));

  const exercises = exerciseCards.map((card) => {
    return {
      id: makeId(),
      name: card.querySelector(".exercise-name").value.trim(),
      sets: Number(card.querySelector(".exercise-sets").value) || 1,
      reps: card.querySelector(".exercise-reps").value.trim(),
      weight: card.querySelector(".exercise-weight").value.trim(),
      rest: Number(card.querySelector(".exercise-rest").value) || 0,
      notes: card.querySelector(".exercise-notes").value.trim()
    };
  }).filter((exercise) => exercise.name);

  return {
    id: editingWorkoutId || makeId(),
    name,
    type,
    notes,
    exercises,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function saveWorkout() {
  const workout = getBuilderData();

  if (!workout.name) {
    alert("Give this workout a name first.");
    return;
  }

  if (workout.exercises.length === 0) {
    alert("Add at least one exercise.");
    return;
  }

  if (editingWorkoutId) {
    const index = savedWorkouts.findIndex((w) => w.id === editingWorkoutId);
    if (index !== -1) {
      workout.createdAt = savedWorkouts[index].createdAt;
      savedWorkouts[index] = workout;
    }
    editingWorkoutId = null;
    $("saveWorkoutBtn").textContent = "Save Workout";
  } else {
    savedWorkouts.unshift(workout);
  }

  saveData();
  clearBuilder();
  renderSavedWorkouts();

  switchToTab("saved");
}

function clearBuilder() {
  editingWorkoutId = null;
  $("workoutName").value = "";
  $("workoutType").value = "Full Body";
  $("workoutNotes").value = "";
  $("exerciseList").innerHTML = "";
  $("saveWorkoutBtn").textContent = "Save Workout";
  addExerciseCard();
}

function editWorkout(id) {
  const workout = savedWorkouts.find((w) => w.id === id);
  if (!workout) return;

  editingWorkoutId = workout.id;
  $("workoutName").value = workout.name;
  $("workoutType").value = workout.type;
  $("workoutNotes").value = workout.notes || "";

  $("exerciseList").innerHTML = "";
  workout.exercises.forEach((exercise) => addExerciseCard(exercise));

  $("saveWorkoutBtn").textContent = "Update Workout";
  switchToTab("builder");
}

/* -----------------------------
   SAVED WORKOUTS
----------------------------- */

function renderSavedWorkouts() {
  const container = $("savedWorkouts");
  container.innerHTML = "";

  if (savedWorkouts.length === 0) {
    container.innerHTML = `<div class="empty-state">No saved workouts yet. Build one and save it here.</div>`;
    return;
  }

  savedWorkouts.forEach((workout) => {
    const card = document.createElement("div");
    card.className = "saved-card";

    const totalSets = workout.exercises.reduce((sum, ex) => sum + Number(ex.sets || 0), 0);

    card.innerHTML = `
      <div class="card-content">
        <h3>${escapeHTML(workout.name)}</h3>
        <p class="meta-line">${escapeHTML(workout.type)} • ${workout.exercises.length} exercises • ${totalSets} sets</p>

        <div class="chip-row">
          ${workout.exercises.slice(0, 4).map((ex) => `<span class="chip">${escapeHTML(ex.name)}</span>`).join("")}
          ${workout.exercises.length > 4 ? `<span class="chip">+${workout.exercises.length - 4} more</span>` : ""}
        </div>

        <div class="card-actions">
          <button class="start">Start</button>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;

    card.querySelector(".start").addEventListener("click", () => startWorkout(workout.id));
    card.querySelector(".edit").addEventListener("click", () => editWorkout(workout.id));
    card.querySelector(".delete").addEventListener("click", () => deleteWorkout(workout.id));

    container.appendChild(card);
  });
}

function deleteWorkout(id) {
  const confirmed = confirm("Delete this saved workout?");
  if (!confirmed) return;

  savedWorkouts = savedWorkouts.filter((workout) => workout.id !== id);
  saveData();
  renderSavedWorkouts();
}

function switchToTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  document.querySelectorAll(".tab-page").forEach((page) => {
    page.classList.toggle("active", page.id === tabId);
  });
}

/* -----------------------------
   ACTIVE WORKOUT MODE
----------------------------- */

function startWorkout(id) {
  const workout = savedWorkouts.find((w) => w.id === id);
  if (!workout) return;

  activeSession = {
    id: makeId(),
    workoutId: workout.id,
    name: workout.name,
    type: workout.type,
    notes: workout.notes || "",
    startedAt: new Date().toISOString(),
    exercises: workout.exercises.map((exercise) => ({
      ...exercise,
      completedSets: Array(Number(exercise.sets || 1)).fill(false)
    }))
  };

  $("activeWorkoutTitle").textContent = workout.name;
  $("activeWorkoutScreen").classList.remove("hidden");

  renderActiveWorkout();
}

function renderActiveWorkout() {
  const container = $("activeExerciseList");
  container.innerHTML = "";

  activeSession.exercises.forEach((exercise, exerciseIndex) => {
    const card = document.createElement("div");
    card.className = "active-exercise";

    card.innerHTML = `
      <div class="active-exercise-top">
        <div>
          <h3>${escapeHTML(exercise.name)}</h3>
          <p>${escapeHTML(exercise.sets)} sets • ${escapeHTML(exercise.reps || "reps")} reps ${exercise.weight ? `• ${escapeHTML(exercise.weight)}` : ""}</p>
        </div>
        <span class="chip">${exercise.rest || 0}s rest</span>
      </div>

      ${exercise.notes ? `<p class="meta-line">${escapeHTML(exercise.notes)}</p>` : ""}

      <div class="set-grid">
        ${exercise.completedSets.map((done, setIndex) => `
          <button class="set-btn ${done ? "done" : ""}" data-exercise="${exerciseIndex}" data-set="${setIndex}">
            Set ${setIndex + 1}
          </button>
        `).join("")}
      </div>
    `;

    card.querySelectorAll(".set-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const exIndex = Number(button.dataset.exercise);
        const setIndex = Number(button.dataset.set);
        toggleSet(exIndex, setIndex);
      });
    });

    container.appendChild(card);
  });
}

function toggleSet(exerciseIndex, setIndex) {
  const exercise = activeSession.exercises[exerciseIndex];
  const wasDone = exercise.completedSets[setIndex];

  exercise.completedSets[setIndex] = !wasDone;

  if (!wasDone && exercise.rest > 0) {
    startTimer(Number(exercise.rest));
  }

  renderActiveWorkout();
}

function closeWorkoutScreen() {
  const confirmed = confirm("Close this workout? Progress will not be saved unless you finish it.");
  if (!confirmed) return;

  activeSession = null;
  $("activeWorkoutScreen").classList.add("hidden");
  skipTimer();
}

function finishWorkout() {
  if (!activeSession) return;

  const totalSets = activeSession.exercises.reduce((sum, ex) => sum + ex.completedSets.length, 0);
  const completedSets = activeSession.exercises.reduce((sum, ex) => {
    return sum + ex.completedSets.filter(Boolean).length;
  }, 0);

  const record = {
    id: makeId(),
    name: activeSession.name,
    type: activeSession.type,
    startedAt: activeSession.startedAt,
    completedAt: new Date().toISOString(),
    totalExercises: activeSession.exercises.length,
    totalSets,
    completedSets
  };

  workoutHistory.unshift(record);
  saveData();

  activeSession = null;
  $("activeWorkoutScreen").classList.add("hidden");
  skipTimer();

  renderHistory();
  switchToTab("history");
}

/* -----------------------------
   TIMER
----------------------------- */

function startTimer(seconds) {
  clearInterval(timerInterval);

  timerSeconds = seconds;
  lastTimerSeconds = seconds;
  timerPaused = false;

  updateTimerDisplay();

  timerInterval = setInterval(() => {
    if (timerPaused) return;

    timerSeconds--;

    if (timerSeconds <= 0) {
      timerSeconds = 0;
      clearInterval(timerInterval);
    }

    updateTimerDisplay();
  }, 1000);
}

function togglePauseTimer() {
  if (timerSeconds <= 0) return;

  timerPaused = !timerPaused;
  $("pauseTimerBtn").textContent = timerPaused ? "Resume" : "Pause";
}

function resetTimer() {
  if (lastTimerSeconds <= 0) return;
  startTimer(lastTimerSeconds);
}

function skipTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerPaused = false;
  $("pauseTimerBtn").textContent = "Pause";
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  $("timerDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* -----------------------------
   HISTORY
----------------------------- */

function renderHistory() {
  const container = $("historyList");
  container.innerHTML = "";

  if (workoutHistory.length === 0) {
    container.innerHTML = `<div class="empty-state">No completed workouts yet. Finish a workout and it will show here.</div>`;
    return;
  }

  workoutHistory.forEach((record) => {
    const date = new Date(record.completedAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    const time = new Date(record.completedAt).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit"
    });

    const card = document.createElement("div");
    card.className = "history-card";

    card.innerHTML = `
      <div class="card-content">
        <h3>${escapeHTML(record.name)}</h3>
        <p class="meta-line">${escapeHTML(record.type)} • ${date} at ${time}</p>

        <div class="chip-row">
          <span class="chip">${record.totalExercises} exercises</span>
          <span class="chip">${record.completedSets}/${record.totalSets} sets done</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function clearHistory() {
  if (workoutHistory.length === 0) return;

  const confirmed = confirm("Clear all workout history?");
  if (!confirmed) return;

  workoutHistory = [];
  saveData();
  renderHistory();
}

/* -----------------------------
   HELPERS
----------------------------- */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}