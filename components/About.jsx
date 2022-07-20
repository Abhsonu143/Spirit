import styles from "../styles/About.module.css";
import { useState } from "react";

const About = ({GalleryImages}) => {
  const [imageview,setImageview]=useState(0);
  const [currstyle,setCurrstyle]=useState(styles.image);
  const [gallerystyle,setGallerystyle]=useState(styles.galleryContainer);
  const handleClick=()=>{
    setImageview(!imageview);
    if(imageview){
      setCurrstyle(styles.fullimage);
      setGallerystyle(styles.fullContainer);
    }
    else{
      setCurrstyle(styles.image);
      setGallerystyle(styles.galleryContainer);
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.title}>About us</div>
        <div className={styles.description}>
          We are a tight-knit, fun-loving, devoted team of local cooks spreading the gospel of good times and good food in. We offer limited capacity onsite events in our restaurant kitchen space. And worry not, our krewe will travel to your destination of choice from hotel ballrooms to private kitchens to entertain groups of all sizes. We cook, we tell stories, we deliver informative culinary demonstrations and lectures, but most of all, we treat every event like you&apos;re a guest at our dinner table. Join us
        </div>
        <div className={gallerystyle}>
          <div className={styles.galleryText}>Gallery</div>
          {GalleryImages.map((item)=>(
            <img src={item.img} key={item._id}  alt="yourkitchen" className={currstyle} onClick={()=>handleClick()}/>
          ))}
        </div>
    </div>
  )
}

export default About;