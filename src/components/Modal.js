import React, {useState} from 'react';
import {auth, createExpense} from "../config/firebase";

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
      amount,
      uid: auth.currentUser.uid
    }
    createExpense(order)
  }

  return (
    <div style={{
      position: 'absolute',
      right: 20,
      top: 50,
      backgroundColor: '#000',
      borderRadius: '5px 0 5px 5px',
      color: '#fff',
      padding: 20,
      width: 146
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '5px 5px 0 0',
        color: '#000',
      }}>
        <input type="radio" id="contactChoice1" name="contact" style={{
          display: 'none'
        }} onClick={() => {
          setShowInput(true)
          if (choice === '+'){
            setName('')
            setAmount('')
          }
          setChoice('-')
        }}/>
        <label htmlFor="contactChoice1" style={{
          backgroundColor: choice === '-' ? '#d2d2d2' : '',
          borderRadius: '5px 0 0 0',
          padding: '0 15px 0 5px',
          borderRight: !choice ? '1px solid gray': '',
          cursor: 'pointer'
        }}>Расход</label>

        <input type="radio" id="contactChoice2" name="contact" style={{
          display: 'none'
        }} onClick={() => {
          setShowInput(false)
          setName('Пополнение')
          if (choice === '-'){
            setAmount('')
          }
          setChoice('+')
        }}/>
        <label htmlFor="contactChoice2" style={{
          backgroundColor: choice === '+' ? '#d2d2d2' : '',
          borderRadius: '0 5px 0 0',
          padding: '0 10px 0 15px',
          cursor: "pointer"
        }}>Доход</label>
        <br/>
      </div>
      {
        showInput ? (
          <>
            <input placeholder="Введите название" value={name} style={{
              marginTop: 5,
              outline: 'none',
              border: "none",
              padding: 5,
              borderRadius: 2,
              width: 136
            }} onChange={(e) => setName(e.target.value)}/>
            <br />
          </>
        ) : ''

      }

      <input placeholder="Введите сумму" type="text" value={amount} style={{
        marginTop: 5,
        marginBottom: 5,
        outline: 'none',
        border: "none",
        padding: 5,
        borderRadius: 2,
        width: 136
      }} onChange={(e) => {
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
      }} style={{
        border: 'none',
        outline: 'none',
        padding: 5,
        borderRadius: 2,
        cursor: disabled ? '' : 'pointer'
      }} disabled={disabled}>
        Добавить
      </button>
    </div>
  );
}

export default Modal;
