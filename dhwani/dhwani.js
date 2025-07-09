let songs=[]
let currfolder
async function getsongs(folder) {
    currfolder = folder;
    try {
        let a = await fetch(`songs/${folder}/`);
        if (!a.ok) {
            console.error(` Failed to load ${folder} folder. Status:`, a.status);
            return;
        }

        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");

        songs = [];
        for (let i = 0; i < as.length; i++) {
            let href = as[i].href;
            if (href.endsWith(".mp3")) {
                songs.push(href);
            }
        }

        console.log(" Songs found:", songs);

        let songli = document.querySelector(".songlist ul");
        if (!songli) {
            console.error(" .songlist ul not found");
            return;
        }

        songli.innerHTML = "";
        songs.forEach(songUrl => {
            let songName = songUrl.split(`/${currfolder}/`)[1] || "";
            songName = songName
                .replace("(PagalWorld).mp3", "")
                .replace("(PagalWorld)%20-%20Copy%20(2).mp3", "")
                .replace("(PagalWorld)%20-%20Copy.mp3", "")
                .replace("undefined", "")
                .replace(".mp3", "");

            if (!songName.trim()) return; // skip empty names

            let li = document.createElement("li");
            li.innerHTML = `
                <div>
                  <img src="music.svg" alt="">
                  <p>${songName}</p> 
                </div>
                <div>
                  <p>Play Now</p>
                  <img src="play.svg" alt="">
                </div>
            `;
            songli.appendChild(li);
        });

        lis = document.querySelectorAll(".songlist li");
        let songname = document.querySelector(".songname");
        let duration = document.querySelector(".duration");

        lis.forEach((li, index) => {
            li.addEventListener("click", () => {
                lis.forEach(li => {
                    li.style.borderColor = "white";
                    li.style.borderWidth = "2px";
                    let img = li.querySelectorAll("img");
                    if (img[1]) img[1].src = "play.svg";
                });

                let img = li.querySelectorAll("img");
                if (img[1]) img[1].src = "pause.svg";

                li.style.borderLeftColor = "red";
                li.style.borderTopColor = "red";
                li.style.borderRightColor = "Green";
                li.style.borderBottomColor = "Green";
                li.style.borderWidth = "4px";

                let songTitle = li.querySelector("p")?.innerText;
                if (!songTitle) return;

                audio.src = `songs/${currfolder}/${songTitle}(PagalWorld).mp3`;
                songname.innerHTML = `<h3>${songTitle}</h3>`;
                audio.play();
                play.src = "pause.svg";
            });
        });

        // Safely update time
        audio.addEventListener("timeupdate", () => {
            if (isNaN(audio.duration)) return;

            let min = Math.floor(audio.currentTime / 60);
            let sec = Math.floor(audio.currentTime % 60);
            let fmin = min < 10 ? "0" + min : min;
            let fsec = sec < 10 ? "0" + sec : sec;

            duration.innerHTML = `
                <h3>${fmin}:${fsec} / ${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}</h3>`;

            let cir = document.querySelector(".circle");
            if (cir) {
                cir.style.left = `${(audio.currentTime * 100) / audio.duration}%`;
            }

            if (audio.currentTime >= audio.duration) {
                play.src = "play.svg";
                if (cir) cir.style.left = "0%";
            }
        });

    } catch (error) {
        console.error("Error loading songs:", error);
    }
}

// async function  getsongs(folder){
//     // folder="songs/cs"
//     currfolder=folder
//     a=await fetch(`http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/${folder}/`)
//     response=await a.text()
//     // console.log(a);
//     div=document.createElement("div")
//     div.innerHTML=response
//     as=div.getElementsByTagName("a")
//     // console.log(as);
    
//    songs=[]
//     for(i =0;i<as.length;i++){
//         if(as[i].href.endsWith(".mp3"))
//             songs.push(as[i].href)
//     }
//     console.log(songs);
    
//     songli=document.querySelector(".songlist").querySelector("ul")
//     songli.innerHTML=""
//     for(i=0;i<songs.length;i++){
//         newSong=songs[i].split(`/${currfolder}/`)
//         let li=document.createElement("li")
//         newSong[1]=newSong[1].replace("(PagalWorld).mp3","").replace("undefined","").replace("(PagalWorld)%20-%20Copy%20(2).mp3","").replace("(PagalWorld)%20-%20Copy.mp3","")  
//         li.innerHTML=  `
//         <div>

//           <img src="music.svg" alt="">
//           <p>${newSong[1]}</p> 
//         </div>
//         <div>

//           <p>Play Now</p>
//           <img src="play.svg" alt="">
//         </div>
//     `

//         songli.appendChild(li)


//     //     songnames=[]
   

//     }
//     lis=document.querySelector(".songlist").querySelectorAll("li")
//     songname=document.querySelector(".songname")
//     duration=document.querySelector(".duration")
//    lis.forEach((li) => {
        
        
//         li.addEventListener("click",function a(){
//             lis.forEach(li=>{li.style.borderColor="white"
//                let img=li.querySelectorAll("img")

//                 li.style.borderWidth="2px"
//                 img[1].src="play.svg"
//             })
          
//             let img=li.querySelectorAll("img")
//             img[1].src="pause.svg"
//             li.style.borderLeftColor="red"
//             li.style.borderTopColor="red"
//             li.style.borderRightColor="Green"
//             li.style.borderBottomColor="Green"
//             li.style.borderWidth="4px"

