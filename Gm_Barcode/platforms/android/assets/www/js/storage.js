	
var databaseName =  "BCDB";
var databaseVersion = "1.0";
var databaseDisplayName = "BCDatabase";
var databaseSize =  2 * 1024 * 1024;
var myDB = "";
 
//Accessing with HTML5 local database
myDB = window.openDatabase(databaseName, databaseVersion , databaseDisplayName, databaseSize);

//Using SQLite plugin
//myDB = window.sqlitePlugin.openDatabase({name : databaseName});

// table creation   IF NOT EXISTS

function CreateTable() {
            myDB.transaction(function(transaction) {
			//	transaction.executeSql('DROP TABLE Barcode_Table',[],
               transaction.executeSql('CREATE ' +
                           'TABLE IF NOT EXISTS ' +
                      'Barcode_Table (id integer primary key, content text, type text, timestamp text ,log text)', [],
                    function(tx, result) {
                        console.log("ANR table created successfully.");
                    }, 
                    function(error) {
                          console.log("Error occurred while creating the table.");
                    });
                });
}
// tble creation close

// insert start
function InsertData(){
/*	if(document.getElementById('Decode').value== "" || (document.getElementById('Type').value== "")) {
		if(document.getElementById('Decode').value== ""){
			//alert('Enter Decode');
		document.getElementById('Decode').style.border='2px solid red';
		
		}else{
			document.getElementById('Decode').style.border='px solid white';
		}
		if(document.getElementById('Type').value== ""){
		//	alert('Enter Type');
		document.getElementById('Type').style.border='2px solid red';
		}else{
			document.getElementById('Type').style.border='1px solid white';
		}
	}  */
 	if(document.getElementById('Decode').value== "" ) {
		if(document.getElementById('Decode').value== ""){
			//alert('Enter Decode');
		document.getElementById('Decode').style.border='2px solid red';
		
		}else{
			document.getElementById('Decode').style.border='px solid pink';
		}
		
	}
	
	
	else{
			
	document.getElementById('Decode').style.border='1px solid pink';
//	document.getElementById('Type').style.border='1px solid white';
        myDB.transaction(function(transaction) {
            // Define insert query
            var executeQuery = "INSERT INTO " +
                                "Barcode_Table" + 
                                "(content, type, timestamp, log) "+
                                "VALUES(?,?,?,?)";
         //   Helper.log(executeQuery);      
			
			var dc=document.getElementById('Decode').value;	
	var ty=document.getElementById('Type').value;  
	if(ty==''){ty='manual'} 
	     var dat=new Date();
	var dtt=dat.toLocaleDateString("en-GB")+"-"+ dat.toLocaleTimeString("en-GB");
	var lg='0';
            transaction.executeSql(executeQuery, [dc, ty, dtt, lg]
                , function(tx, result) {   // On success
                     console.log('ARN data inserted successfully.');
					 alert("inserted");
                },
                function(error){     // On error                               
                     console.log('Error occurred while inserting business data.'); 
                });
        });
		}
}

// insert close


function timestamp()
{
	var d=new Date();
	var dt=d.toLocaleDateString("en-GB")+"-"+ d.toLocaleTimeString("en-GB");
/*console.log(d.getTime());
console.log(d.toTimeString());
console.log(d.getDate());
console.log(d.getMonth());
console.log(d.getYear());*/
console.log(dt);
}

function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}





