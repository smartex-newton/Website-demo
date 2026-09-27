 "use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

type Progress = { xp: number; streak: number; completed: number[]; labRuns: number };

const lessons = [
  ["Voltage", "Learn what pushes electric charge.", "⚡"],
  ["Current", "Understand the flow of charge.", "〰"],
  ["Resistance", "Discover why components limit current.", "◉"],
  ["Ohm's Law", "Connect voltage, current and resistance.", "Ω"],
  ["Circuits", "Build series and parallel circuits.", "🔌"],
  ["Semiconductors", "Meet diodes, LEDs and transistors.", "◈"],
  ["Arduino", "Control real-world devices with code.", "▣"],
  ["Power", "Understand energy, watts and efficiency.", "◆"],
  ["Safety", "Work safely around electricity.", "🛡"]
];

const projects = [
  { title: "Smart Street Light", fact: "Engineers combine light sensors, controllers and efficient LEDs to automate public lighting.", challenge: "Design a circuit that turns an LED on when the room gets dark." },
  { title: "Solar Phone Charger", fact: "Solar-powered chargers convert sunlight into electrical energy and regulate it for electronics.", challenge: "Choose a safe voltage-regulation path for a small USB charger." },
  { title: "Electric Vehicle Motor", fact: "Modern EVs use power electronics to control electric motors and manage battery energy.", challenge: "Explain how changing current affects motor power." },
  { title: "Home Energy Monitor", fact: "Smart meters and sensors can measure electricity use and help reduce wasted energy.", challenge: "Create a measurement plan for three household devices." }
];

export default function Electrocuted() {
  const [tab, setTab] = useState("learn");
  const [progress, setProgress] = useState<Progress>({ xp: 0, streak: 1, completed: [], labRuns: 0 });
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("electrocuted-progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  function save(next: Progress) {
    setProgress(next);
    localStorage.setItem("electrocuted-progress", JSON.stringify(next));
  }

  function completeLesson(i: number) {
    if (progress.completed.includes(i)) {
      setNotice("Lesson already mastered. Try the lab challenge next.");
      return;
    }
    const next = { ...progress, xp: progress.xp + 25, completed: [...progress.completed, i] };
    save(next);
    setNotice(`+25 XP — ${lessons[i][0]} completed!`);
  }

  function runLab() {
    save({ ...progress, xp: progress.xp + 10, labRuns: progress.labRuns + 1 });
    setNotice("+10 XP — experiment recorded.");
  }

  const pct = Math.round((progress.completed.length / lessons.length) * 100);
  const week = projects[Math.floor(Date.now() / 604800000) % projects.length];

  return (
    <main>
      <header className="top">
        <div className="logo"><span>⚡</span> ELECTROCUTED</div>
        <nav>
          <button className={tab==="learn"?"active":""} onClick={()=>setTab("learn")}>Learn</button>
          <button className={tab==="lab"?"active":""} onClick={()=>setTab("lab")}>3D Lab</button>
          <button className={tab==="projects"?"active":""} onClick={()=>setTab("projects")}>Weekly Challenge</button>
        </nav>
        <div className="stats"><b>🔥 {progress.streak}</b><b>XP {progress.xp}</b></div>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow">ELECTRICITY • ENGINEERING • BUILDING</div>
          <h1>Learn electricity.<br/><em>Build the future.</em></h1>
          <p>Master electrical concepts through short lessons, interactive 3D devices and hands-on virtual experiments.</p>
          <div className="heroActions">
            <button className="primary" onClick={()=>setTab("learn")}>Continue learning →</button>
            <button className="ghost" onClick={()=>setTab("lab")}>Open 3D lab</button>
          </div>
        </div>
        <div className="orb"><div className="bolt">⚡</div><div className="ring r1"/><div className="ring r2"/></div>
      </section>

      {notice && <div className="toast" onClick={()=>setNotice("")}>{notice}</div>}

      {tab==="learn" && <section className="content">
        <div className="sectionHead"><div><div className="eyebrow">YOUR PATH</div><h2>Electricity foundations</h2></div><div className="progress"><span style={{width:`${pct}%`}}/></div></div>
        <div className="path">
          {lessons.map((l,i)=><button key={l[0]} className={`lesson ${selected===i?"selected":""} ${progress.completed.includes(i)?"done":""}`} onClick={()=>setSelected(i)}>
            <span className="lessonIcon">{progress.completed.includes(i)?"✓":l[2]}</span><span><small>LEVEL {i+1}</small><strong>{l[0]}</strong><label>{l[1]}</label></span>
          </button>)}
        </div>
        <div className="lessonPanel">
          <div><div className="eyebrow">LESSON {selected+1}</div><h2>{lessons[selected][0]}</h2><p>{lessons[selected][1]} This lesson gives you a practical mental model before you enter the 3D lab.</p></div>
          <div className="formula">{selected===3?"V = I × R":selected===2?"R = V ÷ I":"I = Q ÷ t"}</div>
          <button className="primary" onClick={()=>completeLesson(selected)}>Complete lesson +25 XP</button>
        </div>
      </section>}

      {tab==="lab" && <section className="content lab">
        <div className="sectionHead"><div><div className="eyebrow">INTERACTIVE WORKBENCH</div><h2>Build in 3D</h2></div><button className="primary" onClick={runLab}>Run experiment +10 XP</button></div>
        <div className="labGrid"><div className="scene"><Scene3D /></div><div className="labSide">
          <h3>Arduino-style board</h3><p>Toggle components and watch the virtual circuit respond.</p>
          <div className="switch"><span>Power</span><button onClick={runLab}>ON</button></div>
          <div className="switch"><span>LED</span><button onClick={runLab}>TOGGLE</button></div>
          <div className="switch"><span>Resistor</span><b>220 Ω</b></div>
          <div className="challengeBox"><small>LAB CHALLENGE</small><b>Make the LED turn on without changing the resistor.</b><p>Think about where current needs a complete path.</p></div>
        </div></div>
      </section>}

      {tab==="projects" && <section className="content">
        <div className="sectionHead"><div><div className="eyebrow">THIS WEEK</div><h2>Build what the world is building</h2></div><span className="badge">NEW CHALLENGE</span></div>
        <div className="project"><div className="projectArt">⚡</div><div><div className="eyebrow">WEEKLY PROJECT</div><h2>{week.title}</h2><p>{week.fact}</p><h3>Your challenge</h3><p>{week.challenge}</p><button className="primary" onClick={runLab}>Start challenge</button></div></div>
        <div className="miniGrid">{projects.map((p,i)=><div className="mini" key={p.title}><span>0{i+1}</span><h3>{p.title}</h3><p>Explore the engineering idea and solve a practical challenge.</p></div>)}</div>
      </section>}

      <footer><span>Electrocuted</span> • Learn safely. Build boldly. <span>Progress saved on this device.</span></footer>
    </main>
  );
}