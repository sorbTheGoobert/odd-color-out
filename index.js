const game = document.getElementById("game_container");
const box_index = [];
const time_display = document.getElementById("time_display");

let box_color = "yellow"
let x_cell = 2
let current_box_amount = Math.pow(x_cell, 2);
let randomeFella;
let game_loop;
let round = 1;
let point = 0;
let lost = false;
let rr = 100, rb = 100, rg = 100;
let r, g, b;
let time = 60;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addBox(state) {
    const box = document.createElement("div");
    if (state) {
        box.style.backgroundColor = `rgb(${r - rr}, ${g - rg}, ${b - rb})`;
    }else{
        box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    box.style.width = `${box_size}px`;
    box.style.height = `${box_size}px`;
    box.style.cursor = "pointer";
    box.style.border = "2px solid black"
    
    box.addEventListener("click", function () {
        if(point == 0){
            timer();
        }
        if (state && !lost) {
            point++;
            document.getElementById("score_display").innerHTML = `Score: ${point}`
            time+=2;
            update();
        }else if(!state){
            time-=10;
        }
    })
    game.appendChild(box);
}

async function timer() {
    for (l = 0; l < time; l++) {
        time_display.innerHTML = time - l;
        await sleep(1000);
    }
    time_display.innerHTML = 0;
    lost = true;
}

function update() {
    if (!lost) {
        for (i = 0; i < current_box_amount; i++) {
            game.firstChild.remove();
            box_index.pop();
        }
        if (round % 5 == 0) {
            x_cell++;
            current_box_amount = Math.pow(x_cell, 2);
            rr *= 0.8;
            rg *= 0.8;
            rb *= 0.8;
        }
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);    
        box_size = game.offsetWidth / x_cell;
        randomeFella = Math.floor(Math.random() * current_box_amount);
        for (i = 0; i < current_box_amount; i++) {
            if (i == randomeFella) {
                let box = addBox(true);
                box_index.push(box);
            } else {
                let box = addBox(false);
                box_index.push(box);
            }
        }

    }
    round++;
}

function init() {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    current_box_amount = Math.pow(x_cell, 2);
    box_size = game.offsetWidth / x_cell;
    randomeFella = Math.floor(Math.random() * current_box_amount);
    for (i = 0; i < current_box_amount; i++) {
        if (i == randomeFella) {
            box_index.push(addBox(true, 1))
            // addBox(1);
        } else {
            box_index.push(addBox(false, 0.7))
            // addBox(0.7);
        }
    }
    update()
}

window.onload = init();