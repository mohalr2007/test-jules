package com.example.sportaicoach.logic

import com.example.sportaicoach.model.Exercise
import com.example.sportaicoach.model.Program
import com.example.sportaicoach.model.WorkoutDay

class ProgramGenerator {

    fun generateProgram(goal: String, level: String, frequency: Int): Program {
        val workoutDays = mutableListOf<WorkoutDay>()

        // TODO: Intégrer l'IA ici.
        // La logique actuelle est une version de base pour le MVP (Produit Minimum Viable).
        // À l'avenir, cette section appellera un modèle d'IA pour générer un programme
        // personnalisé en fonction de l'objectif, du niveau, de l'équipement disponible, etc.
        for (i in 1..frequency) {
            val exercises = when (level.lowercase()) {
                "débutant" -> getBeginnerWorkout(i)
                "intermédiaire" -> getIntermediateWorkout(i)
                "avancé" -> getAdvancedWorkout(i)
                else -> getBeginnerWorkout(i) // Cas par défaut
            }
            // Utilise dayNumber au lieu de dayName
            workoutDays.add(WorkoutDay(i, exercises))
        }

        // Retourne le programme avec l'objectif brut
        return Program(goal, workoutDays)
    }

    private fun getBeginnerWorkout(day: Int): List<Exercise> {
        return when (day % 3) {
            1 -> listOf(
                Exercise("Squat", 3, "8-12"),
                Exercise("Pompes", 3, "Max"),
                Exercise("Tirage vertical", 3, "10-15")
            )
            2 -> listOf(
                Exercise("Fentes", 3, "10-12 par jambe"),
                Exercise("Rowing haltères", 3, "10-15"),
                Exercise("Gainage", 3, "30s")
            )
            else -> listOf(
                Exercise("Développé couché", 3, "8-12"),
                Exercise("Tirage horizontal", 3, "10-15"),
                Exercise("Cardio", 1, "20min")
            )
        }
    }

    private fun getIntermediateWorkout(day: Int): List<Exercise> {
         return when (day % 3) {
            1 -> listOf(
                Exercise("Squat", 4, "8-10"),
                Exercise("Développé incliné", 3, "8-12"),
                Exercise("Tractions", 3, "Max"),
                Exercise("Leg Press", 3, "10-15")
            )
            2 -> listOf(
                Exercise("Soulevé de terre", 4, "5-8"),
                Exercise("Développé militaire", 3, "8-12"),
                Exercise("Rowing barre", 3, "8-12"),
                Exercise("Mollets", 3, "15-20")
            )
            else -> listOf(
                Exercise("Développé couché", 4, "6-10"),
                Exercise("Tirage horizontal", 4, "8-12"),
                Exercise("Curl biceps", 3, "10-15"),
                Exercise("Extensions triceps", 3, "10-15")
            )
        }
    }

    private fun getAdvancedWorkout(day: Int): List<Exercise> {
        // Pour un utilisateur avancé, on pourrait imaginer une logique encore plus spécifique.
        // Ici, on retourne la même chose que l'intermédiaire pour l'exemple.
        return getIntermediateWorkout(day)
    }
}