//reat start
function GetData() {
	
		  document.querySelector("#idvalue").innerHTML ='';
		  document.querySelector("#namevalue").innerHTML ='';
		   document.querySelector("#namevaluetime").innerHTML ='';   ///    work Pending
		  document.querySelector("#sql-result").innerHTML ='';
		  myDB.transaction(function (tx) {
   tx.executeSql('SELECT * FROM Barcode_Table GROUP BY timestamp', [], function (tx, results) {
   var len = results.rows.length, i;
   msg = "<p>Found rows: " + len + "</p>";
   document.querySelector('#sql-result').innerHTML +=  msg;
 // alert(len);
   for (i = 0; i < len; i++){
   
	var tdc=results.rows.item(i).content;
	var tty=results.rows.item(i).type;
	var tty1=results.rows.item(i).timestamp;

document.querySelector('#idvalue').innerHTML += tdc +"</br>" ;
document.querySelector('#namevalue').innerHTML += tty+"</br>";
document.querySelector('#namevaluetime').innerHTML += tty1+"</br>";

	  console.log(results.rows.item(i).log +"ada"+ tdc);
   }
   
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
                        console.log("Error occurred while getting the data.");
                  });
	});
		
          
		  
		  
}
//red close


function logg() {
	
		  document.querySelector("#pend").innerHTML ='';
		  document.querySelector("#reci").innerHTML ='';
		 // document.querySelector("#sql-result").innerHTML ='';
		  myDB.transaction(function (tx) {
   tx.executeSql('SELECT distinct content FROM Barcode_Table WHERE log=0', [], function (tx, results) {
   var len = results.rows.length, i;
  // msg = "<p>Found rows: " + len + "</p>";
 //  document.querySelector('#sql-result').innerHTML +=  msg;
 // alert(len);
   for (i = 0; i < len; i++){
   
	var tdc=results.rows.item(i).content;
//	var tty=results.rows.item(i).type;

document.querySelector('#pend').innerHTML += tdc +"</br>" ;
//document.querySelector('#namevalue').innerHTML += tty+"</br>";

	  console.log(results.rows.item(i).log +"ada"+ tdc);
   }
   
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
                        console.log("Error occurred while getting the data.");
                  });
	});
		
          
		  myDB.transaction(function (tx) {
   tx.executeSql('SELECT distinct content FROM Barcode_Table WHERE log=1', [], function (tx, results) {
   var len = results.rows.length, i;
  // msg = "<p>Found rows: " + len + "</p>";
 //  document.querySelector('#sql-result').innerHTML +=  msg;
 // alert(len);
   for (i = 0; i < len; i++){
   
	var tdc=results.rows.item(i).content;
//	var tty=results.rows.item(i).type;

document.querySelector('#reci').innerHTML += tdc +"</br>" ;
//document.querySelector('#namevalue').innerHTML += tty+"</br>";

	  console.log(results.rows.item(i).log +"ada"+ tdc);
   }
   
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
                        console.log("Error occurred while getting the data.");
                  });
	});
		
          
		  
		  
		  
}




//update start

function UpdateData(tdc){
    myDB.transaction(
                    function(transaction) {
                    // Define update query
                    var executeQuery = "UPDATE " +
                                       "Barcode_Table " +
                                       "SET log = ?  WHERE  content =?"; 
                    transaction.executeSql(executeQuery, ['1', tdc]
                        , function(tx, result) {   // On success
                             console.log(' updated successfully.');
                        },
                        function(error){     // On error                               
                            console.log('Error occurred while updating the table.'); 
                        });
           });
}

// update close

function DeleteBusinessTable(){
            myDB.transaction(
                function(transaction) {
                // Define delete query
                var executeQuery = "DELETE FROM Business_Table";
                transaction.executeSql(executeQuery, []
                    , function(tx, result) {   // On success
                         console.log('All business data deleted successfully.');
                    },
                    function(error){     // On error                               
                         console.log('Error occurred while deleting the business data.'); 
                    });
            });
}
 
function DropBusinessTable(){
            myDB.transaction(
                function(transaction) {
                // Define delete query
                var executeQuery = "DROP TABLE  IF EXISTS Business_Table";
                transaction.executeSql(executeQuery, []
                    , function(tx, result) {   // On success
                         console.log('Table deleted successfully.');
                    },
                    function(error){     // On error                               
                         console.log('Error occurred while droping the table.'); 
                    });
            });
}
