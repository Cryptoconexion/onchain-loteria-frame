import React from "react";
import styles from "@styles/home.module.css"; // Make sure this path is correct

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

const Cards: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
}) => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt={title} />
      </figure>
      <div className={styles.cardbody}>
        <h2 className={styles.cardtitle}>{title}</h2>
        <p className={styles.carddes}>{description}</p>
        <div className="card-actions justify-center pt-5">
          {/* <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-primary-50 mb-10">
            {buttonText}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
