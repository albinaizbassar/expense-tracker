import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import {auth, editExpense, getAllExpenses} from "../config/firebase";
import add from './../images/add.svg'
import edit from './../images/edit.svg'
const styles = {
  window: {
    margin: '0 auto',
    padding: 20
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  tableHeader: {
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 10px'
  },
  tableValues: {
    border: '1px solid #000',
    borderTop: 'none',
    padding: '5px 10px',
    height: '80vh',
    overflow: 'scroll'
  },
  valueRow: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}

const ExpenseComponent = ({expense, options, setModal, setData, setAction}) => {
  const showDate = expense.createdAt ? new Date(expense.createdAt.seconds * 1000).toLocaleDateString('ru-RU', options) : 'только что';

  return (
    <div style={styles.valueRow}>
      <div>{showDate}</div>
      <div>{expense.name}</div>
      <div>
        {expense.choice + expense.amount}
        <button
          style={{
            margin: '0 0 0 5px',
            padding: 0,
            border: 'none',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => {
          setData({
            ...expense
          })
          setModal(true)
          setAction('edit')
        }}>
          <img src={edit} style={{
            width: 15
          }} alt=""/>
        </button>
      </div>
    </div>
  )
}

function Tracker() {
  const [showModal, setModal] = useState(false)
  const [expenses, setExpenses] = useState([])
  let temp_total = 0
  const [total, setTotal] = useState(0)
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const [data, setData] = useState()
  const [action, setAction] = useState()
  const update = () => {
    getAllExpenses(auth.currentUser.uid).then((data) => {
      setExpenses(data)
      data.map((expense) => {
        if (expense.choice === "+") {
          temp_total += parseInt(expense.amount)
        } else if (expense.choice === '-'){
          temp_total -= parseInt(expense.amount)
        }
      })
      setTotal(temp_total)
    })
  }
  useEffect(() => {
    update()
  }, [])

  return <div style={styles.window}>
    <div style={styles.navbar}>
      <span onClick={() => auth.signOut()}>Остаток: {total}</span>
      <button onClick={() => {
        setModal(!showModal)
        setAction('create')
        setData()
      }} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        cursor: 'pointer'
      }}>
        <img src={add} width="25px" style={{
          color: '#fff',
        }} alt=""/>
      </button>
      {
        showModal ? (
          <Modal setModal={setModal} update={update} data={data} action={action}/>
        ) : ''
      }
    </div>
    <div style={styles.table}>
      <div style={styles.tableHeader}>
        <div>Date</div>
        <div>Name</div>
        <div>Amount</div>
      </div>
      <div style={styles.tableValues}>
        {
          expenses ? expenses.map((expense) => {
            return (
              <ExpenseComponent expense={expense} options={options} setModal={setModal} setData={setData} setAction={setAction}/>
            )
          }) : ''
        }
      </div>

    </div>
  </div>
}

export default Tracker;
