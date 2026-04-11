let fame = 0, money = 100, skill = 50;
let songs = [];
let albums = [];
let platforms = {spotify:{fame:1.5,money:2}, youtube:{fame:2,money:1}, tiktok:{fame:1,money:3}};

const out = document.getElementById('output');
function print(txt) { out.innerHTML += txt + '\n'; out.scrollTop = out.scrollHeight; }

function createSong() {
  let name = prompt("Song name:");
  if (!name) return;
  let quality = Math.floor(Math.random()*10) + Math.floor(skill/10);
  songs.push({name, quality, released:false, platform:null});
  fame += Math.floor(quality/2);
  print(`Song '${name}' created! Quality: ${quality}, Fame +${Math.floor(quality/2)}`);
}

function catalog() {
  if (songs.length===0) { print("No songs yet."); return; }
  songs.forEach((s,i) => {
    let status = s.released ? `Released on ${s.platform}` : "Unreleased";
    print(`${i}: ${s.name} | Quality: ${s.quality} | ${status}`);
  });
}

function release() {
  catalog();
  if (songs.length===0) return;
  let idx = parseInt(prompt("Song index to release:"));
  if (isNaN(idx) || idx<0 || idx>=songs.length || songs[idx].released) { print("Invalid or already released."); return; }
  let song = songs[idx];
  let plat = prompt("Platform (spotify/youtube/tiktok):").toLowerCase();
  if (!platforms[plat]) { print("Invalid platform."); return; }
  let mult = platforms[plat];
  let fg = Math.floor(song.quality * mult.fame);
  let mg = Math.floor(song.quality * mult.money);
  fame += fg; money += mg;
  song.released = true; song.platform = plat;
  print(`'${song.name}' released on ${plat}! Fame +${fg}, Money +${mg}`);
}

function perform() {
  if (Math.random() > 0.3) {
    let g = Math.floor(Math.random()*16)+5;
    fame += g; money += g*2;
    print(`Successful gig! Fame +${g}, Money +${g*2}`);
  } else print("Gig failed.");
}

function showPerf() {
  if (songs.length===0) { print("No songs."); return; }
  songs.forEach((s,i)=> print(`${i}: ${s.name}`));
  let idx = parseInt(prompt("Song index:"));
  if (isNaN(idx) || idx<0 || idx>=songs.length) { print("Invalid."); return; }
  let g = Math.floor(songs[idx].quality * 1.2);
  fame += g; money += g*3;
  print(`Show with '${songs[idx].name}'! Fame +${g}, Money +${g*3}`);
}

function makeAlbum() {
  if (songs.length < 3) { print("Need at least 3 songs."); return; }
  let unreleased = songs.filter(s => !s.released);
  if (unreleased.length < 3) { print("Need at least 3 unreleased songs."); return; }
  let name = prompt("Album name:");
  if (!name) return;
  albums.push({name, songs: unreleased.slice(0,5)});
  print(`Album '${name}' created with ${Math.min(5,unreleased.length)} songs!`);
}

function practice() {
  let cost = 20;
  if (money < cost) { print("Not enough money (needs $20)."); return; }
  money -= cost;
  skill += 5;
  print(`Practiced! Skill +5 (now ${skill}). Future songs will be better.`);
}

function tour() {
  if (songs.length < 3) { print("Need at least 3 songs."); return; }
  print("\n=== Tour Options ===\n1. Regional (6 shows)\n2. National (10 shows)\n3. Continental (15 shows)\n4. Global (20 shows)");
  let choice = parseInt(prompt("Choose 1-4:"));
  let numShows=0, mult=1, tourName="";
  let cities = [];
  if (choice===1) { numShows=6; mult=1; tourName="Regional"; cities=["London","Manchester","Birmingham","Glasgow","Liverpool","Leeds"]; }
  else if (choice===2) { numShows=10; mult=1.5; tourName="National"; cities=["London","Manchester","Birmingham","Glasgow","Liverpool","Leeds","Bristol","Newcastle","Sheffield","Nottingham"]; }
  else if (choice===3) { numShows=15; mult=2.2; tourName="Continental"; cities=["London","Paris","Berlin","Madrid","Rome","Amsterdam","Vienna","Prague","Stockholm","Oslo","Copenhagen","Dublin","Lisbon","Budapest","Warsaw"]; }
  else if (choice===4) { numShows=20; mult=3; tourName="Global"; cities=["London","New York","Los Angeles","Tokyo","Sydney","Paris","Berlin","Mumbai","São Paulo","Mexico City","Cape Town","Moscow","Beijing","Seoul","Bangkok","Dubai","Toronto","Buenos Aires","Istanbul","Cairo"]; if (albums.length<1) { print("Global needs 1 album!"); return; } }
  else { print("Invalid."); return; }
  print(`\nStarting ${tourName} tour...`);
  let tf=0, tm=0;
  for (let i=0; i<numShows; i++) {
    let city = cities[i % cities.length];
    let gain = Math.floor((Math.random()*18 + 12 + fame/20) * mult);
    let mg = Math.floor(gain * 3.8);
    fame += gain; money += mg; tf += gain; tm += mg;
    print(`Performed in ${city}: Fame +${gain} | Money +$${mg}`);
  }
  print(`\n${tourName} complete! Total Fame +${tf} | Money +$${tm}`);
}

function status() { print(`Fame: ${fame} | Money: $${money} | Skill: ${skill} | Songs: ${songs.length} | Albums: ${albums.length}`); }

function runCommand() {
  let cmd = document.getElementById('input').value.toLowerCase().trim();
  document.getElementById('input').value = '';
  if (cmd === "create") createSong();
  else if (cmd === "catalog") catalog();
  else if (cmd === "release") release();
  else if (cmd === "perform") perform();
  else if (cmd === "show") showPerf();
  else if (cmd === "tour") tour();
  else if (cmd === "album" || cmd === "makealbum") makeAlbum();
  else if (cmd === "practice") practice();
  else if (cmd === "status") status();
  else if (cmd === "quit") print("Game ended.");
  else print("Commands: create, catalog, release, perform, show, tour, album, practice, status, quit");
}

print("Musician Manager ready. New: 'practice' ($20 for +5 skill)");
