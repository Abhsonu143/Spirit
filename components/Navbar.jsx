import Image from "next/image";
import React,{ useState } from 'react';
import styles from "../styles/Navbar.module.css"
import {BsCartCheckFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {GiHamburgerMenu} from "react-icons/gi";
import {ImCross} from "react-icons/im";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Navbar = ({isuser,username}) => {
  const quantity = useSelector(state=>state.cart.quantity);
  const [showMediaIcons,setShowMediaIcons]=useState(true);
  const [showMenu,setshowMenu]=useState(false);
  const router=useRouter();

  const handleState=()=>{
    setshowMenu(!showMenu);
    setShowMediaIcons(!showMediaIcons);
  }
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.hamburger}>
          <a href="#" onClick={()=>handleState()} className={styles.icon}>
            {!showMediaIcons?<ImCross/>:<GiHamburgerMenu/>}
          </a>
        </div>
        <Link href="/" className={styles.logo_link} passHref>
          <img src="https://res.cloudinary.com/abhaysonu/image/upload/v1658142601/L1000359-20210602003724_pri4xj.png" alt="logo" className={styles.logo_img}/>
        </Link>
      </div>
      {/* {styles.list} */}
      <ul className={styles.list}>
        <Link href="/" className={styles.list_items}>
          <a className={router.pathname=="/"? styles.active:styles.anchor}>Home</a>
        </Link>
        <Link href="/menu" className={styles.list_items}>
          <a className={router.pathname=="/menu"? styles.active:styles.anchor}>Menu</a>
        </Link>
        <Link href="/special" className={styles.list_items}>
          <a className={router.pathname=="/special"? styles.active:styles.anchor}>Special</a>
        </Link>
        <Link href="/review" className={styles.list_items}>
          <a className={router.pathname=="/review"? styles.active:styles.anchor}>Review</a>
        </Link>
        <Link href="/contact" className={styles.list_items}>
          <a className={router.pathname=="/contact"? styles.active:styles.anchor}>Contact</a>
        </Link>
      </ul>
      {showMenu && 
      <ul className={styles.mobile_list}>
        {isuser?
            <div className={styles.isprofilemenu}>
              <a href="#" className={styles.icon}><CgProfile/></a>
              <span>Hello, {username}</span>
            </div>:
            <div className={styles.profilemenu}>
              <button className={styles.buttonmenu}><Link href="/user/login" passHref><span className={styles.linkmenu}>Login</span></Link></button>
              <button className={styles.buttonmenu}><Link href="/user/register" passHref><span className={styles.linkmenu}>Register</span></Link></button>
            </div>
          }
        <Link href="/" className={styles.list_items}>
          <a className={router.pathname=="/"? styles.active:styles.anchor}>Home</a>
        </Link>
        <Link href="/menu" className={styles.list_items}>
          <a className={router.pathname=="/menu"? styles.active:styles.anchor}>Menu</a>
        </Link>
        <Link href="/special" className={styles.list_items}>
          <a className={router.pathname=="/special"? styles.active:styles.anchor}>Special</a>
        </Link>
        <Link href="/review" className={styles.list_items}>
          <a className={router.pathname=="/review"? styles.active:styles.anchor}>Review</a>
        </Link>
        <Link href="/contact" className={styles.list_items}>
          <a className={router.pathname=="/contact"? styles.active:styles.anchor}>Contact</a>
        </Link>
        <div className={styles.cart}>
          <Link href="/cart" >
            <a className={styles.cart_iconbox}> <BsCartCheckFill/></a>
          </Link>
          <div className={styles.cart_counter}>{quantity}</div>
        </div>
      </ul>
      }

      <div className={styles.me}>
        <div className={styles.cart}>
          <Link href="/cart" >
            <a className={styles.cart_iconbox}> <BsCartCheckFill/></a>
          </Link>
          <div className={styles.cart_counter}>{quantity}</div>
        </div>
          {isuser?
            <div className={styles.profile}>
              <a href="#" className={styles.icon}><CgProfile/></a>
            </div>:
            <div className={styles.profile}>
              <button className={styles.button}><Link href="/user/login" passHref><span className={styles.link}>Login</span></Link></button>
              <button className={styles.button}><Link href="/user/register" passHref><span className={styles.link}>Register</span></Link></button>
            </div>
          }
      </div>
    </div>
  )
}

export default Navbar