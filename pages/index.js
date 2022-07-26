import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Featured from '../components/Featured';
import Menu from '../components/Menu';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import styles from '../styles/Home.module.css';
import About from '../components/About';


export default function Home({menuItems,featuredItems,GalleryImages,admin}) {
  const [close,setClose]=useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Spirit | Welcome to spirit kitchen</title>
        <meta name="description" content="Best restaurent in country" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured featuredItems={featuredItems}/>
      {admin && <AddButton setClose={setClose}/>}
      {!close && <Add setClose={setClose} featuredItems={featuredItems}/>}
      <div className={styles.topItems}>Our top picks</div>
      <Menu menuItems={menuItems}/>
      <About GalleryImages={GalleryImages}/>
    </div>
  )
}

export const getServerSideProps = async (ctx)=> {
  const myCookie = ctx.req?.cookies||"";
  let admin=false;
  const Featuredres = await axios.get("https://spirit-one.vercel.app/api/featureds");
  const Menures = await axios.get( "https://spirit-one.vercel.app/api/products");
  const Galleryres=await axios.get("https://spirit-one.vercel.app/api/gallery");
  return {
    props : {
      featuredItems:Featuredres.data,
      menuItems:Menures.data,
      GalleryImages:Galleryres.data,
      admin
    }
    
  }
}
