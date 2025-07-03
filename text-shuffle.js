// Text shuffling effect for hero title
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.addEventListener("DOMContentLoaded", () => {
  const heroTexts = document.querySelectorAll(".shuffle-text");
  
  heroTexts.forEach(element => {
    let interval = null;
    let originalText = element.dataset.text;
    let isHovering = false;

    element.onmouseover = event => {
      isHovering = true;
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        element.innerText = element.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return originalText[index];
            }
            
            return letters[Math.floor(Math.random() * 26)].toLowerCase();
          })
          .join("");
        
        if(iteration >= originalText.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    };

    // Initial animation on page load
    setTimeout(() => {
      let iteration = 0;
      
      interval = setInterval(() => {
        element.innerText = element.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return originalText[index];
            }
            
            return letters[Math.floor(Math.random() * 26)].toLowerCase();
          })
          .join("");
        
        if(iteration >= originalText.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }, 500);
  });
});
