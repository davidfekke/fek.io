import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const BASE_WORLD_WIDTH = 800;
const BASE_WORLD_HEIGHT = 600;
const SHIP_RADIUS = 16;
const BULLET_SPEED = 470;
const SHIP_THRUST = 210;
const SHIP_ROTATE_SPEED = 4.4;
const SHIP_MAX_SPEED = 320;
const SHIP_DRAG_PER_FRAME_60FPS = 0.995;
const EXTRA_LIFE_EVERY = 10000;
const SAUCER_RADIUS = 18;
const SAUCER_SHOT_SPEED = 260;

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOver');
const gameWinScreen = document.getElementById('gameWin');
const startButton = document.getElementById('startButton');
const restartGameOver = document.getElementById('restartGameOver');
const restartGameWin = document.getElementById('restartGameWin');
const finalScoreElement = document.getElementById('finalScore');
const canvas = document.getElementById('canvas');

let scene;
let camera;
let renderer;
let stars;

let viewWidth = BASE_WORLD_WIDTH;
let viewHeight = BASE_WORLD_HEIGHT;

let ship = null;
let shipVelocity = new THREE.Vector2(0, 0);
let shipInvulnerableUntil = 0;
let hyperspaceCooldownUntil = 0;

let bullets = [];
let enemyBullets = [];
let asteroids = [];
let saucer = null;

let score = 0;
let lives = 3;
let level = 1;
let gameStarted = false;
let gameEnded = false;

let fireCooldown = 0;
let thrustSfxCooldown = 0;
let lastFrameTime = 0;
let beatTimer = 0;
let beatStep = 0;
let nextExtraLifeAt = EXTRA_LIFE_EVERY;
let nextSaucerSpawnAt = Number.POSITIVE_INFINITY;
let saucerUnlocked = false;

const keys = {
    left: false,
    right: false,
    thrust: false,
    fire: false
};

const pointer = {
    active: false,
    x: 0,
    y: 0,
    fireCooldown: 0
};

const audioState = {
    ctx: null
};

function randomIn(min, max) {
    return min + Math.random() * (max - min);
}

