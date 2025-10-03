package com.example.sportaicoach

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Matrix
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.google.firebase.ai.FirebaseAI
import com.google.firebase.ai.GenerativeBackend
import com.google.firebase.ai.GenerativeModel
import com.google.firebase.ai.content
import kotlinx.coroutines.launch
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class CameraActivity : AppCompatActivity() {

    private var imageCapture: ImageCapture? = null
    private lateinit var cameraExecutor: ExecutorService
    private lateinit var generativeModel: GenerativeModel
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_camera)

        progressBar = findViewById(R.id.progress_bar)

        // Initialize Gemini AI Model
        generativeModel = FirebaseAI.getInstance(GenerativeBackend.googleAI(BuildConfig.GEMINI_API_KEY))
            .generativeModel("gemini-pro-vision")

        // Request camera permissions
        if (allPermissionsGranted()) {
            startCamera()
        } else {
            ActivityCompat.requestPermissions(
                this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
        }

        // Set up the listeners for take photo button
        findViewById<Button>(R.id.take_photo_button).setOnClickListener { takePhoto() }

        cameraExecutor = Executors.newSingleThreadExecutor()
    }

    private fun takePhoto() {
        val imageCapture = imageCapture ?: return

        // Show progress bar while we process the image and call the API
        progressBar.visibility = View.VISIBLE

        imageCapture.takePicture(
            ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageCapturedCallback() {
                override fun onCaptureSuccess(image: ImageProxy) {
                    val bitmap = image.toBitmap()
                    image.close() // Close the image proxy
                    analyzeImage(bitmap)
                }

                override fun onError(exc: ImageCaptureException) {
                    progressBar.visibility = View.GONE
                    Log.e(TAG, "Photo capture failed: ${exc.message}", exc)
                    Toast.makeText(baseContext, "Photo capture failed.", Toast.LENGTH_SHORT).show()
                }
            }
        )
    }

    private fun analyzeImage(image: Bitmap) {
        lifecycleScope.launch {
            try {
                val prompt = content {
                    image(image)
                    text("Analyse la valeur nutritionnelle de ce repas. Fournis une estimation des calories, protéines, glucides et lipides.")
                }

                val response = generativeModel.generateContent(prompt)

                progressBar.visibility = View.GONE
                showAnalysisResult(response.text ?: "L'analyse n'a pas pu être effectuée.")

            } catch (e: Exception) {
                progressBar.visibility = View.GONE
                Log.e(TAG, "AI analysis failed", e)
                Toast.makeText(this@CameraActivity, "AI analysis failed: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun showAnalysisResult(result: String) {
        AlertDialog.Builder(this)
            .setTitle("Analyse Nutritionnelle")
            .setMessage(result)
            .setPositiveButton("OK", null)
            .show()
    }


    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(findViewById<PreviewView>(R.id.camera_preview).surfaceProvider)
                }

            imageCapture = ImageCapture.Builder().build()

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this, cameraSelector, preview, imageCapture)
            } catch(exc: Exception) {
                Log.e(TAG, "Use case binding failed", exc)
            }

        }, ContextCompat.getMainExecutor(this))
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(
            baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (allPermissionsGranted()) {
                startCamera()
            } else {
                Toast.makeText(this,
                    "Permissions not granted by the user.",
                    Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }

    companion object {
        private const val TAG = "CameraXApp"
        private const val REQUEST_CODE_PERMISSIONS = 10
        private val REQUIRED_PERMISSIONS =
            mutableListOf (
                Manifest.permission.CAMERA
            ).toTypedArray()
    }
}