import styles from "../styles/Top.module.css";
import {AiOutlineMail} from "react-icons/ai";
import {BiPhoneCall} from "react-icons/bi";

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.desktop}>
        <div className={styles.text}>if you have any queries,  feel free to <b className={styles.contact}>Email us: </b>
           <p className={styles.contacts}><AiOutlineMail className={styles.icon}/>spiritofspirit@gmail.com</p>
           or <b className={styles.contact}>call us: </b> <p className={styles.contacts}> <BiPhoneCall className={styles.icon}/>+91-1234567890</p>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.text}>
           <b className={styles.contact}>call us: </b> <p className={styles.contacts}> <BiPhoneCall className={styles.icon}/>+91-1234567890</p>
        </div>
      </div>
    </div>
  )
}

export default Top;