function shortestWrappedDelta(fromX, fromY, toX, toY) {
    let dx = toX - fromX;
    let dy = toY - fromY;
    const halfW = viewWidth / 2;
    const halfH = viewHeight / 2;

    if (dx > halfW) dx -= viewWidth;
    if (dx < -halfW) dx += viewWidth;
    if (dy > halfH) dy -= viewHeight;
    if (dy < -halfH) dy += viewHeight;

    return { dx, dy };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function wrapPosition(position) {
    const halfW = viewWidth / 2;
    const halfH = viewHeight / 2;

    if (position.x > halfW) position.x = -halfW;
    if (position.x < -halfW) position.x = halfW;
    if (position.y > halfH) position.y = -halfH;
    if (position.y < -halfH) position.y = halfH;
}

function getForwardVector(angle) {
    return new THREE.Vector2(-Math.sin(angle), Math.cos(angle));
}

function initAudio() {
    if (!audioState.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioState.ctx = new AudioCtx();
    }
    if (audioState.ctx.state === 'suspended') {
        audioState.ctx.resume();
    }
    return audioState.ctx;
}

function playTone({
    frequency,
    duration = 0.12,
    type = 'square',
    volume = 0.08,
    attack = 0.005,
    release = 0.08,
    slideTo
}) {
    const ctx = initAudio();
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    if (slideTo) {
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + release + 0.02);
}

function playNoiseBurst(duration = 0.14, volume = 0.05) {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const frameCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i += 1) {
        data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
    source.stop(now + duration + 0.01);
}

const sounds = {
    start() {
        [440, 554, 659, 880].forEach((note, idx) => {
            setTimeout(() => {
                playTone({ frequency: note, duration: 0.09, type: 'square', volume: 0.09 });
            }, idx * 80);
        });
    },
    laser() {
        playTone({ frequency: 900, slideTo: 260, duration: 0.1, type: 'square', volume: 0.1 });
    },
    thrust() {
        playTone({ frequency: 120, slideTo: 100, duration: 0.07, type: 'triangle', volume: 0.045 });
    },
    explode() {
        playTone({ frequency: 180, slideTo: 60, duration: 0.18, type: 'sawtooth', volume: 0.1 });
        playNoiseBurst(0.15, 0.05);
    },
    shipHit() {
        playTone({ frequency: 220, slideTo: 55, duration: 0.32, type: 'sawtooth', volume: 0.11 });
        playNoiseBurst(0.25, 0.06);
    },
    levelUp() {
        [523, 659, 784].forEach((note, idx) => {
            setTimeout(() => {
                playTone({ frequency: note, duration: 0.1, type: 'square', volume: 0.09 });
            }, idx * 90);
        });
    },
    hyperspace() {
        playTone({ frequency: 220, slideTo: 1500, duration: 0.24, type: 'square', volume: 0.08 });
    },
    gameOver() {
        [392, 349, 294, 262].forEach((note, idx) => {
            setTimeout(() => {
                playTone({ frequency: note, duration: 0.16, type: 'sawtooth', volume: 0.09 });
            }, idx * 170);
        });
    },
    extraLife() {
        [784, 1046, 1318].forEach((note, idx) => {
            setTimeout(() => {
                playTone({ frequency: note, duration: 0.08, type: 'square', volume: 0.08 });
            }, idx * 70);
        });
    },
    beatA() {
        playTone({ frequency: 110, duration: 0.06, type: 'triangle', volume: 0.065 });
    },
    beatB() {
        playTone({ frequency: 82, duration: 0.06, type: 'triangle', volume: 0.065 });
    },
    saucerFire() {
        playTone({ frequency: 680, slideTo: 420, duration: 0.08, type: 'square', volume: 0.08 });
    },
    saucerHit() {
        playTone({ frequency: 260, slideTo: 90, duration: 0.18, type: 'sawtooth', volume: 0.09 });
        playNoiseBurst(0.12, 0.04);
    }
};

function createShip() {
    const shipShape = new THREE.BufferGeometry();
    const points = new Float32Array([
        0, SHIP_RADIUS, 0,
        -SHIP_RADIUS * 0.7, -SHIP_RADIUS * 0.8, 0,
        0, -SHIP_RADIUS * 0.3, 0,
        SHIP_RADIUS * 0.7, -SHIP_RADIUS * 0.8, 0,
        0, SHIP_RADIUS, 0
    ]);
    shipShape.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const material = new THREE.LineBasicMaterial({ color: 0x7fe0ff });
    const shipLine = new THREE.Line(shipShape, material);
    shipLine.position.set(0, 0, 0);
    scene.add(shipLine);
    return shipLine;
}

function createStars() {
    if (stars) {
        scene.remove(stars);
        stars.geometry.dispose();
        stars.material.dispose();
    }

    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
        positions[i * 3] = randomIn(-viewWidth / 2, viewWidth / 2);
        positions[i * 3 + 1] = randomIn(-viewHeight / 2, viewHeight / 2);
        positions[i * 3 + 2] = -20;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xc9ddff, size: 1.8, sizeAttenuation: false });
    stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

