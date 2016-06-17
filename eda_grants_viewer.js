var counties = counties_json2()
var criteria = ["Unemployment", "Per capita income"]
var selected_criteria = "Unemployment"
var csv_data
var data_array = []
var table

var data2 = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

$(document).ready(function(){

	// var test_array = [["val1", "val2", "val3"], ["val4", "val5", "val6"]]
	// // console.log(test_array)
	// test_array = [test_array, ["val7", "val8", "val9"]]
	// console.log(test_array)

	// var fakeArray = { "length": 2, 0: "Addy", 1: "Subtracty" };
 // 	console.log(fakeArray)

	// // Therefore, convert it to a real array
	// var realArray = $.makeArray( fakeArray )
	// console.log(realArray)

	// var o = [{
	// 	    "proj_address": "Beattyville, KY, 00000",
	// 	    "Proj.ST.Abbr": "KY",
	// 	    "Proj.ZIP": "00000"
	// 	  },
	// 	  {
	// 	    "proj_address": "Fargo, ND, 00000",
	// 	    "Proj.ST.Abbr": "ND",
	// 	    "Proj.ZIP": "00000"
	// 	  },
	// 	  {
	// 	    "proj_address": "Shawneetown, IL, 62984",
	// 	    "Proj.ST.Abbr": "IL",
	// 	    "Proj.ZIP": "62984"
	// 	  }]

	// var data_array = []
	// for(i = 0; i < o.length; i++){
	// 	// console.log(_.values(o[i]))
	// 	data_array.push(_.values(o[i]))
	// 	// eval("var temp" + i + "=" + temp_val + ";");
	// 	console.log(data_array)
	// }

	// var pageNumber = 1;
	// eval("var text" + pageNumber + "=123;")
	// console.log(text1)
	// console.log(o)
	// var o2 = _.map(o, function(num, key) { num })
	// console.log(o2)

	// var test = _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3})
	// var test = _.map([{
	// 	    "proj_address": "Beattyville, KY, 00000",
	// 	    "Proj.ST.Abbr": "KY",
	// 	    "Proj.ZIP": "00000"
	// 	  }, {
	// 	    "proj_address": "Fargo, ND, 00000",
	// 	    "Proj.ST.Abbr": "ND",
	// 	    "Proj.ZIP": "00000"
	// 	  }], function(val){ return _.values})

	// console.log(test)

	// var test2 = _.map(test, function(val, key){return val})
	// console.log(test2)
	// console.log(data2)

	// var o = {"0":"1","1":"2","2":"3","3":"4"};
	// var o = {"0":"1","1":"2","2":"3","3":"4"};
	// console.log(o)

	// var o_array = $.makeArray(o)
	// console.log(o_array)

	// var arr = $.map(o, function(el) { return el; })
	// console.log(arr)


	// $('#csv-table').DataTable({
 //      	data: data,
 //      	columnDefs: [
 //        		{ targets: [0, 5], visible: true}
 //        	]
 //      	// columns: [
	//       //       { title: "Name" },
	//       //       { title: "Position" },
	//       //       { title: "Office" },
	//       //       { title: "Extn." },
	//       //       { title: "Start date" },
	//       //       { title: "Salary" }
 //       //  	]
 //    	});

	// parse uploaded csv into data variable
	function handleFileSelect(evt) {
		var file = evt.target.files[0];

		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				console.log("in parse function");
				csv_data = results.data;
				console.log(csv_data.length)
				convert_obj_to_array()
				// console.log(data_array)
				create_table()
				// data = results.toArrays()
				// table = $('#csv-table').DataTable({
			 //      	data: data,
			 //      	columnDefs: [
			 //        		{ targets: [0, 5], visible: true}
			 //        	]
				// })
				// table.destroy()
				// table.clear().draw()
				// table.row.add(data)
				// create_table()
			}
		});
	}

	function convert_obj_to_array(data) {
		console.log("in convert function")
		console.log(csv_data.length)
		for(i = 0; i < csv_data.length - 1; i++){
			data_array.push(_.values(csv_data[i]))
		}
	}

	function create_table() {
		console.log("in create_table function")
		table = $('#csv-table').DataTable({
		      	data: data_array,
		      	columnDefs: [
		        		{ targets: [0, 2], visible: true}
		        	]
		})
	}

	// create_table()

	$("#csv-file").change(handleFileSelect);

	// show tabs when clicked
	$(".nav-tabs a").click(function(){
      	$(this).tab('show')
  	});

	// create map
	var map = L.map('map').setView([37.8, -96], 4)
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
		attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
		}).addTo(map)

	// resize map because it's created in hidden panel initially
	$(".nav-tabs a").on("shown.bs.tab", function() {
		map.invalidateSize();
	});

	// make dropdown menu to select distress criteria for map
	function build_criteria_select() {
		for ( i in criteria){
			criteria_string = criteria[i];	
			$(".criteria").append($("<option value='" + criteria_string + "'>" + criteria_string + "</option>"));
		}
	}

	build_criteria_select()

	// update map when criteria drop down is changed
	$('.criteria').on("change", function() {
  		selected_criteria = ($(this).val())
  		style_polygons()
	})

	// make choropleth of state overlays
	function getColor(d) {
		return d > 0 ? "#ff3300" :
			"#0000ff";
	    	// return d > 1000 ? '#800026' :
	     //       d > 500  ? '#BD0026' :
	     //       d > 200  ? '#E31A1C' :
	     //       d > 100  ? '#FC4E2A' :
	     //       d > 50   ? '#FD8D3C' :
	     //       d > 20   ? '#FEB24C' :
	     //       d > 10   ? '#FED976' :
	     //                  '#FFEDA0';
	}

	// initially color map polygons depending on criteria selected
	function style(feature) {
		if(selected_criteria == "Unemployment"){
			return {
				fillColor: getColor(Number(feature.properties.unemp_distress)),
				weight: 1,
				opacity: 1,
				color: 'white',
				fillOpacity: 0.7
			}
		}
		if(selected_criteria == "Per capita income"){
			return {
				fillColor: getColor(Number(feature.properties.pc_inc_distress)),
				weight: 1,
				opacity: 1,
				color: 'white',
				fillOpacity: 0.7
			}
		}
	}

	// update color for map polygons depending on criteria selected
	function style_polygons() {
		geojson.eachLayer(function (layer) {
			if(selected_criteria == "Unemployment"){
				layer.setStyle({
					fillColor: getColor(Number(layer.feature.properties.unemp_distress)),
					weight: 1,
					opacity: 1,
					color: 'white',
					fillOpacity: 0.7
				})
			}
			if(selected_criteria == "Per capita income"){
				layer.setStyle({
					fillColor: getColor(Number(layer.feature.properties.pc_inc_distress)),
					weight: 1,
					opacity: 1,
					color: 'white',
					fillOpacity: 0.7
				})
			}
		})	 
	}

	// highlight on mouseover
	var geojson

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 1,
			color: '#666',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties)
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target)
		info.update()
	}

	// function zoomToFeature(e) {
 //    		map.fitBounds(e.target.getBounds());
	// }

	// popup on mouse click

	var popup = L.popup();

	function onMapClick(e) {
		geojson.eachLayer(function (layer) {
			// layer.bindPopup(layer.feature.properties.county_state + "<br>" + "test")
			layer.bindPopup('<h3>' + layer.feature.properties.county_state + '</h3>' +
				"County per capita income: ".bold() + numeral(layer.feature.properties.pc_inc).format("$0,0") + "<br />" +
				"National per capita income: ".bold() + numeral(layer.feature.properties.pc_inc_nat).format("$0,0") + "</b><br />" + 
				"Per capita income distressed?: ".bold() +
				layer.feature.properties.pc_inc_distress.replace("0", "No").replace("1", "Yes") + "</b><br /><br />" + "County unemployment rate: ".bold() + 
				numeral(layer.feature.properties.unemp_rate).format("0.00") + "%" + "</b><br />" +
				"National unemployment rate: ".bold() + numeral(layer.feature.properties.unemp_rate_nat).format("0.00") + "%" + "</b><br />" + 
				"Unemployment distressed?: ".bold() + 
				layer.feature.properties.unemp_distress.replace("0", "No").replace("1", "Yes"))
		})
	}

	// assign functions to onEachFeature for mouseover, mouseout, click
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			// click: zoomToFeature
			click: onMapClick
		})
	}

	// add polygons to map
	geojson = L.geoJson(counties, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map)

	// create custom control box when hovering over state
	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	    this.update();
	    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) {
		this._div.innerHTML = '<h4>County Economic Indicators</h4>' +  (props ?
			"<h3>" + props.county_state + "</h3>" + "County per capita income: ".bold() + 
			numeral(props.pc_inc).format("$0,0") + "<br />" +
			"National per capita income: ".bold() + numeral(props.pc_inc_nat).format("$0,0") + "</b><br />" + 
			"Per capita income distressed?: ".bold() +
			props.pc_inc_distress.replace("0", "No").replace("1", "Yes") + "</b><br /><br />" + "County unemployment rate: ".bold() + 
			numeral(props.unemp_rate).format("0.00") + "%" + "</b><br />" +
			"National unemployment rate: ".bold() + numeral(props.unemp_rate_nat).format("0.00") + "%" + 
			"</b><br />" + "Unemployment distressed?: ".bold() + 
			props.unemp_distress.replace("0", "No").replace("1", "Yes") : 'Hover over a county');
	};

	info.addTo(map);

	// create legend
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'info legend'),
	        grades = [0, 1],
	        labels = ["Not distressed", "Distressed"];

	    // loop through our legend intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
	            labels[i] + (grades[i + 1] ? '<br>' : '');
	    }

	    return div;
	};

	legend.addTo(map);

})

