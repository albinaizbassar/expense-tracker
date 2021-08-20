import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import {getAllExpenses} from "../config/firebase";

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
    height: 500
  },
  valueRow: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}

const ExpenseComponent = ({expense, options}) => {
  const showDate = expense.createdAt ? new Date(expense.createdAt.seconds * 1000).toLocaleDateString('ru-RU', options) : 'только что';
  return (
    <div style={styles.valueRow}>
      <div>{showDate}</div>
      <div>{expense.name}</div>
      <div>{expense.choice + expense.amount}</div>
    </div>
  )
}

function Tracker() {
  const [showModal, setModal] = useState(false)
  const [expenses, setExpenses] = useState([])
  let temp_total = 0
  const [total, setTotal] = useState(0)
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const update = () => {
    getAllExpenses().then(async (data) => {
      await setExpenses(data)
      await data.map((expense) => {
        if (expense.choice === "+") {
          temp_total += parseInt(expense.amount)
        } else if (expense.choice === '-'){
          temp_total -= parseInt(expense.amount)
        }
      })
      await setTotal(temp_total)
    console.log(data)
    })
  }
  useEffect(() => {
    update()
  }, [])
  if (showModal) {
    return (
      <Modal setModal={setModal} update={update}/>
    )
  }

  return <div style={styles.window}>
    <div style={styles.navbar}>
      <span>Остаток: {total}</span>
      <button onClick={() => setModal(true)}>+</button>
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
              <ExpenseComponent expense={expense} options={options}/>
            )
          }) : ''
        }
      </div>

    </div>
  </div>
}

export default Tracker;
