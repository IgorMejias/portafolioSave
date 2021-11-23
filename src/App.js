
import {  useEffect, useState } from 'react';
import './App.css';
import './css/header.css';
import './css/description.css';
import './css/portafolio.css';
import './css/travel.css';
import  langTexts from "./context/langContext";
function App() {

  const [texts, setTexts] = useState(langTexts);
  const [changing, setChanging] = useState(false);
  const [langButtons, setLangButtons] = useState({
    en:"0.5",
    es:"0.5",
  })

  const [steps, setSteps] = useState({});
  const [porcents, setPorcents] = useState({});


    useEffect(()=>{
      let lang = navigator.language.split("-")[0];
      window.scrollY = 0;
      if(lang === "en"){
        setLangButtons({en:"0.5", es:"0.2"});
        setTexts((e)=>{return{...e,current:lang}});
      }else{
        setLangButtons({en:"0.2", es:"0.5"});
        setTexts((e)=>{return{...e,current:"es"}});
      }

      let getTop = (el) => {
        return el.getBoundingClientRect().top;
      }

      let getPorcent = (total, position) =>{
       return position * 100 / total;
      }

      if(document.querySelector(".app")){
        let total = document.querySelector(".app").scrollHeight;
        Array.from(document.querySelectorAll(".point")).forEach((item,index)=>{
          setSteps(e=>{return{...e,["point"+index]:getTop(item)}})
          setPorcents(e=>{return{...e,["point"+index]:getPorcent(total,getTop(item))}})
        })
      }

    },[])

  const changeLang = (lang) =>{

    if((!changing && lang !== texts.current)){
      lang === "en" ?
      setLangButtons({en:"0.5", es:"0.2"}):
      setLangButtons({en:"0.2", es:"0.5"});
      setTexts({...texts,current:lang});
      setChanging(true);

      let faded =document.querySelectorAll(".fade");
      let faded2 =document.querySelectorAll(".fade2");

      faded.forEach((el)=>{
        el.style.animation="fadeAppear 1s forwards";
      })

      faded2.forEach((el)=>{
        if(parseFloat(getComputedStyle(el).opacity) > 0){
          let currentAnim = getComputedStyle(el).animationName;
          el.style.animation = "fadeAppear 1s forwards";
          setTimeout(()=>{
            el.style.animation = currentAnim + " 0s forwards";
          },900)
        }
      })

      setTimeout(()=>{
          faded.forEach((el)=>{
            el.style.animation="none 0s"
          })

          setChanging(false);
      },1000)

    }
  }

  const getText = (text) => {
   return texts[texts.current][text];
  }

  const fadeEl = (el) =>{
    if(parseFloat(getComputedStyle(el).opacity) > 0){
      el.style.animation = "fadeOut 2s forwards";
    }
  }

  const appearEl = (el,anim,time) =>{
    if(parseFloat(getComputedStyle(el).opacity) === 0){
      el.style.animation = anim + " " + time.toString() + "s forwards";
    }
  }

  const changeBGImg = (el, anim, time) => {
    el.style.animation = anim + " " + time.toString() +"s forwards";
  }

  const moveRocket = () => {
    let app = document.querySelector(".app");

 
    let rocket = document.querySelector(".rocket");
    let travel = document.querySelector(".travel");
    let totalScroll =  app.offsetHeight - app.clientHeight;


    let porcent = app.scrollTop * 100 / app.scrollHeight + (totalScroll/2);
    porcent = (porcent * travel.scrollWidth) / 100;
    
    rocket.style.marginLeft = porcent + "px";

    

  }


  const scrollControl = (e) => {
    moveRocket();
    let app = document.querySelector(".app");
    let header = document.querySelector(".headerClass");
    let moon = document.querySelector(".moon");
    let h2Title = document.querySelector(".h2Title");
    let aboutDiv = document.querySelector(".aboutDiv");
    let descSection = document.querySelector(".descriptionSection");
    let ast = document.querySelector(".ast");
    
    if(app.scrollTop > steps.point0){
      changeBGImg(header, "fadeBackground", 2);
      changeBGImg(moon, "toMoon", 4);
    }else{
      changeBGImg(header, "appearBackground", 2);
      changeBGImg(moon, "moonOut", 2);

    }

    if(app.scrollTop > steps.point1){
      appearEl(h2Title, "h2Appear", 2);
      ast.style.animation = "astRain 2s forwards";
    }else{
      fadeEl(h2Title);
      ast.style.animation = "astBack 2s forwards";
    }

    if(app.scrollTop > steps.point2 - 100){
      appearEl(aboutDiv, "fadeAppear", 2);
      changeBGImg(descSection, "appearDescBackground", 3);
    }else{
      fadeEl(aboutDiv);
      changeBGImg(descSection, "fadeDescBackground", 2);
    }

    if(app.scrollTop > steps.point3){

    }

  }



  return (
    <div onScroll={scrollControl} className="app noScroll">
        <div className="travel">
          <div className="rocket"></div>
        </div>

        <div className="ast"></div>
   
      <section className="langSection">
        <button style={{opacity:langButtons.en}} className="langButton" onClick={(e)=>{changeLang("en")}}></button>
        <button style={{opacity:langButtons.es}} className="langButton" onClick={(e)=>{changeLang("es")}}></button>
      </section>
      
      <header className="headerClass">
        <div className="titlesDiv">
          <h1 className="fade point">{getText("H1")}</h1>
          <p>-OlivaDev</p>
        </div>
        <section className="scrollToContinue">
          <div className="fade moon point planet"></div>
          <p className="fade continueText">{getText("continueText")}</p>
        </section>
        
      </header>

      <section className="descriptionSection">
        <div className="h2Div">
          <h2 className="fade2 point h2Title planet">{getText("H2")}</h2>
        </div>
        <div className="aboutDiv">
          <div>
            <h3 className="fade2">{getText("salute")}</h3>
            <article className="point fade2">
              {getText("aboutArt")}
            </article>
          </div>
        </div>
      </section>

      <section className="portafolio">
        {texts.tecs.map((item,index)=>{
          return(
          <div className="tecDiv" key={index}>
            <p>{item.name}</p>
            <img alt="tecLogo" src={item.pic}></img>
          </div>
          );
        })}
      </section>








      <footer className="footerClass">
        <p>{texts[texts.current].iconsCred}&nbsp;
          <a href="https://www.flaticon.es/autores/roundicons" title="Roundicons">Roundicons</a> and&nbsp;
          <a href="https://www.freepik.com" title="Freepik">Freepik</a>&nbsp;
          from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a>
        </p>
        <p>Las imagenes utilizadas no son de mi propiedad</p>
      </footer>
    </div>
  );
}

export default App;
