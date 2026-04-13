let fame = 0, money = 100, skill = 50;
let songs = [];
let albums = [];
let platforms = {spotify:{fame:1.5,money:2}, youtube:{fame:2,money:1}, tiktok:{fame:1,money:3}};

const out = document.getElementById('output');

function print(txt) {
  out.innerHTML += txt + '<br>';
  out.scrollTop = out.scrollHeight;
}

function updateStatus() {
  document.getElementById('status') ? document.getElementById('status').innerHTML = 
    `Fame: ${fame} | Money: $${money} | Skill: ${skill} | Songs: ${songs.length} | Albums: ${albums.length}` 
    : print(`Fame: ${fame} | Money: $${money} | Skill: ${skill} | Songs: ${songs.length} | Albums: ${albums.length}`);
}

function createSong() {
  let name = prompt("Song name:");
  if (!name) return;
  let quality = Math.floor(Math.random()*10) + Math.floor(skill/10);
  songs.push({name, quality, released:false, platform:null});
  fame += Math.floor(quality/2);
  print(`Song '${name}' created! Quality: ${quality}`);
  updateStatus();
}

function practice() {
  if (money < 20) { print("Not enough money ($20)"); return; }
  money -= 20;
  skill += 5;
  print(`Practiced! Skill now ${skill}`);
  updateStatus();
}

function perform() {
  if (Math.random() > 0.3) {
    let g = Math.floor(Math.random()*16)+5;
    fame += g; money += g*2;
    print(`Successful gig! Fame +${g}, Money +${g*2}`);
  } else print("Gig failed.");
  updateStatus();
}

function showSongs() {
  out.innerHTML = '';
  if (songs.length === 0) { print("No songs yet."); return; }
  print("<b>Your Songs:</b><br>");
  songs.forEach((s, i) => {
    let status = s.released ? ` (Released on ${s.platform})` : " (Unreleased)";
    print(`${i+1}. ${s.name} | Quality: ${s.quality}${status}`);
  });
}

function releaseSong() {
  showSongs();
  if (songs.length === 0) return;
  let idx = parseInt(prompt("Enter song number to release:")) - 1;
  if (isNaN(idx) || idx < 0 || idx >= songs.length || songs[idx].released) {
    print("Invalid choice.");
    return;
  }
  let plat = prompt("Platform: spotify / youtube / tiktok").toLowerCase();
  if (!platforms[plat]) { print("Invalid platform"); return; }
  let mult = platforms[plat];
  let fg = Math.floor(songs[idx].quality * mult.fame);
  let mg = Math.floor(songs[idx].quality * mult.money);
  fame += fg; money += mg;
  songs[idx].released = true;
  songs[idx].platform = plat;
  print(`Released '${songs[idx].name}' on ${plat}!`);
  updateStatus();
}

function makeAlbum() {
  let unreleased = songs.filter(s => !s.released);
  if (unreleased.length < 3) { print("Need at least 3 unreleased songs."); return; }
  let name = prompt("Album name:");
  if (!name) return;
  let selected = [];
  let max = Math.min(5, unreleased.length);
  for (let i = 0; i < max; i++) {
    let choice = parseInt(prompt(`Select song ${i+1}/${max} (number):`)) - 1;
    if (choice >= 0 && choice < songs.length && !songs[choice].released) {
      selected.push(songs[choice]);
    }
  }
  if (selected.length < 3) { print("Not enough songs selected."); return; }
  albums.push({name, songs: selected});
  print(`Album '${name}' created with ${selected.length} songs!`);
  updateStatus();
}

function startTour() {
  if (songs.length < 3) { print("Need at least 3 songs."); return; }
  let type = prompt("Tour type:\n1=Regional\n2=National\n3=Continental\n4=Global");
  let shows = [6,10,15,20][type-1] || 6;
  let mult = [1,1.5,2.2,3][type-1] || 1;
  if (type==4 && albums.length<1) { print("Global needs an album"); return; }
  print(`Starting ${["Regional","National","Continental","Global"][type-1]} tour...`);
  let tf=0, tm=0;
  for (let i=0; i<shows; i++) {
    let gain = Math.floor((Math.random()*18 + 12 + fame/20) * mult);
    let mg = Math.floor(gain * 3.8);
    fame += gain; money += mg; tf += gain; tm += mg;
  }
  print(`Tour complete! +${tf} fame, +$${tm}`);
  updateStatus();
}

print("Musician Manager - Click buttons below");
updateStatus();
