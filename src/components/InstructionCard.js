import React from 'react'
import style from '../styles/InstructionCard.module.css'
export default function InstructionCard({instruction}) {
    console.log(instruction)
  return (
    <div className={style.container}>
        <p className={style.text}>{instruction.text}</p>
    </div>
  )
}