function createAsteroidGeometry(radius) {
    const segments = 12;
    const vertices = [];
    for (let i = 0; i < segments; i += 1) {
        const t = (i / segments) * Math.PI * 2;
        const jaggedRadius = radius * randomIn(0.75, 1.2);
        vertices.push(Math.cos(t) * jaggedRadius, Math.sin(t) * jaggedRadius, 0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
}

function makeAsteroid(size, position = null) {
    const radiusBySize = {
        3: 42,
        2: 24,
        1: 14
    };
    const radius = radiusBySize[size];
    const geometry = createAsteroidGeometry(radius);
    const material = new THREE.LineBasicMaterial({ color: 0xc3b7ff });
    const mesh = new THREE.LineLoop(geometry, material);

    const pos = position
        ? position.clone()
        : new THREE.Vector2(
            randomIn(-viewWidth / 2, viewWidth / 2),
            randomIn(-viewHeight / 2, viewHeight / 2)
        );

    if (ship && pos.distanceTo(new THREE.Vector2(ship.position.x, ship.position.y)) < 140) {
        pos.x *= -1;
        pos.y *= -1;
    }

    mesh.position.set(pos.x, pos.y, 0);
    mesh.rotation.z = randomIn(0, Math.PI * 2);
    scene.add(mesh);

    const speedBase = 24 + (level * 5);
    const velocity = new THREE.Vector2(
        randomIn(-1, 1),
        randomIn(-1, 1)
    ).normalize().multiplyScalar(speedBase * randomIn(0.6, 1.3));

    return {
        mesh,
        size,
        radius,
        velocity,
        spin: randomIn(-1.2, 1.2)
    };
}

function spawnWave() {
    const count = clamp(3 + level, 4, 11);
    for (let i = 0; i < count; i += 1) {
        asteroids.push(makeAsteroid(3));
    }
}

function clearBullets() {
    bullets.forEach((bullet) => {
        scene.remove(bullet.mesh);
        bullet.mesh.geometry.dispose();
        bullet.mesh.material.dispose();
    });
    bullets = [];
}

function clearEnemyBullets() {
    enemyBullets.forEach((bullet) => {
        scene.remove(bullet.mesh);
        bullet.mesh.geometry.dispose();
        bullet.mesh.material.dispose();
    });
    enemyBullets = [];
}

function clearAsteroids() {
    asteroids.forEach((asteroid) => {
        scene.remove(asteroid.mesh);
        asteroid.mesh.geometry.dispose();
        asteroid.mesh.material.dispose();
    });
    asteroids = [];
}

function clearSaucer() {
    if (!saucer) {
        return;
    }
    scene.remove(saucer.mesh);
    saucer.mesh.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
    });
    saucer = null;
}

function createBullet() {
    if (!ship || gameEnded || !gameStarted) {
        return;
    }

    const angle = ship.rotation.z;
    const dir = getForwardVector(angle);
    const geometry = new THREE.CircleGeometry(2.4, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffef6f });
    const mesh = new THREE.Mesh(geometry, material);

    const startX = ship.position.x + dir.x * (SHIP_RADIUS + 4);
    const startY = ship.position.y + dir.y * (SHIP_RADIUS + 4);
    mesh.position.set(startX, startY, 0);
    scene.add(mesh);

    bullets.push({
        mesh,
        velocity: dir.multiplyScalar(BULLET_SPEED).add(shipVelocity.clone().multiplyScalar(0.25)),
        ttl: 0.95
    });

    sounds.laser();
}

function splitAsteroid(hitAsteroid) {
    if (hitAsteroid.size <= 1) {
        return;
    }

    const nextSize = hitAsteroid.size - 1;
    for (let i = 0; i < 2; i += 1) {
        const child = makeAsteroid(
            nextSize,
            new THREE.Vector2(hitAsteroid.mesh.position.x, hitAsteroid.mesh.position.y)
        );
        child.velocity.copy(hitAsteroid.velocity);
        child.velocity.add(new THREE.Vector2(randomIn(-42, 42), randomIn(-42, 42)));
        asteroids.push(child);
    }
}

function makeSaucer() {
    const group = new THREE.Group();
    const color = 0xff9cf0;

    const domePoints = new Float32Array([
        -7, 2, 0,
        -3, 7, 0,
        3, 7, 0,
        7, 2, 0
    ]);
    const dome = new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(domePoints, 3)),
        new THREE.LineBasicMaterial({ color })
    );

    const hullPoints = new Float32Array([
        -14, 2, 0,
        -7, -4, 0,
        7, -4, 0,
        14, 2, 0
    ]);
    const hull = new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(hullPoints, 3)),
        new THREE.LineBasicMaterial({ color })
    );

    const bellyPoints = new Float32Array([
        -7, -4, 0,
        -2, -7, 0,
        2, -7, 0,
        7, -4, 0
    ]);
    const belly = new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(bellyPoints, 3)),
        new THREE.LineBasicMaterial({ color })
    );

    group.add(dome, hull, belly);
    group.scale.set(1.6, 1.6, 1);

    const fromLeft = Math.random() < 0.5;
    const y = randomIn(-viewHeight * 0.35, viewHeight * 0.35);
    group.position.set(fromLeft ? -viewWidth / 2 - 50 : viewWidth / 2 + 50, y, 0);
    scene.add(group);

    return {
        mesh: group,
        velocity: new THREE.Vector2(fromLeft ? randomIn(55, 85) : randomIn(-85, -55), randomIn(-18, 18)),
        shotCooldown: randomIn(0.8, 1.4)
    };
}

