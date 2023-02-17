/* eslint-disable react/no-unknown-property */
// // Write your code here
// import {Component} from 'react'
// import './index.css'

// class TransactionItem extends Component {
//       render() {
//             const {transactionDetails, onDeleteTransaction} = this.props
//             const {id, title, amount, type} = transactionDetails
//             const deleteTransaction = () => {
//                   onDeleteTransaction(id)
//                 }
//                 return (
//                       <li>
//                         <div>
//                           <p className="title">{title}</p>
//                           <p className="amount">Rs {amount}</p>
//                           <p className="type">{type}</p>
//                         </div>
//                         <button testid="delete" type="button" onClick={deleteTransaction}>
//                           <img
//                             src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
//                             alt="delete"
//                           />
//                         </button>
//                       </li>
//                     )
//                   }
//                 }

//  export default TransactionItem

import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type, date} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{type}</p>
      <p className="transaction-text">{date}</p>
      <div className="delete-container">
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteTransaction}
          testid="delete"
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
