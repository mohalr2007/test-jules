package com.example.sportaicoach

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.sportaicoach.logic.ProgramGenerator

class MainActivity : AppCompatActivity() {

    private val programGenerator = ProgramGenerator()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val goalInput = findViewById<EditText>(R.id.goal_input)
        val levelInput = findViewById<EditText>(R.id.level_input)
        val frequencyInput = findViewById<EditText>(R.id.frequency_input)
        val generateButton = findViewById<Button>(R.id.generate_program_button)

        generateButton.setOnClickListener {
            val goal = goalInput.text.toString()
            val level = levelInput.text.toString()
            val frequencyStr = frequencyInput.text.toString()

            if (goal.isBlank() || level.isBlank() || frequencyStr.isBlank()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val frequency = frequencyStr.toIntOrNull()
            if (frequency == null || frequency <= 0) {
                Toast.makeText(this, "Veuillez entrer une fréquence valide", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val program = programGenerator.generateProgram(goal, level, frequency)

            // Lancer la nouvelle activité pour afficher le programme
            val intent = Intent(this, ProgramActivity::class.java)
            intent.putExtra("PROGRAM_EXTRA", program)
            startActivity(intent)
        }
    }
}