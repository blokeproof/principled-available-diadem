/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  const inputRegex = /[a-z]+|[^a-z]+/gi;//splits groups of numbers and groups of characters into array elements
  
  this.getNum = function(input) {
    const numberRegex = /\d/;
    
    let result = input.match(inputRegex)[0];    
    
    if(numberRegex.test(result) === false){
      result = 1;
    }
    
    if(result.toString().includes('/')){
      let values = result.toString().split('/')
      let rawInput = input;   
      let slashes = rawInput.replace(/[^\/]/g, "");
      if(slashes.length > 1){
        result = undefined;
      } else if(values.length != 2){
        result = undefined;
      } else if (!isNaN(values[0]) && !isNaN(values[1])) {
        let value0 = parseFloat(values[0]);
        let value1 = parseFloat(values[1]);
        result = value0/value1;
        result = result.toFixed(5);
        result = parseFloat(result);
      } else {
        result = undefined;
      }
    }
    
    return (isNaN(result) || result === undefined) ? 'invalid number' : result;    
  };
  
  this.getUnit = function(input) {
    let result;
    result = (input.match(inputRegex)[1]) ? input.match(inputRegex)[1] : input.match(inputRegex)[0]; 
    
    result = (result.toLowerCase() === 'l') ? 'L' : result.toLowerCase();
    
    let validUnits = ['gal','L','mi','km','lbs','kg'];
    
    return (validUnits.includes(result)) ? result : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()){
      case 'gal' :
        result = 'L';
        break;
      case 'l' :
        result = 'gal';
        break;
      case 'lbs' :
        result = 'kg';
        break;
      case 'kg' :
        result = 'lbs';
        break;
      case 'mi' :
        result = 'km';
        break;
      case 'km' :
        result = 'mi';
      break;
    }    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'gal' :
        result = 'gallons';
        break;
      case 'L' :
        result = 'litres';
        break;
      case 'lbs' :
        result = 'pounds';
        break;
      case 'kg' :
        result = 'kilograms';
        break;
      case 'mi' :
        result = 'miles';
        break;
      case 'km' :
        result = 'kilometers';
      break;
    }    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit){
      case 'gal' :
        result = (initNum * galToL).toFixed(5);
        break;
      case 'L' :
        result = (initNum / galToL).toFixed(5);
        break;
      case 'lbs' :
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case 'kg' :
        result = (initNum / lbsToKg).toFixed(5);
        break;
      case 'mi' :
        result = (initNum * miToKm).toFixed(5);
        break;
      case 'km' :
        result = (initNum / miToKm).toFixed(5);
        break;
    }
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
