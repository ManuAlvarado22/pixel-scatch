const sketchPad = document.querySelector("div.sketchPad");
const resizeInput = document.querySelector("input.resizeInput");
const resize = document.querySelector("a.resize");
const rounded = document.querySelector("div.rounded");
const squares = document.querySelector("div.squares");
const restart = document.querySelector("a.restart");
const rainbow = document.querySelector("button.rainbow");
const disco = document.querySelector("a.disco");
const home = document.querySelector("a.home");
const strokeColorVisualizer = document.querySelector("div.strokeColorVisualizer");
const bgColorVisualizer = document.querySelector("div.bgColorVisualizer");
const strokeColorPicker = document.querySelector("input.strokeColorPicker");
const bgColorPicker = document.querySelector("input.bgColorPicker");
const fading = document.querySelector("button.fading");
const hamburger = document.querySelector("div.hamburger");
const navbar = document.querySelector("nav div.menu");
const help = document.querySelector("span.help");
const drake = new Audio('audio/drake.mp3');
let isRounded = false;
let isRainbow = false;
let dancing = false;
let isFading = false;
let currentColor;
let currentBgColor = "#FFF";

// Random Hex Color generator!
// A little bit stolen from
// Colt Steele's CodePen

const hexGen = () =>
  "#" + (co = (lor) => {
    const hexValues = "1234567890abcdef".split('');
    lor += hexValues[Math.floor(Math.random()*hexValues.length)];
    return lor.length === 6 ? lor : co(lor);
  })('');

currentColor = hexGen();
rounded.style.border = "1px solid " + currentColor;
squares.style.backgroundColor = currentColor;

function setPad(value) {
  let divArray = [];
  for (let i = 0; i < value**2; i++) {
    divArray.push(document.createElement("div"));
    divArray[i].classList.add("pixel");
    divArray[i].style.width = sketchPad.offsetWidth / value + "px";
    divArray[i].style.height = sketchPad.offsetHeight / value + "px";
    if (isRainbow) {
      divArray[i].addEventListener("mouseover", function() {
          this.style.backgroundColor = hexGen();
      });
    }
    else {
      divArray[i].addEventListener("mouseover", function() {
          this.style.backgroundColor = currentColor;
      });
    }
    if (isFading) {
      fadingOff();
    }
    if (isRounded) divArray[i].classList.add("round");
  }
  divArray.forEach(e => sketchPad.appendChild(e));
}

// What users will see at the
// start of the app
setPad(10);

function clearPad() {
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  }
};

function setStrokeColor() {
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].addEventListener("mouseover", function() {
      this.style.backgroundColor = currentColor;
    });
  };
  isRainbow = false;
  if (isRounded) rounded.style.backgroundColor = currentColor;
  else squares.style.backgroundColor = currentColor;
  squares.style.border = "1px solid " + currentColor;
  rounded.style.border = "1px solid " + currentColor;
}

function rainbowOn() {
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].addEventListener("mouseover", function() {
        this.style.backgroundColor = hexGen();
        fadingOffCallback;
    });
  };
  rainbow.classList.add("rainbowButton")
  isRainbow = true;
  if (isFading) fadingOff();
}

function rainbowOff() {
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].addEventListener("mouseover", function() {
        this.style.backgroundColor = currentColor;
    });
  };
  rainbow.classList.remove("rainbowButton")
  isRainbow = false;
}

function fadingOffCallback() {
  this.style.opacity = '';
}

function fadingOnCallback() {
  this.style.opacity = Number(this.style.opacity) + 0.1;
}

function fadingOn() {
  fading.classList.add("fadingButton");
  isFading = true;
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].removeEventListener("mouseover", fadingOffCallback, false);
    pixelElement[i].addEventListener("mouseover", fadingOnCallback);
  };
};

// Create a callback function for the event listener
// So you can remove it on fadingOn
// No pun intended ;)

function fadingOff() {
  fading.classList.remove("fadingButton");
  isFading = false;
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].removeEventListener("mouseover", fadingOnCallback, false);
    pixelElement[i].addEventListener("mouseover", fadingOffCallback);
  };
};

const helpMessage = setInterval(function() {
  help.classList.toggle("helpText");
}, 4000);

rounded.addEventListener("click", function(){
  if (!isRounded) {
    const pixelElement = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixelElement.length; i++) {
      pixelElement[i].classList.add("round");
    }
    rounded.style.backgroundColor = currentColor;
    squares.style.border = "1px solid " + currentColor;
    squares.style.backgroundColor = '';
    isRounded = true;
  }
});

