/* eslint-disable react/no-unknown-property */
// Write your code here
// import {Component} from 'react'
// import './index.css'

// class MoneyDetails extends Component {
//   render() {
//     const {income, expense} = this.props
//     return (
//       <div className="main-cont">
//         <div className="bal-cont">
//           <div className="img-cont">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
//               alt="balance"
//             />
//           </div>
//           <div className="details-cont">
//             <p className="head">Your Balance</p>
//             <p testid="balanceAmount" className="amt">
//               Rs {income - expense}
//             </p>
//           </div>
//         </div>
//         <div className="inc-cont">
//           <div className="img-cont">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
//               alt="income"
//             />
//           </div>
//           <div className="details-cont">
//             <p className="head">Your Income</p>
//             <p testid="incomeAmount" className="amt">
//               Rs {income}
//             </p>
//           </div>
//         </div>
//         <div className="exp-cont">
//           <div className="img-cont">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
//               alt="expenses"
//             />
//           </div>
//           <div className="details-cont">
//             <p className="head">Your Expenses</p>
//             <p testid="expensesAmount" className="amt">
//               Rs {expense}
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default MoneyDetails

import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Balance</p>
          <p className="details-money" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Income</p>
          <p className="details-money" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Expenses</p>
          <p className="details-money" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
