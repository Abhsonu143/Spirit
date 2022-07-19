import styles from "../styles/ReviewCard.module.css";

const ReviewCard = ({review}) => {
  return (
    <div className={styles.container}>
        <div className={styles.name}>{review.name.slice(0,20)}</div>
        <span>

          <span className={styles.quote}>"</span>
          <span className={styles.message}>
                  {review.message}
          </span>
          <span className={styles.quote}>"</span>
        </span>
    </div>
  )
}

export default ReviewCard;