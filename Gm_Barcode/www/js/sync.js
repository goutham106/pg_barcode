function syncdata() {
	
	
		  document.querySelector("#idvalue1").innerHTML ='';
		  document.querySelector("#namevalue1").innerHTML ='';
		   document.querySelector("#sql-result1").innerHTML ='';
		  myDB.transaction(function (tx) {
   tx.executeSql('SELECT * FROM Barcode_Table', [], function (tx, results) {
   var len = results.rows.length, i;
   msg = "<p>Found rows: " + len + "</p>";
 document.querySelector('#sql-result1').innerHTML +=  msg;
 
   for (i = 0; i < len; i++){
    //  alert(results.rows.item(i).log );
	var tdc=results.rows.item(i).content;
	var tty=results.rows.item(i).type;
	//var tty=results.rows.item(i).type;

//test

document.querySelector('#idvalue1').innerHTML += tdc +"</br>" ;
document.querySelector('#namevalue1').innerHTML += tty+"</br>";

//test

	  console.log(results.rows.item(i).log +"ada"+ tdc);
	//  alert(tty +"tty updated");
	//  setvalue(tdc,tty);
	  
   }
   
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
                        console.log("Error occurred while getting the data.");
                  });
	});
	

}

/*function setvalue(dc,ty){	

	var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("POST","xyz.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("decode="+dc);
		
}
*/