squares.addEventListener("click", function(){
  if (isRounded) {
    const pixelElement = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixelElement.length; i++) {
      pixelElement[i].classList.remove("round");
    }
    squares.style.backgroundColor = currentColor;
    rounded.style.border = "1px solid " + currentColor;
    rounded.style.backgroundColor = '';
    isRounded = false;
  }
});

resize.addEventListener("click", function() {
  const resizeValue = resizeInput.value;
  if (resizeValue > 0 && resizeValue <= 100) { // && resizeValue != currentSize) {
    clearPad();
    setPad(resizeValue);
    // currentSize = resizeValue;
    resizeInput.value = '';
    if(dancing) {
      disco.style.display = "inline-block";
      home.style.display = "none";
    }
  }
  else {
    drake.play();
    resizeInput.classList.toggle("wrong");
    setTimeout(function() {
      resizeInput.classList.toggle("wrong");
    },1001);
    resizeInput.value = '';
  }
});

restart.addEventListener("click", function() {
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].style.backgroundColor = '';
    if (isFading) {
        pixelElement[i].style.opacity = '';
    }
  }
  if (dancing) {
    clearInterval(discoInterval);
    home.style.display = "none";
    disco.style.display = "inline-block";
  }
});

rainbow.addEventListener("click", function() {
  if (!this.classList.contains("rainbowButton")) rainbowOn();
  else rainbowOff();
});

let discoInterval;
let saveDrawing;

disco.addEventListener("click", function() {
  const pixelElement = document.querySelectorAll(".pixel");
  saveDrawing = [];
  for (let i = 0; i < pixelElement.length; i++) {
    saveDrawing.push([
      pixelElement[i].style.backgroundColor,
      pixelElement[i].style.opacity]);
  };
  this.style.display = "none";
  home.style.display = "inline-block";
  discoInterval = setInterval(function() {
    for (let i = 0; i < pixelElement.length; i++) {
      pixelElement[i].style.opacity = 1;
      pixelElement[i].style.backgroundColor = hexGen();
    };
  }, 200);
  dancing = true;
});

home.addEventListener("click", function() {
  const pixelElement = document.querySelectorAll(".pixel");
  this.style.display = "none";
  disco.style.display = "inline-block";
  clearInterval(discoInterval);
  saveDrawing.forEach((e, i) => {
    pixelElement[i].style.backgroundColor = e[0];
    pixelElement[i].style.opacity = e[1];
  });
  dancing = false;
});

fading.addEventListener("click", function() {
  if (!isRainbow) {
    if (this.classList.contains("fadingButton")) fadingOff();
    else fadingOn();
  }
  else {
    fading.classList.toggle("wrong");
    setTimeout(function() {
      fading.classList.toggle("wrong");
    },1001);
  }
});

hamburger.addEventListener("click", function() {
  navbar.classList.toggle("navAppear");
  this.classList.toggle("open");
  clearInterval(helpMessage);
});

strokeColorPicker.addEventListener("keyup", function() {
  strokeColorVisualizer.style.backgroundColor = this.value;
  if (strokeColorVisualizer.style.backgroundColor !== '')
    strokeColorVisualizer.style.cursor = "pointer";
  else
    strokeColorVisualizer.style.cursor = '';
});

bgColorPicker.addEventListener("keyup", function() {
  bgColorVisualizer.style.backgroundColor = this.value;
  if (bgColorVisualizer.style.backgroundColor !== '')
    bgColorVisualizer.style.cursor = "pointer";
  else
    bgColorVisualizer.style.cursor = '';
});

strokeColorVisualizer.addEventListener("click", function() {
  if (this.style.cursor === "pointer") {
    currentColor = strokeColorVisualizer.style.backgroundColor;
    setStrokeColor();
    this.style.backgroundColor = '';
    strokeColorPicker.value = '';
    this.style.cursor = '';
  }
});

bgColorVisualizer.addEventListener("click", function() {
  if (this.style.cursor === "pointer") {
    currentBgColor = bgColorVisualizer.style.backgroundColor
    sketchPad.style.backgroundColor = currentBgColor;
    this.style.backgroundColor = '';
    bgColorPicker.value = '';
    this.style.cursor = '';
  }
});
