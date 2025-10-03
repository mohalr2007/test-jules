package com.example.sportaicoach

import android.content.Intent
import android.content.res.Configuration
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatDelegate
import com.example.sportaicoach.logic.ProgramGenerator
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.textfield.TextInputEditText

class MainActivity : AppCompatActivity() {

    private val programGenerator = ProgramGenerator()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Setup the Toolbar
        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = getString(R.string.app_name)

        val goalInput = findViewById<TextInputEditText>(R.id.goal_input)
        val levelInput = findViewById<TextInputEditText>(R.id.level_input)
        val frequencyInput = findViewById<TextInputEditText>(R.id.frequency_input)
        val generateButton = findViewById<Button>(R.id.generate_program_button)
        val viewProgressButton = findViewById<Button>(R.id.view_progress_button)
        val analyzeMealButton = findViewById<Button>(R.id.analyze_meal_button)

        generateButton.setOnClickListener {
            val goal = goalInput.text.toString()
            val level = levelInput.text.toString()
            val frequencyStr = frequencyInput.text.toString()

            if (goal.isBlank() || level.isBlank() || frequencyStr.isBlank()) {
                Toast.makeText(this, getString(R.string.error_fill_all_fields), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val frequency = frequencyStr.toIntOrNull()
            if (frequency == null || frequency <= 0) {
                Toast.makeText(this, getString(R.string.error_invalid_frequency), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val program = programGenerator.generateProgram(goal, level, frequency)

            val intent = Intent(this, ProgramActivity::class.java)
            intent.putExtra("PROGRAM_EXTRA", program)
            startActivity(intent)
        }

        viewProgressButton.setOnClickListener {
            val intent = Intent(this, ChartActivity::class.java)
            startActivity(intent)
        }

        analyzeMealButton.setOnClickListener {
            val intent = Intent(this, CameraActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_toggle_theme -> {
                val currentNightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
                if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                } else {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                }
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}