function spawnSaucer(now) {
    if (saucer || gameEnded || !gameStarted || !saucerUnlocked || asteroids.length < 2) {
        return;
    }
    saucer = makeSaucer();
    nextSaucerSpawnAt = now + randomIn(22000, 38000);
}

function fireSaucerShot() {
    if (!saucer || !ship) {
        return;
    }

    const saucerPos = saucer.mesh.position;
    const delta = shortestWrappedDelta(
        saucerPos.x,
        saucerPos.y,
        ship.position.x,
        ship.position.y
    );
    const aimAngle = Math.atan2(delta.dy, delta.dx);
    const spread = clamp(0.42 - level * 0.03, 0.14, 0.42);
    const shotAngle = aimAngle + randomIn(-spread, spread);
    const velocity = new THREE.Vector2(Math.cos(shotAngle), Math.sin(shotAngle)).multiplyScalar(SAUCER_SHOT_SPEED);

    const geometry = new THREE.CircleGeometry(2.3, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xff7b72 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(saucerPos.x, saucerPos.y, 0);
    scene.add(mesh);

    enemyBullets.push({
        mesh,
        velocity,
        ttl: 1.8,
        radius: 3
    });

    sounds.saucerFire();
}

function removeBullet(index) {
    const bullet = bullets[index];
    scene.remove(bullet.mesh);
    bullet.mesh.geometry.dispose();
    bullet.mesh.material.dispose();
    bullets.splice(index, 1);
}

function removeAsteroid(index) {
    const asteroid = asteroids[index];
    scene.remove(asteroid.mesh);
    asteroid.mesh.geometry.dispose();
    asteroid.mesh.material.dispose();
    asteroids.splice(index, 1);
}

function removeEnemyBullet(index) {
    const bullet = enemyBullets[index];
    scene.remove(bullet.mesh);
    bullet.mesh.geometry.dispose();
    bullet.mesh.material.dispose();
    enemyBullets.splice(index, 1);
}

function destroySaucer(awardPoints = false) {
    if (!saucer) {
        return;
    }
    if (awardPoints) {
        score += 200;
        if (score >= nextExtraLifeAt) {
            lives += 1;
            nextExtraLifeAt += EXTRA_LIFE_EVERY;
            sounds.extraLife();
        }
        updateUI();
    }
    sounds.saucerHit();
    clearSaucer();
}

function updateUI() {
    scoreElement.textContent = `${score}`;
    livesElement.textContent = `${lives}`;
}

function showGameOver() {
    gameEnded = true;
    clearSaucer();
    clearEnemyBullets();
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = `${score}`;
    sounds.gameOver();
}

function resetShipPosition() {
    ship.position.set(0, 0, 0);
    ship.rotation.z = 0;
    shipVelocity.set(0, 0);
    shipInvulnerableUntil = performance.now() + 1800;
}

function explodeShip() {
    lives -= 1;
    updateUI();
    sounds.shipHit();
    if (lives <= 0) {
        showGameOver();
        return;
    }
    resetShipPosition();
    asteroids.forEach((asteroid) => {
        const delta = shortestWrappedDelta(
            ship.position.x,
            ship.position.y,
            asteroid.mesh.position.x,
            asteroid.mesh.position.y
        );
        const distance = Math.hypot(delta.dx, delta.dy);
        if (distance < 130) {
            asteroid.mesh.position.x += delta.dx >= 0 ? 140 : -140;
            asteroid.mesh.position.y += delta.dy >= 0 ? 140 : -140;
            wrapPosition(asteroid.mesh.position);
        }
    });
}

function triggerHyperspace() {
    const now = performance.now();
    if (now < hyperspaceCooldownUntil || !gameStarted || gameEnded) {
        return;
    }
    hyperspaceCooldownUntil = now + 5000;
    ship.position.set(
        randomIn(-viewWidth / 2, viewWidth / 2),
        randomIn(-viewHeight / 2, viewHeight / 2),
        0
    );
    if (Math.random() < 0.15 && asteroids.length > 0) {
        explodeShip();
        return;
    }
    shipVelocity.multiplyScalar(0.2);
    shipInvulnerableUntil = now + 1200;
    sounds.hyperspace();
}

function startGame() {
    initAudio();
    sounds.start();
    gameStarted = true;
    gameEnded = false;

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameWinScreen.classList.add('hidden');
}

function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    gameStarted = false;
    gameEnded = false;

    fireCooldown = 0;
    thrustSfxCooldown = 0;
    pointer.fireCooldown = 0;
    beatTimer = 0;
    beatStep = 0;
    nextExtraLifeAt = EXTRA_LIFE_EVERY;
    saucerUnlocked = false;
    nextSaucerSpawnAt = Number.POSITIVE_INFINITY;

    clearBullets();
    clearEnemyBullets();
    clearAsteroids();
    clearSaucer();
    spawnWave();

    resetShipPosition();
    updateUI();

    gameOverScreen.classList.add('hidden');
    gameWinScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const baseAspect = BASE_WORLD_WIDTH / BASE_WORLD_HEIGHT;
    const viewportAspect = width / height;

    if (viewportAspect > baseAspect) {
        viewHeight = BASE_WORLD_HEIGHT;
        viewWidth = BASE_WORLD_HEIGHT * viewportAspect;
    } else {
        viewWidth = BASE_WORLD_WIDTH;
        viewHeight = BASE_WORLD_WIDTH / viewportAspect;
    }

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    createStars();
}

function worldPointerFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    return new THREE.Vector2((nx * viewWidth) / 2, (ny * viewHeight) / 2);
}

function onPointerDown(event) {
    pointer.active = true;
    const world = worldPointerFromEvent(event);
    pointer.x = world.x;
    pointer.y = world.y;
}

function onPointerMove(event) {
    if (!pointer.active) {
        return;
    }
    const world = worldPointerFromEvent(event);
    pointer.x = world.x;
    pointer.y = world.y;
}

function onPointerUp() {
    pointer.active = false;
}

function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = true;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keys.thrust = true;
            break;
        case 'Space':
            keys.fire = true;
            event.preventDefault();
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            triggerHyperspace();
            break;
        default:
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = false;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keys.thrust = false;
            break;
        case 'Space':
            keys.fire = false;
            break;
        default:
            break;
    }
}

function updateShip(dt, now) {
    if (!ship) {
        return;
    }

    let turning = 0;
    if (keys.left) turning += 1;
    if (keys.right) turning -= 1;

    if (pointer.active) {
        const dx = pointer.x - ship.position.x;
        const dy = pointer.y - ship.position.y;
        const targetAngle = Math.atan2(-dx, dy);
        let delta = targetAngle - ship.rotation.z;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        ship.rotation.z += clamp(delta, -SHIP_ROTATE_SPEED * dt, SHIP_ROTATE_SPEED * dt);
    } else if (turning !== 0) {
        ship.rotation.z += turning * SHIP_ROTATE_SPEED * dt;
    }

    const thrusting = keys.thrust || pointer.active;
    if (thrusting) {
        const thrustVector = getForwardVector(ship.rotation.z)
            .multiplyScalar(SHIP_THRUST * dt);
        shipVelocity.add(thrustVector);

        thrustSfxCooldown -= dt;
        if (thrustSfxCooldown <= 0) {
            sounds.thrust();
            thrustSfxCooldown = 0.14;
        }
    } else {
        thrustSfxCooldown = Math.max(0, thrustSfxCooldown - dt);
    }

    const speed = shipVelocity.length();
    if (speed > SHIP_MAX_SPEED) {
        shipVelocity.setLength(SHIP_MAX_SPEED);
    }

    const drag = Math.pow(SHIP_DRAG_PER_FRAME_60FPS, dt * 60);
    shipVelocity.multiplyScalar(drag);
    ship.position.x += shipVelocity.x * dt;
    ship.position.y += shipVelocity.y * dt;
    wrapPosition(ship.position);

    const isInvulnerable = now < shipInvulnerableUntil;
    ship.visible = !(isInvulnerable && Math.floor(now / 110) % 2 === 0);
}

