import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({total,createOrder}) => {
    const [customer,setCustomer]=useState("");
    const [address,setAddress]=useState("");
    const [phone,setPhone]=useState("");

    const handleClick = ()=>{
        createOrder({customer, address, total, method:0 });
    };
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Pay ₹{Math.ceil(total*0.9)} on delivery.</h1>
            <div className={styles.item}>
                <label className={styles.label}>NAME</label>
                <input placeholder="Your Name" type="text" className={styles.input} onChange={(e)=>setCustomer(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>PHONE NUMBER</label>
                <input placeholder="eg: +91-1234567890" type="text" className={styles.input} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>ADDRESS</label>
                <input placeholder="Your Address" type="text" className={styles.input} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <button className={styles.button} onClick={handleClick}>Place Order</button>
        </div>
    </div>
  )
}

export default OrderDetail;