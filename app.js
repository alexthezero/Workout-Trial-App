const STORAGE_KEYS = {
  workouts: "workoutBuilder_savedWorkouts_v1",
  history: "workoutBuilder_history_v1",
  hiddenTemplates: "workoutBuilder_hiddenTemplates_v1"
};

const DEFAULT_WORKOUT_TEMPLATES = [
  {
    templateId: "pf_upper_body_v1",
    isTemplate: true,
    name: "PF Upper Body",
    type: "Upper Body",
    notes: "Planet Fitness-style upper body workout using common machines and cables. Start light, control the movement, and avoid maxing out.",
    exercises: [
      {
        name: "Treadmill or Elliptical Warm-Up",
        sets: 1,
        reps: "5 minutes",
        weight: "Easy pace",
        rest: 30,
        notes: "Start every workout with light cardio to get warm."
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Keep your back against the pad and press under control."
      },
      {
        name: "Lat Pulldown Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Pull the bar toward your upper chest. Do not swing."
      },
      {
        name: "Seated Row Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Squeeze your shoulder blades together at the back of the movement."
      },
      {
        name: "Shoulder Press Machine",
        sets: 3,
        reps: "8-12",
        weight: "Light to moderate",
        rest: 75,
        notes: "Do not lock out hard at the top."
      },
      {
        name: "Pec Deck Machine",
        sets: 2,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Use controlled reps and squeeze your chest."
      },
      {
        name: "Rear Delt Machine",
        sets: 2,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Lead with your elbows and avoid shrugging."
      },
      {
        name: "Cable Triceps Pressdown",
        sets: 2,
        reps: "10-15",
        weight: "Moderate",
        rest: 60,
        notes: "Keep elbows tucked close to your sides."
      },
      {
        name: "Bicep Curl Machine or Cable Curl",
        sets: 2,
        reps: "10-15",
        weight: "Moderate",
        rest: 60,
        notes: "Do not swing your body. Keep tension on the biceps."
      },
      {
        name: "Treadmill Cooldown Walk",
        sets: 1,
        reps: "3-5 minutes",
        weight: "Easy pace",
        rest: 0,
        notes: "End with light cardio to bring your heart rate down."
      }
    ]
  },
  {
    templateId: "pf_lower_body_v1",
    isTemplate: true,
    name: "PF Lower Body",
    type: "Lower Body",
    notes: "Planet Fitness-style lower body workout using common machines. Keep the first set lighter, then build into working sets.",
    exercises: [
      {
        name: "Bike or Treadmill Warm-Up",
        sets: 1,
        reps: "5 minutes",
        weight: "Easy pace",
        rest: 30,
        notes: "Warm up your legs before lifting."
      },
      {
        name: "Leg Press Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 90,
        notes: "Keep feet flat. Do not let your knees cave inward."
      },
      {
        name: "Smith Machine Squat",
        sets: 3,
        reps: "8-10",
        weight: "Light to moderate",
        rest: 90,
        notes: "Use a comfortable range of motion. Start light until form feels solid."
      },
      {
        name: "Leg Extension Machine",
        sets: 3,
        reps: "10-15",
        weight: "Moderate",
        rest: 75,
        notes: "Pause briefly at the top without jerking the weight."
      },
      {
        name: "Seated Leg Curl Machine",
        sets: 3,
        reps: "10-15",
        weight: "Moderate",
        rest: 75,
        notes: "Control the return. Feel the hamstrings working."
      },
      {
        name: "Hip Abductor Machine",
        sets: 2,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Push outward under control."
      },
      {
        name: "Hip Adductor Machine",
        sets: 2,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Squeeze inward under control."
      },
      {
        name: "Calf Raise Machine or Leg Press Calf Raises",
        sets: 3,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Get a full stretch at the bottom and squeeze at the top."
      },
      {
        name: "Treadmill Cooldown Walk",
        sets: 1,
        reps: "3-5 minutes",
        weight: "Easy pace",
        rest: 0,
        notes: "End with a relaxed walk."
      }
    ]
  },
  {
    templateId: "pf_core_v1",
    isTemplate: true,
    name: "PF Core",
    type: "Core",
    notes: "Planet Fitness-style core workout using common ab machines, cables, and bodyweight movements.",
    exercises: [
      {
        name: "Treadmill or Elliptical Warm-Up",
        sets: 1,
        reps: "5 minutes",
        weight: "Easy pace",
        rest: 30,
        notes: "Light cardio to warm up before core work."
      },
      {
        name: "Ab Crunch Machine",
        sets: 3,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Crunch with control. Do not yank with your arms."
      },
      {
        name: "Captain’s Chair Knee Raises",
        sets: 3,
        reps: "8-12",
        weight: "Bodyweight",
        rest: 60,
        notes: "Lift knees slowly and avoid swinging."
      },
      {
        name: "Cable Wood Chop",
        sets: 3,
        reps: "10 each side",
        weight: "Light to moderate",
        rest: 60,
        notes: "Rotate through your torso, not just your arms."
      },
      {
        name: "Rotary Torso Machine",
        sets: 2,
        reps: "10-12 each side",
        weight: "Light to moderate",
        rest: 60,
        notes: "Move slow and controlled. Do not twist aggressively."
      },
      {
        name: "Plank",
        sets: 3,
        reps: "30-45 seconds",
        weight: "Bodyweight",
        rest: 60,
        notes: "Keep your hips level and core tight."
      },
      {
        name: "Back Extension Machine",
        sets: 2,
        reps: "12-15",
        weight: "Bodyweight or light",
        rest: 60,
        notes: "This balances the core work by training the lower back."
      },
      {
        name: "Treadmill Cooldown Walk",
        sets: 1,
        reps: "3-5 minutes",
        weight: "Easy pace",
        rest: 0,
        notes: "Finish with light cardio."
      }
    ]
  }
];