function updateBullets(dt) {
    for (let i = bullets.length - 1; i >= 0; i -= 1) {
        const bullet = bullets[i];
        bullet.ttl -= dt;
        bullet.mesh.position.x += bullet.velocity.x * dt;
        bullet.mesh.position.y += bullet.velocity.y * dt;
        wrapPosition(bullet.mesh.position);
        if (bullet.ttl <= 0) {
            removeBullet(i);
        }
    }
}

function updateAsteroids(dt) {
    asteroids.forEach((asteroid) => {
        asteroid.mesh.position.x += asteroid.velocity.x * dt;
        asteroid.mesh.position.y += asteroid.velocity.y * dt;
        asteroid.mesh.rotation.z += asteroid.spin * dt;
        wrapPosition(asteroid.mesh.position);
    });
}

function updateEnemyBullets(dt) {
    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
        const bullet = enemyBullets[i];
        bullet.ttl -= dt;
        bullet.mesh.position.x += bullet.velocity.x * dt;
        bullet.mesh.position.y += bullet.velocity.y * dt;
        wrapPosition(bullet.mesh.position);
        if (bullet.ttl <= 0) {
            removeEnemyBullet(i);
        }
    }
}

function updateSaucer(dt, now) {
    if (!saucer) {
        if (saucerUnlocked && now >= nextSaucerSpawnAt) {
            spawnSaucer(now);
        }
        return;
    }

    saucer.mesh.position.x += saucer.velocity.x * dt;
    saucer.mesh.position.y += saucer.velocity.y * dt;

    if (saucer.mesh.position.y > viewHeight / 2 - 60 || saucer.mesh.position.y < -viewHeight / 2 + 60) {
        saucer.velocity.y *= -1;
    }

    saucer.shotCooldown -= dt;
    if (saucer.shotCooldown <= 0) {
        fireSaucerShot();
        saucer.shotCooldown = randomIn(0.95, 1.8);
    }

    if (saucer.mesh.position.x < -viewWidth / 2 - 90 || saucer.mesh.position.x > viewWidth / 2 + 90) {
        clearSaucer();
    }
}

function handleFire(dt) {
    fireCooldown -= dt;
    pointer.fireCooldown -= dt;

    if (keys.fire && fireCooldown <= 0) {
        createBullet();
        fireCooldown = 0.14;
    }

    if (pointer.active && pointer.fireCooldown <= 0) {
        createBullet();
        pointer.fireCooldown = 0.18;
    }
}

