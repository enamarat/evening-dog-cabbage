/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  /*********/
  this.getNum = function(input) {
    const regex = /(\d+((\.|\,)\d+)?)((\.|\,|\/)(\d+((\.|\,)\d+)?))?/;
    let result = input.match(regex);
    
    // replace commas with dots since digits separated by commas can't be parsed into numbers in JavaScript
    const regexComma = /\,/g;
    if (regexComma.test(input)) {
      result = input.replace(regexComma, ".");
    }
    
    // if the input contains a fraction instead of an integer
    const regexFraction = /\d+\/\d+/;
    if (regexFraction.test(input)) {
      // double fraction is considered an invalid number
      const regexRepeatingFraction = /(\/).*?\1/;
      if (regexRepeatingFraction.test(input)) {
        result = "invalid number";
      } else {
         const fraction = result[0].split('/');
        // check for invalid number
        if (fraction[0] == 0 || fraction[1] == 0) {
          result = "invalid number";
        } else {
          result = fraction[0] / fraction[1];
        }
      }
  
    } else {
      result = parseFloat(input.match(regex));
      // zero is considered as invalid number
      if (input.match(/\d+/) == 0) {
         result = "invalid number";
      }
      // if no number is provided to the input assume that number is equal to one
      if (!/\d+/.test(input)) {
        result = 1;
      }
    }
    return result;
  };
  
  /*********/
  this.getUnit = function(input) {
    const regex = /[a-zA-Z]+$/;
    const result = input.match(regex);
    const validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let matchIsFound = false;
   
    validUnits.forEach(element => {
      if (element == result) {
        matchIsFound = true;
      }
    });
    
    if (matchIsFound === true) {
      return result.toString();
    } else {
      return "invalid unit";
    }
    
  };
  
  /*********/
  this.getReturnUnit = function(initUnit) {
    let result = null;
    switch(initUnit.toLowerCase()) {
      case "gal":
        result = "l";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
     /* default: 
        result = "invalid unit";*/
    }
    return result;
  };

  /*********/
  this.spellOutUnit = function(unit) {
    let result = { };
    switch(unit.toLowerCase()) {
      case "gal":
        result.initialUnit = "gallons";
        result.returnedUnit = "liters";
        break;
      case "l":
        result.initialUnit = "liters";
        result.returnedUnit = "gallons";
        break;
      case "lbs":
        result.initialUnit = "pounds";
        result.returnedUnit = "kilograms";
        break;
      case "kg":
        result.initialUnit = "kilograms";
        result.returnedUnit = "pounds";
        break;
      case "mi":
        result.initialUnit = "miles";
        result.returnedUnit = "kilometers";
        break;
      case "km":
        result.initialUnit = "kilometers";
        result.returnedUnit = "miles";
        break;
    }
    return result;
  };
  
  /*********/
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result = null;
    
    switch(initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    
     // if result is a decimal round to 5 places after the point
    if (result % 1 != 0) {
      result = Number(Math.round(result +'e5')+'e-5');
    }
    return result;
  };
  
  /*********/
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit).initialUnit} converts to ${returnNum} ${this.spellOutUnit(initUnit).returnedUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
