import styles from "../styles/MenuListCard.module.css";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineHeart} from "react-icons/ai";
import {AiFillHeart} from "react-icons/ai";
import {AiFillStar} from "react-icons/ai";
import { useState } from "react";

const MenuListCard = ({list}) => {
    const [like,setLike]=useState(0);

    const handleLike=()=>{
        setLike(!like);
    }
    
  return (
    <div className={styles.card}>
        <div className={styles.imgContainer}>
            <span onClick={handleLike} className={`${styles.like} ${styles.icons}`}>{like?<AiFillHeart className={styles.onlike}/>:<AiOutlineHeart/>}</span>
            <span className={`${styles.rating} ${styles.icons}`}><span className={styles.ratingnumber}>{list.rating}</span><AiFillStar/></span>
            <Link href={`/menu/${list.title}`} passHref className={styles.image}>
                <img src={list.img} alt="item"/>
            </Link>
        </div>
        <div className={styles.container}>
            <Link href={`/menu/${list.title}`} passHref><h2 className={`${styles.title}`}>{list.title}</h2></Link>
            <h4 className={styles.description}>{list.description}</h4>
        </div>
</div>
  )
}

export default MenuListCard;