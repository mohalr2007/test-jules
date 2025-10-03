export interface Exercise {
  name: string;
  sets: number;
  reps: string; // String to allow "10-12" or "30s"
}

export interface WorkoutDay {
  dayName: string;
  exercises: Exercise[];
}

export interface Program {
  name: string;
  workoutDays: WorkoutDay[];
}

export const generateProgram = (goal: string, level: string, frequency: number): Program => {
  const workoutDays: WorkoutDay[] = [];

  const getBeginnerWorkout = (day: number): Exercise[] => {
    switch (day % 3) {
      case 1:
        return [
          { name: "Squat", sets: 3, reps: "8-12" },
          { name: "Push-ups", sets: 3, reps: "Max" },
          { name: "Lat Pulldown", sets: 3, reps: "10-15" },
        ];
      case 2:
        return [
          { name: "Lunges", sets: 3, reps: "10-12 per leg" },
          { name: "Dumbbell Rows", sets: 3, reps: "10-15" },
          { name: "Plank", sets: 3, reps: "30s" },
        ];
      default:
        return [
          { name: "Bench Press", sets: 3, reps: "8-12" },
          { name: "Seated Cable Row", sets: 3, reps: "10-15" },
          { name: "Cardio", sets: 1, reps: "20min" },
        ];
    }
  };

  const getIntermediateWorkout = (day: number): Exercise[] => {
    switch (day % 3) {
        case 1:
            return [
                { name: "Squat", sets: 4, reps: "8-10" },
                { name: "Incline Press", sets: 3, reps: "8-12" },
                { name: "Pull-ups", sets: 3, reps: "Max" },
                { name: "Leg Press", sets: 3, reps: "10-15" },
            ];
        case 2:
            return [
                { name: "Deadlift", sets: 4, reps: "5-8" },
                { name: "Overhead Press", sets: 3, reps: "8-12" },
                { name: "Barbell Row", sets: 3, reps: "8-12" },
                { name: "Calf Raises", sets: 3, reps: "15-20" },
            ];
        default:
            return [
                { name: "Bench Press", sets: 4, reps: "6-10" },
                { name: "Seated Cable Row", sets: 4, reps: "8-12" },
                { name: "Bicep Curls", sets: 3, reps: "10-15" },
                { name: "Tricep Extensions", sets: 3, reps: "10-15" },
            ];
    }
  };

  const getAdvancedWorkout = (day: number): Exercise[] => {
    // For an advanced user, we could imagine more specific logic.
    // Here, we return the same as intermediate for the example.
    return getIntermediateWorkout(day);
  };

  for (let i = 1; i <= frequency; i++) {
    let exercises: Exercise[];
    switch (level.toLowerCase()) {
      case 'beginner':
        exercises = getBeginnerWorkout(i);
        break;
      case 'intermediate':
        exercises = getIntermediateWorkout(i);
        break;
      case 'advanced':
        exercises = getAdvancedWorkout(i);
        break;
      default:
        exercises = getBeginnerWorkout(i);
    }
    workoutDays.push({ dayName: `Day ${i}`, exercises });
  }

  return {
    name: `Program for ${goal}`,
    workoutDays,
  };
};