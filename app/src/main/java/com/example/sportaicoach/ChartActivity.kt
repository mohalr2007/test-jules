package com.example.sportaicoach

import android.graphics.Color
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet

class ChartActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chart)

        val lineChart = findViewById<LineChart>(R.id.line_chart)
        setupLineChart(lineChart)
    }

    private fun setupLineChart(chart: LineChart) {
        // 1. Create a list of data entries
        val entries = ArrayList<Entry>()
        // Dummy data for weight progression
        entries.add(Entry(1f, 80f)) // Week 1, 80kg
        entries.add(Entry(2f, 80.5f))// Week 2, 80.5kg
        entries.add(Entry(3f, 79.5f))// Week 3, 79.5kg
        entries.add(Entry(4f, 81f))  // Week 4, 81kg
        entries.add(Entry(5f, 81.2f))// Week 5, 81.2kg
        entries.add(Entry(6f, 80.8f))// Week 6, 80.8kg

        // 2. Create a DataSet
        val dataSet = LineDataSet(entries, "Évolution du poids (kg)")
        dataSet.color = Color.RED
        dataSet.valueTextColor = Color.BLACK
        dataSet.lineWidth = 2f
        dataSet.setCircleColor(Color.RED)
        dataSet.circleRadius = 4f

        // 3. Create a LineData object
        val lineData = LineData(dataSet)

        // 4. Set data to the chart
        chart.data = lineData

        // 5. Customize the chart
        chart.description.text = "Progression sur 6 semaines"
        chart.xAxis.granularity = 1f // minimum axis-step (interval) is 1
        chart.setTouchEnabled(true)
        chart.setPinchZoom(true)

        // Refresh the chart
        chart.invalidate()
    }
}