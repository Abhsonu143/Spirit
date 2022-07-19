import styles from "../styles/MenuCard.module.css";
import Link from "next/link";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
import {BsCart4} from "react-icons/bs";
import { useState } from "react";

const MenuCard = ({item}) => {
  const [like,setLike]=useState(0);
  const handlelike=()=>{
    setLike(!like);
  }
  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <span className={styles.icons} onClick={handlelike}>{like?<AiFillHeart style={{color:"red"}}/>:<AiOutlineHeart/>}</span>
        <span className={styles.icons}>
          <Link href={`/product/${item._id}`} passHref>
              <BsCart4/>
          </Link>
        </span>
        <Link href={`/product/${item._id}`} passHref className={styles.imgContainer}>
          <img src={item.img} alt="item" className={styles.item_img}/>
        </Link>
        <Link href={`/product/${item._id}`} passHref>
          <a className={styles.title}>{item.title}
          </a>
        </Link>
      </div>

      <div className={styles.text}>
        <span className={styles.price}>₹{item.prices[0]}</span>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  )
}

export default MenuCard;