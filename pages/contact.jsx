import styles from "../styles/Contact.module.css";
import axios from "axios";
import { useState } from "react";
import Head from 'next/head';


const Contact = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [message,setMessage] = useState('');
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);

    const handlesubmit=async()=>{
        if(!name || !email || !phone || !message || phone.length>10 || phone.length<10 || email.length>30){
            setError(true);
            setSuccess(false);
            return;
        }
        await axios.post("https://spirit-one.vercel.app/api/review",{name,phone,email,message});
        
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSuccess(true);
        setError(false);
    }
  return (
    <div className={styles.container}>
        <Head>
            <title>Spirit | Give a feedback</title>
            <meta name="description" content="Best restaurent in country" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.wrapper}>
            <div style={{marginBottom:"10px",fontSize:"20px",fontWeight:"600"}}>
                Send us a Message!
            </div>
            <input 
                name="name"
                value={name}
                placeholder="Enter name"
                className={styles.input}
                onChange={(e)=>setName(e.target.value)}
            />
            <input 
                name="phone"
                value={phone}
                placeholder="Enter phone no:1234567890"
                className={styles.input}
                onChange={(e)=>setPhone(e.target.value)}
            />
            <input 
                name="email"
                value={email}
                placeholder="Enter email"
                className={styles.input}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <textarea
                name="message"
                value={message}
                placeholder="Type your message here"
                className={styles.textarea}
                onChange={(e)=>setMessage(e.target.value)}
            />
            <div className={styles.checkbox}>
                <input
                    name="checkbox"
                    type="checkbox"
                    checked disabled
                />
                <span>Accept<b style={{color:"red",padding:"0px 5px"}}>Cookies</b></span>
            </div>
            <button className={styles.button} onClick={handlesubmit}>submit</button>
            {error && <span style={{color:"red",fontWeight:"700"}}>Fill all fields.</span>}
            {success && <span style={{color:"green",fontWeight:"600"}}>Form Submitted.</span>}
        </div>

    </div>
  )
}

export default Contact;