//             audio.src=`http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/${currfolder}/${li.querySelector("p").innerHTML}(PagalWorld).mp3`
//             songname.innerHTML=`<h3>${li.querySelector("p").innerHTML}</h3>`
            
//             audio.play()
//         //    C:\Users\kartikey kumar\OneDrive\Desktop\CODING\WEB DEVELOPMENT\dhwani\songs\cs
            
//             play.src="pause.svg"
//         })  
//         audio.addEventListener("timeupdate",()=>{
//             min=Math.floor(audio.currentTime/60)
//             sec=Math.floor(audio.currentTime)
//             if(min<10)
//                 fmin="0"+min
//             else
//             fmin=min
//         sec=sec%60
//             if(sec<10)
//                 fsec="0"+sec
//             else
//             fsec=sec
//             duration.innerHTML=`
//             <h3>${fmin}:${fsec} / ${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)}</h3>`;
//             cir=document.querySelector(".circle")
//             cir.style.left=`${audio.currentTime*100/audio.duration}%`
//             if(audio.duration==audio.currentTime)
//             {
//                 play.src="play.svg"
//                 cir.style.left="0%"
                
                
//             }

//         })
        
        
//     });
  




   

// }
audio=new Audio()
async function main(){
    cards=document.getElementsByClassName("card")
    // console.log(cards);
    // songs=await getsongs("songs/cs")
    Array.from(cards).forEach(c=>{
        // console.log(c);
        
        c.addEventListener("click",async items=>{
        console.log(items.currentTarget.dataset.folder);
        await getsongs(`${c.id}`);

        // console.log(songs);
        
        
    })

    })

    cir=document.querySelector(".circle")
skbr=document.querySelector(".seekbar")
skbr.addEventListener("click",(e)=>{
    cir.style.left =`${(e.offsetX/e.target.getBoundingClientRect().width)*100}%`
    audio.currentTime=(e.offsetX/e.target.getBoundingClientRect().width)*100*audio.duration/100
})

next=document.querySelector("#next")
next.addEventListener("click",()=>{


i=songs.indexOf(audio.src);
idx=i
i++
s=songs[i].split(`/${currfolder}/`)
console.log(s[1]);
s[1]=s[1].replace("(PagalWorld).mp3","")
audio.src=`http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/${currfolder}/${s[1]}(PagalWorld).mp3`
 songname.innerHTML=`<h3>${s[1]}</h3>`
audio.play()
let img=lis[idx].querySelectorAll("img")
lis[idx].style.borderColor="white"
lis[idx].style.borderWidth="2px"
img[1].src="play.svg"

let img2=lis[i].querySelectorAll("img")
        img2[1].src="pause.svg"
        lis[i].style.borderLeftColor="red"
        lis[i].style.borderTopColor="red"
        lis[i].style.borderRightColor="Green"
        lis[i].style.borderBottomColor="Green"
        lis[i].style.borderWidth="4px"


})

prev=document.querySelector("#prev")
prev.addEventListener("click",()=>{


i=songs.indexOf(audio.src);
idx=i
i--
s=songs[i].split(`/${currfolder}/`)
s[1]=s[1].replace("(PagalWorld).mp3","").replace("undefined","").replace("(PagalWorld)%20-%20Copy%20(2).mp3","").replace("(PagalWorld)%20-%20Copy.mp3","")
console.log(s[1]);
audio.src=`http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/${currfolder}/${s[1]}(PagalWorld).mp3`
 songname.innerHTML=`<h3>${s[1]}</h3>`
audio.play()
let img=lis[idx].querySelectorAll("img")
lis[idx].style.borderColor="white"
lis[idx].style.borderWidth="2px"
img[1].src="play.svg"

let img2=lis[i].querySelectorAll("img")
        img2[1].src="pause.svg"
        lis[i].style.borderLeftColor="red"
        lis[i].style.borderTopColor="red"
        lis[i].style.borderRightColor="Green"
        lis[i].style.borderBottomColor="Green"
        lis[i].style.borderWidth="4px"

})


let k=0
play=document.querySelector("#play")
play.addEventListener("click",()=>{
if(audio.paused && k==1){

    audio.play()
    play.src="pause.svg"
}
else if(audio.paused && k==0){
     audio.src=`http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/${currfolder}/${lis[0].querySelector("p").innerHTML}(PagalWorld).mp3`
      play.src="pause.svg"
      audio.play()
      songname.innerHTML=`<h3>${lis[0].querySelector("p").innerHTML}</h3>`
      let img2=lis[0].querySelectorAll("img")
      img2[1].src="pause.svg"
      lis[0].style.borderLeftColor="red"
      lis[0].style.borderTopColor="red"
      lis[0].style.borderRightColor="Green"
      lis[0].style.borderBottomColor="Green"
      lis[0].style.borderWidth="4px"

}

else  {
    audio.pause()
    play.src="play.svg"
}
k=1

})  
    
    
    // console.log(songs/
    
    //  audio.play()
  
    
   

          
    
       
    
    

}
main()

// "http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/songs/cs/Amplifier(PagalWorld).mp3"
// "http://127.0.0.1:5500/WEB%20DEVELOPMENT/dhwani/songs/ncs/Yeh-Raat(PagalWorld).mp3"

