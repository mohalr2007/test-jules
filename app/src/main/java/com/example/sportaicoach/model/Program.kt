package com.example.sportaicoach.model

import java.io.Serializable

data class Exercise(
    var name: String,
    var sets: Int,
    var reps: String // String pour permettre "10-12" ou "30s"
) : Serializable

data class WorkoutDay(
    val dayName: String,
    val exercises: List<Exercise>
) : Serializable

data class Program(
    val name: String,
    val workoutDays: List<WorkoutDay>
) : Serializable