const express = require('express')
const app = express()
const env = require('dotenv')
const containsOnlyNumbers = require('./tester')
env.config()
app.use(express.json())

const PORT = process.env.PORT || 4002

const array = [{ "monthly_premium": 50, "yearly_premium": 330 }];
app.use('/convert', (req, res) => {
    res.send(array)
})

const converter = (car_value, risk_rating) => {
  
  const car_value1 = parseFloat(car_value)
  const risk_rating1 = parseFloat(risk_rating)
  if (!containsOnlyNumbers(car_value1)) { throw new Error("Invalid data type"); }
  if(!containsOnlyNumbers(risk_rating1)){throw new Error("Invalid data type"); }
  
  
  if (typeof risk_rating1 !== 'number') { throw new Error('Invalid data type') }
  if (typeof car_value1 !== 'number') { throw new Error('Invalid data type') }

  if (typeof car_value === 'boolean') { throw new Error("Invalid data type"); }
  if(typeof risk_rating === 'boolean'){throw new Error("Invalid data type");}
  
  if (typeof car_value1 !== 'number') { throw new Error('Invalid data type') }
  if (typeof risk_rating1 !== 'number') { throw new Error('Invalid data type') }

  if (car_value < 1) { throw new Error('Car value must be greater than 0') }
  if(risk_rating<1||risk_rating>5){throw new Error('Risk rating must be between 1 to 5')}
  
  const yearly = Math.round(((car_value * risk_rating) / 100)*10)/10
  const monthly = Math.round((yearly / 12)*10)/10
  return { monthly_premium: monthly, yearly_premium: yearly };
}

app.post("/converter/:car_value/:risk_rating", (req, res) => {
  const car_value = parseFloat(req.body.car_value);
  const risk_rating = parseFloat(req.body.risk_rating);
  array.push(converter(car_value,risk_rating));
})

// app.listen(PORT, () => {
//   console.log("listening to", PORT);
// });

module.exports = {converter}