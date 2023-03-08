import React from 'react'

import styles from './Card.module.css';

type CardProps = {
  src: string,
  heading: string,
  paragraph: string,
  className?: string
}

const Card = ({ src, heading, paragraph, className }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`} >
      <img src={src} className={`${styles.cardImage}`}/>
      <div className={`${styles.cardParagraphContainer}`}>
        <h1 className={`${styles.cardHeading}`}>{heading}</h1>
        <p className={`${styles.cardParagraph}`}>
            {paragraph}
        </p>
      </div>
    </div>
  )
}

export default Card