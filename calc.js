const machineStats = [
    {id: "centrifuge", speed: 125, eu: 90, par: 6, par_limit: 0},
    {id: "press", speed: 500, eu: 100, par: 4, par_limit: 0},
    {id: "electrolyzer", speed: 180, eu: 90, par: 2, par_limit: 0},
    {id: "mixer", speed: 250, eu: 100, par: 8, par_limit: 0},
    {id: "sifter", speed: 400, eu: 75, par: 4, par_limit: 0},
    {id: "thermal", speed: 150, eu: 80, par: 8, par_limit: 0},
    {id: "washer", speed: 400, eu: 100, par: 4, par_limit: 0},
    {id: "extruder", speed: 250, eu: 100, par: 4, par_limit: 0},
    {id: "cutter", speed: 200, eu: 75, par: 4, par_limit: 0},
    {id: "misc", speed: 250, eu: 80, par: 2, par_limit: 0},
    {id: "macerator", speed: 60, eu: 100, par: 8, par_limit: 0},
    {id: "wiremill", speed: 200, eu: 75, par: 4, par_limit: 0},
    {id: "packager", speed: 500, eu: 75, par: 16, par_limit: 0},
    {id: "freezer", speed: 100, eu: 100, par: 4, par_limit: 1},
    {id: "ebf", speed: 20, eu: 90, par: 8, par_limit: 1},
]

var getMachine = document.getElementById('machines')
  getMachine.onchange = function(){
    var speed = machineStats.find(element => element.id === this.value).speed;
    var eu = machineStats.find(element => element.id === this.value).eu;
    var par = machineStats.find(element => element.id === this.value).par;
    document.getElementById('speed-p').innerHTML = "Runs " + speed + "% faster."
    document.getElementById('eu-p').innerHTML = "Needs " + eu + "% eu/t."
    document.getElementById('par-p').innerHTML = "Processes " + par + " items per voltage tier."
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

var getTier = document.getElementById('tiers')
  getTier.onchange = function(){
    var tierNumber = this.value;
    document.getElementById('maxeu').innerHTML = 8*Math.pow(4, tierNumber);
  }

  function run() {
    var stats = document.getElementById('machines');
    var speed = machineStats.find(element => element.id === stats.value).speed;
    var eu = machineStats.find(element => element.id === stats.value).eu;
    var par = machineStats.find(element => element.id === stats.value).par;
    var par_limit = machineStats.find(element => element.id === stats.value).par_limit;
    var og_eut = document.getElementById('eut').value;
    if (og_eut >= 1) {
      var new_eut = Math.round(og_eut*eu/100);
    var og_time = document.getElementById('time').value;
    var new_time = og_time*(100/(100+speed));
    document.getElementById('new-eu').innerHTML = roundToTwo(new_eut);
    var tierNumber = document.getElementById('tiers').value;
    if (tierNumber >= 1) {
    var max_eu = 8*Math.pow(4, tierNumber);
    if (par_limit == 1) {
      var max_par = par;
    }
    else {
    var max_par = par*tierNumber;
    }
    document.getElementById('par-max').innerHTML = max_par + " max parallels";
    var parallels = max_eu/new_eut;
    var i = 0;
    if (parallels > max_par) {
      finalPar = max_par;
    }
    else if (parallels < 1) {
      finalPar = "Voltage Tier needs to be higher!";

    }
    else {
      finalPar = Math.floor(parallels);
    }
    document.getElementById('total-pars').innerHTML = finalPar;
    if (parallels < 1) {
    total_eu = 0 }
    else {
     total_eu = finalPar * new_eut;
     while (total_eu <= max_eu/4) {
       new_time = new_time / 2;
       total_eu = total_eu * 4;
       i++;
     }
    }
    document.getElementById('total-oc').innerHTML = i;
    document.getElementById('new-time').innerHTML = roundToTwo(new_time)+" sec";
    document.getElementById('total-eu').innerHTML = total_eu;
    }
  else {
    document.getElementById('maxeu').innerHTML = "Voltage is wrong!";
  }
  }
    else {
      document.getElementById('new-eu').innerHTML = "Eu is wrong!";
  }}