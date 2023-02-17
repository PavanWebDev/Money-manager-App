// import {Component} from 'react'
// import './index.css'
// import {v4 as uuidv4} from 'uuid'
// import MoneyDetails from '../MoneyDetails/index'
// import TransactionItem from '../TransactionItem/index'

// const transactionTypeOptions = [
//   {
//     optionId: 'INCOME',
//     displayText: 'Income',
//   },
//   {
//     optionId: 'EXPENSES',
//     displayText: 'Expenses',
//   },
// ]

// // Write your code here
// class MoneyManager extends Component {
//   state = {
//     transactionsList: [],
//     title: '',
//     amount: '',
//     type: transactionTypeOptions[0].optionId,
//     totalIncome: 0,
//     totalExpense: 0,
//   }

//   onAddTransaction = event => {
//     event.preventDefault()
//     const {
//       transactionsList,
//       title,
//       amount,
//       type,
//       totalIncome,
//       totalExpense,
//     } = this.state
//     const newTransaction = {
//       id: uuidv4(),
//       title,
//       amount,
//       type: type === 'INCOME' ? 'Income' : 'Expenses',
//     }
//     this.setState({
//       transactionsList: [...transactionsList, newTransaction],
//       title: '',
//       amount: '',
//       type: transactionTypeOptions[0].optionId,
//       totalIncome:
//         type === 'INCOME' ? totalIncome + parseInt(amount) : totalIncome,
//       totalExpense:
//         type === 'EXPENSES' ? totalExpense + parseInt(amount) : totalExpense,
//     })
//   }

//   onDeleteTransaction = uniqueId => {
//     const {transactionsList, totalIncome, totalExpense} = this.state
//     const deletedTransaction = transactionsList.filter(
//       eachTransaction => eachTransaction.id === uniqueId,
//     )
//     const transactionType = deletedTransaction[0].type
//     this.setState({
//       transactionsList: transactionsList.filter(
//         eachTransaction => eachTransaction.id !== uniqueId,
//       ),
//       totalIncome:
//         transactionType === 'Income'
//           ? totalIncome - parseInt(deletedTransaction[0].amount)
//           : totalIncome,
//       totalExpense:
//         transactionType === 'Expenses'
//           ? totalExpense - parseInt(deletedTransaction[0].amount)
//           : totalExpense,
//     })
//   }

//   onChangeTitle = event => {
//     this.setState({title: event.target.value})
//   }

//   onChangeAmount = event => {
//     this.setState({amount: parseInt(event.target.value)})
//   }

//   onChangeType = event => {
//     this.setState({type: event.target.value})
//   }

