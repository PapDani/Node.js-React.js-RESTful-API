import React from 'react'

import styles from './Card.module.css';

type CardProps = {
  src: string,
  paragraph: string,
  className: string
}

const Card = ({ src, paragraph, className }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`} >
      <img src={src} className={`${styles.cardImage}`}/>
      <div className={`${styles.cardParagraphContainer}`}>
        <p className={`${styles.cardParagraph}`}>
            {paragraph}
        </p>
      </div>
    </div>
  )
}

export default Card