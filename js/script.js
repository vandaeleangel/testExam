"use strict";

//declare global vars here
var games;
var slcLeagues;
//divs
var divLeagues;
var divGames;
var divBets;
var divResults;
//btns
var btnSave;
var btnOutcome;
//tbls
var tblLeagues;
var tblGames;
var tblBets;
var tblOutcome;

var selectedLeague;
//wait for document load
window.addEventListener("load", Initialize);
/**
 * Main program
 */
function Initialize() {
  //parse JSON;
  games = JSON.parse(fixtures);

  BindElements();
  LoadLeaguesInList();
  ShowLogos();
  AddEvents();
}

/**
 * Binds the elements
 */
function BindElements() {
  slcLeagues = document.querySelector("#slcleagues");
  //divs
  divLeagues = document.querySelector("#divleagues");
  divGames = document.querySelector("#divgames");
  divBets = document.querySelector("#divbets");
  divResults = document.querySelector("#divresults");
  //btns
  btnSave = document.querySelector("#btnsave");
  btnOutcome = document.querySelector("#btnoutcome");
}

function AddEvents() {
  slcLeagues.addEventListener("change", showGameData);
}

function LoadLeaguesInList() {
  for (const serie in games) {
    slcLeagues.options[slcLeagues.length] = new Option(serie, serie);
 
  }
}

function showGameData() {
  divGames.innerHTML = "";
  

  selectedLeague = games[getSelectedLeague()];
  let leagueData = selectedLeague.Games;
  BuildTableLeagueData(leagueData);

}

function BuildTableLeagueData(leagueData){
  let tblLeagues = document.createElement("table");
  let arrHeader = new Array();
  let arrData = new Array();

  arrHeader.push("Bet");
  arrHeader.push("Home");
  arrHeader.push("Away");
  arrHeader.push("Win Draw Loose")

  let checkBox = document.createElement("input");
  
  arrData.push(checkBox);
  arrData.push(leagueData.Home);
  arrData.push(leagueData.Away);
  arrData.push(leagueData.Outcome);


  tblLeagues.appendChild(buildTableRow(arrHeader,true));
  tblLeagues.appendChild(buildTableRow(arrData));
  divGames.appendChild(tblLeagues);
}

function buildTableRow(rowData, header=false){
  let tableRow = document.createElement("tr");
  if(header)
    rowData.forEach(data => { tableRow.appendChild(buildTableData(data,true));
    });
    else 
    rowData.forEach(data => {tableRow.appendChild(buildTableData(data,false))
    })
    return tableRow;
  
}

function buildTableData(data, header =false){
  let tableData;
  if(header){
    tableData =document.createElement("th");
  }
  else{
    tableData = document.createElement("td");
  }

  if(data === "checkBox"){
    checkBox.setAttribute("type","checkbox");
  }
  tableData.innerHTML = data;
  return tableData;
}

function getSelectedLeague(){
  return slcLeagues[slcLeagues.selectedIndex].value;
}

function ShowLogos() {
  let path;
  for (const serie in games) {
    path = `img/${serie}/${serie}.png`;
    if (serie === "ChampionsLeague") {
      path = `img/${serie}/CL.png`;
    }
    divLeagues.append(createFlag(path, serie));
  }
}

function createFlag(path, id) {
  let imgFlag = document.createElement("img");
  imgFlag.id = id;
  imgFlag.src = path;
  return imgFlag;
}
