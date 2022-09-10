//check address balance using ethrsjs library every 10 seconds and if its larger than 1 ETH send email to you
const Ethres = require("ethers")
const nodemailer = require("nodemailer")
require("dotenv").config()

const currentDateTime = new Date().toLocaleString()

const provider = new Ethres.providers.JsonRpcProvider(process.env.PROVIDER)

const address = process.env.ADDRESS

const checkBalance = async () => {
  const balance = await provider.getBalance(address)
  const balanceInEth = Ethres.utils.formatEther(balance)
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