const PF_EQUIPMENT_BY_AREA = {
  upper: [
    {
      equipment: "Chest Press Machine",
      description: "Chest, shoulders, triceps",
      exercise: {
        name: "Chest Press Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Keep your back against the pad and press under control."
      }
    },
    {
      equipment: "Lat Pulldown Machine",
      description: "Back and biceps",
      exercise: {
        name: "Lat Pulldown Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Pull toward your upper chest without swinging."
      }
    },
    {
      equipment: "Seated Row Machine",
      description: "Middle back and rear shoulders",
      exercise: {
        name: "Seated Row Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 75,
        notes: "Squeeze your shoulder blades together."
      }
    },
    {
      equipment: "Shoulder Press Machine",
      description: "Shoulders and triceps",
      exercise: {
        name: "Shoulder Press Machine",
        sets: 3,
        reps: "8-12",
        weight: "Light to moderate",
        rest: 75,
        notes: "Press smoothly. Do not lock out aggressively."
      }
    },
    {
      equipment: "Pec Deck Machine",
      description: "Chest isolation",
      exercise: {
        name: "Pec Deck Machine",
        sets: 2,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Keep the movement controlled and squeeze the chest."
      }
    },
    {
      equipment: "Rear Delt Machine",
      description: "Rear shoulders and upper back",
      exercise: {
        name: "Rear Delt Machine",
        sets: 2,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Lead with your elbows and avoid shrugging."
      }
    },
    {
      equipment: "Cable Triceps Pressdown",
      description: "Triceps",
      exercise: {
        name: "Cable Triceps Pressdown",
        sets: 2,
        reps: "10-15",
        weight: "Moderate",
        rest: 60,
        notes: "Keep elbows tucked at your sides."
      }
    },
    {
      equipment: "Bicep Curl Machine",
      description: "Biceps",
      exercise: {
        name: "Bicep Curl Machine",
        sets: 2,
        reps: "10-15",
        weight: "Moderate",
        rest: 60,
        notes: "Use controlled reps. Do not swing."
      }
    },
    {
      equipment: "Cable Curl",
      description: "Biceps using cable station",
      exercise: {
        name: "Cable Curl",
        sets: 2,
        reps: "10-15",
        weight: "Moderate",
        rest: 60,
        notes: "Keep elbows close to your sides and curl smoothly."
      }
    }
  ],

  lower: [
    {
      equipment: "Leg Press Machine",
      description: "Quads, glutes, hamstrings",
      exercise: {
        name: "Leg Press Machine",
        sets: 3,
        reps: "10-12",
        weight: "Moderate",
        rest: 90,
        notes: "Keep feet flat and knees tracking forward."
      }
    },
    {
      equipment: "Smith Machine Squat",
      description: "Quads, glutes, full lower body",
      exercise: {
        name: "Smith Machine Squat",
        sets: 3,
        reps: "8-10",
        weight: "Light to moderate",
        rest: 90,
        notes: "Start light and keep the movement controlled."
      }
    },
    {
      equipment: "Leg Extension Machine",
      description: "Quads",
      exercise: {
        name: "Leg Extension Machine",
        sets: 3,
        reps: "10-15",
        weight: "Moderate",
        rest: 75,
        notes: "Pause briefly at the top."
      }
    },
    {
      equipment: "Seated Leg Curl Machine",
      description: "Hamstrings",
      exercise: {
        name: "Seated Leg Curl Machine",
        sets: 3,
        reps: "10-15",
        weight: "Moderate",
        rest: 75,
        notes: "Control the weight back up."
      }
    },
    {
      equipment: "Hip Abductor Machine",
      description: "Outer glutes and hips",
      exercise: {
        name: "Hip Abductor Machine",
        sets: 2,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Push outward under control."
      }
    },
    {
      equipment: "Hip Adductor Machine",
      description: "Inner thighs",
      exercise: {
        name: "Hip Adductor Machine",
        sets: 2,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Squeeze inward under control."
      }
    },
    {
      equipment: "Calf Raise Machine",
      description: "Calves",
      exercise: {
        name: "Calf Raise Machine",
        sets: 3,
        reps: "12-20",
        weight: "Moderate",
        rest: 60,
        notes: "Full stretch at the bottom, squeeze at the top."
      }
    },
    {
      equipment: "Dumbbell Romanian Deadlift",
      description: "Hamstrings, glutes, lower back",
      exercise: {
        name: "Dumbbell Romanian Deadlift",
        sets: 3,
        reps: "8-12",
        weight: "Light to moderate",
        rest: 90,
        notes: "Hinge at the hips, keep your back neutral, and feel the hamstring stretch."
      }
    }
  ],

  core: [
    {
      equipment: "Ab Crunch Machine",
      description: "Abs",
      exercise: {
        name: "Ab Crunch Machine",
        sets: 3,
        reps: "12-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Crunch with control. Do not yank with your arms."
      }
    },
    {
      equipment: "Captain’s Chair Knee Raises",
      description: "Lower abs and hip flexors",
      exercise: {
        name: "Captain’s Chair Knee Raises",
        sets: 3,
        reps: "8-12",
        weight: "Bodyweight",
        rest: 60,
        notes: "Avoid swinging. Lift your knees slowly."
      }
    },
    {
      equipment: "Cable Wood Chop",
      description: "Obliques and rotational core",
      exercise: {
        name: "Cable Wood Chop",
        sets: 3,
        reps: "10 each side",
        weight: "Light to moderate",
        rest: 60,
        notes: "Rotate through your torso, not just your arms."
      }
    },
    {
      equipment: "Rotary Torso Machine",
      description: "Obliques",
      exercise: {
        name: "Rotary Torso Machine",
        sets: 2,
        reps: "10-12 each side",
        weight: "Light to moderate",
        rest: 60,
        notes: "Move slowly. Do not twist aggressively."
      }
    },
    {
      equipment: "Plank",
      description: "Full core stability",
      exercise: {
        name: "Plank",
        sets: 3,
        reps: "30-45 seconds",
        weight: "Bodyweight",
        rest: 60,
        notes: "Keep hips level and core tight."
      }
    },
    {
      equipment: "Back Extension Machine",
      description: "Lower back and posterior chain",
      exercise: {
        name: "Back Extension Machine",
        sets: 2,
        reps: "12-15",
        weight: "Bodyweight or light",
        rest: 60,
        notes: "Train the lower back to balance your core work."
      }
    },
    {
      equipment: "Cable Crunch",
      description: "Abs using cable station",
      exercise: {
        name: "Cable Crunch",
        sets: 3,
        reps: "10-15",
        weight: "Light to moderate",
        rest: 60,
        notes: "Round through your abs. Do not just pull with your arms."
      }
    }
  ]
};

