import styles from "../styles/Footer.module.css";
import {AiFillHeart} from "react-icons/ai";
import {BsFacebook,BsInstagram,BsYoutube,BsTwitter} from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email,setEmail] = useState('');
  const [check,setCheck] = useState(false);

  const handleclick=()=>{
    setEmail('');
    setCheck(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.about}>
          <span style={{fontSize:"30px",paddingBottom:"10px"}}>About</span>
          As we plan and prepare to serve you, our care will be curated in a way such as to provide our guests unparalleled experience and utmost satisfaction keeping all hygiene and safety standards in place.
        </div>
        <div className={styles.important}>
          <span style={{paddingBottom:"10px",fontSize:"30px"}}>Links
          </span>
          <span className={styles.list}>
            <Link href="/" passHref><span className={styles.link}>Home</span></Link>
            <Link href="/menu" passHref><span className={styles.link}>Menu</span></Link>
            <Link href="/special" passHref><span className={styles.link}>Discover</span></Link>
          </span>
        </div>
        <div className={styles.social}>
          <div className={styles.follow}>Follow us
          </div>
          <div className={styles.medialist}>

            <span className={styles.icon} style={{color:"blue"}}><BsFacebook/></span>
            <span className={styles.icon} style={{color:"teal"}}><BsTwitter/></span>
            <span className={styles.icon} style={{color:"rgb(255, 63, 95)"}}><BsInstagram/></span>
            <span className={styles.icon} style={{color:"red"}}><BsYoutube/></span>
          </div>
          
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.newsletter}>
          <span className={styles.subscribe}>Subscribe to newsletter</span>
          <span className={styles.field}>
            <input type="text" value={email} placeholder="Enter your Email." className={styles.input} onChange={(e)=>setEmail(e.target.value)}/>
            <button className={styles.button} onClick={handleclick}>Subscribe</button>
          </span>
          {check && <span style={{fontWeight:"700",color:"red"}}>Thanks for Subscription.</span>}
        </div>
        <div className={styles.bottom}>
          <div className={styles.love}>Made with <b style={{color:"red",padding:"0px 3px"}}><AiFillHeart/></b> by Abhay</div>
          <div className={styles.copyright}>Copyright <b style={{padding:"0 3px",fontWeight:"700"}}>©</b> Spirit | All Right Reserved</div>
        </div>
      </div>
    </div>
  )
}

export default Footer;