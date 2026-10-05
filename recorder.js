let isRecording = false;
let mediaRecorder;
let recordedChunks = [];
let stream;
const POST_RACE_RECORDING_DELAY_MS = 4000;

async function startRecording() {
  try {
    // Request full screen and audio (system audio if available)
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true // This captures tab/system audio if browser supports it
    });

    const options = { mimeType: 'video/webm; codecs=vp9,opus' };
    mediaRecorder = new MediaRecorder(stream, options);

    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "race_recording.mp4"; // Still uses .mp4 for user familiarity
      link.click();
      recordedChunks = [];
    };

    // Start recording with timeslice to flush data periodically
    mediaRecorder.start(1000); // every second
    isRecording = true;
    console.log("Recording started.");

    return Promise.resolve();
  } catch (err) {
    console.error("Error starting recording: ", err);
    return Promise.reject(err);
  }
}

async function stopRecording() {
  if (isRecording && mediaRecorder && mediaRecorder.state !== "inactive") {
    // Let the standings render before starting the post-race hold.
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await new Promise(resolve => setTimeout(resolve, POST_RACE_RECORDING_DELAY_MS));

    if (mediaRecorder.state === "inactive") {
      isRecording = false;
      return;
    }

    const stopped = new Promise(resolve => mediaRecorder.addEventListener("stop", resolve, { once: true }));
    mediaRecorder.stop();
    await stopped;
    stream?.getTracks().forEach(track => track.stop());
    isRecording = false;
    console.log("Recording stopped.");
  }
}