let savedWorkouts = [];
let workoutHistory = [];
let hiddenTemplateIds = [];

let editingWorkoutId = null;
let activeSession = null;

let timerInterval = null;
let timerSeconds = 0;
let timerPaused = false;
let lastTimerSeconds = 0;

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  ensureDefaultWorkouts();
  setupTabs();
  setupButtons();

  addExerciseCard();
  renderEquipmentPicker();
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

  $("areaPicker").addEventListener("change", renderEquipmentPicker);
  $("addCardioBookendsBtn").addEventListener("click", addCardioBookendsToBuilder);

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
  hiddenTemplateIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.hiddenTemplates)) || [];
}

function saveData() {
  localStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(savedWorkouts));
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(workoutHistory));
  localStorage.setItem(STORAGE_KEYS.hiddenTemplates, JSON.stringify(hiddenTemplateIds));
}

function ensureDefaultWorkouts() {
  const existingTemplateIds = new Set(
    savedWorkouts
      .filter((workout) => workout.templateId)
      .map((workout) => workout.templateId)
  );

  const newTemplates = DEFAULT_WORKOUT_TEMPLATES
    .filter((template) => !existingTemplateIds.has(template.templateId))
    .filter((template) => !hiddenTemplateIds.includes(template.templateId))
    .map((template) => {
      return {
        ...template,
        id: makeId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        exercises: template.exercises.map((exercise) => ({
          ...exercise,
          id: makeId()
        }))
      };
    });

  if (newTemplates.length > 0) {
    savedWorkouts = [...newTemplates, ...savedWorkouts];
    saveData();
  }
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
        <input class="exercise-sets" type="number" min="1" value="${data.sets ?? 3}" />
      </div>
      <div>
        <label>Reps</label>
        <input class="exercise-reps" type="text" placeholder="8-12" value="${escapeHTML(data.reps ?? "8-12")}" />
      </div>
    </div>

    <div class="grid-2">
      <div>
        <label>Weight</label>
        <input class="exercise-weight" type="text" placeholder="Optional" value="${escapeHTML(data.weight || "")}" />
      </div>
      <div>
        <label>Rest Seconds</label>
        <input class="exercise-rest" type="number" min="0" value="${data.rest ?? 60}" />
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

function addExerciseCardAtStart(data = {}) {
  const list = $("exerciseList");

  addExerciseCard(data);

  const cards = Array.from(document.querySelectorAll(".exercise-card"));
  const newCard = cards[cards.length - 1];

  list.insertBefore(newCard, list.firstChild);
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
      const existingWorkout = savedWorkouts[index];

      workout.createdAt = existingWorkout.createdAt;
      workout.isTemplate = existingWorkout.isTemplate || false;
      workout.templateId = existingWorkout.templateId || null;

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
   QUICK ADD EQUIPMENT
----------------------------- */

function renderEquipmentPicker() {
  const area = $("areaPicker").value;
  const container = $("equipmentPicker");
  const equipmentList = PF_EQUIPMENT_BY_AREA[area] || [];

  container.innerHTML = "";

  equipmentList.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "equipment-option";

    row.innerHTML = `
      <div>
        <h3>${escapeHTML(item.equipment)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
      <button class="add-equipment-btn" data-area="${area}" data-index="${index}">
        Add
      </button>
    `;

    row.querySelector(".add-equipment-btn").addEventListener("click", () => {
      addEquipmentExercise(area, index);
    });

    container.appendChild(row);
  });
}

