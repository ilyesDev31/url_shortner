const burger = document.querySelector('.burger');
const menu = document.querySelector('header ul');
// getting link
const input = document.querySelector('input');
const button = document.querySelector('.put-link p');
const links = document.querySelector('.links');
burger.addEventListener('click', function(){
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});


button.addEventListener('click', shorten);

async function shorten(){
    let regEx = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi;
    if(input.value === "" || !regEx.test(input.value)) {
        alert('add a valid link');
        input.style.borderColor = "hsl(0, 90%, 60%)";
        return;
    }
    input.style.borderColor = "transparent";
    let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`);
let dataTwo = await data.json();
console.log(dataTwo);
// parent
let link = document.createElement('div');
let p = document.createElement('p');
link.className = "link";
p.innerHTML = input.value;
// short link parent
let shortLinkDiv = document.createElement('div');
shortLinkDiv.className = "short-link";
let p1 = document.createElement('p');
p1.innerHTML =dataTwo.result.short_link;
// short link copy button
let p2 = document.createElement('p');
p2.innerHTML = "copy";
p2.className = "btn-two";
shortLinkDiv.appendChild(p1);
shortLinkDiv.appendChild(p2);
link.appendChild(p);
link.appendChild(shortLinkDiv);
links.appendChild(link);
}
// copy link

links.addEventListener('click', copy);

function copy(e){
if(e.target.className === "btn-two"){
    let copyButtons = document.querySelectorAll('.links .btn-two');
    copyButtons.forEach(btn =>{
        btn.classList.remove('active');
        btn.innerHTML = "Copy";
    });
    e.target.classList.add('active');
    e.target.innerHTML = "Copied!";
    console.log(e.target.previousSibling);
    navigator.clipboard.writeText(e.target.previousSibling.innerHTML);
}
}