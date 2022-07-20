import axios from "axios";
import Head from "next/head";
import Menu from "../../components/Menu";
import styles from "../../styles/MainMenu.module.css";

export default function MenuList({menuItems}){
    return(
        <div className={styles.container}>
            <Head>
                <title>your kitchen | Our top Pizza products</title>
                <meta name="description" content="Best restaurent in country" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Menu menuItems={menuItems}/>
        </div>
    )
}
export const getServerSideProps=async()=>{
    const res=await axios.get("https://spirit-one.vercel.app/api/products/pizza");
    return{
        props:{
            menuItems:res.data,
        }
    }
}
