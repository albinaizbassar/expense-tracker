import React, {useState} from 'react';
import {createExpense} from "../config/firebase";

function Modal({setModal, update}) {
  const [choice, setChoice] = useState();
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [disabled, setDisabled] = useState(true)
  function addExpense() {
    const order = {
      name,
      choice,
      amount
    }
    createExpense(order)
  }

  return (
    <div>
      <input type="radio" id="contactChoice1" name="contact" onClick={() => {
        setShowInput(true)
        if (choice === '+'){
          setName('')
          setAmount('')
        }
        setChoice('-')
      }}/>
      <label htmlFor="contactChoice1">Расход</label>

      <input type="radio" id="contactChoice2" name="contact" onClick={() => {
        setShowInput(false)
        setName('Пополнение')
        if (choice === '-'){
          setAmount('')
        }
        setChoice('+')
      }}/>
      <label htmlFor="contactChoice2">Доход</label>
      <br/>
      {
        showInput ? (
          <>
            <input placeholder="Введите название" value={name} onChange={(e) => setName(e.target.value)}/>
            <br />
          </>
        ) : ''

      }

      <input placeholder="Введите сумму" type="text" value={amount} onChange={(e) => {
        setAmount(e.target.value)
        if (choice === '-'){
          if (e.target.value.length > 0 && name.length > 0){
            setDisabled(false)
          }else {
            setDisabled(true)
          }
        }else if (choice === "+") {
          if (e.target.value.length > 0){
            setDisabled(false)
          }else {
            setDisabled(true)
          }
        }
      }}/>
      <br />

      <button onClick={() => {
        addExpense()
        setModal(false)
        setShowInput(false)
        update()
      }} disabled={disabled}>
        Добавить
      </button>
    </div>
  );
}

export default Modal;
