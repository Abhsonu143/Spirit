import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Register.module.css";
import axios from "axios";
import Link from "next/link";
import { Encrypt } from "../../util/aes";
import Head from "next/head";
import CryptoJS from "crypto-js";

const Register = () => {
    const [username,setUsername] = useState(null);
    const [rawpassword,setRawpassword] = useState(null);
    const [cnfpassword,setCnfpassword] = useState(null);
    const [name,setName]=useState(null);
    const [phone,setPhone]=useState(null);
    const [email,setEmail]=useState(null);
    const [error,setError] = useState(false);
    const router = useRouter();


    const handleClick=async()=>{
        if(!username || !rawpassword || !cnfpassword || !name || !phone || !email || rawpassword !==cnfpassword || username.indexOf(" ")!==-1 || email.indexOf("@")===-1 || phone.indexOf(" ")!==-1 || email.indexOf(" ")!==-1 || phone.length<10){
            alert("Please fill the form correctly!!!");
            return;
        }
        let find;
        try{
            find=await axios.post("https://spirit-one.vercel.app/api/user/checkregister",{username,email,phone});
        }catch(err){
            console.log("something went wrong!!!");
        }
        if(find.data){
            setError(true);
            return;
        }
        let password=Encrypt(CryptoJS.enc.Utf8.parse(rawpassword));
        try{
            await axios.post("https://spirit-one.vercel.app/api/user/register",{
                username,password,name,phone,email
            });
            router.push("/user/login");
        }catch(err){
            setError(true);
        }
    };
  return (
    <div className={styles.container}>
        <Head>
            <title>Spirit | Register with us get exclusive perks</title>
            <meta name="description" content="Best restaurent in country" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.left}>
            <div className={styles.logo}>
                <img src="https://res.cloudinary.com/abhaysonu/image/upload/v1658006087/output-onlinepngtools_1_bzzwai.png" alt="logo" className={styles.logoimage}/>
            </div>
            <div className={styles.welcome}>
                <div className={styles.component}>
                    <b className={styles.welcometext}>Welcome to</b> <span className={styles.logotext}>SpiritOfSpirit</span>
                </div>
            </div>
            <div className={styles.signin}>
                <div className={styles.component}>
                    Already registered?
                    <Link href="/user/login" passHref className={styles.link}>
                        <button className={styles.button}>
                        sign in
                        </button>
                    </Link>
                </div>
            </div>

        </div>

        <div className={styles.wrapper}>
            <div className={`${styles.extra}`}>
                <div className={styles.logo}>
                    <img src="https://res.cloudinary.com/abhaysonu/image/upload/v1658006087/output-onlinepngtools_1_bzzwai.png" alt="logo" className={styles.logoimage}/>
                </div>
            </div>
            <h1>Register Now!</h1>
            <div className={styles.inputContainer}>
                <div className={styles.name}>Enter Your Name<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="eg: Sonu Kumar"
                    className={styles.input}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>


            <div className={styles.inputContainer}>
                <div className={styles.name}>Enter a username<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="eg: sonu123"
                    className={styles.input}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </div>

            <div className={styles.inputContainer}>
                <div className={styles.name}>Enter a password<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="Enter at least 8-character"
                    type="password"
                    className={styles.input}
                    onChange={(e)=>setRawpassword(e.target.value)}
                />
            </div>

            <div className={styles.inputContainer}>
                <div className={styles.name}>Confirm your password<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="re-enter your password"
                    type="password"
                    className={styles.input}
                    onChange={(e)=>setCnfpassword(e.target.value)}
                />
            </div>

            <div className={styles.inputContainer}>
                <div className={styles.name}>Enter Your phone no<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="eg: +91-1234567890"
                    className={styles.input}
                    onChange={(e)=>setPhone(e.target.value)}
                />
            </div>
            
            <div className={styles.inputContainer}>
                <div className={styles.name}>Enter Your Email<b style={{color:"red"}}>*</b></div>
                <input 
                    placeholder="eg: example@gmail.com"
                    className={styles.input}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className={styles.policy}>By <span className={styles.text}>Registering</span>, you agree to our <span className={styles.text}>terms and conditions</span></div>
            <button className={styles.button} onClick={handleClick}>
                Register
            </button>
            <div className={styles.extra}>
            <div className={styles.signin}>
                <div className={styles.component}>
                    Already registered?
                    <Link href="/user/login" passHref className={styles.link}>
                        <button className={styles.button}>
                        sign in
                        </button>
                    </Link>
                </div>
            </div>
            </div>
            {error && <span className={styles.error}>Username/Email/Phone already exist.</span> }
            <span style={{position:"relative",right:"14vw"}}><b style={{color:"red"}}>*</b>required</span>
        </div>
    </div>
  );
};

export default Register;
