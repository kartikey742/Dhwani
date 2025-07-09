
inp=document.querySelector("input")


inp.addEventListener("keyup",(e)=>{
    if(e.key=="Enter"){
       var nh2=document.createElement("h2")
        nh2.addEventListener("click",function(){nh2.style.textDecoration="line-through"})
    nh2.innerHTML=`${inp.value}<i class="fa-solid fa-xmark"></i>`
   
    
    box=document.querySelector(".box")
    box.appendChild(nh2)
    i= nh2.querySelector("i")
// console.log(i);
i.addEventListener("click",()=>{nh2.remove()})
   
  
}
})

    