function addEquipmentExercise(area, index) {
  const selected = PF_EQUIPMENT_BY_AREA[area][index];
  if (!selected) return;

  removeBlankStarterExercise();

  const exercise = {
    ...selected.exercise,
    id: makeId()
  };

  addExerciseCard(exercise);

  if (!$("workoutName").value.trim()) {
    if (area === "upper") $("workoutName").value = "Custom Upper Body Workout";
    if (area === "lower") $("workoutName").value = "Custom Lower Body Workout";
    if (area === "core") $("workoutName").value = "Custom Core Workout";
  }

  if (area === "upper") $("workoutType").value = "Upper Body";
  if (area === "lower") $("workoutType").value = "Lower Body";
  if (area === "core") $("workoutType").value = "Core";
}

function addCardioBookendsToBuilder() {
  removeBlankStarterExercise();

  const currentExercises = Array.from(document.querySelectorAll(".exercise-card"));
  const firstName = currentExercises[0]?.querySelector(".exercise-name")?.value.toLowerCase() || "";
  const lastName = currentExercises[currentExercises.length - 1]?.querySelector(".exercise-name")?.value.toLowerCase() || "";

  const alreadyStartsWithCardio =
    firstName.includes("warm") ||
    firstName.includes("treadmill") ||
    firstName.includes("bike") ||
    firstName.includes("elliptical");

  const alreadyEndsWithCardio =
    lastName.includes("cool") ||
    lastName.includes("treadmill") ||
    lastName.includes("bike") ||
    lastName.includes("elliptical");

  if (!alreadyStartsWithCardio) {
    addExerciseCardAtStart({
      name: "Treadmill or Elliptical Warm-Up",
      sets: 1,
      reps: "5 minutes",
      weight: "Easy pace",
      rest: 30,
      notes: "Start with light cardio to warm up before lifting."
    });
  }

  if (!alreadyEndsWithCardio) {
    addExerciseCard({
      name: "Treadmill Cooldown Walk",
      sets: 1,
      reps: "3-5 minutes",
      weight: "Easy pace",
      rest: 0,
      notes: "End with easy cardio to bring your heart rate down."
    });
  }

  updateExerciseNumbers();
}

function removeBlankStarterExercise() {
  const cards = Array.from(document.querySelectorAll(".exercise-card"));

  if (cards.length !== 1) return;

  const card = cards[0];
  const name = card.querySelector(".exercise-name").value.trim();
  const weight = card.querySelector(".exercise-weight").value.trim();
  const notes = card.querySelector(".exercise-notes").value.trim();

  if (!name && !weight && !notes) {
    card.remove();
  }
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
          ${workout.isTemplate ? `<span class="chip">Preloaded</span>` : ""}
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
  const workout = savedWorkouts.find((item) => item.id === id);
  if (!workout) return;

  const confirmed = confirm("Delete this saved workout?");
  if (!confirmed) return;

  if (workout.templateId && !hiddenTemplateIds.includes(workout.templateId)) {
    hiddenTemplateIds.push(workout.templateId);
  }

  savedWorkouts = savedWorkouts.filter((item) => item.id !== id);
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
          <p>${escapeHTML(exercise.sets)} set${Number(exercise.sets) === 1 ? "" : "s"} • ${escapeHTML(exercise.reps || "reps")} ${exercise.weight ? `• ${escapeHTML(exercise.weight)}` : ""}</p>
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
  $("pauseTimerBtn").textContent = "Pause";

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