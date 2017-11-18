const sketchPad = document.querySelector("div.sketchPad");
const resizeInput = document.querySelector("input.resizeInput");
const resize = document.querySelector("a.resize");
// const pixelStyle = document.querySelector("button.pixelStyle");
const rounded = document.querySelector("div.rounded");
const squares = document.querySelector("div.squares");
const restart = document.querySelector("button.restart");
const rainbow = document.querySelector("button.rainbow");
const disco = document.querySelector("button.disco");
const home = document.querySelector("button.home");
const colorPicker = document.querySelector("input.picker");
const strokeColorButton = document.querySelector("button.strokeColor");
const bgColorInput = document.querySelector("input.backgroundColorInput");
const bgColorButton = document.querySelector("button.setBackground");
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

// You want to get the color and opacity back
// when deactivating rainbow with fading active

// Make sure to check the setStrokeColor function
// It's probably your biggest problem
// Muou >:

// Random Hex Color generator!
// A little bit stolen from
// Colt Steele CodePen

const hexGen = () =>
  "#" + (co = (lor) => {
    const hexValues = "1234567890abcdef".split('');
    lor += hexValues[Math.floor(Math.random()*hexValues.length)];
    return lor.length === 6 ? lor : co(lor);
  })('');

currentColor = hexGen();
rounded.style.backgroundColor = currentColor;
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

function clearPad() {
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  }
};

function setStrokeColor() {
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].addEventListener("mouseover", function() {
      this.style.backgroundColor = colorPicker.value;
    });
  };
  isRainbow = false;
  currentColor = colorPicker.value;
  rounded.style.backgroundColor = currentColor;
  squares.style.backgroundColor = currentColor;
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
  // Maybe
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

// Oh beautiful arrow functions
// I'm using them because i need this
// To be the fading button

// Didn't work >:

function fadingOn() {
  fading.classList.add("fadingButton");
  isFading = true;
  // This will go inside a function!
  const pixelElement = document.querySelectorAll(".pixel");
  // if (isRainbow) {
  //   setStrokeColor();
  //   // Check this
  //   rainbowOff();
  // }
  for (let i = 0; i < pixelElement.length; i++) {
    // console.log(pixelElement[i].style.opacity);
    // if (pixelElement[i].style.opacity > 0.1)//.backgroundColor !== '') // pixelElement[i].style.opacity = 0.1;
    //   pixelElement[i].addEventListener("mouseover", function() {
    //     this.style.opacity = "0.1";
    //   });
    //   console.log(pixelElement[i].style.opacity);
    // if (pixelElement[i].style.opacity !== '' && pixelElement[i].style.backgroundColor === '') pixelElement[i].style.opacity = '';
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
  // This will go inside a function!
  const pixelElement = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixelElement.length; i++) {
    pixelElement[i].removeEventListener("mouseover", fadingOnCallback, false);
    pixelElement[i].addEventListener("mouseover", fadingOffCallback);
  };
  // Just Testing
  // setStrokeColor();
  // I don't think so ):
};

const helpMessage = setInterval(function() {
  help.classList.toggle("helpText");
}, 4000);

setPad(10);
// let currentSize = 10;

// pixelStyle.addEventListener("click", function() {
//   const pixelElement = document.querySelectorAll(".pixel");
//   if (this.textContent === "Rounded"){
//     this.textContent = "Squares";
//     isRounded = true;
//   }
//   else {
//     this.textContent = "Rounded";
//     isRounded = false;
//   }
//
//   for (let i = 0; i < pixelElement.length; i++) {
//     pixelElement[i].classList.toggle("round");
//   }
//
// });

rounded.addEventListener("click", function(){
  if (!isRounded) {
    const pixelElement = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixelElement.length; i++) {
      pixelElement[i].classList.add("round");
    }
    isRounded = true;
  }
});

squares.addEventListener("click", function(){
  if (isRounded) {
    const pixelElement = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixelElement.length; i++) {
      pixelElement[i].classList.remove("round");
    }
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
      disco.style.display = "inline";
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
    disco.style.display = "inline";
  }
  // We'll see
  // if (isRainbow) rainbowOff();
});

rainbow.addEventListener("click", function() {
  // const pixelElement = document.querySelectorAll(".pixel");
  // for (let i = 0; i < pixelElement.length; i++) {
  //   pixelElement[i].addEventListener("mouseover", function() {
  //       this.style.backgroundColor = hexGen();
  //       this.style.opacity = 1;
  //   });
  // };
  // rainbow.classList.add("rainbowButton")
  // isRainbow = true;
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
  home.style.display = "inline";
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
  disco.style.display = "inline";
  clearInterval(discoInterval);
  // console.log(saveDrawing);
  saveDrawing.forEach((e, i) => {
    pixelElement[i].style.backgroundColor = e[0];
    pixelElement[i].style.opacity = e[1];
  });
  dancing = false;
});

strokeColorButton.addEventListener("click", function(){
  setStrokeColor();
});

bgColorButton.addEventListener("click", function() {
  currentBgColor = bgColorInput.value;
  bgColorInput.value = '';
  sketchPad.style.backgroundColor = currentBgColor;
});

fading.addEventListener("click", function() {
  // this.classList.toggle("fadingButton");
  // This will go inside a function!
  // const pixelElement = document.querySelectorAll(".pixel");
  // if (isRainbow) {
  //   setStrokeColor();
  //   // Check this
  //   rainbowOff();
  // }
  // for (let i = 0; i < pixelElement.length; i++) {
  //     //if (pixelElement[i].style.backgroundColor === '') pixelElement[i].style.opacity = 0.1;
  //     pixelElement[i].addEventListener("mouseover", function() {
  //       this.style.opacity = Number(this.style.opacity) + 0.1;
  //     });
  // };
  // isFading = true;
  // And here it is!
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
