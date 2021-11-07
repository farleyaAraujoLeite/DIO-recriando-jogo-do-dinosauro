const motocross = document.querySelector('.motocross');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

// interceptação da tecla precionada 
function handleKeyUp(event){
    if(event.keyCode === 38){
        if(!isJumping) {
            jump();
        }
    }
}
// dando vida ao motocross
function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150){
            // descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 30;
                    motocross.style.bottom = position + 'px';
                }
            }, 20);
        } else{
            //subindo
            position += 30;
            motocross.style.bottom = position + 'px';
        }
    }, 20);
}

function creatObstacle(){
    const obstacle = document.createElement('div');
    let obstaclePosition = 1000;
    let randomTime = Math.random() * 6000;

    if(isGameOver) return;

    obstacle.classList.add('obstaculo');
    background.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';

    let leftTimer = setInterval(() => {
        if(obstaclePosition < -60){
            //saiu da tela
            clearInterval(leftTimer);
            background.removeChild(obstacle);
        } else if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
            // game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20)
    setTimeout(creatObstacle, randomTime);
}
creatObstacle();
document.addEventListener('keyup', handleKeyUp);