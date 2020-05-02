Constants = require('../rules');

/**
 * If the user doesn’t have income, vehicles or houses, he/she is ineligible for disability, auto, and home insurance, respectively.
 * @param {Number} income : income of the user
 * @param {Number} vehicle : vehicle will be 0 if user don't have vehicle otherwise object with one property year
 * @param {Number} house : house will be 0 if user don't have house otherwise object with one property ownership_status
 * @param {Number} baseScore : baseScore is the sum of risk_questions
 * @return {Object} scores of each line of insurance
 */
const checkAssetsAvailability = (income, vehicle, house, baseScore) => {
  return ({
    disability: income == 0? 'ineligible': baseScore,
    auto: vehicle == 0? 'ineligible': baseScore,
    home: house == 0? 'ineligible': baseScore,
    life: baseScore
  })
}
/**
 * If the user is over 60 years old, he/she is ineligible for disability and life insurance
 * If the user is under 30 years old, deduct 2 risk points from all lines of insurance. 
 * If she is between 30 and 40 years old, deduct 1.
 * @param {Array} planFeatures : income of the user
 * @param {Number} riskPoints : risk points 
 * @return {Object} scores of each line of insurance 
 */
const doCheckAgeFactor = (planFeatures, riskPoints, obj) =>{
 planFeatures.map((attr)=>{
     if(
        typeof obj[attr] != 'undefined' &&
        obj[attr] != 'ineligible'
       )
      {
          obj[attr] -= riskPoints
          return obj;
      }
    }    
 );
}
/**
 * If the user is over 60 years old, he/she is ineligible for disability and life insurance
 * If the user is under 30 years old, deduct 2 risk points from all lines of insurance. 
 * If she is between 30 and 40 years old, deduct 1.
 * @param {Number} age : age of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkAgeFactor = (age, obj) => {
  let tempObj = {};
  if (age > 60) {
    tempObj = {
      disability: 'ineligible',
      life: 'ineligible'
    }
    obj = {...obj, ...tempObj}
  }

  switch(true){
       case (age < 30):
        doCheckAgeFactor(['life','disability','home','auto'], 2, obj);
       break;
       
       case  (age >= 30 && age <= 40):
        doCheckAgeFactor(['life','disability','home','auto'], 1, obj);
       break;
  }
  
  return obj;
}

/**
 * If her income is above $200k, deduct 1 risk point from all lines of insurance.
 * @param {Number} income : income of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkIncomeFactor = (income, obj) => {
  if (income > 200000) {
     check(['life','disability','home','auto'], 1, obj);
  }
  return obj;
}

/**
 * If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
 * @param {Number} house : house of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkHouseMortgagedFactor = (house, obj) => {
  if (house && house.ownership_status == 'mortgaged') {
    if (obj.disability != 'ineligible') {
      obj.disability += 1;
    }
    if (obj.home != 'ineligible') {
      obj.home += 1;
    }
  }
  return obj;
}

/**
 * If the user has dependents, add 1 risk point to both the disability and life scores.
 * @param {Number} dependents : dependents of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkDependentFactor = (dependents, obj) => {
  if (dependents) {
    if (obj.disability != 'ineligible') {
      obj.disability += 1;
    }
    if (obj.life != 'ineligible') {
      obj.life += 1;
    }
  }
  return obj;
}

/**
 * If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
 * @param {Number} martial : martial status of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkMartialFactor = (martial, obj) => {
  if (martial == 'married') {
    if (obj.life != 'ineligible') {
      obj.life += 1;
    }
    if (obj.disability != 'ineligible') {
      obj.disability -= 1;
    }
  }
  return obj;
}

/**
 * If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.
 * @param {Number} vehicle : vehicle status of the user
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} scores of each line of insurance
 */
const checkVehicleFactor = (vehicle, obj) => {
  if (vehicle && ((new Date().getFullYear()) - vehicle.year) <= 5 ) {
    if (obj.auto != 'ineligible') {
      obj.auto += 1;
    }
  }
  return obj;
}

/**
 * Apply dinamically rules about risck risk algorithm 
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} ruleArray - Static Array with rules to apply
 */
const applyRules = (obj, a) =>
{
   for (i in a )
    {
          if (obj[a[i]['name']]!= 'ineligible') {
             for(r in a[i]['rules'])
             {
                 if (eval(a[i]['rules'][r]['rule']))
                 {
                   obj[a[i]['name']] = a[i]['rules'][r]['name'];
                 }
             }
         } 
    }

   return obj;
}

/**
 * Mapping each line of insurance to eligible insurance plans basis of score.
 * @param {Object} obj : obj is set of current score for each line of insurance.
 * @return {Object} plans for each line of insurance
 */
const mapToInsurancePlans = (obj) => {
     return applyRules(obj, Constants.getRules());
}

/**
 * Calculate the Risk factor and assign the applicable Insurance scheme.
 * @param request
 * @param response
 */
exports.calRisk = async (req, res) => {

  let baseScore = req.body.risk_questions.reduce((a, b) => a + b, 0); // Sum of base scores
  let obj = await checkAssetsAvailability(req.body.income, req.body.vehicle, req.body.house, baseScore);
  obj = await checkAgeFactor(req.body.age, obj);
  obj = await checkIncomeFactor(req.body.income, obj);
  obj = await checkHouseMortgagedFactor(req.body.house, obj);
  obj = await checkDependentFactor(req.body.dependents, obj);
  obj = await checkMartialFactor(req.body.marital_status, obj);
  obj = await checkVehicleFactor(req.body.vehicle, obj);
  obj = await mapToInsurancePlans(obj);
  
  return res.send(obj);
}
