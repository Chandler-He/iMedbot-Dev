const BOT_IMG = "static/img/robot.svg";
const NURSE_IMG = "static/img/nurse.svg"
const PERSON_IMG = "static/img/woman.svg";
const BOT_NAME = "iMedBot";
PERSON_NAME = "You";
var input_question = JSON.parse(input_question)
var input_question10 = JSON.parse(input_question10)
var input_question5 = JSON.parse(input_question5)
train_model_year=5
predict_year=15
var input = []
const SURVEY = "It is my pleasure to help you. Please rate our service, thank you!"

//The patientParameter_dis is currently not used?
var patientParameter_dis = {"race": "race_dis",
    "ethnicity": "ethnicity_dis",
    "smoking": "smoking_dis",
    "alcohol_useage": "alcohol_useage_dis",
    "family_history": "family_history_dis",
    "age_at_diagnosis": "age_at_diagnosis_dis",
    "menopause_status": "menopause_status_dis",
    "side": "side_dis",
    "TNEG": "TNEG_dis"}

// get the element for html
// Icons made by Freepik from www.flaticon.com
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// const css ='<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">\n' +
//     '    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>\n' +
//     '    <script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>'

const css ='<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">\n' +
    '    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>\n' +
    '    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>'

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }
});


//currently we do not need this part, if in the future we need user input again, readd it
//msgerForm.addEventListener("submit", event => {

//  event.preventDefault();
//  const msgText = msgerInput.value;
//  if (!msgText) return;
//  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText,"no information",[]);
//  msgerInput.value = "";
//  botResponse(msgText);
//});



/**
 * @param {string} name if it is robot or user
 * @param {string} img the robot img or user img
 * @param {string} side location of dialogue right or left
 * @param {string} text the value of input
 */

function GoBackToLastMsg(){
    message=document.getElementsByClassName("msg");
    if (message.length>2){
    message[message.length-1].remove();
    }
    else{
    location.reload();
    }
    console.log(message[message.length-1]);
}

function getValue(event){
    console.log(event)
    var radio = document.getElementsByClassName('stars');
    //var text = document.getElementById("usersuggestion");
    //console.log("70",text);
    console.log("72",radio);


    console.log(radio.length());

    for (i=0; i<radio.length(); i++) {
        if (radio[i].checked==true) {
            alert(radio[i].id)
        }
    }
    //$.post("/submitsurvey", {
      //          radio:radio,
        //        text:text
          //  }).done(function (data) {
       //         console.log(data)
            //})
}
var alreaView = false
function gobacktoBrowse() {

    location.reload();
    text = "I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset, or I can train a model for you if you can provide your own dataset, so how do you want to proceed?Please make your choice by click one of the buttons below."
    appendMessage(BOT_NAME, NURSE_IMG, "left", text,"no information",{"Predict":"Predict","Model Training":"Model Training"})

}

function logout(){
    Swal.fire({
          confirmButtonText: 'Log out',
          confirmButtonColor: 'red',
          showCloseButton: true,
          focusConfirm: false
        }).then((result) => {

          $.post("/logout", {
            }).done(function (data) {
                document.getElementsByClassName('greeting')[0].remove()
                location.reload()
            })
        })
}

function login(){
    Swal.fire({
      title: 'Login Form',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Log in',
      confirmButtonColor: '#04AA6D',
      showCloseButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {

      $.post("/login", {
            username:result.value.login,
            password:result.value.password
        }).done(function (data) {
            console.log(data)
            if (data["status"]=="success"){
                Swal.fire('Log in successfully'.trim()).then((result) =>{
                    add_userMsg("Log in")
                    secMsg = "I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset,or I can train a model for you if you can provide your own dataset. Please make your choice by clicking a button below."
                    appendMessage(BOT_NAME, NURSE_IMG, "left", secMsg,"no information", {"Predict":"Predict","Model Training":"Model Training"});

                    const div = document.createElement('div');

                      div.className = 'greeting';

                      div.innerHTML = `
                        <h> Hi, <a href="#" onclick="logout()">${data["username"]}</a></h>
                      `;

                      document.getElementsByClassName('msger-header')[0].appendChild(div);
                })
            }
            else{
                if (data["fail type"]=="no username"){
                    Swal.fire(`The username does not exist, please sign up first`.trim()).then((result)=>{
                        login()
                    })
                }
                if (data["fail type"]=="wrong password"){
                    Swal.fire(`Your password does not match your usename, please input the right password`.trim()).then((result)=>{
                        login()
                    })
                }
            }
        })
    })

}

function checkPassword(password){
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if(!password.match(lowerCaseLetters)){
        return 1
    }
    if(!password.match(upperCaseLetters)){
        return 2
    }
    if(!password.match(numbers)){
        return 3
    }
    if (password.length<8)
    {
        return 4
    }
}

function showpassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

  var y = document.getElementById("confirmpassword");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
}

