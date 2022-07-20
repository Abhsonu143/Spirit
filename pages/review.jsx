import axios from 'axios';
import Head from 'next/head';
import Review from "../components/Review";



export default function reviewpage({review}) {
    return (
        <div>
          <Head>
            <title>Spirit | What customer say about us</title>
            <meta name="description" content="Best restaurent in country" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Review reviewItems={review}/>
        </div>
    )
}

export const getServerSideProps = async ()=> {
const res=await axios.get("https://spirit-one.vercel.app/api/review");
  return {
    props : {
      review:res.data
    }
    
  }
}
