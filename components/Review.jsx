import styles from "../styles/Review.module.css";
import ReviewCard from "./ReviewCard";
const Review = ({reviewItems}) => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            {reviewItems.map((item)=>(
              <ReviewCard key={item._id} review={item}/>
            ))}
        </div>
    </div>
  )
}

export default Review;