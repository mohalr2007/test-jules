package com.example.sportaicoach

import android.os.Bundle
import android.text.InputType
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.sportaicoach.model.Exercise
import com.example.sportaicoach.model.Program
import com.example.sportaicoach.model.WorkoutDay
import com.google.android.material.appbar.MaterialToolbar

class ProgramActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_program)

        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)


        val program = intent.getSerializableExtra("PROGRAM_EXTRA") as? Program

        val programNameTextView = findViewById<TextView>(R.id.program_name_textview)
        val programContainer = findViewById<LinearLayout>(R.id.program_container)

        if (program != null) {
            supportActionBar?.title = getString(R.string.program_activity_label)
            programNameTextView.text = program.goal
            program.workoutDays.forEach { workoutDay ->
                addWorkoutDayView(programContainer, workoutDay)
            }
        } else {
            programNameTextView.text = getString(R.string.error_program_not_found)
        }
    }

    private fun addWorkoutDayView(container: LinearLayout, workoutDay: WorkoutDay) {
        val dayTextView = TextView(this).apply {
            text = getString(R.string.day_format, workoutDay.dayNumber)
            textSize = 20f
            setPadding(0, 16, 0, 8)
        }
        container.addView(dayTextView)

        workoutDay.exercises.forEach { exercise ->
            val exerciseTextView = TextView(this).apply {
                text = formatExerciseText(exercise)
                textSize = 16f
                setPadding(16, 4, 0, 4)
                isClickable = true
                setOnClickListener {
                    showEditExerciseDialog(this, exercise)
                }
            }
            container.addView(exerciseTextView)
        }
    }

    private fun formatExerciseText(exercise: Exercise): String {
        return getString(R.string.exercise_details_format, exercise.name, exercise.sets, exercise.reps)
    }

    private fun showEditExerciseDialog(textView: TextView, exercise: Exercise) {
        val dialogLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(40, 20, 40, 20)
        }

        val nameInput = EditText(this).apply { setText(exercise.name) }
        val setsInput = EditText(this).apply {
            setText(exercise.sets.toString())
            inputType = InputType.TYPE_CLASS_NUMBER
        }
        val repsInput = EditText(this).apply { setText(exercise.reps) }

        dialogLayout.addView(TextView(this).apply { text = getString(R.string.exercise_name_label) })
        dialogLayout.addView(nameInput)
        dialogLayout.addView(TextView(this).apply { text = getString(R.string.sets_label) })
        dialogLayout.addView(setsInput)
        dialogLayout.addView(TextView(this).apply { text = getString(R.string.reps_label) })
        dialogLayout.addView(repsInput)

        AlertDialog.Builder(this)
            .setTitle(getString(R.string.edit_exercise_dialog_title))
            .setView(dialogLayout)
            .setPositiveButton(getString(R.string.save_button)) { _, _ ->
                exercise.name = nameInput.text.toString()
                exercise.sets = setsInput.text.toString().toIntOrNull() ?: exercise.sets
                exercise.reps = repsInput.text.toString()
                textView.text = formatExerciseText(exercise)
            }
            .setNegativeButton(getString(R.string.cancel_button), null)
            .show()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}