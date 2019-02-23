module.exports = {
    getAll: function (user,wit) {
// simple id else to catch different types of keywords


// TODO: Fix promise order here
      if (wit.getall!= undefined) {
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('/home/ec2-user/chatbotdude.db', (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the SQlite database.');
        });
        
        console.log("SELECT * FROM TODO WHERE user ='"+user+"'");
        db.all("SELECT * FROM TODO WHERE user ='"+user+"'" , function(err, row) {
          console.log(row);
          alltask = '';
          Object.keys(row).forEach(function(key) {
            console.log(row[key])
            alltask = alltask + "For class " + row[key].class + " you have " + row[key].item +" before " + row[key].due + " "
          })
          
          console.log(alltask)
          
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            
          });
          return 'I will get your task' + alltask;
        });
        
      } else {
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
      }
      
    },
    bar: function () {
      // whatever
    },

    insertTODO: function(){
      // INSERT INTO TODO VALUES (null,'pa','242','hw','22/07/94');
    }
  };
  