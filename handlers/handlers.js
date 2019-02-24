const async = require('async');

module.exports.getAll = function (user,wit) {
// simple if else to catch different types of keywords
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('/home/ec2-user/chatbotdude.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the SQlite database.');
  });
  db.each("SELECT * FROM TODO", function(err, row) {
    console.log(row.id + ": " + row.user);
  });
  db.run("INSERT INTO TODO VALUES (null,'"+user+"','"+wit.class[0].value+"','"+wit.assignment[0].value+"','"+wit.datetime[0].value+"');'");
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  return "Okie, your task had been added.";
  
  
};


module.exports.readFromDB = async function (user,wit) {
  return new Promise(function(resolve, reject) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('/home/ec2-user/chatbotdude.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });
    
    // console.log("SELECT item, class, strftime('%Y-%m-%d %H:%M:%S', due) FROM TODO WHERE user ='"+user+"'");
    db.all("SELECT item, class, strftime('%Y-%m-%d %H:%M:%S', due) as due FROM TODO WHERE user ='"+user+"' and strftime('%Y-%m-%d %H:%M:%S', due) >= strftime('%Y-%m-%d %H:%M:%S',datetime('now'))" , function(err, row) {
      
      db.close();

      resolve(row);
      
      
    });
  }) 
  
}
  
  // insertTODO: function(){
  //   // INSERT INTO TODO VALUES (null,'pa','242','hw','22/07/94');
  // }