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
  const text1Colors = ["#", "#916dce", "#cf2c2f"];
  const text2Colors = ["#D4D5D8", "#82DC47", "#FAAC3D"];
  const backgrounds = ["#1F1303", "#211930", "#31080e"];
  const icons = ["ReiIcon.png", "ShinjiIcon.png", "AsukaIcon.png"];

  const INTERVAL_SECONDS = 3600; // one hour

  function getCurrentIndex() {
    const now = new Date();
    const startUTC = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    const elapsedMs = now.getTime() - startUTC.getTime();
    const interval = Math.floor(elapsedMs / (1000 * INTERVAL_SECONDS));
    return interval % images.length;
  }

  function getMsUntilNextInterval() {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - Date.UTC(now.getUTCFullYear(), 0, 1)) / 1000);
    const remainder = seconds % INTERVAL_SECONDS;
    return (INTERVAL_SECONDS - remainder) * 1000 - now.getMilliseconds();
  }

  let currentImg = 1;
  let lastIndex = -1;

  function applyVisuals(index) {
    const img1 = document.getElementById("slideshow1");
    const img2 = document.getElementById("slideshow2");
    const fadeOut = currentImg === 1 ? img1 : img2;
    const fadeIn = currentImg === 1 ? img2 : img1;

    fadeIn.src = images[index];

    fadeIn.onload = () => {
      fadeIn.classList.add("active");
      fadeOut.classList.remove("active");

      currentImg = currentImg === 1 ? 2 : 1;

      document.querySelectorAll(".text1").forEach(el => {
        el.style.color = text1Colors[index];
      });

      document.querySelectorAll(".text2").forEach(el => {
        el.style.color = text2Colors[index];
      });

      document.querySelectorAll(".background").forEach(el => {
        el.style.backgroundColor = backgrounds[index];
      });

      document.documentElement.style.setProperty('--text1-color', text1Colors[index]);
      document.documentElement.style.setProperty('--text2-color', text2Colors[index]);

      const favicon1 = document.getElementById("favicon1");
      const favicon2 = document.getElementById("favicon2");

      const newFavicon = currentImg === 1 ? favicon2 : favicon1;
      newFavicon.href = icons[index];
      newFavicon.disabled = false;

      setTimeout(() => {
        const oldFavicon = currentImg === 1 ? favicon1 : favicon2;
        oldFavicon.disabled = true;
      }, 100);
    };
  }

  function syncAndUpdate() {
    const index = getCurrentIndex();
    if (index !== lastIndex) {
      applyVisuals(index);
      lastIndex = index;
    }

    const delay = getMsUntilNextInterval();
    setTimeout(syncAndUpdate, delay);
  }

  // Initial load
  syncAndUpdate();
}

updateVisuals();