/* Aspirante Versión Alfa 1.0 */
// BACKUP: THE INFILTRATION (ORCHESTRAL VARIATION)
// 5/4 Time - 170 BPM - C Minor
// Features: Driving Bass + Aggressive Cinematic Strings on Beat 1

(function () {
    let audioCtx;
    let isPlaying = false;
    let nextNoteTime = 0.0;
    let currentNote = 0; // 0-9 (Eighth notes in 5/4 bar)
    let currentBar = 0;
    let timerID;
    const tempo = 170.0;
    const lookahead = 25.0;
    const scheduleAheadTime = 0.1;

    // --- INSTRUMENTS ---

    // 1. ORIGINAL ID BASS (Chromatic Descent Motif)
    function playSpyBass(time, note) {
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // New Original Motif (C Minor Chromatic)
        // Avoids the G-Bb-C (Mission Impossible) intervals
        let freq = 65.41; // C2 (Root) - Deeper, grittier
        if (note === 'Eb') freq = 77.78; // Minor 3rd
        if (note === 'D') freq = 73.42; // Major 2nd (Tension)
        if (note === 'Db') freq = 69.30; // Flat 2nd (Phrygian/Dark)

        osc.type = 'sawtooth'; // Aggressive saw for grit
        osc.frequency.setValueAtTime(freq, time);

        osc2.type = 'triangle'; // Sub body
        osc2.frequency.setValueAtTime(freq / 2, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);
        filter.frequency.exponentialRampToValueAtTime(80, time + 0.35); // Pluck
        filter.Q.value = 6;

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.linearRampToValueAtTime(0, time + 0.35);

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc2.start(time);
        osc.stop(time + 0.4);
        osc2.stop(time + 0.4);
    }

    // 2. CINEMATIC STRING SECTION (Violins/Cellos)
    // High-tension Marcato Hits
    function playStringHit(time, chord) {
        // C Minor High Voice: C5, Eb5, G5
        // + C4 (Cellos)
        const freqs = [523.25, 622.25, 783.99, 261.63];

        const masterGain = audioCtx.createGain();
        // Strong attack, sustain slightly, then decay
        masterGain.gain.setValueAtTime(0, time);
        masterGain.gain.linearRampToValueAtTime(0.45, time + 0.05); // Bow attack impact
        masterGain.gain.exponentialRampToValueAtTime(0.1, time + 0.3); // Decay tail
        masterGain.gain.linearRampToValueAtTime(0, time + 0.4); // Release

        masterGain.connect(audioCtx.destination);

        freqs.forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sawtooth';
            // Detune slightly for ensemble effect
            const detune = (i % 2 === 0) ? 5 : -5;
            osc.detune.value = detune;
            osc.frequency.value = f;

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 4000; // Bright strings

            osc.connect(filter);
            filter.connect(masterGain);
            osc.start(time);
            osc.stop(time + 0.5);
        });
    }

    // 3. ORCHESTRAL HIT (C Minor 11 Stabs)
    function playStab(time) {
        // C4, Eb4, G4, Bb4, D5 (Jazzy/Spy Chord)
        const freqs = [261.63, 311.13, 392.00, 466.16, 587.33];
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.5, time);
        masterGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15); // Very sharp
        masterGain.connect(audioCtx.destination);

        freqs.forEach(f => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.value = f;
            osc.connect(masterGain);
            osc.start(time);
            osc.stop(time + 0.15);
        });
    }

    // 4. HI-HAT (Fast 16ths feel)
    function playHiHat(time, open) {
        const bufferSize = audioCtx.sampleRate * (open ? 0.3 : 0.05);
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7000;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(open ? 0.06 : 0.02, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.2 : 0.05));

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        source.start(time);
    }

    // 5. PERCUSSION (Rimshots)
    function playRim(time) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(1800, time);
        osc.frequency.exponentialRampToValueAtTime(400, time + 0.02);
        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.02);
    }

    // --- COMPOSITION (5/4 Orchestral) ---
    // Rhythm: 10 beats (eighths)
    // New Pattern: 3 + 3 + 2 + 2
    // Bass Notes: C (Root) -> Eb (Min3) -> D (Maj2) -> Db (Min2)
    // A descending chromatic line that creates tension rather than the "ascending" hook of MI.

    function scheduleNote(beat, time) {
        // STRINGS / VIOLINS (The Request)
        // Hit HARD on Beat 1 (0) EVERY BAR
        if (beat === 0) {
            playStringHit(time);
        }
        // Variation: Double hit on Bar 4
        if (currentBar % 4 === 3 && beat === 3) {
            playStringHit(time);
        }

        // BASS LINE
        if (beat === 0) playSpyBass(time, 'C');  // ROOT (Beat 1)
        if (beat === 3) playSpyBass(time, 'C');  // ROOT (Beat 2.5)
        if (beat === 6) playSpyBass(time, 'Eb'); // MOVE UP (Beat 4)
        if (beat === 8) playSpyBass(time, 'D');  // CHROMATIC DOWN
        // Variation every 4th bar
        if (currentBar % 4 === 3 && beat === 8) playSpyBass(time, 'Db');

        // HI-HATS (Driving Motor)
        playHiHat(time, beat === 9); // Accent last
        if (beat % 2 === 0) playHiHat(time + 0.1, false); // Ghost notes

        // ORCHESTRAL STABS (The "Punch")
        // Hits on Beat 1 of Bar 1, and syncopated on Bar 2
        if (currentBar % 2 === 0 && beat === 0) playStab(time);
        if (currentBar % 2 === 1 && beat === 6) playStab(time); // Syncopated hit

        // RIMSHOTS (Clockwork)
        if (beat === 2 || beat === 7) playRim(time);
    }

    function scheduler() {
        while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
            scheduleNote(currentNote, nextNoteTime);
            const secondsPerBeat = 60.0 / tempo;
            nextNoteTime += 0.5 * secondsPerBeat; // Eighth notes
            currentNote++;
            if (currentNote === 10) {
                currentNote = 0;
                currentBar++;
            }
        }
        timerID = setTimeout(scheduler, lookahead);
    }

    function startSeq() {
        if (isPlaying) return;
        if (audioCtx && audioCtx.state === 'suspended') {
            let p = document.getElementById('audio-unlock-prompt');
            if (!p) {
                p = document.createElement('div');
                p.id = 'audio-unlock-prompt';
                p.style.cssText = 'position:absolute; bottom:15%; color:#ff3300; font-family:"Verdana"; font-size:14px; font-weight:bold; z-index:100000; animation:blink 0.5s infinite; cursor:pointer; background:rgba(0,0,0,0.9); padding:10px 20px; border:2px solid #ff3300; letter-spacing:1px; text-transform:uppercase; border-radius:4px;';
                p.innerText = '[ ACTIVATE SECURITY PROTOCOL ]';
                p.onclick = () => { audioCtx.resume(); p.remove(); };
                const overlay = document.getElementById('app-loading-overlay');
                if (overlay) overlay.appendChild(p);
            }
            return;
        }
        isPlaying = true;
        currentNote = 0;
        currentBar = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler();
    }

    function stopSeq() {
        isPlaying = false;
        clearTimeout(timerID);
    }

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
            const unlock = () => {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const p = document.getElementById('audio-unlock-prompt');
                if (p) p.remove();
                if (!isPlaying) startSeq();
            };
            document.addEventListener('click', unlock);
            document.addEventListener('keydown', unlock);
            startSeq();
        }
    } catch (e) { console.warn("Audio Error", e); }

    const checkLoop = setInterval(() => {
        const overlay = document.getElementById('app-loading-overlay');
        if (!overlay || overlay.style.display === 'none' || overlay.style.opacity === '0') {
            stopSeq();
            clearInterval(checkLoop);
        }
    }, 500);

})();
