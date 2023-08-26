var viewFileTable;
var attachment = [];
var fileNametext = [];

$(document).ready(function() {
	document.getElementById('drawing_viewFiles').addEventListener('click', Rcfa.displayDrawingFiles);
//	document.getElementById('descrpt_viewFiles').addEventListener('click', Rcfa.displayDscrptFiles);
//	document.getElementById('drawing_viewFiles').addEventListener('click', Rcfa.displayFiles);
	document.getElementById('createPDF').addEventListener('click', Rcfa.createPDF);
	const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
	closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
 	$('#fileContainer').html("");
});
	$('#processingModal').modal({
		keyboard: false, //Block escape from hiding modal
		show: false, //Do not show modal in this call
		backdrop: 'static' //Do not hide modal when user clicks screen
	})
	
	$('#drawing_viewFiles').modal({
		keyboard: false, //Block escape from hiding modal
		show: false, //Do not show modal in this call
		backdrop: 'static' //Do not hide modal when user clicks screen
	})

	rcfaFileTable = $('#viewFileTable').DataTable(
		{
			paging : false,
			pageLength: 5,
			info: false,arguments,
			searching:false,
			sorting: false,
			language : {
				url : "/getDatatableLanguage"
			},
			order : [ [ 0 , "asc" ]],
			columnDefs : [
				{
					targets:0 , className: "text-center",orderable:false,
					data : "serialNum"  
				},
				{
					targets :1, className:"text-center", orderable:false, data: "id",
					 render : function(data, type, row, meta) {
					 return '<i class="fa-solid fa-file-image fa-flip" onClick = "showFile('+data+')"/>';
					 } 
				},
				{
					targets:2 , className: "text-center",orderable:false,
					data : "fileName" 
				},
				{
					targets :3, className:"text-center", orderable:false, data: "id",
					 render : function(data, type, row, meta) {
					 return '<i class="fa-solid fa-trash fa-shake" onClick = "confirmDelete('+data+')"/>';
					 } 
				}
			]
			
		});
});

 function fillData(fileNametext){
	 rcfaFileTable.clear();
	 var table = [];
	 for(var j=0;j<fileNametext.length ; j++)
	 {
	 table.push ({
				fileName: fileNametext[j],
				id: j,
				serialNum: j+1
			});
		}
		console.log(table);
		rcfaFileTable.rows.add(table);
		rcfaFileTable.order([0,"asc"]);
		rcfaFileTable.draw();
 }
 function confirmDelete(data)
	{
		fileNametext.splice(data,1);
		attachment.splice(data,1);
		console.log(fileNametext);
		fillData(fileNametext);
	}
	function showFile(data)
	{
		var fileImg = '';
		fileImg = attachment[data];
		var fileImage = fileImg[0];
		console.log(fileImage);
		$('#myModal').show();
	const fileReader = new FileReader();
	  fileReader.onload = function () {
   		  const imageDataURL = fileReader.result;
    const imageElement = document.createElement("img");
    imageElement.src = imageDataURL;
     imageElement.classList.add("modal-image");
    fileContainer.appendChild(imageElement);
  };
		  if (fileImage) {
    // Read the file as a data URL
    fileReader.readAsDataURL(fileImage);
  	}
}

Rcfa = function() {
	
	this.displayDrawingFiles = function() {
 		 var fileString = document.getElementById('drawing').value;
 		 var file = $('#drawing_file').prop('files');
 		 attachment.push(file);
 		 fileNametext.push(fileString);
 		 document.getElementById('drawing').value ='';
		fillData(fileNametext);	
	}
//	this.displayDscrptFiles = function() {
		
//	}

	this.createPDF = function() {
		
		var formData = new FormData();
		
		formData.append('failureincidentNm' ,document.getElementById('incident').value.trim());
		formData.append('failureDescription' , document.getElementById('fail_Desc').value.trim());
		formData.append('dept' , document.getElementById('dept').value.trim());
		formData.append('dtTime' , document.getElementById('Test_DatetimeLocal').value.trim());
		formData.append('umcPO' , document.getElementById('UmcPo').value.trim());
		formData.append('criticalTagged' , document.getElementById('critical').value.trim());
		formData.append('failureAnalysis' , document.getElementById('failAnalysis').value.trim());
		formData.append('rootCause' , document.getElementById('rootCause').value.trim());
		formData.append('bggGG' , document.getElementById('bgg').value.trim());
		formData.append('makeVendor' , document.getElementById('vendor').value.trim());
		formData.append('discussedWith' , document.getElementById('discussed').value.trim());
		
		var xhr =new XMLHttpRequest();
		xhr.open('POST', '/rcfa/submitFile' , true);
		xhr.onload = function () {
			var result = JSON.parse(xhr.response);
			if(result.errorMessages)
			{
				console.log(result.errorMessages);
			}
			else {
				console.log(result);
			}
			
		};
		xhr.send(formData);
		return false;	
	}
}

var Rcfa = new Rcfa();