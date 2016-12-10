var chamber    = new Array();
//chamber is array of representatives

var speeches   = new Array();
//speeches is a list of all speeches
//representative array format is [id,"name",numSpeeches,numQuestions]
function Representative(id, name, numSpeeches, numQuestions){
  this.id=id;
  this.name=name;
  this.numSpeeches=numSpeeches;
  this.numQuestions=numQuestions;
}
function Speech(speechID, speakerID, speakerName, side){
  this.speechID = speechID;
  this.speakerID = speakerID;
  this.speakerName = speakerName;
  this.side = side;
}

var repHeaders = [
  
  "Name",
  "ID",
  "Total Speeches",
  "Total Questions",
  "Add Speech",
  "Add Question",
  "Remove Question"
]

var speechHeaders = [
  "Speech Number",
  //"Speaker ID",
  "Name",
  "Side"
]
function generateRepTable(arr){
    var myTable= "<table class='floatedTableLeft'>";
    myTable+=generateHeaders(repHeaders);

    for (var i=0; i<arr.length; i++) {
      myTable+=makeRowFromRep(arr[i]);
    }

    myTable+="</table>";
    
  return myTable;
}

function generateSpeechTable(arr){
    var myTable= "<table class='floatedTableRight'>";
    myTable+=generateHeaders(speechHeaders);

    for (var i=0; i<arr.length; i++) {
      myTable+=makeRowFromSpeech(arr[i]);
    }

    myTable+="</table>";
    
  return myTable;
}

function generateHeaders(headers){
    var outStr = ""
    outStr+="<tr>";
    for(var i=0; i<headers.length;i++) {
      outStr+="<td style='color: red;'>" + headers[i] +"</td>";
    }
    outStr+="</tr>";
  
    return outStr;
}
function makeRowFromRep(representative){
    var outStr = "";
  
    outStr+="<tr>";

    outStr+="<td style='text-align: left;'>" + representative.name + "</td>";
    outStr+="<td style='text-align: left;'>" + representative.id + "</td>";
    outStr+="<td style='text-align: right;'>" + representative.numSpeeches + "</td>";
    outStr+="<td style='text-align: right;'>" + representative.numQuestions + "</td>";
    outStr+="<td><input type=\"button\" onclick=\"addSpeech("+representative.id+")\" value=\"Add Speech\"></td>";
    outStr+="<td><input type=\"button\" onclick=\"addQuestion("+representative.id+")\" value=\"Add Question\"></td>";
    outStr+="<td><input type=\"button\" onclick=\"removeQuestion("+representative.id+")\" value=\"Remove Question\"></td>";
  
    outStr+="</tr>";
  
    return outStr;
}
function makeRowFromSpeech(speech){
    var outStr = "";
  
    outStr+="<tr>";

    outStr+="<td style='text-align: left;'>" + (speech.speechID + 1) + "</td>";
    //outStr+="<td style='text-align: left;'>" + speech.speakerID + "</td>";
    outStr+="<td style='text-align: right;'>" + speech.speakerName + "</td>";
    outStr+="<td style='text-align: right;'>" + speech.side + "</td>";
  
    outStr+="</tr>";
  
    return outStr;
}
function addSpeech(id){
  var side = prompt('Speech side (Author, Sponsor, Affirm, Negate)');
  if (side!=null){
    var index = findRep(chamber,id);
    chamber[index].numSpeeches++;
    speeches.push(new Speech(speeches.length,id,chamber[index].name,side));
    updateTable();
  }
}
function addQuestion(id){
  chamber[findRep(chamber,id)].numQuestions++;
  updateTable();
}

function removeQuestion(id){
  chamber[findRep(chamber,id)].numQuestions--;
  updateTable();
}

function findRep(arr,id){
  var index = -1;
  for(var i=0; i<arr.length;i++){
    if(arr[i].id==id){
      index=i;
    }
  }
  return index;
}

function findRecency(arr,id){
  var index = -1;
  for(var i=arr.length-1;i>=0;i--){
    if(arr[i].speakerID==id){
      index=i;
      i=-1;
    }
  }
  return index;
}

function updateTable(){
  document.getElementById("allReps").innerHTML = generateRepTable(chamber);
  document.getElementById("allSpeeches").innerHTML = generateSpeechTable(speeches);
}

function addRepAndRefresh(name){
  if (name!=null){
    chamber.push(new Representative(chamber.length,name,0,0));
    updateTable();
  }
}

function deleteRep(id){
  if (id>=0){
    chamber.splice(findRep(chamber,id),1);
    updateTable();
  }
}

function sortAndUpdate(){
  chamber.sort(function(a,b){
    return (1000*a.numSpeeches + findRecency(speeches,a.id)) - (1000*b.numSpeeches + findRecency(speeches,b.id));
  });
  updateTable();
}
updateTable();
