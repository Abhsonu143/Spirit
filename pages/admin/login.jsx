import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import axios from "axios";

const Login = () => {
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [error,setError] = useState(false);
    const router = useRouter();
    const handleClick=async()=>{
        try{
            await axios.post("https://spirit-one.vercel.app/api/login",{
                username,password,
            });
            router.push("/");
        }catch(err){
            setError(true);
        }
    };
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Admin Dashboard</h1>
            <input 
                placeholder="username"
                className={styles.input}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                placeholder="password"
                type="password"
                className={styles.input}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button className={styles.button} onClick={handleClick}>
                Sign In
            </button>
            {error && <span className={styles.error}>Wrong Credentials!!!</span> }
        </div>
    </div>
  );
};

export default Login;
