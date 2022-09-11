const Web3 = require("web3")
const nodemailer = require("nodemailer")
require("dotenv").config()

let currentDateTime

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER))

const address = process.env.ADDRESS

const checkBalance = async () => {
  currentDateTime = new Date().toLocaleString()

  const balance = await web3.eth.getBalance(address)
  const balanceInEth = web3.utils.fromWei(balance, "ether")

  console.log(currentDateTime, balanceInEth)

  if (balanceInEth > 100) {
    sendEmail()
  }
}

const sendEmail = () => {
  clearInterval(interval)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_TO,
    subject: "Address balance is larger than 100 ETH",
    text: `On ${currentDateTime} Address balance is larger than 100 ETH`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

const interval = setInterval(checkBalance, 10000)
