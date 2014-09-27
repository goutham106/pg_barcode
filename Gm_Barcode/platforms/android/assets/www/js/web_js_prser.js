
function testclick1(){
	
	 var self = this;
	// var urll="http://192.168.0.202/arnwebservice/getallcontact.php";
var urll="http://www.gouthamwebservice.96.lt/anr/getallcontact.php";
        var XHR = new window.XMLHttpRequest(),
              // data = JSON.stringify(dataToSync);
			   data = [];
        XHR.overrideMimeType = 'application/json;charset=UTF-8';
        XHR.open("GET", urll, true);
		
        XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
        XHR.onreadystatechange = function () {
            var serverAnswer;
            if(4 === XHR.readyState) {
                try {
                    serverAnswer = JSON.parse(XHR.responseText);
                } catch(e) {
                    serverAnswer = XHR.responseText;
                }
                self.log('Server answered: ');
                self.log(serverAnswer);
                //I want only json/object as response
                if(XHR.status == 200 && serverAnswer instanceof Object) {
                    callBack(serverAnswer);
                } else {
                    serverAnswer = {
                        result : 'ERROR',
                        status : XHR.status,
                        message : XHR.statusText
                    };
                    callBack(serverAnswer);
                }
            }
        };

        XHR.send(data);

	
	
	
	}


function testclick(){
	var API = "http://192.168.0.202/arnwebservice/getallcontact.php";
	//var API = "http://192.168.0.64/nTireLMSWCF/nTireLMSWCF/BLL/LeadManagement.svc?wsdl";
	//var API = "http://www.gouthamwebservice.96.lt/anr/getallcontact.php";
					
	$.ajax({
                      type: 'GET',         
					  url: API,         
					  crossDomain: true, 
					  contentType: "application/json; charset=utf-8",         
					         
					   dataType: "xml", 
					   success: function(val) { 
					   alert('test'); 
					   alert(val.contact.length);
					   alert(val.contact[0].decode);    
					   for(var i=0;i<val.contact.length;i++){
						    alert(val.contact[i].decode);   
					   }
					      //
//					       $('#test').html(val.contact[0].decode +' ' +       
//						         val.contact[1].type);        
								  },        
								   error: function(xhr, status, error) { 
								   alert('Error !!'); },    
								        async: false,       
										  cache: false   
										    });
	
	
	
}

function xmlpar(){
	
	
	$.ajax({
                  type: "GET",
                   url: "http://localhost:58474/ProductRESTService.svc/GetProductList/",
				    crossDomain: true, 
                   dataType: "xml",
				   contentType: "application/xml; charset=utf-8",         
					         
                   success: function (xml) {
$(xml).find('Product').each(function () {
var id = $(this).find('ProductId').text();
var name = $(this).find('Name').text();
var price = $(this).find('Price').text();
varcategory = $(this).find('CategoryName').text();
                         $('<tr><td>' + id + '</td><td>' + name + '</td><td>' + price + '</td><td>' + category + '</td>').appendTo('#products');
});
},
                   error: function (xhr) {
alert(xhr.responseText);
}
});
	
	
	
	}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}


function syncdb()
{
//	check_network();	
	if(navigator.connection.type==0)
{
    alert('This application requires internet. Please connect to the internet.');
console.log('OFFLINE ');
}
else if(navigator.connection.type=='none')
{
    alert('This application requires internet. Please connect to the internet.');
	console.log('OFFLINE ');
}
else
{		
    //Hurray I'm online

	console.log('ONLINE (-_-)');
var txt="";
 myDB.transaction(function (tx) {
   tx.executeSql('SELECT * FROM Barcode_Table order by timestamp DESC', [], function (tx, results) {
   var len = results.rows.length, i;
  // msg = "<p>Found rows: " + len + "</p>";
 //document.querySelector('#sql-result1').innerHTML +=  msg;
 //alert(len);
   for (i = 0; i < len; i++){
    //  alert(results.rows.item(i).log );
	var tdc=results.rows.item(i).content;
	var tty=results.rows.item(i).type;
	var tap=results.rows.item(i).timestamp;
//testclickupd(tdc,tty,tap);
txt+="|"+tdc+" :: "+tty+" :: "+tap+"|"+"</br>";
	  console.log(results.rows.item(i).log +"=="+ tdc);
	//  alert(tty +"tty updated");
	//  setvalue(tdc,tty);
	  
   }
   if(twe==0){
	   
   alert("Sync Successfully");
   syncdb1(txt);
   }else{alert("Connection Failed Retry");}
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
	// alert("Error occurred while getting the data.");
                        console.log("Error occurred while getting the data.");
						 alert("Connection Failed");
                  });
	});


 }  // else close

//internet check from else
	
}
var twe=0;

