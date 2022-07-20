import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Featured = ({featuredItems}) => {
  const[index,setIndex]=useState(0);

  const interval=setInterval(function() {
    handleArrow("r");
    clearInterval(interval);
  }, 5000);

  const handleArrow=(direction)=>{
    if(direction=='l'){
        setIndex(index!=0?index-1:7);
    }
    if(direction=='r'){
        setIndex(index!=7?index+1:0);
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left: 0}} onClick={()=>handleArrow("l")}>
            <Image src="https://res.cloudinary.com/abhaysonu/image/upload/v1658248054/uploads/arrowl_wjwl3x.png" alt="leftarrow" layout="fill" objectFit="contain"/>
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
          {featuredItems.map((item)=>(
            <div className={styles.slider} key={item._id}>
              <div className={styles.text}>
                <Link href={`/menu/${item.title}`}>
                  <div className={styles.title}> {item.title}</div>
                </Link>
                <div className={styles.description}>
                  {item.description}
                </div>
              </div>
              <Link href={`/menu/${item.title}`}>
                <img src={item.img} alt="featured" className={styles.imgContainer}/>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
            <Image src="https://res.cloudinary.com/abhaysonu/image/upload/v1658248055/uploads/arrowr_xw8goz.png" alt="rightarrow" layout="fill" objectFit="contain"/>
        </div>
    </div>
  )
}

export default Featured;