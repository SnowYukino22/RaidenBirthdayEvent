function loginSuccess(UID) {
    if (UID == 825838291) {
        return true
    } else {
        return false
    }
}

document.getElementById('retryButton').addEventListener('click',() => {
    document.getElementById('loginFail').classList.add('unshown')
})

let BGMusic = new Audio('Audio/FallOfMaples_OST.mp3')
BGMusic.volume = 0.3

function showLetter() {
    document.getElementById('letter').classList.remove('unshown')
    document.getElementById('navigateButton').addEventListener('click', () => {changeScene();document.getElementById('letter').classList.add('unshown')})
}

let sequence = ['Katheryne',showLetter,'Tenshukaku1','Tenshukaku2','Raiden0','Raiden1','Raiden2','RaidenSlash','Tenshukaku3','Raiden3','Raiden4','Raiden5','Complete']
let currentScene = -1

document.getElementById('sceneFront').addEventListener('click',() => {changeScene()})

let audios = {
    'Raiden1': new Audio('Audio/Raiden_Birthday1.ogg'),
    'Raiden2': new Audio('Audio/Raiden_Birthday2.ogg'),
    'Raiden4': new Audio('Audio/Ei_Birthday1.ogg'),
    'Raiden5': new Audio('Audio/Ei_Birthday2.ogg'),
}

function changeScene() {
    currentScene += 1
    if (typeof(sequence[currentScene]) == 'string') {
        document.getElementById('sceneBack').src = `Images/${sequence[currentScene]}.jpg`
        document.getElementById('sceneFront').classList.add('invisible')
        setTimeout(() => {
            document.getElementById('sceneFront').src = `Images/${sequence[currentScene]}.jpg`
            document.getElementById('sceneFront').classList.remove('invisible')
        }, 250)
    } else if (typeof(sequence[currentScene]) == 'function') {
        sequence[currentScene]()
    }
    if (sequence[currentScene] == 'Katheryne') {
        BGMusic.play()
    }
    if (['Raiden1','Raiden2','Raiden4','Raiden5'].includes(sequence[currentScene])) {
        audios[sequence[currentScene]].play()
    }
    if (currentScene > sequence.length) {
        if (typeof(sequence[currentScene+1]) == 'string') {
            document.getElementById('buffer').src = `Images/${sequence[currentScene+1]}`
        }
    }
}

function startGame() {
    document.getElementById('login').classList.add('unshown')
    changeScene()
}
function successfulLogin() {
    document.body.removeChild(document.getElementById("bg-blur"))
    document.getElementById('login').innerHTML = `
    <h1>Welcome Mazelyn!</h1>
    <div class="button" id="startButton"><h2>Start</h2></div>
    `
    document.getElementById('startButton').addEventListener('click',() => { startGame() })
}

document.getElementById('loginButton').addEventListener('click',() => {
    if (loginSuccess(document.getElementById('UIDField').value)) {
        successfulLogin()
    } else {
        document.getElementById('loginFail').classList.remove('unshown')
    }
})