function showTime() {
  const date = new Date();
  const options = {
    timeZone: 'Pacific/Auckland',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedTime = date.toLocaleTimeString('en-US', options);

  const dateElement = document.getElementById('date');
  const timeElement = document.getElementById('time');

  if (dateElement) dateElement.innerHTML = `${formattedDate}`;
  if (timeElement) timeElement.innerHTML = `${formattedTime}`;

  requestAnimationFrame(showTime);
}
showTime();

function updateVisuals() {
  const images = ["EVA-00.jpg", "EVA-01.jpg", "EVA-02.jpg"];
  const text1Colors = ["#B6DAFD", "#916dce", "#cf2c2f"];
  const text2Colors = ["#D4D5D8", "#82DC47", "#FAAC3D"];
  const backgrounds = ["#1F1303", "#211930", "#31080e"];
  const icons = ["ReiIcon.png", "ShinjiIcon.png", "AsukaIcon.png"];

  let currentIndex = localStorage.getItem('imageIndex');
  if (currentIndex === null) {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const hoursSinceStart = Math.floor((today - start) / (1000 * 60 * 60));
    currentIndex = hoursSinceStart % images.length;
    localStorage.setItem('imageIndex', currentIndex);
  } else {
    currentIndex = parseInt(currentIndex, 10);
  }

  let currentImg = 1;

  function crossfade() {
    const img1 = document.getElementById("slideshow1");
    const img2 = document.getElementById("slideshow2");
    const fadeOut = currentImg === 1 ? img1 : img2;
    const fadeIn = currentImg === 1 ? img2 : img1;

    const nextIndex = (currentIndex + 1) % images.length;
    fadeIn.src = images[nextIndex];

    fadeIn.onload = () => {
      fadeIn.classList.add("active");
      fadeOut.classList.remove("active");

      currentIndex = nextIndex;
      localStorage.setItem('imageIndex', currentIndex);
      currentImg = currentImg === 1 ? 2 : 1;

      document.querySelectorAll(".text1").forEach(el => {
        el.style.color = text1Colors[currentIndex];
      });

      document.querySelectorAll(".text2").forEach(el => {
        el.style.color = text2Colors[currentIndex];
      });

      document.querySelectorAll(".background").forEach(el => {
        el.style.backgroundColor = backgrounds[currentIndex];
      });

      document.documentElement.style.setProperty('--text1-color', text1Colors[currentIndex]);

      // ---- Favicon Fade Swap ----
      const favicon1 = document.getElementById("favicon1");
      const favicon2 = document.getElementById("favicon2");

      const newFavicon = currentImg === 1 ? favicon2 : favicon1;
      newFavicon.href = icons[currentIndex];
      newFavicon.disabled = false;

      setTimeout(() => {
        const oldFavicon = currentImg === 1 ? favicon1 : favicon2;
        oldFavicon.disabled = true;
      }, 100);
    };

    fadeIn.classList.add("active");
    fadeOut.classList.remove("active");
  }

  // Initial setup
  const img1 = document.getElementById("slideshow1");
  img1.src = images[currentIndex];
  img1.classList.add("active");

  document.querySelectorAll(".text1").forEach(el => {
    el.style.color = text1Colors[currentIndex];
  });

  document.querySelectorAll(".text2").forEach(el => {
    el.style.color = text2Colors[currentIndex];
  });

  document.querySelectorAll(".background").forEach(el => {
    el.style.backgroundColor = backgrounds[currentIndex];
  });

  document.documentElement.style.setProperty('--text1-color', text1Colors[currentIndex]);

  // Sync favicon on initial load too
  const favicon1 = document.getElementById("favicon1");
  const favicon2 = document.getElementById("favicon2");
  favicon1.href = icons[currentIndex];
  favicon1.disabled = false;
  favicon2.disabled = true;

  setInterval(crossfade, 360000);
}

updateVisuals();