function testclickupd(tdc,tty,tap){
	var API = "http://192.168.0.204/arnwebservice/addcontact.php";
	//var API = "http://www.gouthamwebservice.96.lt/anr/getallcontact.php";
	
$.ajax({
type: "POST",
url: API,
data:"decode="+tdc+"&type1="+tty+"&dattim="+tap,
dataType:"json",
cache: false,
success: function(result){
//alert(message);
//$("#123").html("adasdas");
//document.getElementById('123');
console.log(result.success+"::"+result.message);
if(result.success==1){
	UpdateData(tdc);
	}
//twe=0;
},
error: function(){
	//alert('fail');
	console.log('error on fetching');
	twe=1;
	}
});
	
	
	
}







function connect(e)
{
var term= {button:e};
$.ajax({
//url:'http://www.indiageeks.in/tutorials/reply.php',
url:'http://localhost/arnwebservice/reply.php',
type:'POST',
data:term,
dataType:'json',
error:function(jqXHR,text_status,strError){
alert("no connection");
},
timeout:60000,
success:function(data){
$("#result").html("");
for(var i in data){
$("#result").append("<li>"+data[i]+"</li>");
}
}
});}


 function LoginButton_onclick() {
				var API = "http://192.168.0.202/arnwebservice/getallcontact.php";
			//	var API = "http://www.gouthamwebservice.96.lt/anr/getallcontact.php";
				
		//		check(API);
				
				
                $.ajax({
                      type: 'GET',         
					  url: API,         
					  crossDomain: true,         
					  contentType: "application/json; charset=utf-8",         
					//  data: {decode : avdnavshgd},        
					   dataType: "json", 
					  /* success: function(val) { 
					   alert('test');        
					       $('#test').html(val.contact[0].decode +' ' +       
						         val.contact[0].type);        
								  },        
								   error: function(xhr, status, error) { 
								   alert('Error !!'); },    
								        async: false,       
										  cache: false   
										    }); */
					   
					   success: function(msg) {
                       jsonArray = $.parseJSON(msg.d);
					   
                       var $ul = $( '<ul id="details">' );
                       for(i=0; i < jsonArray.length; i++)
                       {
                       $("#details").append('<li id="'+i+'" name="head" >'+jsonArray[i].name+'</li>' );
                       }
                       $('#details').listview('refresh');
                       },
                       error: function(msg) {
                       alert("Error");
                       }
                       });
					   

            }
function check(API) {
    alert("entered Check");
    var http_request = new XMLHttpRequest();
    alert(http_request);
	http_request.open("GET", API, true);
	
	http_request.onreadystatechange = function() {
  if (http_request.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
alert(http_request.responseText);
   // document.getElementById("resp").innerText = http_request.responseText;
  }
 // alert(http_request.responseText);
}
	
	
    http_request.send();
	
    var my_JSON_object = http_request.responseText;
    alert(my_JSON_object);
	alert(JSON.parse(my_JSON_object));
    var data = JSON.parse(my_JSON_object);
    var Itemlist = [];
    for (var i = 0; i < Status.length; i++) {
        Itemlist[i] = data.Status.Itemlist[0].id;
        alert(id);
        Itemlist[i] = data.Status.Itemlist[0].Name;
        alert(Name);
        Itemlist[i] = data.Status.Itemlist[0].image;
        alert(image);
    }
    alert("id");
}

function check1(API) {
    alert('entered');
    var http_request = new XMLHttpRequest();
    alert(http_request);
	
    http_request.open("GET", API, true);
    http_request.send(null);
    var my_JSON_object = http_request.responseText;
    alert(my_JSON_object);
    var data = JSON.parse(my_JSON_object);
    alert(data.success);
    if(data.success==true){
    //alert(data.Regions.Region.length);
    var html = ""; 
   
        var _length=data.Regions.Region.length;    
        for(var i=0; i<_length;i++){
            var _resort=data.Regions.Region[i];
            var totalResorts=_resort.count;
            var _resionDic={
            name:_resort.name,
            count:totalResorts
            }
            html += '<li>  <a href="#" ></a>'+_resort.name+'</li>'        
           for(var j=0; j<totalResorts;j++){
                //alert(_resort.Resorts[j].resort_name);
               
               var _resortDic={
               id:_resort.Resorts[j].id,
               name:_resort.Resorts[j].resort_name,
               country:_resort.Resorts[j].country,
               longitude:_resort.Resorts[j].longitude,   
               latitude:_resort.Resorts[j].latitude
               }
               
                _resionDic["Resort"+i]=_resortDic;
                
                
            }
            Resionlist.push(_resionDic);
        };
        var arr=Resionlist[0];
        var m=0;
        alert(arr["Resort"+m].name);
        $("#Region").html(html);
        $("#Region").listview('refresh');
  
    }
}


///   File Test Start

function syncdb1(txt){


 
	// Cordova is ready
    //
    //function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    //}

    function gotFS(fileSystem) {
        fileSystem.root.getFile("ARN.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
		alert(txt);
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text Before 11'");
			
          //  writer.truncate(11);  
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample After 11 then 4'");
             //   writer.seek(4);
                writer.write("Write Content"+txt);
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("File 1"+txt);
    }

    function fail(error) {
        console.log(error.code);
    }



}
///  File Test End