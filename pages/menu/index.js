import axios from "axios";
import Head from "next/head";
import MenuList from "../../components/MenuList";
import styles from "../../styles/MainMenu.module.css";


export default function Menu({menuLists}){
    return(
        <div className={styles.container}>
            <Head>
                <title>Spirit | Explore our full flegged menu</title>
                <meta name="description" content="Best restaurent in country" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MenuList menuLists={menuLists}/>
        </div>
    )
}

export const getServerSideProps=async()=>{
    const res=await axios.get("https://spirit-one.vercel.app/api/featureds");
    return{
        props:{
            menuLists:res.data,
        }
    }
}
