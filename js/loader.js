// ================= 7-SECOND LOADING SCREEN LOGIC =================
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const progressBarFill = document.getElementById("progressBarFill");
  const progressPercentageText = document.getElementById("progressPercentageText");
  const loadingStatusText = document.getElementById("loadingStatusText");

  if (!loadingScreen) return;

  const totalDuration = 7000; // Exact 7 Seconds
  const intervalTime = 50; // Update every 50ms
  let elapsedTime = 0;

  // Dynamic Status Messages over the 7-second sequence
  const statusMilestones = [
    { threshold: 0, text: "Initializing core AI engines..." },
    { threshold: 20, text: "Connecting to Abdullah AI server..." },
    { threshold: 45, text: "Preparing something amazing for you..." },
    { threshold: 70, text: "Loading personalized memory vault..." },
    { threshold: 90, text: "Finalizing experience for Sana..." },
    { threshold: 98, text: "Ready! Opening..." }
  ];

  const loadingInterval = setInterval(() => {
    elapsedTime += intervalTime;
    const progress = Math.min(Math.floor((elapsedTime / totalDuration) * 100), 100);

    // Update Progress Bar & Percentage
    if (progressBarFill) progressBarFill.style.width = `${progress}%`;
    if (progressPercentageText) progressPercentageText.innerText = `${progress}%`;

    // Update Dynamic Status Text based on progress
    const currentStatus = statusMilestones
      .slice()
      .reverse()
      .find((m) => progress >= m.threshold);

    if (currentStatus && loadingStatusText) {
      loadingStatusText.innerText = currentStatus.text;
    }

    // Complete Sequence at 100% (7 Seconds)
    if (progress >= 100) {
      clearInterval(loadingInterval);
      
      // Trigger Smooth Fade-Out
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        
        // Remove from Layout Flow after fade transition ends
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 800);
      }, 200);
    }
  }, intervalTime);
});
      