function checkCollisions(now) {
    for (let b = bullets.length - 1; b >= 0; b -= 1) {
        const bullet = bullets[b];
        const bulletPos = new THREE.Vector2(bullet.mesh.position.x, bullet.mesh.position.y);

        if (saucer) {
            const saucerPos = new THREE.Vector2(saucer.mesh.position.x, saucer.mesh.position.y);
            if (bulletPos.distanceTo(saucerPos) < SAUCER_RADIUS) {
                removeBullet(b);
                destroySaucer(true);
                continue;
            }
        }

        for (let a = asteroids.length - 1; a >= 0; a -= 1) {
            const asteroid = asteroids[a];
            const asteroidPos = new THREE.Vector2(asteroid.mesh.position.x, asteroid.mesh.position.y);
            if (bulletPos.distanceTo(asteroidPos) < asteroid.radius + 2) {
                removeBullet(b);
                splitAsteroid(asteroid);
                removeAsteroid(a);

                const pointsBySize = { 3: 20, 2: 50, 1: 100 };
                score += pointsBySize[asteroid.size];
                if (score >= nextExtraLifeAt) {
                    lives += 1;
                    nextExtraLifeAt += EXTRA_LIFE_EVERY;
                    sounds.extraLife();
                }
                updateUI();
                sounds.explode();
                break;
            }
        }
    }

    if (now < shipInvulnerableUntil || !ship) {
        return;
    }

    const shipPos = new THREE.Vector2(ship.position.x, ship.position.y);
    for (let a = 0; a < asteroids.length; a += 1) {
        const asteroid = asteroids[a];
        const asteroidPos = new THREE.Vector2(asteroid.mesh.position.x, asteroid.mesh.position.y);
        if (shipPos.distanceTo(asteroidPos) < asteroid.radius + SHIP_RADIUS * 0.6) {
            explodeShip();
            break;
        }
    }

    if (saucer) {
        const saucerPos = new THREE.Vector2(saucer.mesh.position.x, saucer.mesh.position.y);
        if (shipPos.distanceTo(saucerPos) < SAUCER_RADIUS + SHIP_RADIUS * 0.6) {
            destroySaucer(false);
            explodeShip();
            return;
        }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
        const enemyBullet = enemyBullets[i];
        const enemyPos = new THREE.Vector2(enemyBullet.mesh.position.x, enemyBullet.mesh.position.y);
        if (shipPos.distanceTo(enemyPos) < SHIP_RADIUS * 0.58 + enemyBullet.radius) {
            removeEnemyBullet(i);
            explodeShip();
            break;
        }
    }
}

function handleWaveProgression() {
    if (asteroids.length !== 0 || gameEnded || !gameStarted) {
        return;
    }

    level += 1;
    if (!saucerUnlocked && level >= 2) {
        saucerUnlocked = true;
        nextSaucerSpawnAt = performance.now() + randomIn(12000, 22000);
    }
    sounds.levelUp();
    spawnWave();
    resetShipPosition();
}

function updateHeartbeat(dt) {
    if (!gameStarted || gameEnded || asteroids.length === 0) {
        return;
    }

    const remainingRatio = clamp(asteroids.length / (3 + level), 0.15, 1);
    const interval = 0.22 + (0.82 - 0.22) * remainingRatio;
    beatTimer += dt;
    if (beatTimer >= interval) {
        beatTimer = 0;
        if (beatStep % 2 === 0) {
            sounds.beatA();
        } else {
            sounds.beatB();
        }
        beatStep += 1;
    }
}

function animate(now) {
    requestAnimationFrame(animate);

    if (!lastFrameTime) {
        lastFrameTime = now;
    }
    const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;

    if (gameStarted && !gameEnded) {
        updateShip(dt, now);
        handleFire(dt);
        updateBullets(dt);
        updateEnemyBullets(dt);
        updateAsteroids(dt);
        updateSaucer(dt, now);
        checkCollisions(now);
        handleWaveProgression();
        updateHeartbeat(dt);
    }

    renderer.render(scene, camera);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-viewWidth / 2, viewWidth / 2, viewHeight / 2, -viewHeight / 2, 0.1, 1000);
    camera.position.z = 120;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);

    createStars();
    ship = createShip();
    spawnWave();
    updateUI();
    resetShipPosition();
    saucerUnlocked = false;
    nextSaucerSpawnAt = Number.POSITIVE_INFINITY;

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onWindowResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    startButton.addEventListener('click', startGame);
    restartGameOver.addEventListener('click', () => {
        resetGame();
        startGame();
    });
    restartGameWin.addEventListener('click', () => {
        resetGame();
        startGame();
    });

    onWindowResize();
    requestAnimationFrame(animate);
}

init();
