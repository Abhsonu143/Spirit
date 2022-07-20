import Menu from "../components/Menu";
import axios from "axios";
import Head from 'next/head';

export default function Special  ({menuItems}) {
  return (
    <div>
        <Head>
            <title>Spirit | spirit of spirit special</title>
            <meta name="description" content="Best restaurent in country" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Menu menuItems={menuItems}/>
    </div>
  )
}


export const getServerSideProps=async()=>{
    const res = await axios.get("https://spirit-one.vercel.app/api/products");
    return{
        props:{
            menuItems:res.data
        }
    }
}
