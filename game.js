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
  if (unreleased.length < 3) { print("Need at least 3 unreleased songs.");
