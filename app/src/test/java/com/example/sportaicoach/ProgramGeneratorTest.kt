package com.example.sportaicoach

import com.example.sportaicoach.logic.ProgramGenerator
import org.junit.Assert.assertEquals
import org.junit.Test

class ProgramGeneratorTest {

    private val generator = ProgramGenerator()

    @Test
    fun `generateProgram creates program with correct frequency`() {
        val program1 = generator.generateProgram("Test", "Débutant", 3)
        assertEquals(3, program1.workoutDays.size)

        val program2 = generator.generateProgram("Test", "Intermédiaire", 5)
        assertEquals(5, program2.workoutDays.size)
    }

    @Test
    fun `generateProgram returns correct program name`() {
        val goal = "Perte de poids"
        val program = generator.generateProgram(goal, "Débutant", 3)
        assertEquals("Programme pour $goal", program.name)
    }
}