//   render() {
//     const {
//       transactionsList,
//       title,
//       amount,
//       type,
//       totalIncome,
//       totalExpense,
//     } = this.state
//     return (
//       <div className="bg-container">
//         <div className="card-cont">
//           <h1>Hi, Richard</h1>
//           <p>
//             Welcome back to your <span>Money Manager</span>
//           </p>
//         </div>
//         <MoneyDetails income={totalIncome} expense={totalExpense} />
//         <div className="btm-cont">
//           <div className="add-cont">
//             <h1>Add Transaction</h1>
//             <form onSubmit={this.onAddTransaction}>
//               <label htmlFor="title">TITLE</label>
//               <input
//                 id="title"
//                 type="text"
//                 onChange={this.onChangeTitle}
//                 value={title}
//                 placeholder="TITLE"
//               />
//               <label htmlFor="amount">AMOUNT</label>
//               <input
//                 id="amount"
//                 type="number"
//                 value={amount}
//                 placeholder="AMOUNT"
//                 onChange={this.onChangeAmount}
//               />
//               <label htmlFor="type">TYPE</label>
//               <select id="type" value={type} onChange={this.onChangeType}>
//                 {transactionTypeOptions.map(eachType => (
//                   <option value={eachType.optionId} key={eachType.optionId}>
//                     {eachType.displayText}
//                   </option>
//                 ))}
//               </select>
//               <button type="submit">Add</button>
//             </form>
//           </div>
//           <div className="history-cont">
//             <h1>History</h1>
//             <ul className="history-list">
//               <li className="col-titles">
//                 <p>Title</p>
//                 <p>Amount</p>
//                 <p>Type</p>
//               </li>
//               {transactionsList.map(eachTransaction => (
//                 <TransactionItem
//                   key={eachTransaction.id}
//                   transactionDetails={eachTransaction}
//                   onDeleteTransaction={this.onDeleteTransaction}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default MoneyManager

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {v4} from 'uuid'
import Header from '../Header'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    dateInput: '',
    optionId: transactionTypeOptions[0].optionId,
    isError: false,
    errMsg: '',
  }

  deleteTransaction = id => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    const {transactionsList} = currentUser
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    localStorage.setItem(
      'current_user',
      JSON.stringify({
        ...currentUser,
        transactionsList: updatedTransactionList,
      }),
    )
    this.setState({
      titleInput: '',
      amountInput: '',
      dateInput: '',
      optionId: transactionTypeOptions[0].optionId,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId, dateInput} = this.state
    if (titleInput === '' || amountInput === '' || dateInput === '') {
      this.setState({isError: true, errMsg: 'please fill all details'})
    } else {
      const currentUser = JSON.parse(localStorage.getItem('current_user'))
      const typeOption = transactionTypeOptions.find(
        eachTransaction => eachTransaction.optionId === optionId,
      )
      const {displayText} = typeOption
      const newTransaction = {
        id: v4(),
        title: titleInput,
        amount: parseInt(amountInput),
        type: displayText,
        date: dateInput,
      }
      localStorage.setItem(
        'current_user',
        JSON.stringify({
          username: currentUser.username,
          transactionsList: [...currentUser.transactionsList, newTransaction],
        }),
      )
      this.setState({
        titleInput: '',
        amountInput: '',
        dateInput: '',
        optionId: transactionTypeOptions[0].optionId,
      })
    }
  }

  onChangeDate = e => {
    this.setState({dateInput: e.target.value, isError: false})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value, isError: false})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value, isError: false})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value, isError: false})
  }

  getExpenses = () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    let expensesAmount = 0
    if (currentUser === null) {
      return expensesAmount
    }
    const {transactionsList} = currentUser
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    let incomeAmount = 0
    if (currentUser === null) {
      return incomeAmount
    }
    const {transactionsList} = currentUser
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    if (currentUser === null) {
      return balanceAmount
    }
    const {transactionsList} = currentUser
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const user = JSON.parse(localStorage.getItem('current_user'))
    if (user === null) {
      return <Redirect to="/login" />
    }
    const {
      titleInput,
      amountInput,
      optionId,
      dateInput,
      isError,
      errMsg,
    } = this.state
    const {username, transactionsList} = user
    return (
      <>
        <Header />
        <div className="app-container">
          <div className="responsive-container">
            <div className="header-container">
              <h1 className="heading">Hello, {username}</h1>
              <p className="header-content">
                Welcome back to your
                <span className="money-manager-text"> Money Manager</span>
              </p>
            </div>
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
            <div className="transaction-details">
              <form
                className="transaction-form"
                onSubmit={this.onAddTransaction}
              >
                <h1 className="transaction-header">Add Transaction</h1>
                <label className="input-label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="TITLE"
                  value={titleInput}
                />
                <label className="input-label" htmlFor="amount">
                  AMOUNT
                </label>
                <input
                  type="text"
                  id="amount"
                  className="input"
                  onChange={this.onChangeAmountInput}
                  placeholder="AMOUNT"
                  value={amountInput}
                />
                <label htmlFor="date" className="input-label">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <label className="input-label" htmlFor="select">
                  TYPE
                </label>
                <select
                  id="select"
                  className="input"
                  value={optionId}
                  onChange={this.onChangeOptionId}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="button">
                  Add
                </button>
                {isError && <p className="err">{errMsg}</p>}
              </form>
              <div className="history-transactions">
                <h1 className="transaction-header">History</h1>
                <div className="transactions-table-container">
                  <ul className="transactions-table">
                    <li className="table-header">
                      <p className="table-header-cell">Title</p>
                      <p className="table-header-cell">Amount</p>
                      <p className="table-header-cell">Type</p>
                      <p className="table-header-cell">Date</p>
                    </li>
                    {transactionsList.map(eachTransaction => (
                      <TransactionItem
                        key={eachTransaction.id}
                        transactionDetails={eachTransaction}
                        deleteTransaction={this.deleteTransaction}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MoneyManager