function signup(){
Swal.fire({
      title: 'Sign Up Form',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">
      <input type="password" id="confirmpassword" class="swal2-input" placeholder="Confirm Password">
      <br>
      <input type="checkbox" onclick="showpassword()">Show Password`,
      confirmButtonText: 'Sign up',
      confirmButtonColor: '#04AA6D',
      showCloseButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        const confirm_password = Swal.getPopup().querySelector('#confirmpassword').value
        if (!login || !password || !confirm_password) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        if (password!=confirm_password){
            Swal.showValidationMessage(`Please enter the same password`)
        }
        password_type=checkPassword(password)

        if (password_type==1){
            Swal.showValidationMessage(`Password must contain a lowercase letter`)
        }
        if (password_type==2){
            Swal.showValidationMessage(`Password must contain an uppercase letter`)
        }
        if (password_type==3){
            Swal.showValidationMessage(`Password must contain a number`)
        }
        if (password_type==4){
            Swal.showValidationMessage(`Password must contain minimum 8 characters`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      $.post("/signup", {
            username:result.value.login,
            password:result.value.password
        }).done(function (data) {
            console.log(data)
            if (data=="success"){
                Swal.fire('Sign up successfully'.trim()).then((result) =>{
                   login()
                })
            }
            else{
                Swal.fire(`Sorry, the username is already registered by others`.trim()).then((result)=>{
                    signup()
                })
            }
        })
    })
}
function uploadData(e) {
   // add_userMsg("Upload Local Dataset")
   Swal.fire({
                  title: 'Instructions for dataset',
                  html: '<ul className="list-group list-group-flush" style="text-align:justify;padding-left: 25px;">'+
                        '<li className="list-group-item">The size of dataset file should be in 20kb-500kb;</li>'+
                        '<li className="list-group-item">The dataset must be in .csv or .txt format;</li>'+
                        '<li className="list-group-item">The labels of the columns must be in the first row;</li>'+
                        '<li className="list-group-item">Can only use categorical data for now;</li>'+
                        '<li className="list-group-item">The last column will be considered as the target feature by default. </li>'+
                        '</ul>',
                  icon: 'info',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                    cancelButtonText: 'No, cancel!',
                  confirmButtonText: 'Yes, I confirm!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log($('#fileid'))
                    $('#fileid').val("");
                    document.getElementById('fileid').click();
                    console.log(alreaView)
                    if (alreaView == false){

                        document.getElementById("fileid").onchange = function() {
                        submit();

                        };
                        var dataset = $('#fileid').prop('files')[0];
                        console.log(dataset)
                  //  appendMessage(BOT_NAME, NURSE_IMG, "left", "Please check the dataset you uploaded and it will give your some basic stats","View your dataset",{"View your dataset":"View your dataset"})
                    alreaView = true
                    }
                  }
                })




}




function runModelExampleDateset(e){
    add_userMsg("Run Model with Example Dataset")
    appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use our default parameter setting to train the example dataset","Train Model",{"Yes": "Yes","No,I don't":"No,I don't"})
}

function uploadNewData(e) {
    Swal.fire({
                  title: 'Instructions for dataset',
                  html: '<ul className="list-group list-group-flush" style="text-align:justify;padding-left: 25px;">'+
                        '<li className="list-group-item">The size of dataset file should be in 20kb-500kb;</li>'+
                        '<li className="list-group-item">The dataset must be in .csv or .txt format;</li>'+
                        '<li className="list-group-item">The labels of the columns must be in the first row;</li>'+
                        '<li className="list-group-item">Can only use categorical data for now;</li>'+
                        '<li className="list-group-item">The last column will be considered as the target feature by default. </li>'+
                        '</ul>',
                  icon: 'info',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                    cancelButtonText: 'No, cancel!',
                  confirmButtonText: 'Yes, I confirm!'
                }).then((result) => {
                  if (result.isConfirmed) {
                        alreaView=false;
                    $('#fileid').val("");
                    //add_userMsg("Open new dataset")
                    document.getElementById('fileid').click();
                    console.log(document.getElementById("fileid"))
                    if (alreaView == false){
                        document.getElementById("fileid").onchange = function() {
                            submit();
                        };

                        //appendMessage(BOT_NAME, NURSE_IMG, "left", "Please check the dataset you uploaded and it will give your some basic stats","View your dataset",{"View your dataset":"View your dataset"})
                    console.log(4)
                    alreaView = true
                    }
                    }
                })
}

function csvToArray(dataset, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
    var headers = dataset.slice(0, dataset.indexOf("\n")).split("\t").join(",").split(delimiter)
    console.log(headers)
    if (headers.includes('0')||headers.includes('1')||headers.includes('2')||headers.includes('3')||headers.includes('4')||headers.includes('5')||headers.includes('6')||headers.includes('7')||headers.includes('8')||headers.includes('9'))
    {
        for (var i=0;i<headers.length;++i)
            headers[i]="column "+i

    }
    console.log(headers)
  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  var rows = dataset.slice(dataset.indexOf("\n") + 1).split("\t").join(",").split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
function viewDataset(dataset,name,size){
    // var statisticalData = "Your dataset name is <b>"+ name +"</b> ; dataset size is <b>"+ size/1000 +"</b> kb; dataset format is<b> "+name.slice(-3)+"</b>"
    // appendMessage(BOT_NAME, NURSE_IMG, "left", statisticalData,"statistical data of dataset",[])


    var showTable = document.getElementById('showdataset');
    var hidden_div = document.getElementById("hidden_div")
    var hidden_table = document.getElementById("hidden_table")
    var tableHTML = '<thead class="thead-dark"><tr>'
    // if (name.slice(-3) == 'txt'){
    //     var array = csvToArray(dataset, delimiter = " ")
    //     var tablehead = Object.keys(array[0]);
    // }else{
        var array = csvToArray(dataset, delimiter = ",")
        array_length=array.length
        if (array.length>500){

        array=array.slice(0,499)
        }
        var tablehead = Object.keys(array[0]);
        var targetValue = String((tablehead[tablehead.length-1]).replace(/(?:\r\n|\r|\n)/g,""))
        // if (targetValue != "distant_recurrence"){
        //     alert("The target feature of the table you uploaded is not distant_recurrence, please review the demo and submit it again")
        //     location.reload();
        //     return
        // }

    //}
    var statisticalData = "Your dataset name is <b>"+ name +"</b>; number of rows of your dataset is <b>"+ array_length +"</b>; number of columns of your dataset is <b>"+ tablehead.length +"</b>; the name of target class of your dataset is <b>"+tablehead[tablehead.length-1]+"</b>; the size of your dataset file is <b>"+ size/1000 +"</b> kb; dataset format is<b> "+name.slice(-3)+"</b>"
    appendMessage(BOT_NAME, NURSE_IMG, "left", statisticalData,"statistical data of dataset",[])

  //  if (array.length < 30){
    //    alert ("The number of rows of your dataset is less than 30, please resubmit it ")
      //  location.reload();
        //return
    //}

    for(var  i= 0; i< tablehead.length; i++) {
        tableHTML+= '<th>' + tablehead[i] + '</th>'
    }
    tableHTML += '</tr></thead>'

    for(var row = 0; row< array.length; row++) {
       tableHTML+= '<tbody><tr>'
        value_list = Object.values(array[row])
            for(var col= 0; col< value_list.length; col++) {
                tableHTML+= '<td>' + value_list[col] + '</td>'
            }
       tableHTML+= '</tr></tbody>'
    }
    hidden_table.innerHTML = tableHTML
    // document.getElementById("hidden_div").style.display='inline'
    // document.getElementById("hidden_table").style.display='inline'
    var myWindow = window.open("", "MsgWindow", "width=500, height=500");
    // $(newWindow).load(function(){
    //     $(newWindow.document).find('body').html($('#hidden_table').html());
    // });
    if (myWindow != null){

    myWindow.document.write(css + '<html><head><title>Table</title></head><body>');
    myWindow.document.write('<table  class="table">')
    myWindow.document.write(tableHTML)
    myWindow.document.write('</table>')
    myWindow.document.write('</body></html>');
    showTable.style = "display:inline"
    // console.log(tableHTML)
    }
    appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use our default parameter setting to train  your dataset","Train Model",{"Yes":"Yes","No":"No"})
    var openWindow=function(event,tableHTML){
        var myWindow = window.open("", "MsgWindow", "width=500, height=500");
        myWindow.document.write(css + '<html><head><title>Table</title></head><body>');
        myWindow.document.write('<table  class="table">')
        myWindow.document.write(event)
        myWindow.document.write('</table>')
        myWindow.document.write('</body></html>');

    }
    showTable.addEventListener('click',openWindow.bind(event,tableHTML),false)
 }
function submit() {
    //showdataset.style = "display:inline"
    console.log("enter submit")
    var valid_file=true
    function read(callback) {

         dataset = $('#fileid').prop('files')[0];


        const name = dataset.name
        window.dataset_name = dataset.name
        const size = dataset.size
        if (name.slice(-3) != 'txt' && name.slice(-3) != 'csv'){
            alert ("Your file format is not 'txt' or 'csv', please correct your file format and reupload!  ")
            //location.reload();
            console.log(typeof dataset);
            dataset=undefined;
            $('#fileid').val("");
            valid_file=false;
            return
        }
        console.log(size)
        if (size>512000){
            alert ("The size of your dataset file is too large, please reupload a smaller one which size is less than 500KB!  ")

            delete dataset;
            dataset=undefined;
            console.log(dataset)

            $('#fileid').val("");
            valid_file=false;
            return
        }
        /*
        if (size<20480){
            alert ("The size of your dataset file is too small, please reupload a larger one which size is greater than 20KB!  ")
            delete dataset;
            dataset=undefined;
            console.log(dataset)

            $('#fileid').val("");
            valid_file=false;
            return
        }
        */

        var reader = new FileReader();
        reader.onload = function() {
            rawLog = reader.result
            var array = csvToArray(rawLog, delimiter = ",")
            var tablehead = Object.keys(array[0]);
            if (valid_file){
            add_userMsg("View my dataset");
            viewDataset(rawLog,name,size);
            }
            else
            {
                return;
            }
        }

        reader.readAsText(dataset);

        if (valid_file)
        add_userMsg("Upload local dataset");
    }
    var dataset = $('#fileid').prop('files')[0];
    if (dataset === undefined){
        alert("Please upload your dataset first!")
        // gobacktoBrowse()
    }else {
        read();
        if (valid_file==true){
        appendMessage(BOT_NAME, NURSE_IMG, "left", "Please view your dataset and some basic counts of your dataset will be shown.","View your dataset",{"View your dataset":"View your dataset"});
        }
    }
}

function getParameterExam(){
        console.log("enter getpara exam")
        add_userMsg("Get the parameter for example dataset")
//    document.getElementById('textInput').disabled = true;
//    document.getElementById('textInput').placeholder = "Training a model from your dataset now!";
        const name = 'Book1.csv'
        var learningrate = $("#parameterForm input[name=learningrate]").val()
        var decay = $("#parameterForm input[name=decay]").val()
        var batchsize= $("#parameterForm input[name=batchsize]").val()
        var dropoutrate = $("#parameterForm input[name=dropoutrate]").val()
        var epochs = $("#parameterForm input[name=epochs]").val()
        var momentum = $("#parameterForm input[name=momentum]").val()
        var l1 = $("#parameterForm input[name=l1]").val()
        var l2 = $("#parameterForm input[name=l2]").val()
        $.post("/parameterExam", {
            datasetname: name,
            learningrate: learningrate,
            decay: decay,
            batchsize: batchsize,
            dropoutrate: dropoutrate,
            epochs: epochs,
            momentum:momentum,
            l1:l1,
            l2:l2
        }).done(function (data) {
            console.log(data)
            if (data["auc"]=="error"){
                                    alert('Sorry! We have an error from the server : '+data["src"]+'. Please try a valid dataset.')
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Browse data",{"View Example Dataset":"View Example Dataset","Run Model with Example Dataset":"Run Model with Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
                                    return
                                    }
            auc=data["auc"]
            img_src=data["src"]
            appendMessage(BOT_NAME, NURSE_IMG, "left", "Please wait, we are training your model. ", "no information", [])
            appendMessage(BOT_NAME, NURSE_IMG, "left", "The validation AUC of your model is: " + auc, "no information", [])
            wait(20000);
            appendMessage(BOT_NAME, NURSE_IMG, "left", "The figure below is the ROC_curve resulted from validating your model.","no information",[],"",img_src)
            appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use your model to do prediction now? ", "Test Patient", {"Testing with new patients":"Testing with new patients","Retrain the model":"Retrain the model","Open new dataset":"Open new dataset","End task":"End task"})
 //           document.getElementById('textInput').disabled = true;
            //document.getElementById('textInput').placeholder = "Enter your message..."
        })
    }
function getParameter(){
//    document.getElementById('textInput').disabled = true;
//    document.getElementById('textInput').placeholder = "Training a model from your dataset now!";
    add_userMsg("Get the parameter")
    console.log("getParameter")
    function read_parameter(callback) {
        console.log("read_parameter")
        var dataset = $('#fileid').prop('files')[0];
        console.log(dataset)
        var name = dataset.name
        var learningrate = $("#parameterForm input[name=learningrate]").val()
        var decay = $("#parameterForm input[name=decay]").val()
        var batchsize= $("#parameterForm input[name=batchsize]").val()
        var dropoutrate = $("#parameterForm input[name=dropoutrate]").val()
        var epochs = $("#parameterForm input[name=epochs]").val()
        var momentum = $("#parameterForm input[name=momentum]").val()
        var l1 = $("#parameterForm input[name=l1]").val()
        var l2 = $("#parameterForm input[name=l2]").val()
        //var reader = new FileReader();
        //reader.onload = function() {
            //rawLog = reader.result
            //console.log(rawLog)
            $.post("/parameter", {
                dataset: rawLog,
                datasetname: name,
                learningrate: learningrate,
                decay: decay,
                batchsize: batchsize,
                dropoutrate: dropoutrate,
                epochs: epochs,
                momentum:momentum,
                l1:l1,
                l2:l2
            }).done(function (data) {
                console.log(data)
                if (data["auc"]=="error"){
                                    alert('Sorry! We have an error from the server : '+data["src"]+'. Please try a valid dataset.')
                                    $('#fileid').val("");
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Browse data",{"View Example Dataset":"View Example Dataset","Run Model with Example Dataset":"Run Model with Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
                                    return
                                    }
                auc=data["auc"]
                img_src=data["src"]
                appendMessage(BOT_NAME, NURSE_IMG, "left", "Please wait, we are training your model. ", "no information", [])
                appendMessage(BOT_NAME, NURSE_IMG, "left", "The validation AUC of your model is: " + auc, "no information", [])
                wait(20000);
                appendMessage(BOT_NAME, NURSE_IMG, "left", "The figure below is the ROC_curve resulted from validating your model.","no information",[],"",img_src)
                appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use your model to do predicton now? ", "Test Patient", {"Testing with new patients":"Testing with new patients","Retrain the model":"Retrain the model","Open new dataset":"Open new dataset","End task":"End task"})
                //document.getElementById('textInput').disabled = true;
                //document.getElementById('textInput').placeholder = "Enter your message..."
            })
        //}
    //reader.readAsText(dataset);
    }
   read_parameter()
}
var myWindow = null
function showDemo() {

    //add_userMsg("Example dataset")
    if (train_model_year==5){
    demoHtml =
    '<thead class="thead-dark"><tr><th>race</th><th>smoking</th><th>family_history</th><th>age_at_diagnosis</th><th>TNEG</th><th>ER</th><th>ER_percent</th><th>PR</th><th>PR_percent</th><th>P53</th><th>HER2</th><th>t_tnm_stage</th><th>n_tnm_stage</th><th>stage</th><th>lymph_node_positive</th><th>Histology</th><th>size</th><th>invasive_tumor_Location</th><th>DCIS_level</th><th>surgical_margins</th><th>distant_recurrence</th></tr></thead>'+
    '<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>'+
    '<tr><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>'+
    '<tr><td>0</td><td>0</td><td>2</td><td>2</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>2</td><td>2</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>2</td><td>0</td><td>0</td></tr>'+
    '<tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>2</td><td>1</td><td>0</td><td>0</td></tr>'+
    '<tr><td>0</td><td>0</td><td>2</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td><td>0</td><td>0</td><td>2</td><td>2</td><td>2</td><td>1</td><td>0</td><td>2</td><td>0</td><td>0</td><td>0</td></tr>'
    }

    requirements = '<h2>Instructions:</h2>'+
        '<ul className="list-group list-group-flush">'+
        '<li className="list-group-item">1.The size of dataset file should be in 20kb-500kb;</li>'+
        '<li className="list-group-item">2.The dataset must be in .csv or .txt format;</li>'+
        '<li className="list-group-item">3.The labels of the columns must be in the first row;</li>'+
        '<li className="list-group-item">4.Can only use categorical data for now;</li>'+
        '<li className="list-group-item">5.The last column will be considered as the target feature by default. </li>'+
    '</ul>'
    if ((myWindow == null) || (myWindow.closed)) {
        myWindow = window.open("", "MsgWindow", "width=500, height=500");

        myWindow.document.write(css + '<html><head><title>Table</title></head><body>');
        myWindow.document.write('<table class="table">')
        myWindow.document.write(requirements)
        myWindow.document.write(demoHtml)
        myWindow.document.write('</table>')

       // myWindow.document.write('<button id = "runDemo" type="button" class="btn btn-info " >Run Demo!</button>')
        //myWindow.document.write('<span id = "Validation_AUC" className = "badge badge-primary" style="display:none"  ><br />The Validation_AUC of demo dataset is 0.841</span>')
        myWindow.document.write('<script>' +
            'document.getElementById("runDemo").addEventListener("click",()=>{ document.getElementById("Validation_AUC").style.display="inline"},false)' +
            '</script>');
        myWindow.document.write('</body></html>');
        myWindow.document.close();
    }else{
         Swal.fire("The example dataset is already open")
        }

    // var runDemo = myWindow.document.getElementById('runDemo')
    //
    // function trainDemoModel() {
    //     fetch('../../dataset/LSM-15Year.txt')
    //       .then(response => response.text())
    //       .then(text => console.log(text))
    //
    // }

    //runDemo.addEventListener('click',trainDemoModel,false)
}

var myWindow1 = null
function DCIS_process(){
    console.log("dcis process");
    if ((myWindow1 == null) || (myWindow1.closed)) {
        myWindow1 = window.open("", "MsgWindow", "width=500, height=500");

        myWindow1.document.write(css)
        myWindow1.document.write('<html><head><title>Table</title></head><body style="margin:25px 15px;"><ul className="list-group list-group-flush">');
        myWindow1.document.write('<li className="list-group-item">Ductal carcinoma in situ (DCIS): The presence of abnormal cells inside a milk duct in the breast. DCIS is considered the earliest form of breast cancer and is noninvasive, meaning it has not spread out of the milk duct to invade other parts of the breast. </li>')
        myWindow1.document.write('<li className="list-group-item">solid: A “Solid” cell pattern is one in which the cancer cells have completely filled the duct.</li>')
        myWindow1.document.write('<li className="list-group-item">apocrine: Apocrine breast cancer is a rare type of invasive ductal breast cancer. Like other types of invasive ductal cancer, apocrine breast cancer begins in the milk duct of the breast before spreading to the tissues around the duct. The cells that make up an apocrine tumor are different than those of typical ductal cancers.</li>')
        myWindow1.document.write('<li className="list-group-item">cribriform: A “cribriform” pattern has gaps between the cancer cells within the duct, with an appearance similar to the "holes in swiss cheese" or perhaps "ripples". A cribriform pattern is consistent with a low or medium grade DCIS.</li>')
        myWindow1.document.write('<li className="list-group-item">dcis: Normal DCIS</li>')
        myWindow1.document.write('<li className="list-group-item">comedo: it is characterized by the presence of central necrosis, or evidence of cell death and decay. A diagnosis of this particular kind of breast cancer is somewhat fortuitous as it is confined to the breast ducts and usually does not spread beyond. However, in terms of the various kinds of DCIS, comedo carcinoma is considered to be of a higher grade and a little more aggressive than the others, and may be treated a little more aggressively.</li>')
        myWindow1.document.write('<li className="list-group-item">papillary: A "papillary" DCIS pattern is one arranged in a "fern-like" pattern within the duct. Unlike the cribriform pattern, the papillary has no isolated "holes" of cancer cells, but they are all connected in a kind of asymmetrical or undulating pattern throughout the duct.</li>')
        myWindow1.document.write('<li className="list-group-item">micropapillary: Micro-papillary DCIS is now thought to be a highly malignant, dangerous presentation of DCIS, and is of the highest risk. With micropapillary DCIS the ducts are dilated and lined by a stratified population of monotonous cells. The pattern may show small finger-like protuberances with bulbous ends, which may form arches. Micropapillary DCIS is often multifocal and multicentric. When the presentation is pure, it is often considered grounds for mastectomy in hopes of avoiding invasive micropapillary carcinoma.</li>')
        myWindow1.document.write('</ul></body></html>');
        myWindow1.document.close();
    }else{
         Swal.fire("The example dataset is already open")
        }
}

function nottrainModel() {

    add_userMsg("End task")
    $.post("/endtask", {
            }).done(function (data) {
                console.log(data)
            })

    appendMessage(BOT_NAME, NURSE_IMG, "left","Would you like to take a survey?","no information",{"Yes":"Yes","No":"No"})

    // more_que = "Do you have any other questions?"
    // appendMessage(BOT_NAME, NURSE_IMG, "left", more_que,"survey",{"I have no questions":"I have no questions","I have questions":"I have questions"})
    //document.getElementById('textInput').disabled = true;
    console.log("end task")
    //document.getElementById('textInput').placeholder="Enter your message..."
}

function trainModel() {
    add_userMsg("YES")

    Swal.fire({
                  title: 'Default Parameter Settings',
                  html:
                        ' <p>  <a href="#" id="show-option" title= "Drate is dropout rate. In dropout, we randomly shut down some fraction of a layer’s neurons at each training step by zeroing out the neuron values.">   drate</a>: [0.2]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= "Lrate means learning rate. The learning rate is a tuning parameter in an optimization algorithm that determines the step size at each iteration while moving toward a minimum of a loss function.">  lrate</a>: [0.01]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= "Decay is a regularization technique that is used in machine learning to reduce the complexity of a model and prevent overfitting.">  dec</a>: [0.0005]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= "Batch size is a term used in machine learning and refers to the number of training examples utilized in one iteration.">  batch_size</a>: [40]</p>\n' +

                      '   <p>   <a href="#" id="show-option" title= "Momentum is an extension to the gradient descent optimization algorithm that allows the search to build inertia in a direction in the search space and overcome the oscillations of noisy gradients and coast across flat spots of the search space.">  momentum</a>: [0.4]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= "L1 Regularization, also called a lasso regression, adds the “absolute value of magnitude” of the coefficient as a penalty term to the loss function.">  l1</a>: [0.005]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= " L2 Regularization, also called a ridge regression, adds the “squared magnitude” of the coefficient as the penalty term to the loss function.">  l2</a>: [0.005]</p>\n' +
                      '   <p>   <a href="#" id="show-option" title= "An epoch is when all the training data is used at once and is defined as the total number of iterations of all the training data in one cycle for training the machine learning model. ">  epochs</a>: [85]</p>',
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',

                     cancelButtonText: 'No, changed my mind',
                  confirmButtonText: 'Yes, Go on!',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                      //document.getElementById('textInput').disabled = true;
                      //document.getElementById('textInput').placeholder = "Training is on!";
                      var dataset = $('#fileid').prop('files')[0];
                      console.log("dataset",dataset);
                      if (dataset == null){
                          if (train_model_year == 5) {data_name='Book1.csv'}
                          else if (train_model_year == 10) {data_name='Book2.csv'}
                          else if (train_model_year == 15) {data_name='Book3.csv'};
                          console.log(data_name);
                          $.post("/Examdataset", {name: data_name}).done(function (data) {
                                    console.log(data)
                                    if (data["auc"]=="error"){
                                    alert('Sorry! We have an error from the server : '+data["src"]+'. Please try a valid dataset.')
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Browse data",{"View Example Dataset":"View Example Dataset","Run Model with Example Dataset":"Run Model with Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
                                    return
                                    }
                                    auc=data["auc"]
                                    img_src=data["src"]
                                    console.log(img_src)
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please wait, we are training your model ","no information",[])
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "The validation AUC is: "+ auc,"no information",[])
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Figure below is the validation ROC_curve.","no information",[],"",img_src)

                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use your model to do prediction now? ", "Test Patient", {"Testing with new patients":"Testing with new patients","Retrain the model":"Retrain the model","Open new dataset":"Open new dataset","End task":"End task"})
                                    //document.getElementById('textInput').disabled = true;
                                    //document.getElementById('textInput').placeholder="Enter your message..."
                                })

                      }else{
                        function read(callback) {
                            var dataset = $('#fileid').prop('files')[0];
                            const name = dataset.name
                            console.log("upload dataset",name)
                            var reader = new FileReader();
                            reader.onload = function() {
                                rawLog = reader.result
                                $.post("/dataset", { dataset: rawLog, name: name}).done(function (data) {
                                    console.log(data)
                                    if (data["auc"]=="error"){
                                    alert('Sorry! We have an error from the server : '+data["src"]+'. Please try a valid dataset.')
                                    $('#fileid').val("");

                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Browse data",{"View Example Dataset":"View Example Dataset","Run Model with Example Dataset":"Run Model with Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
                                    return
                                    }
                                    auc=data["auc"]
                                    img_src=data["src"]
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Please wait, training is on ","no information",[])
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "The validation AUC is: "+ auc,"no information",[])
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Figure below is the validation ROC_curve","no information",[],"",img_src)
                                    appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use your model to do prediction now? ", "Test Patient", {"Testing with new patients":"Testing with new patients","Retrain the model":"Retrain the model","Open new dataset":"Open new dataset","End task":"End task"})
                                    //document.getElementById('textInput').disabled = true;
                                    //document.getElementById('textInput').placeholder="Enter your message..."
                                })
                            }
                            reader.readAsText(dataset);
                        }read()}
                  }else{
                      trainModelWithParameter()
                  }
                }
                )}
function trainModelWithParameterExam() {
    add_userMsg("No, I don't")

    const question = "Please input the hyperparameter values you want to use for model training"
    appendMessage(BOT_NAME, NURSE_IMG, "left", question,"Train Model with Example dataset",[])
    //document.getElementById('textInput').disabled = true;
    //document.getElementById('textInput').placeholder="Enter your message..."

}
function trainModelWithParameter() {
    add_userMsg("No")

    const question = "Please input the hyperparameter values you want to use."
    appendMessage(BOT_NAME, NURSE_IMG, "left", question,"Parameters",[])
    //document.getElementById('textInput').disabled = true;
    //document.getElementById('textInput').placeholder="Enter your message..."

}
function retrainModelWithParameter() {
    add_userMsg("Retrain the model")
    const question = "Please input the hyperparameter values you want to use"
    appendMessage(BOT_NAME, NURSE_IMG, "left", question,"Parameters",[])
    //document.getElementById('textInput').disabled = true;
    //document.getElementById('textInput').placeholder="Enter your message..."

}
function submitPatientForm(val){
    add_userMsg("Submit patient form")
    console.log(val)
    //document.getElementById('textInput').disabled = true;
    //document.getElementById('textInput').placeholder = "We are evaluating your patient...";
    var patient_dic = []
    var patient_Form = document.getElementById("patientForm")

    var shap_check = document.getElementById("shapCheck").checked

    for (var i = 0; i < patient_Form.elements.length-1; i++) {

        patient_dic.push({key:patient_Form.elements[i].id, value:patient_Form.elements[i].value})
    }
    console.log(patient_Form)
    console.log(patient_dic)
    if ($('#fileid').prop('files')[0]==null)
    {
        if (train_model_year==5){window.dataset_name="LSM-5Year-I-240.txt";}
        if (train_model_year==10){window.dataset_name="LSM-10Year-I-240.txt";}
        if (train_model_year==15){window.dataset_name="LSM-15Year-I-240.txt";}
    }

    $.post("/patientform", {patient_dic: JSON.stringify(patient_dic),dataset_name: JSON.stringify(window.dataset_name),shap_check: JSON.stringify(shap_check)}).done(function (data) {
        if (data["proba"]=="error")
        {
            alert("Sorry, there is an time-out error")
            location.reload()
        }
        else{
        console.log(data)
        appendMessage(BOT_NAME, NURSE_IMG, "left", "The chance of "+val+" is: " + data["proba"], "no information", [])   //This is place that you need to add a variable that contains the value of year.
        if(shap_check == true){
        wait(120000)
        appendMessage(BOT_NAME, NURSE_IMG, "left", "Figure below is your SHAP plot","no information",[],"",data["img"])}    //Be specific about the type of SHAP plot.

        appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you want to use your model to do prediction? ", "Test Patient", {"Testing with new patients":"Testing with new patients","Retrain the model":"Retrain the model","Open new dataset":"Open new dataset","End task":"End task"})
        //document.getElementById('textInput').disabled = true;
        //document.getElementById('textInput').placeholder = "Enter your message..."
        }
    })


}
function generatePatientForm(labelList,table_result) {

     var patient_Form = document.getElementById("patientForm")
     if (patient_Form)
     {
     patient_Form.remove();
     }

    var labelList_withouttarget = labelList
    console.log(labelList_withouttarget)
    target_class=labelList_withouttarget[labelList_withouttarget.length-1]
    labelList_withouttarget.pop()
    if (labelList_withouttarget.length == 0){
        labelList_withouttarget = (labelList.toString()).split("\t")
        labelList_withouttarget.pop()
    }

    var final_result = labelList_withouttarget.map((e, i) => e + "&"+table_result[i]);

    let patientFormHtml = ""
          if (labelList.length != 0){
              //document.getElementById('textInput').disabled = true;
              //document.getElementById('textInput').placeholder = "You can not input now";
              patientFormHtml = final_result.map(function(item){
                  const label = item.split("&")[0]
                  const option_list = item.split("&")[1].split(',')
                //const element = `<div class="form-group row"><label for=${label} class="col-sm-2 col-form-label"><font size="-1">${label}</font></label><div class="col-sm-2"><input type="number" size="4" step="0.001" class="form-control" id=${label} name=${label} placeholder = "0"></div></div>`
                 const element = `<div id="label" class="form-group row">
                                    <a href="#" id="show-option" title=${patientParameter_dis[label]}>
                                       <i class="fas fa-info-circle" style="color:black"></i>
                                    </a>
                                       <label for=${label} class="col-sm-5 col-form-label">${label}</label>
                                       <div class="col-sm-6">
                                      
                                                <select id=${label} class="form-control" required>
                                        <option selected value="0">0</option>
                                        `

                  const option_html = option_list.slice(1).map(function(option){
                      const one_option =  `<option value=${option}>${option}</option>`

                      return one_option
                  })
                  //console.log(option_html)
                  return element + option_html.join("") +`</select></div> </div>`
              })
            let front = `<form id='patientForm' onsubmit='submitPatientForm("${target_class}");return false' method='post'>\n`
            let end =' <div class="form-check">\n' +
                '    <input type="checkbox" class="form-check-input" id="shapCheck">\n' +
                '    <label class="form-check-label" for="shapCheck">Do you want to plot shap anlysis graph for this patient, it will take longer time according to the size of your dataset and model</label>\n' +
                '  </div> <div class="form-group row"><div class="col-sm-10"> <button type="submit" class="btn btn-primary">Submit</button></div></div></form>'
            patientFormHtml = front+patientFormHtml.join("")+end
          }else {
                patientFormHtml=" "
          }
          appendMessage(BOT_NAME, NURSE_IMG, "left", "Please fill the patient form below and click submit",patientFormHtml,[])

    }

function testPatient() {
    add_userMsg("Testing with new patients")

    if ($('#fileid').prop('files')[0]==null)
    {
        if (train_model_year==5){window.dataset_name="LSM-5Year-I-240.txt";}
    }
    console.log(window.dataset_name)
    $.get("/getTestPatient", { dataset_name: JSON.stringify(window.dataset_name) }).done(function (data) {
        generatePatientForm(data["labellist"], data["tableresult"])

    })
}



function add_userMsg(msgText) {

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText,"no information",[]);
    const btn_group = document.getElementsByClassName("btn btn-success");
    for (let i = 0; i < btn_group.length; i++) {
    btn_group[i].className = "btn btn-success disabled"
    }
    // if(msgText == "View Example Dataset"){
    //     appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Upload Local Dataset",{"View Example Dataset":"View Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
    // }

}


function noQuestion() {
    add_userMsg("I have no questions")
    appendMessage(BOT_NAME, NURSE_IMG, "left",SURVEY,"no information",[])
}



function predictanotherpatient(){
    add_userMsg("Predict another patient")
     var instruction = ""
    var msgText = ""
    var btnGroup = []
    var nextques = ""
    var pattern = "Predict"
        input_choice = input_question["Predict"]
        PERSON_NAME="Your choice is"
    if (pattern=="Predict")
    {
        appendMessage(BOT_NAME, NURSE_IMG, "left", "For now, I can predict 5-year, 10-year, or 15-year breast cancer metastasis for your patient, please tell me which year you want to go by?","treatment_year instruction",{"5 year":"5 year","10 year":"10 year","15 year":"15 year"})
    }
    else {

        for (var i = 0; i < input_choice.length; i++) {
            console.log(pattern)
            console.log(input_choice[i].patterns)
            console.log(Object.keys(input_choice[i].patterns).indexOf(pattern))
            if (Object.keys(input_choice[i].patterns).indexOf(pattern) != -1) {
                if (input_choice[i].tag=="treatment_year")
                {
                    if (input_choice[i].patterns[pattern]=="10")
                    {
                        predict_year=10
                        input_choice = input_question10["Predict"]
                    }
                    else if (input_choice[i].patterns[pattern]=="5")
                    {
                        predict_year=5
                        input_choice = input_question5["Predict"]
                    }
                    else {
                        predict_year=15
                    }
                }
                input.push(input_choice[i].patterns[pattern])
                nextques = input_choice[i].nextques
                console.log(nextques)
            }
        }
    }
    if(nextques == "none"){
        var input_cpoy = input
        input = []
        getinput(input_cpoy)
        appendMessage(BOT_NAME, NURSE_IMG, "left", "You answered all questions, thank you! We are doing the calculation now. ","no information",btnGroup);
        return
    }
    tag=""
    for (var i = 0 ; i < input_choice.length; i++) {
        if (input_choice[i].tag == nextques){
            let index = Math.floor((Math.random()*input_choice[i].responses.length))
            msgText = input_choice[i].responses[index]
            btnGroup = Object.keys(input_choice[i].patterns)
            instruction = input_choice[i].instruction
            tag = input_choice[i].tag
        }
    }
    appendMessage(BOT_NAME, NURSE_IMG, "left", msgText, instruction, btnGroup,tag);
}

function takesurvey(){
add_userMsg("take a survey");
appendMessage(BOT_NAME, NURSE_IMG, "left",SURVEY,"no information",[]);
}

function takenosurvey(){
            location.reload();
            return
}

function haveQuestion() {
    add_userMsg("I have questions")
    appendMessage(BOT_NAME, NURSE_IMG, "left","Please tell me your questions, I will pass your question to our experts ","no information",[])
}

function displayRadioValue()
{
    var ele = document.getElementsByName('star');
    console.log(ele);
    checked_star=0
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                    checked_star=i
                }

            }
    var text=document.getElementById("usersuggestion").value;
    console.log(text);
    console.log(5-checked_star);
    $.post("/submitsurvey", {
                star:5-checked_star,
                text:text
            }).done(function (data) {
               console.log(data)
               location.reload()
            })

}

function appendMessage(name, img, side, text, instruction,btnGroup,tag="",img_src="") {
    if (text == "") {

        return
    }

    var starHTML = ``
    var parameterHTML = ``
    var patientHtml = ``
    var rocHTML = ``

    if(text.includes("ROC_curve")){
        console.log(img_src)
        rocHTML = `<img className="fit-picture" src="${img_src}" alt="ROC Curve" style="width:300px;height:250px;">`
    }
    if(text.includes("SHAP")){
        rocHTML = `<img className="fit-picture" src="${img_src}" alt="SHAP" style="width:300px;height:250px;">`
    }
    //Simple solution for small apps
    let buttonHtml = generateBtnGroup(btnGroup,tag)
    original_text=text
    if (btnGroup != "") {
        if (text=="What is the " || text=="Could you tell me the ")
        {
            if (tag=="DCIS_level"){
            text = text +"<a href='#' id='show-option' title='"+instruction+"'>"+tag+"</a>"+ " (Please "+"<a href='#'>click here</a>"+" for more information about the meaning of the choices)"
            }
            else{
            text = text +"<a href='#' id='show-option' title='"+instruction+"'>"+tag+"</a>"+ " of your patient?"
            }
        }
        else{
        //text = text + "(Please select one choice according to your situation)"
        }
    }
    if (text == SURVEY) {

        starHTML =
        '<div class="stars" id="stars">\n'+
        '<form onsubmit="displayRadioValue()">\n'+
    '<input class="star star-5" id="star-5" type="radio" name="star" value ="5">\n'+
    '<label class="star star-5" for="star-5"></label>\n' +
    '<input class="star star-4" id="star-4" type="radio" name="star" value ="4">\n'+
    ' <label class="star star-4" for="star-4"></label>\n' +
    '<input class="star star-3" id="star-3" type="radio" name="star" value ="3">\n'+
    ' <label class="star star-3" for="star-3"></label>\n' +
    '<input class="star star-2" id="star-2" type="radio" name="star" value ="2">\n'+
    ' <label class="star star-2" for="star-2"></label>\n' +
    '<input class="star star-1" id="star-1" type="radio" name="star" value ="1">\n'+
    ' <label class="star star-1" for="star-1"></label>\n' +
    '<label for="exampleFormControlTextarea1">Please leave your suggestions for iMedBot</label>\n' +
    '<textarea class="form-control" id="usersuggestion" rows="5"></textarea>\n'+
    '<input type="submit" value="Submit" class ="btn btn-success" >\n'+
    '</form>\n'+
    '</div>\n'


       // starHTML = '<div class="stars" id="stars"><form  onsubmit="getValue();" >\n' +
         //  ' <input class="star star-5" id="star-5" type="radio" name="star" value ="5" onsubmit="getValue();"/>\n' +
           //' <label class="star star-5" for="star-5"></label>\n' +
       //    ' <input class="star star-4" id="star-4" type="radio" name="star" value ="4" onsubmit="getValue();"/>\n' +
       //     '<label class="star star-4" for="star-4"></label>\n' +
       //     '<input class="star star-3" id="star-3" type="radio" name="star" value ="3" onsubmit="getValue();"/>\n' +
       //     '<label class="star star-3" for="star-3"></label>\n' +
       //     '<input class="star star-2" id="star-2" type="radio" name="star" value ="2" onsubmit="getValue();"/>\n' +
       //     '<label class="star star-2" for="star-2"></label>\n' +
       //     '<input class="star star-1" id="star-1" type="radio" name="star" value ="1" onsubmit="getValue();"/>\n' +
       //     '<label class="star star-1" for="star-1"></label>\n' +
       //     '<label for="exampleFormControlTextarea1">Please leave your suggestions for iMedBot</label>\n' +
       //     '<textarea class="form-control" id="usersuggestion" rows="5"></textarea>\n' +
       //     '<input type="submit" value="Submit" class ="btn btn-success">\n' +
       // '</form>\n' +
       // '</div>\n'
    }

    if (instruction == "Parameters") {
        console.log("parameters")
        parameterHTML = '<form id="parameterForm" onsubmit="getParameter();return false" method="post">\n' +
            '  <div class="form-group row">\n' +
            '    <label for="learningrate" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Lrate means learning rate. The learning rate is a tuning parameter in an optimization algorithm that determines the step size at each iteration while moving toward a minimum of a loss function.">Learning Rate</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="learningrate" name="learningrate" placeholder=0.001 value=0.001>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="batchsize" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Batch size is a term used in machine learning and refers to the number of training examples utilized in one iteration.">Batch Size</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" class="form-control" id="batchsize" name="batchsize" placeholder=10 value=10>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="epoch" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "An epoch is when all the training data is used at once and is defined as the total number of iterations of all the training data in one cycle for training the machine learning model. "> Epoch</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" class="form-control" id="epoch" name="epochs" placeholder=10 value=10>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="decay" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Decay is a regularization technique that is used in machine learning to reduce the complexity of a model and prevent overfitting."> Decay</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="decay" name="decay" placeholder=0.001 value=0.001>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="dropoutrate" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Drate is dropout rate. In dropout, we randomly shut down some fraction of a layer’s neurons at each training step by zeroing out the neuron values."> Dropout Rate</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="dropoutrate" name="dropoutrate" placeholder=0.02 value=0.02>\n' +
            '    </div>\n' +
            '  </div>\n' +

            '  <div class="form-group row">\n' +
            '    <label for="momentum" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Momentum is an extension to the gradient descent optimization algorithm that allows the search to build inertia in a direction in the search space and overcome the oscillations of noisy gradients and coast across flat spots of the search space.">Momen</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="momentum" name="momentum" placeholder=0.02 value=0.4>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="l1" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "L1 Regularization, also called a lasso regression, adds the “absolute value of magnitude” of the coefficient as a penalty term to the loss function."> L1</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="l1" name="l1" placeholder=0.02 value=0.05>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="l2" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "L2 Regularization, also called a ridge regression, adds the “squared magnitude” of the coefficient as the penalty term to the loss function.">L2</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="l2" name="l2" placeholder=0.02 value=0.05>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '  <div class="col-sm-10"> <button type="submit" class="btn btn-primary">Submit</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '</form>\n'
    }
    if(instruction == "Train Model with Example dataset" ||(instruction=="Parameters"&& $('#fileid').prop('files')[0]==null)) {
        parameterHTML = '<form id="parameterForm" onsubmit="getParameterExam();return false" method="post">\n' +
            '  <div class="form-group row">\n' +
            '    <label for="learningrate" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Lrate means learning rate. The learning rate is a tuning parameter in an optimization algorithm that determines the step size at each iteration while moving toward a minimum of a loss function.">Learning Rate</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="learningrate" name="learningrate" placeholder=0.001 value=0.001>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="batchsize" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Batch size is a term used in machine learning and refers to the number of training examples utilized in one iteration.">Batch Size</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" class="form-control" id="batchsize" name="batchsize" placeholder=10 value=10>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="epoch" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "An epoch is when all the training data is used at once and is defined as the total number of iterations of all the training data in one cycle for training the machine learning model. "> Epoch</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" class="form-control" id="epoch" name="epochs" placeholder=10 value=10>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="decay" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Decay is a regularization technique that is used in machine learning to reduce the complexity of a model and prevent overfitting."> Decay</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="decay" name="decay" placeholder=0.001 value=0.001>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="dropoutrate" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Drate is dropout rate. In dropout, we randomly shut down some fraction of a layer’s neurons at each training step by zeroing out the neuron values."> Dropout Rate</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.001" class="form-control" id="dropoutrate" name="dropoutrate" placeholder=0.02 value=0.02>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="momentum" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "Momentum is an extension to the gradient descent optimization algorithm that allows the search to build inertia in a direction in the search space and overcome the oscillations of noisy gradients and coast across flat spots of the search space.">Momen</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="momentum" name="momentum" placeholder=0.02 value=0.4>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="l1" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "L1 Regularization, also called a lasso regression, adds the “absolute value of magnitude” of the coefficient as a penalty term to the loss function."> L1</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="l1" name="l1" placeholder=0.02 value=0.05>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '    <label for="l2" class="col-sm-2 col-form-label"><a href="#" id="show-option" title= "L2 Regularization, also called a ridge regression, adds the “squared magnitude” of the coefficient as the penalty term to the loss function.">L2</a></label>\n' +
            '    <div class="col-sm-10">\n' +
            '      <input type="number" min="0" step="0.01" class="form-control" id="l2" name="l2" placeholder=0.02 value=0.05>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '  <div class="form-group row">\n' +
            '  <div class="col-sm-10"> <button type="submit" class="btn btn-primary">Submit</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '</form>\n'
    }
    if (text == "Please fill the patient form below and click submit") {
        patientHtml = instruction
        instruction = "The patient form is generated from the column name of your dataset"
    }
    if (instruction != "no information" && original_text!="What is your " && original_text!="Could you tell me your " && original_text!="What is your tumor " && original_text!="Could you tell me your tumor " )
    {

    var msgHTML =
        `<div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">
                <a href="#" id="show-option" title= "${instruction}"><i class="fas fa-info-circle" style="color:black"></i></a>
                ${formatDate(new Date())}

                </div>
            </div>
        <div class="msg-text">
            ${text}
        </div>` + rocHTML + buttonHtml + patientHtml + starHTML + parameterHTML + `</div> </div>`;
    }else if(text.includes("ROC_curve")) {
        $.post("/checkimg", {
                img:img
            }).done(function (data) {
                console.log(data)
            })
        var msgHTML =
        `<div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}
                </div>
            </div>
        <div class="msg-text">Figure below is the validation <a href="#" id="show-option" title= 'A receiver operating characteristic curve, or ROC curve, is a graphical plot that illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied. The ROC curve is created by plotting the true positive rate (TPR) against the false positive rate (FPR) at various threshold settings.AUC stands for "Area under the ROC Curve." That is, AUC measures the entire two-dimensional area underneath the entire ROC curve (think integral calculus) from (0,0) to (1,1). Normal AUC is between 0.5 to 1.0. The closer to 1 the AUC is, the better the model will be.'>ROC_curve</a>.</div>` + rocHTML + buttonHtml + patientHtml + starHTML + parameterHTML + `</div></div>`;
    }
    else if(text.includes("SHAP")){
        $.post("/checkimg", {
                img:img
            }).done(function (data) {
                console.log(data)
            })
        var msgHTML =
        `<div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}
                </div>
            </div>
        <div class="msg-text">Figure below is your <a href="#" id="show-option" title= 'SHAP dependence plots are an alternative to partial dependence plots and accumulated local effects. The y-axis indicates the variable name, in order of importance from top to bottom. The value next to them is the mean SHAP value. On the x-axis is the SHAP value. Indicates how much is the change in log-odds. From this number we can extract the probability of success. Gradient color indicates the original value for that variable. In booleans, it will take two colors, but in number it can contain the whole spectrum. Each point represents a row from the original dataset.'>SHAP plot</a></div>` + rocHTML + buttonHtml + patientHtml + starHTML + parameterHTML + `</div></div>`;
    }
    else
    {

    var msgHTML =
        `<div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}
                </div>
            </div>
        <div class="msg-text">${text}</div>` + rocHTML + buttonHtml + patientHtml + starHTML + parameterHTML + `</div></div>`;

    }


    //'beforeend': Just inside the element, after its last child.
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;

    const show_option=document.getElementsByTagName("a");
    for (var i = 0; i < show_option.length ; i++) {
        if (show_option[i].text=="click here")
             show_option[i].addEventListener("click",DCIS_process,false);
    }

    if (buttonHtml != " ") {
        const btn_group = document.getElementsByClassName("btn btn-success");

        for (let i = 0; i < btn_group.length; i++) {
            if (btn_group[i].innerHTML == "Yes" && original_text == "Would you like to take a survey?")
            {
            console.log(text)
            btn_group[i].addEventListener('click', takesurvey, false)
            }
            else if (btn_group[i].innerHTML == "No" && original_text == "Would you like to take a survey?")
            {
            btn_group[i].addEventListener('click', takenosurvey, false)
            }
            else if (btn_group[i].innerHTML == "View Example Dataset") {
                btn_group[i].addEventListener('click', showDemo, false)

            }else if (btn_group[i].innerHTML == "Run Model with Example Dataset") {
                btn_group[i].addEventListener('click', runModelExampleDateset, false)
            }else if (btn_group[i].innerHTML == "Upload Local Dataset") {
                btn_group[i].addEventListener('click', uploadData, false)
            }else if (btn_group[i].innerHTML == "Open new dataset") {
                btn_group[i].addEventListener('click', uploadNewData, false)
            } else if (btn_group[i].innerHTML == "No,I don't") {
                btn_group[i].addEventListener('click', trainModelWithParameterExam, false)
            }else if (btn_group[i].innerHTML == "Yes") {
                btn_group[i].addEventListener('click', trainModel, false)
            } else if (btn_group[i].innerHTML == "No") {
                btn_group[i].addEventListener('click', trainModelWithParameter, false)
            } else if (btn_group[i].innerHTML == "Testing with new patients") {
                btn_group[i].addEventListener('click', testPatient, false)
            } else if (btn_group[i].innerHTML == "End task") {
                btn_group[i].addEventListener('click', nottrainModel, false)
            } else if (btn_group[i].innerHTML == "Retrain the model") {
                btn_group[i].addEventListener('click', retrainModelWithParameter, false)
            }
            else if (btn_group[i].innerHTML == "I have no questions") {
                btn_group[i].addEventListener('click', noQuestion, false)
            }
            else if (btn_group[i].innerHTML == "I have questions") {
                btn_group[i].addEventListener('click', haveQuestion, false)
            }
             else if (btn_group[i].innerHTML == "Predict another patient") {
                btn_group[i].addEventListener('click', predictanotherpatient, false)
            }
            else if (btn_group[i].innerHTML == "Log in") {
                btn_group[i].addEventListener('click',login, false)
            }
            else if (btn_group[i].innerHTML == "Sign up") {
                btn_group[i].addEventListener('click', signup, false)
            }
            else {
                    btn_group[i].addEventListener('click', showNext, false)
            }

        }
    }
}


function showNext(e){

    var instruction = ""
    var msgText = ""
    var btnGroup = []
    var nextques = ""
    var pattern = e.target.innerHTML
    if (e.target.innerHTML != "Predict" && e.target.innerHTML != "Model Training"){
    add_userMsg(e.target.innerHTML)
    }


    if (pattern == "Predict"){
        input_choice = input_question["Predict"]
        PERSON_NAME="Your choice is"
    }else if(pattern == "Model Training"){
        input_choice = input_question["Train a Model"]
        PERSON_NAME="Your choice is"
    }

    if (pattern == "Predict"){
        add_userMsg("Predict")
        appendMessage(BOT_NAME, NURSE_IMG, "left", "I can predict 5-year, 10-year, or 15-year breast cancer metastasis for your patient, please tell me which year you want to go by?","treatment_year instruction",{"5 year":"5 year","10 year":"10 year","15 year":"15 year"})
    }else if(pattern == "Model Training"){
        add_userMsg("Model Training")
                Swal.fire({
                  title: 'About model training ',
                  text: " We will use 80% of your dataset to train this model with 5 fold cross validation strategies and 20% dataset as validation dataset to return the validation AUC, do you want to proceed it?",
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                    cancelButtonText: 'No, cancel!',
                  confirmButtonText: 'Yes, Go on!'
                }).then((result) => {
                  if (result.isConfirmed) {
                      appendMessage(BOT_NAME, NURSE_IMG, "left", "Please review the demo dataset first and upload your local dataset, only .txt and .csv format are permitted","Browse data",{"View Example Dataset":"View Example Dataset","Run Model with Example Dataset":"Run Model with Example Dataset","Upload Local Dataset":"Upload Local Dataset"})
                  }else {
                      console.log("hello")
                        secMsg = "I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset,or I can train a model for you if you can provide your own dataset. Please make your choice by clicking a button below."
                        appendMessage(BOT_NAME, NURSE_IMG, "left", secMsg,"no information", {"Predict":"Predict","Model Training":"Model Training"});
                      }
                })
        //alert("Do you really want to train the model?")

    }else {

        for (var i = 0; i < input_choice.length; i++) {

            if (Object.keys(input_choice[i].patterns).indexOf(pattern) != -1) {
                if (input_choice[i].tag=="treatment_year")
                {
                    if (input_choice[i].patterns[pattern]=="10")
                    {
                        predict_year=10
                        input_choice = input_question10["Predict"]
                    }
                    else if (input_choice[i].patterns[pattern]=="5")
                    {
                        predict_year=5
                        input_choice = input_question5["Predict"]
                    }
                    else
                    {
                        predict_year=15
                    }
                }
                input.push(input_choice[i].patterns[pattern])
                nextques = input_choice[i].nextques
            }
        }
    }
    if(nextques == "none"){
        var input_cpoy = input
        input = []
        getinput(input_cpoy)
        appendMessage(BOT_NAME, NURSE_IMG, "left", "You answered all questions, thank you! We are doing the calculation now. ","no information",btnGroup);
        return
    }
    tag=""

    for (var i = 0 ; i < input_choice.length; i++) {

        if (input_choice[i].tag == nextques){

            let index = Math.floor((Math.random()*input_choice[i].responses.length))
            msgText = input_choice[i].responses[index]
            btnGroup = Object.keys(input_choice[i].patterns)
            instruction = input_choice[i].instruction
            tag = input_choice[i].tag

        }
    }
    appendMessage(BOT_NAME, NURSE_IMG, "left", msgText, instruction, btnGroup,tag);
}

function getinput(input_copy){
  $.get("/getInput", { msg: input_copy.toString() }).done(function (data) {
    res = "The chance of "+predict_year+"-year breast cancer metastasis of is" +" "+data.substring(2,data.length-2)
      appendMessage(BOT_NAME, NURSE_IMG, "left", res,"no information",[])
      appendMessage(BOT_NAME, NURSE_IMG, "left","Which task would you like to do next?","no information",{"Predict another patient":"Predict another patient","End task":"End task"})
     // appendMessage(BOT_NAME, NURSE_IMG, "left",SURVEY,"no information",[])



    // appendMessage(BOT_NAME, NURSE_IMG, "left", "Do you have any other questions?","no information",{"I have no questions":"I have no questions","I have questions":"I have questions"})
   //  document.getElementById('textInput').disabled = true;
    //document.getElementById('textInput').placeholder="Enter your message..."

})
}


function generateBtnGroup(btn_group){
  let buttonHtml = ""
  let btn_array = Object.values(btn_group)
  // console.log( btn_array )

  if (btn_array.length != 0){
    //  document.getElementById('textInput').disabled = true;
    //  document.getElementById('textInput').placeholder = "You can not input now";
      buttonHtml = btn_array.map(function(btn){
        dcis_dict={"solid":"A Solid cell pattern is one in which the cancer cells have completely filled the duct.",
             "apocrine":"Apocrine breast cancer is a rare type of invasive ductal breast cancer. Like other types of invasive ductal cancer, apocrine breast cancer begins in the milk duct of the breast before spreading to the tissues around the duct. The cells that make up an apocrine tumor are different than those of typical ductal cancers.",
             "cribriform":' A cribriform pattern has gaps between the cancer cells within the duct, with an appearance similar to the holes in swiss cheese or perhaps ripples. A cribriform pattern is consistent with a low or medium grade DCIS.',
             "dcis":"Normal DCIS",
             "comedo":'it is characterized by the presence of central necrosis, or evidence of cell death and decay. A diagnosis of this particular kind of breast cancer is somewhat fortuitous as it is confined to the breast ducts and usually does not spread beyond. However, in terms of the various kinds of DCIS, comedo carcinoma is considered to be of a higher grade and a little more aggressive than the others, and may be treated a little more aggressively.',
             "papillary":'A papillary DCIS pattern is one arranged in a fern-like pattern within the duct. Unlike the cribriform pattern, the papillary has no isolated holes of cancer cells, but they are all connected in a kind of asymmetrical or undulating pattern throughout the duct.',
             "micropapillary":'Micro-papillary DCIS is now thought to be a highly malignant, dangerous presentation of DCIS, and is of the highest risk. With micropapillary DCIS the ducts are dilated and lined by a stratified population of monotonous cells. The pattern may show small finger-like protuberances with bulbous ends, which may form arches. Micropapillary DCIS is often multifocal and multicentric. When the presentation is pure, it is often considered grounds for mastectomy in hopes of avoiding invasive micropapillary carcinoma.',
             "not present":"Not present"}
        dcis_tag=Object.keys(dcis_dict)
        histology2_dict={"histology2 IDC":"Invasive (infiltrating) ductal carcinoma","histology2 ILC":"Invasive lobular carcinoma","histology2 DCIS":"DCIS is also called intraductal carcinoma or stage 0 breast cancer. DCIS is a non-invasive or pre-invasive breast cancer.","histology2 NC":""}
        histology2_tag=Object.keys(histology2_dict)
        t_tnm_stage_dict={"t_tnm_stage 0":"no tumor was found",
                          "t_tnm_stage 1":"1 means that the tumour is 2 centimetres (cm) across or less",
                          "t_tnm_stage 2":"the tumour is more than 2 centimetres but no more than 5 centimetres across",
                          "t_tnm_stage 3":"the tumour is bigger than 5 centimetres across",
                          "t_tnm_stage 4":"tumor has spread into other places",
                          "t_tnm_stage X":"X means that the tumour size cannot be assessed",
                          "t_tnm_stage IS":"IS means ductal carcinoma in situ",
                          "t_tnm_stage 1mic":""}
        t_tnm_stage_tag=Object.keys(t_tnm_stage_dict)
        n_tnm_stage_dict={"n_tnm_stage 0":"Either of the following: no cancer was found in the lymph nodes or only areas of cancer smaller than 0.2 mm are in the lymph nodes.",
                          "n_tnm_stage 1":"The cancer has spread to 1 to 3 axillary lymph nodes and/or the internal mammary lymph nodes.",
                          "n_tnm_stage 2":"The cancer has spread to 4 to 9 axillary lymph nodes.",
                          "n_tnm_stage 3":"The cancer has spread to 10 or more axillary lymph nodes, or it has spread to the lymph nodes located under the clavicle, or collarbone.",
                          "n_tnm_stage X":"The lymph nodes were not evaluated."}
        n_tnm_stage_tag=Object.keys(n_tnm_stage_dict)

        if (dcis_tag.includes(btn)){
        element = `<button type="button" class="btn btn-success" title="${dcis_dict[btn]}">${btn}</button>`
        }
        else if (histology2_tag.includes(btn)){
        element = `<button type="button" class="btn btn-success" title="${histology2_dict[btn]}">${btn}</button>`
        }
        else if (t_tnm_stage_tag.includes(btn)){
        element = `<button type="button" class="btn btn-success" title="${t_tnm_stage_dict[btn]}">${btn}</button>`
        }
        else if (n_tnm_stage_tag.includes(btn)){
        element = `<button type="button" class="btn btn-success" title="${n_tnm_stage_dict[btn]}">${btn}</button>`
        }
        else {
        element = `<button type="button" class="btn btn-success">${btn}</button>`
        }

        return element
    })
    let front = '<div class="btn-group-vertical" role="group" aria-label="Basic example">'
    let end = '</div>'
    buttonHtml = front+buttonHtml.join("")+end
  }else {
        buttonHtml=" "
  }
  // console.log(buttonHtml)
  return buttonHtml
}

function botResponse(rawText) {
  // Bot Response
  $.get("/get", { msg: rawText }).done(function (data) {
    const msgText = data["response"];
    const btnGroup = data["button_group"]
    const instruction = data["instruction"]
    appendMessage(BOT_NAME, NURSE_IMG, "left", msgText,instruction,btnGroup);
  });
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}
function load(){

    firstMsg = "Hi, welcome to iMedBot! 😄"
    //secMsg = "I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset,or I can train a model for you if you can provide your own dataset. Please make your choice by clicking a button below."
    btnGroup = []
    appendMessage(BOT_NAME, NURSE_IMG, "left", firstMsg,"no information", btnGroup);
    appendMessage(BOT_NAME, NURSE_IMG, "left","To begin with, log in with your iMedbot account or create a new one to continue","no information", {"Log in":"Log in","Sign up":"Sign up"});
    //appendMessage(BOT_NAME, NURSE_IMG, "left", secMsg,"no information", {"Predict":"Predict","Model Training":"Model Training"});
}

window.οnlοad =load()
// window.οnlοad = appendMessage(BOT_NAME, NURSE_IMG, "left", firstMsg,"no information", btnGroup);
//window.οnlοad = appendMessage(BOT_NAME, NURSE_IMG, "left", secMsg,"Two choices", {"Predict":"1","Train a Model":"2"});




// ****************************************************************************
const start_button = document.getElementById("start_button");
const hint = document.getElementById("hint");
//start_button.onclick = startButton;
const start_img = document.getElementById("start_img");


var final_transcript = '';
var recognizing = false;
var if_error;
var start_timestamp;
// if (!('webkitSpeechRecognition' in window)) {
//   upgrade();
// } else {
//   start_button.style.display = 'inline-block';
//
//   var recognition = new webkitSpeechRecognition();
//   recognition.continuous = true;
//   recognition.interimResults = true;
//
//   recognition.onstart = function() {
//     recognizing = true;
//     // alert('info_speak_now');
//     start_img.src = 'static/img/mic-animate.gif';
//
//   };
//
//   recognition.onerror = function(event) {
//     if (event.error == 'no-speech') {
//       start_img.src = 'static/img/mic.gif';
//       alert('info_no_speech');
//       if_error = true;
//     }
//     if (event.error == 'audio-capture') {
//       start_img.src = 'static/img/mic.gif';
//       alert('info_no_microphone');
//       if_error = true;
//     }
//
//     }
//   };
//
//   recognition.onend = function() {
//     recognizing = false;
//     if (if_error) {
//       return;
//     }
//     start_img.src = 'static/img/mic.gif';
//     if (!final_transcript) {
//       return;
//     }
//   };
//
//   recognition.onresult = function(event) {
//     var interim_transcript = '';
//     for (var i = event.resultIndex; i < event.results.length; ++i) {
//       if (event.results[i].isFinal) {
//         final_transcript += event.results[i][0].transcript;
//       } else {
//         interim_transcript += event.results[i][0].transcript;
//       }
//     }
//     final_transcript = capitalize(final_transcript);
//     msgerInput.value =linebreak(final_transcript);
//
//   };


// function upgrade() {
//   start_button.style.visibility = 'hidden';
//   alert('info_upgrade');
// }
//
// var two_line = /\n\n/g;
// var one_line = /\n/g;
// function linebreak(s) {
//   return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
// }
//
// var first_char = /\S/;
// function capitalize(s) {
//   return s.replace(first_char, function(m) { return m.toUpperCase(); });
// }
//
//
// function startButton(event) {
//   start_button.title = '&nbsp&nbsp Stop recording when you click'
//   hint.innerHTML = '&nbsp&nbsp Stop recording when you click microphone'
//   hint.style.color = "red"
//   if (recognizing) {
//
//     recognition.stop();
//     start_button.title = '&nbsp&nbsp Start recording when you click'
//     hint.innerHTML = '&nbsp&nbsp Start recording when you click microphone'
//     hint.style.color = "green"
//     return;
//   }
//
//   final_transcript = '';
//   recognition.lang = 'en-US';
//   recognition.start();
//
//   if_error = false;
//   start_img.src = 'static/img/mic-slash.gif';
//   start_timestamp = event.timeStamp;
// }

// ===========================================================================

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
/*
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
 /*
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      /*
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      /*
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      /*
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
   //       b = document.createElement("DIV");
          /*make the matching letters bold:*/
   //       b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
   //       b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
   //       b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
   //       b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
   //           inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
   //           closeAllLists();
   //       });
   //       a.appendChild(b);
   //     }
   //   }
  //});

  /*execute a function presses a key on the keyboard:*/
  // inp.addEventListener("keydown", function(e) {
  //     var x = document.getElementById(this.id + "autocomplete-list");
  //     if (x) x = x.getElementsByTagName("div");
  //     if (e.keyCode == 40) {
  //       /*If the arrow DOWN key is pressed,
  //       increase the currentFocus variable:*/
  //       currentFocus++;
  //       /*and and make the current item more visible:*/
  //       addActive(x);
  //     } else if (e.keyCode == 38) { //up
  //       /*If the arrow UP key is pressed,
  //       decrease the currentFocus variable:*/
  //       currentFocus--;
  //       /*and and make the current item more visible:*/
  //       addActive(x);
  //     } else if (e.keyCode == 13) {
  //       /*If the ENTER key is pressed, prevent the form from being submitted,*/
  //       e.preventDefault();
  //       if (currentFocus > -1) {
  //         /*and simulate a click on the "active" item:*/
  //         if (x) x[currentFocus].click();
  //       }
  //     }
  // });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var possiblequestions = [ "Hello", "What can you do?",
                  "What is a breast cancer?",
                  "Could you help me predict my breast cancer recurrence probability?",
                  "Could you tell me your name?",
                  "I want to know my risk of metastatic cancer",
                  "No, I do not have other questions",
                  "I do not have other questions",
                  "Yes, I have some other problems",
                  "Thank you"


];



autocomplete(document.getElementById("textInput"), possiblequestions);


//
// <!--                                                <datalist id="itemlist">-->
//  <!-- <input type="number" required="required" id=${label} name=${label} value=0 placeholder = "0">-->
// <!--                                                    <option>0</option><option>1</option><option>2</option>-->
// <!--                                                </datalist>-->