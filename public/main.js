import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// Game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 25;
const BRICK_PADDING = 5;
const BRICK_ROWS = 6;
const BRICK_COLS = 10;

// 80s Arcade Sound System
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(frequency, duration, type = 'square', volume = 0.1) {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

function playNoise(duration, volume = 0.05) {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    noise.buffer = buffer;
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    noise.start(audioCtx.currentTime);
    noise.stop(audioCtx.currentTime + duration);
}

const sounds = {
    paddleHit: () => {
        playTone(220, 0.08, 'square', 0.12);
    },
    brickHit: () => {
        playTone(440, 0.1, 'square', 0.12);
        setTimeout(() => playTone(880, 0.05, 'square', 0.08), 20);
    },
    wallHit: () => {
        playTone(330, 0.05, 'square', 0.08);
    },
    loseLife: () => {
        playTone(196, 0.15, 'sawtooth', 0.1);
        setTimeout(() => playTone(165, 0.15, 'sawtooth', 0.1), 80);
        setTimeout(() => playTone(147, 0.25, 'sawtooth', 0.08), 160);
    },
    gameStart: () => {
        playTone(523, 0.1, 'square', 0.1);
        setTimeout(() => playTone(659, 0.1, 'square', 0.1), 80);
        setTimeout(() => playTone(784, 0.1, 'square', 0.1), 160);
        setTimeout(() => playTone(1047, 0.2, 'square', 0.12), 240);
    },
    gameOver: () => {
        playTone(392, 0.2, 'sawtooth', 0.1);
        setTimeout(() => playTone(349, 0.2, 'sawtooth', 0.1), 150);
        setTimeout(() => playTone(330, 0.2, 'sawtooth', 0.1), 300);
        setTimeout(() => playTone(294, 0.4, 'sawtooth', 0.08), 450);
    },
    gameWin: () => {
        const notes = [523, 659, 784, 1047, 1319, 1568];
        notes.forEach((note, i) => {
            setTimeout(() => playTone(note, 0.15, 'square', 0.12), i * 100);
        });
        setTimeout(() => {
            playTone(1568, 0.4, 'square', 0.15);
            playTone(2093, 0.4, 'square', 0.1);
        }, 600);
    },
    click: () => {
        playTone(880, 0.05, 'square', 0.08);
    }
};

// Game state
let scene, camera, renderer;
let paddle, ball;
let bricks = [];
let ballVelocity = new THREE.Vector2(4, -4);
let score = 0;
let lives = 3;
let gameStarted = false;
let gameOver = false;
let gameWon = false;

// Visible world size (may be larger than the 800x600 playfield on
// non-4:3 screens so the playfield is never stretched or cropped)
let viewWidth = GAME_WIDTH;
let viewHeight = GAME_HEIGHT;

// Input
let keys = {};
let activePointerId = null;
let lastFrameTime = 0;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// UI elements
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOver');
const gameWinScreen = document.getElementById('gameWin');
const startButton = document.getElementById('startButton');
const restartGameOver = document.getElementById('restartGameOver');
const restartGameWin = document.getElementById('restartGameWin');
const finalScoreElement = document.getElementById('finalScore');
const winScoreElement = document.getElementById('winScore');
const canvas = document.getElementById('canvas');

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup (orthographic for 2D-like gameplay)
    camera = new THREE.OrthographicCamera(
        -GAME_WIDTH / 2,
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        -GAME_HEIGHT / 2,
        0.1,
        1000
    );
    camera.position.z = 500;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(0x000000, 0);
    updateViewSize();
    
    // Create game objects
    createPaddle();
    createBall();
    createBricks();
    createWalls();
    
    // Event listeners. Pointer events cover mouse, touch and pen in one path.
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onWindowResize);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    
    startButton.addEventListener('click', startGame);
    restartGameOver.addEventListener('click', restartGame);
    restartGameWin.addEventListener('click', restartGame);
    
    // Start game loop
    requestAnimationFrame(animate);
}

function createPaddle() {
    const geometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, 10);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.9
    });
    paddle = new THREE.Mesh(geometry, material);
    paddle.position.set(0, -GAME_HEIGHT / 2 + 50, 0);
    scene.add(paddle);
    
    // Add paddle glow
    const glowGeometry = new THREE.BoxGeometry(PADDLE_WIDTH + 4, PADDLE_HEIGHT + 4, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.3
    });
    const paddleGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    paddle.add(paddleGlow);
}

function createBall() {
    const geometry = new THREE.SphereGeometry(BALL_RADIUS, 16, 16);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 1
    });
    ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, -GAME_HEIGHT / 2 + 80, 0);
    scene.add(ball);
    
    // Add ball glow
    const glowGeometry = new THREE.SphereGeometry(BALL_RADIUS + 2, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });
    const ballGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    ball.add(ballGlow);
}

