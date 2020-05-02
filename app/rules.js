const getRules = () =>{  
return [
{
  
     name: 'life', 
     rules: [ 
        {
         name   : 'economic',
         rule   : '(obj.life <= 0)'
        },
        {
          name  :  'regular',
          rule  :  '(obj.life >= 1 && obj.life <= 2)'
        },
        { 
          name  : 'responsible',
          rule  : '(obj.life >= 3)'
        }
    ]
},
{
     name: 'disability', 
     rules: [ 
        {
         name   : 'economic',
         rule   : '(obj.disability <= 0)'
        },
        {
          name  :  'regular',
          rule  :  '(obj.disability >= 1 && obj.disability <= 2)'
        },
        { 
          name  : 'responsible',
          rule  : '(obj.disability >= 3)'
        }
    ]  
},
{
  name: 'home', 
  rules: [ 
     {
      name   : 'economic',
      rule   : '(obj.home <= 0)'
     },
     {
       name  :  'regular',
       rule  :  '(obj.home >= 1 && obj.home <= 2)'
     },
     { 
       name  : 'responsible',
       rule  : '(obj.home >= 3)'
     }
 ]  
},
{
     name: 'auto', 
     rules: [ 
        {
         name   : 'economic',
         rule   : '(obj.auto <= 0)'
        },
        {
          name  :  'regular',
          rule  :  '(obj.auto >= 1 && obj.auto <= 2)'
        },
        { 
          name  : 'responsible',
          rule  : '(obj.auto >= 3)'
        }
    ]  
 }
];
}

  
exports.getRules = getRules;