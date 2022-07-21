import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Forget.module.css";
import axios from "axios";
import Link from "next/link";
import {Encrypt,Decrypt} from "../../util/aes";

const Forgot = () => {
    const [username,setUsername] = useState(null);
    const [id,setId] = useState(null);
    const [newpassword,setNewpassword] = useState(null);
    const [newcnfpassword,setNewcnfpassword] = useState(null);
    const [phone,setPhone] = useState(null);
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [error,setError] = useState(false);
    const [matcherror,setMatcherror] =useState(false);
    const [lengtherror,setLengtherror] = useState(false);
    const [servererror,setServererror] = useState(false);
    const [show,setShow] = useState(true);
    const router = useRouter();

    const handleForgot=async()=>{
        if(newpassword!==newcnfpassword){
            setMatcherror(true);
            setLengtherror(false);
            setServererror(false);
            return;
        }
        else if(!newpassword || newpassword.length<8){
            setLengtherror(true);
            setMatcherror(false);
            setServererror(false);
            return;
        }
        else{
            let encryptedpassword=newpassword;
            try{
               await axios.put("https://spirit-one.vercel.app/user/register",{id,encryptedpassword});
               router.push("/user/login");
            }catch(err){
                setServererror(true);
                setLengtherror(false);
                setMatcherror(false);
            }
        }
        
    }

    const handleClick=async()=>{
        if(!username || !phone || !email){
            setError(true);
            return;
        }
        let res;
        try{
            res=await axios.post("http://localhost:3000/api/user/checkregister",{username,email,phone});
        }catch(err){
            console.log(err);
        }
        if(!res.data || res.data.username!==username || res.data.email!==email || res.data.phone!==phone){
            setError(true);
            return;
        }
        else{
            setShow(false);
            setId(res.data._id);
        }

    };

  return (
    <div className={styles.container}>
        {show?
        <div className={styles.wrapper}>
            <h3>Welcome to Spirit</h3>
            <input 
                name="detail"
                placeholder="username"
                className={styles.input}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                name="detail"
                placeholder="phone number"
                className={styles.input}
                onChange={(e)=>setPhone(e.target.value)}
            />
            <input 
                name="detail"
                placeholder="email"
                className={styles.input}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <button className={styles.button} onClick={handleClick}>
                Change Password
            </button>
            <div className={styles.bottom}>
                <Link href="/user/login" passHref>
                    <span className={styles.register}>Login</span>
                </Link>
                <Link href="/user/register" passHref>
                    <span className={styles.register}>Register</span>
                </Link>
            </div>
            {error && <span className={styles.error}>username/phone/email not matched!</span> }
        </div>:
        <div className={styles.wrapper}>
            <h3>Set your Password</h3>
            <input 
                name="detail"
                placeholder="create new password"
                type="password"
                className={styles.input}
                onChange={(e)=>setNewpassword(e.target.value)}
            />
            <input 
                name="detail"
                placeholder="re-enter new password"
                type="password"
                className={styles.input}
                onChange={(e)=>setNewcnfpassword(e.target.value)}
            />
            <button className={styles.button} onClick={handleForgot}>
                Reset
            </button>
            {matcherror && <span className={styles.error}>passwords didn&apos;t matched!</span> }
            {lengtherror && <span className={styles.error}>at least 8-character required </span> }
            {servererror && <span className={styles.error}>Something wrong, Please try again. </span> }
        </div>
        }
    </div>
  );
};

export default Forgot;