function createBricks() {
    // Clear existing bricks
    bricks.forEach(brick => scene.remove(brick));
    bricks = [];
    
    const brickColors = [
        0xff6b6b, 0xffe66d, 0x4ecdc4, 0x45b7d1, 
        0x96ceb4, 0xfeca57, 0xff9ff3, 0x54a0ff
    ];
    
    const totalWidth = BRICK_COLS * BRICK_WIDTH + (BRICK_COLS - 1) * BRICK_PADDING;
    const startX = -totalWidth / 2 + BRICK_WIDTH / 2;
    const startY = GAME_HEIGHT / 2 - 80;
    
    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
            const geometry = new THREE.BoxGeometry(BRICK_WIDTH, BRICK_HEIGHT, 10);
            const material = new THREE.MeshBasicMaterial({ 
                color: brickColors[row % brickColors.length],
                transparent: true,
                opacity: 0.9
            });
            const brick = new THREE.Mesh(geometry, material);
            
            brick.position.set(
                startX + col * (BRICK_WIDTH + BRICK_PADDING),
                startY - row * (BRICK_HEIGHT + BRICK_PADDING),
                0
            );
            
            brick.userData = { destroyed: false };
            bricks.push(brick);
            scene.add(brick);
        }
    }
}

function createWalls() {
    // Thin frame drawn just outside the playfield so the ball's bounce
    // limits stay visible when the view is wider/taller than the field.
    const material = new THREE.MeshBasicMaterial({
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.18
    });
    const t = 4;

    const walls = [
        { w: t, h: GAME_HEIGHT + t * 2, x: -GAME_WIDTH / 2 - t / 2, y: 0 },
        { w: t, h: GAME_HEIGHT + t * 2, x: GAME_WIDTH / 2 + t / 2, y: 0 },
        { w: GAME_WIDTH + t * 2, h: t, x: 0, y: GAME_HEIGHT / 2 + t / 2 }
    ];

    walls.forEach(({ w, h, x, y }) => {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, 5), material);
        wall.position.set(x, y, -2);
        scene.add(wall);
    });
}

function startGame() {
    initAudio();
    sounds.gameStart();
    gameStarted = true;
    startScreen.classList.add('hidden');
    // Reset ball velocity
    ballVelocity.set(4, -4);
}

function restartGame() {
    initAudio();
    sounds.click();
    // Reset game state
    score = 0;
    lives = 3;
    gameOver = false;
    gameWon = false;
    gameStarted = false;
    
    updateUI();
    
    // Reset positions
    paddle.position.set(0, -GAME_HEIGHT / 2 + 50, 0);
    ball.position.set(0, -GAME_HEIGHT / 2 + 80, 0);
    ballVelocity.set(4, -4);
    
    // Recreate bricks
    createBricks();
    
    // Hide overlays
    gameOverScreen.classList.add('hidden');
    gameWinScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

function updateViewSize() {
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    const aspect = width / height;
    const gameAspect = GAME_WIDTH / GAME_HEIGHT;

    // Fit the whole 800x600 playfield on screen ("contain"), never stretching.
    // Extra space reveals the background gradient instead of distorting the game.
    if (aspect >= gameAspect) {
        viewHeight = GAME_HEIGHT;
        viewWidth = GAME_HEIGHT * aspect;
    } else {
        viewWidth = GAME_WIDTH;
        viewHeight = GAME_WIDTH / aspect;
    }

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
}

function onWindowResize() {
    updateViewSize();
}

// Convert a screen x position into playfield world coordinates.
function movePaddleTo(clientX) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;

    const ratio = (clientX - rect.left) / rect.width;
    const worldX = camera.left + ratio * (camera.right - camera.left);
    const halfPaddle = PADDLE_WIDTH / 2;

    paddle.position.x = clamp(
        worldX,
        -GAME_WIDTH / 2 + halfPaddle,
        GAME_WIDTH / 2 - halfPaddle
    );
}

function onPointerDown(event) {
    // Let overlay buttons handle their own taps/clicks.
    if (event.target instanceof Element && event.target.closest('button')) return;

    initAudio();

    if (event.pointerType !== 'mouse') {
        activePointerId = event.pointerId;
    }

    if (!gameStarted && !gameOver && !gameWon) {
        startGame();
    }

    if (gameStarted && !gameOver && !gameWon) {
        movePaddleTo(event.clientX);
    }
}

function onPointerMove(event) {
    if (!gameStarted || gameOver || gameWon) return;

    const isDragging = activePointerId !== null && event.pointerId === activePointerId;
    if (event.pointerType !== 'mouse' && !isDragging) return;

    movePaddleTo(event.clientX);
}

function onPointerUp(event) {
    if (event.pointerId === activePointerId) {
        activePointerId = null;
    }
}

function onKeyDown(event) {
    initAudio();
    keys[event.code] = true;
    
    if (event.code === 'Space') {
        event.preventDefault();
        if (!gameStarted && !gameOver && !gameWon) {
            startGame();
        } else if (gameOver || gameWon) {
            restartGame();
        }
    }

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        event.preventDefault();
    }
}

function onKeyUp(event) {
    keys[event.code] = false;
}

