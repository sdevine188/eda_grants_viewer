var counties = counties_json2()
var criteria = ["Unemployment", "Per capita income"]
var selected_criteria = "Unemployment"
var csv_data
var filtered_csv_data_for_table = []
var variable_list = []
var display_columns = []
var column_def_for_table = []
var data_values_array_for_table = []
var table

$(document).ready(function(){

	// parse uploaded csv into data variable
	function handleFileSelect(evt) {
		var file = evt.target.files[0];

		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				csv_data = []
				csv_data = results.data
				create_display_columns()
				filter_csv_data_for_table()
				create_column_def()
				convert_obj_to_array()
				destroy_table()
				create_table()
				add_filters()
			}
		});
	}

	function create_display_columns() {
		// display_columns = ["Control.", "Status", "FY", "Appr.Desc", "Best.EDA..", "Appl.Short.Name",
		// 	"Project.Short.Descrip", "Initiatives", "Proj.ST.Abbr", "RO.."]
		variable_list = _.allKeys(csv_data[1])
		display_columns = ["Status", "FY", "Appropriation"]
	}

	function filter_csv_data_for_table() {
		for(i = 0; i < csv_data.length; i++) {
			filtered_csv_data_for_table.push(_.pick(csv_data[i], display_columns))
		}
	}

	function create_column_def() {
		for(i = 0; i < display_columns.length; i++) {
			var individual_column_def = {}
			individual_column_def.targets = i
			individual_column_def.title = display_columns[i]
			column_def_for_table.push(individual_column_def)
		}
	}

	function convert_obj_to_array(data) {
		for(i = 0; i < csv_data.length - 1; i++){
			data_values_array_for_table.push(_.values(filtered_csv_data_for_table[i]))
		}
	}

	function destroy_table() {
		if(!(table == null)) {
			table.destroy()
		}
	}

	function create_table() {
		table = $('#csv-table').DataTable({
		      	data: data_values_array_for_table,
		      	stateSave: true,
		      	lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
		      	pageLength: 5,
		      	columnDefs: column_def_for_table
		})
	}

	function add_filters() {
		var num_columns_disp = table.columns().header().length
		for (i = 0; i < num_columns_disp; i++){
			yadcf.init(table, [{
				column_number: i,
				filter_type: "text",
				exclude: true,
				exclude_label: '!(not)'
			}])
		} 
	}

	$("#csv-file").change(handleFileSelect);

	// $(function() {
	// 	$('#select_col_display').selectize({
	// 		delimiter: ',',
	// 		persist: false,
	// 		options: ["test", "test2", "test3"]
	// 		// create: function(input) {
	// 		// 	return {
	// 		// 		value: input,
	// 		// 		text: input
	// 		// 	}
	// 		// }
	// 	});
	// });

	var $select = $('#select_col_display').selectize({
		maxItems: null,
		valueField: 'id',
		labelField: 'title',
		searchField: 'title',
		options: [
			{id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
			{id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
			{id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
		],
		create: false
	});

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

