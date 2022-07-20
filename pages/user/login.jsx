import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import Link from "next/link";
import {Decrypt} from "../../util/aes";
import Head from "next/head";
import CryptoJS from "crypto-js";

const Login = () => {
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [error,setError] = useState(false);
    const router = useRouter();

    const handleClick=async()=>{
        var res;
        try{
            res=await axios.post("https://spirit-one.vercel.app/api/user",{username});
        }catch(err){
            console.log(err);
        }
        if(!res.data || Decrypt(CryptoJS.enc.Utf8.parse(res.data.password))!==password){
            setError(true);
            return;
        }
        else{
            router.push("/");
        }

    };

  return (
    <div className={styles.container}>
        <Head>
            <title>Spirit | Login to use our exclusive services</title>
            <meta name="description" content="Best restaurent in country" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.wrapper}>
            <h1>Login to Spirit</h1>
            <input 
                name="detail"
                placeholder="username"
                className={styles.input}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                name="detail"
                placeholder="password"
                type="password"
                className={styles.input}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <div className={styles.policy}>By <span className={styles.text}>Sign in</span>, you agree to our <span className={styles.text}>terms and conditions</span></div>
            <button className={styles.button} onClick={handleClick}>
                Sign In
            </button>
            <div className={styles.bottom}>
                <Link href="/user/forgot" passHref>
                    <span className={styles.forgot}>Forgot password?</span>
                </Link>
                <Link href="/user/register" passHref>
                    <span className={styles.register}>Register</span>
                </Link>
            </div>
            {error && <span className={styles.error}>Wrong Credentials!!!</span> }
        </div>
    </div>
  );
};

export default Login;