function updatePaddle(step) {
    if (!gameStarted || gameOver || gameWon) return;
    
    if (keys['ArrowLeft'] || keys['KeyA']) {
        paddle.position.x -= 8 * step;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        paddle.position.x += 8 * step;
    }
    
    // Clamp paddle position
    const halfPaddle = PADDLE_WIDTH / 2;
    paddle.position.x = clamp(paddle.position.x, -GAME_WIDTH / 2 + halfPaddle, GAME_WIDTH / 2 - halfPaddle);
}

function updateBall(step) {
    if (!gameStarted || gameOver || gameWon) return;
    
    ball.position.x += ballVelocity.x * step;
    ball.position.y += ballVelocity.y * step;
    
    // Wall collisions
    if (ball.position.x > GAME_WIDTH / 2 - BALL_RADIUS || ball.position.x < -GAME_WIDTH / 2 + BALL_RADIUS) {
        sounds.wallHit();
        ballVelocity.x = -ballVelocity.x;
        // Prevent ball from getting stuck
        ball.position.x = ball.position.x > 0 ? GAME_WIDTH / 2 - BALL_RADIUS : -GAME_WIDTH / 2 + BALL_RADIUS;
    }
    
    if (ball.position.y > GAME_HEIGHT / 2 - BALL_RADIUS) {
        sounds.wallHit();
        ballVelocity.y = -ballVelocity.y;
        ball.position.y = GAME_HEIGHT / 2 - BALL_RADIUS;
    }
    
    // Bottom wall - lose life
    if (ball.position.y < -GAME_HEIGHT / 2 + BALL_RADIUS) {
        sounds.loseLife();
        lives--;
        updateUI();
        
        if (lives <= 0) {
            gameOver = true;
            finalScoreElement.textContent = score;
            gameOverScreen.classList.remove('hidden');
            setTimeout(() => sounds.gameOver(), 300);
        } else {
            // Reset ball
            ball.position.set(0, -GAME_HEIGHT / 2 + 80, 0);
            ballVelocity.set(4, -4);
            gameStarted = false;
            startScreen.classList.remove('hidden');
        }
        return;
    }
    
    // Paddle collision
    if (ball.position.y <= paddle.position.y + PADDLE_HEIGHT / 2 + BALL_RADIUS &&
        ball.position.y >= paddle.position.y - PADDLE_HEIGHT / 2 &&
        ball.position.x >= paddle.position.x - PADDLE_WIDTH / 2 &&
        ball.position.x <= paddle.position.x + PADDLE_WIDTH / 2) {
        
        sounds.paddleHit();
        // Calculate bounce angle based on where ball hits paddle
        const hitPos = (ball.position.x - paddle.position.x) / (PADDLE_WIDTH / 2);
        ballVelocity.x = hitPos * 6;
        ballVelocity.y = Math.abs(ballVelocity.y);
        
        // Ensure minimum vertical speed
        if (Math.abs(ballVelocity.y) < 3) {
            ballVelocity.y = 3;
        }
        
        ball.position.y = paddle.position.y + PADDLE_HEIGHT / 2 + BALL_RADIUS;
    }
    
    // Brick collisions
    for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        if (brick.userData.destroyed) continue;
        
        if (ball.position.x + BALL_RADIUS >= brick.position.x - BRICK_WIDTH / 2 &&
            ball.position.x - BALL_RADIUS <= brick.position.x + BRICK_WIDTH / 2 &&
            ball.position.y + BALL_RADIUS >= brick.position.y - BRICK_HEIGHT / 2 &&
            ball.position.y - BALL_RADIUS <= brick.position.y + BRICK_HEIGHT / 2) {
            
            sounds.brickHit();
            // Determine collision side
            const overlapX = Math.min(
                ball.position.x + BALL_RADIUS - (brick.position.x - BRICK_WIDTH / 2),
                (brick.position.x + BRICK_WIDTH / 2) - (ball.position.x - BALL_RADIUS)
            );
            const overlapY = Math.min(
                ball.position.y + BALL_RADIUS - (brick.position.y - BRICK_HEIGHT / 2),
                (brick.position.y + BRICK_HEIGHT / 2) - (ball.position.y - BALL_RADIUS)
            );
            
            if (overlapX < overlapY) {
                ballVelocity.x = -ballVelocity.x;
            } else {
                ballVelocity.y = -ballVelocity.y;
            }
            
            // Destroy brick
            brick.userData.destroyed = true;
            scene.remove(brick);
            bricks.splice(i, 1);
            
            // Update score
            score += 10;
            updateUI();
            
            // Check win condition
            if (bricks.length === 0) {
                gameWon = true;
                winScoreElement.textContent = score;
                gameWinScreen.classList.remove('hidden');
                setTimeout(() => sounds.gameWin(), 200);
            }
            
            break;
        }
    }
}

function animate(time) {
    requestAnimationFrame(animate);
    
    if (!lastFrameTime) lastFrameTime = time;
    // Seconds since last frame, capped so a hitch/tab-switch can't teleport the ball.
    const delta = Math.min((time - lastFrameTime) / 1000, 1 / 30);
    lastFrameTime = time;
    // Velocities are tuned in "units per 60hz frame", so scale by frame count.
    const step = delta * 60;
    
    updatePaddle(step);
    updateBall(step);
    
    renderer.render(scene, camera);
}

init();
