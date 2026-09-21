document.addEventListener("DOMContentLoaded", () => {
  // Practice UI Logic MVP
  const hintBtn = document.getElementById("btn-show-hint");
  const hintBox = document.getElementById("hint-box");
  const checkBtn = document.getElementById("btn-check-answer");
  const feedbackBox = document.getElementById("feedback-box");
  const errorSection = document.getElementById("error-classification");
  const retrySection = document.getElementById("retry-section");

  // Show Hint
  if (hintBtn && hintBox) {
    hintBtn.addEventListener("click", () => {
      hintBox.style.display = "block";
      hintBtn.style.display = "none";
    });
  }

  // Check Answer
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      const selectedOption = document.querySelector('input[name="practice_q1"]:checked');
      
      if (!selectedOption) {
        alert("Sila pilih jawapan untuk menyemak. / Please select an answer.");
        return;
      }

      feedbackBox.style.display = "block";
      
      // Simulate answer checking (Value 'B' is correct for this dummy question)
      if (selectedOption.value === "B") {
        feedbackBox.className = "feedback-box success";
        feedbackBox.innerHTML = `<h4>✓ Betul / Correct</h4>
          <p>Baca penerangan untuk memastikan kamu benar-benar memahami konsep. Nilai tempat merujuk kepada kedudukan digit (contoh: sa, puluh, ratus).</p>`;
        errorSection.style.display = "none";
        retrySection.style.display = "none";
      } else {
        feedbackBox.className = "feedback-box error";
        feedbackBox.innerHTML = `<h4>✗ Cuba Lagi / Try Again</h4>
          <p>Gunakan petunjuk dan semak langkah kamu. Perhatikan perbezaan antara nilai tempat (perkataan) dan nilai digit (nombor).</p>`;
        errorSection.style.display = "block";
      }
    });
  }

  // Error Classification Logging
  const errorBtns = document.querySelectorAll(".error-btn");
  if (errorBtns.length > 0) {
    errorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Highlight active selection
        errorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Show Retry button
        retrySection.style.display = "block";
        
        // MVP: Save to LocalStorage Error Journal
        const errorType = btn.getAttribute("data-error-type");
        let journal = JSON.parse(localStorage.getItem("l2s4w_error_journal") || "[]");
        journal.push({
          topic: "Nilai Tempat",
          type: errorType,
          date: new Date().toISOString()
        });
        localStorage.setItem("l2s4w_error_journal", JSON.stringify(journal));
      });
    });
  }
});
