const machineStats = [
    {name: 'Industrial Centrifuge', speed: 125, eu: 90, par: 6, par_limit: 0},
    {name: 'Industrial Material Press', speed: 500, eu: 100, par: 4, par_limit: 0},
    {name: 'Industrial Electrolyzer', speed: 180, eu: 90, par: 2, par_limit: 0},
    {name: 'Industrial Mixing Machine', speed: 250, eu: 100, par: 8, par_limit: 0},
    {name: 'Industrial Sifter', speed: 400, eu: 75, par: 4, par_limit: 0},
    {name: 'Industrial Thermal Centrifuge', speed: 150, eu: 80, par: 8, par_limit: 0},
    {name: 'Industrial Ore Washing Plant', speed: 400, eu: 100, par: 4, par_limit: 0},
    {name: 'Industrial Extrusion Machine', speed: 250, eu: 100, par: 4, par_limit: 0},
    {name: 'Industrial Cutting Factory', speed: 200, eu: 75, par: 4, par_limit: 0},
    {name: 'Large Processing Factory', speed: 250, eu: 80, par: 2, par_limit: 0},
    {name: 'Maceration Stack Controller', speed: 60, eu: 100, par: 8, par_limit: 0},
    {name: 'Wire Factory Controller', speed: 200, eu: 75, par: 4, par_limit: 0},
    {name: 'Amazon Warehousing Depot', speed: 500, eu: 75, par: 16, par_limit: 0},
    {name: 'Cryogenic Freezer', speed: 100, eu: 100, par: 4, par_limit: 1},
    {name: 'Volcanus', speed: 20, eu: 90, par: 8, par_limit: 1},
]
const tierList = [
  {id: 1, name: 'LV'},
  {id: 2, name: 'MV'},
  {id: 3, name: 'HV'},
  {id: 4, name: 'EV'},
  {id: 5, name: 'IV'},
  {id: 6, name: 'LuV'},
  {id: 7, name: 'ZPM'},
  {id: 8, name: 'UV'},
  {id: 9, name: 'UHV'},
  {id: 10, name: 'UEV'},
  {id: 11, name: 'UIV'},
  {id: 12, name: 'UMV'},
  {id: 13, name: 'UXV'},

]

// Создание списка машин
var machineSelect = document.getElementById('machines')
var machineOption = document.createElement('option');
  for (var i = 0; i < machineStats.length; i++) {
    machineOption.innerHTML = machineStats[i].name;
    machineSelect.append(machineOption.cloneNode(true));
  }

  function findInMachines(name) {
    // Находит данные о машине по названию
    return machineStats.find(element => element.name === name);
  }

  function tierId(name) {
    return tierList.find(element => element.name === name).id;
  }

  function initLoad() {
    // Выводит данные о машине на страницу и передает их дальше
    var info = findInMachines(document.getElementById('machines').value);
    document.getElementById('speed-p').innerHTML = "Runs " + info.speed + "% faster."
    document.getElementById('eu-p').innerHTML = "Needs " + info.eu + "% eu/t."
    document.getElementById('par-p').innerHTML = "Processes " + info.par + " items per voltage tier."
    var selectedTierNumber = tierId(document.getElementById('tiers').value);
    var maxEu = 8 * Math.pow(4, selectedTierNumber);
    document.getElementById('maxeu').innerHTML = maxEu;
    if (info.par_limit == 1) {
      var totalPars = info.par;
    }
      else {
        var totalPars = info.par * selectedTierNumber;
      }
      document.getElementById('par-max').innerHTML = "Maximum of " + totalPars + " parallels.";
    return info;
  }

  window.onload = initLoad, tierLoad(0);

  function roundTime(num) {
    return (Math.floor(num*20)/20).toFixed(2);
}

// Динамический список тиров
function tierLoad(startTier) {
var tierSelect = document.getElementById('tiers')
var tierOption = document.createElement('option');
if (startTier <= tierList.length) {
  tierSelect.innerHTML = null;
  for (var i = startTier; i < tierList.length; i++) {
    tierOption.innerHTML = tierList[i].name;
    tierSelect.append(tierOption.cloneNode(true));
  }
}
}


function error(name) {
 switch(name) {
     case 'eu-high':
         console.log ("Eu/t is too high!");
         document.getElementById('new-eu').innerHTML = "Too High!";
         break;
 }
}

function countTier(eut) {
  for (i = 32, o = 1; i < eut; i *= 4, o++) {
  }
  return o;
}

document.getElementById('eut').onchange = tierTable;

document.getElementById('machines').onchange = run;
document.getElementById('time').onchange = run;
document.getElementById('tiers').onchange = run;

function tierTable() {
  console.log("nice");
  var recipeTier = countTier(document.getElementById('eut').value);
  var machineTier = tierId(document.getElementById('tiers').value);
  checkedTier = document.getElementById('tiers').value;
  console.log(checkedTier);
  if (recipeTier <= tierList.length) {
  tierLoad(recipeTier - 1);
  if (machineTier >= recipeTier) {
    document.getElementById('tiers').selectedIndex = machineTier - recipeTier;
  }
  run();
}
else {
  error(eu-high);
}
  }

  function run() {
    var machineInfo = initLoad();
    console.log(machineInfo);
    speed = 1 / (machineInfo.speed / 100 + 1);
    eu = machineInfo.eu / 100;
    var eutInfo = document.getElementById('eut').value;
    console.log(eutInfo);
    var recipeTier = countTier(eutInfo);
    var selectedTierNumber = tierId(document.getElementById('tiers').value);
    if (eutInfo > 0) {
      console.log("eut check successful!");
      if (recipeTier <= tierList.length) {
      var recipeTime = document.getElementById('time').value;
      var newEu = Math.floor(eutInfo * eu);
      console.log("Par_limit is " + machineInfo.par_limit);
      document.getElementById('new-eu').innerHTML = newEu;
      var maxEu = 8 * Math.pow(4, selectedTierNumber);
      var theoryMaxPar = maxEu / newEu;
      if (machineInfo.par_limit == 1) {
        var totalPars = machineInfo.par;
      }
      else {
        var totalPars = machineInfo.par * selectedTierNumber;
      }
      if (totalPars <= theoryMaxPar) {
        maxPar = totalPars;
      }
      else {
        maxPar = Math.floor(theoryMaxPar);
        console.log (maxPar);
      }
    document.getElementById('total-pars').innerHTML = maxPar;
      if (recipeTime > 0) {
        console.log ("speed check successful!");
      console.log("Time " + recipeTime);
      console.log("Tier " + selectedTierNumber);

      // Все проверки пройдены

        var newTime = roundTime(recipeTime * speed);
        euAfterPar = newEu * maxPar;
        console.log("Eu after par: " + euAfterPar);
        for (totalEu = euAfterPar, oc=0; totalEu <= maxEu/4 && newTime > 0.05; totalEu *= 4, oc++) {
          newTime /= 2;
          newTime = roundTime(newTime);
        }
        document.getElementById('total-oc').innerHTML = oc;
        document.getElementById('total-eu').innerHTML = totalEu;
        document.getElementById('new-time').innerHTML = newTime;


      }
      else {
        console.log ("speed check failed");
      }
    }
    else {
        error(eu-high);
    }
    }
    else {
      console.log ("eut check failed!");
    }
  }
