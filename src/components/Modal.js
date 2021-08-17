import React, {useState} from 'react';
import {createExpense} from "../config/firebase";

function Modal({setModal}) {
  const [choice, setChoice] = useState();
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

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
      <input type="radio" id="contactChoice1" name="contact" onClick={() => setChoice('-')}/>
      <label htmlFor="contactChoice1">Расход</label>
      <input type="radio" id="contactChoice2" name="contact" onClick={() => setChoice('+')}/>
      <label htmlFor="contactChoice2">Доход</label>
      <br/>
      <input placeholder="Введите название" value={name} onChange={(e) => setName(e.target.value)}/>
      <br />
      <input placeholder="Введите сумму" type="text" value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
      <br />

      <button onClick={() => {
        addExpense()
        setModal(false)
      }}>
        Добавить
      </button>
    </div>
  );
}

export default Modal;
