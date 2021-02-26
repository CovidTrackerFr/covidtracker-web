// require jquery and jquery-ui.widget-factory

/**
 * JQuery Plugin to add a data map of France
 * Requires Jquery UI Widget Factory
 * Usage : $('element').datamap({
 *      values: array of values - default : [">", "250", "150", "50"]
 *      colors: array of colors corresponding to values - default : ["#3c0000", "#c80000", "#f95228", "#98ac3b"]
 *      legendDirection : "ascending" or "descending" - default : "descending"
 *      symbol: trailing symbol for legend
 *      svgPath: path to the svg map
 *      data: data to be mapped - json format
 *  });
 * Licence : AGPL
 * @author Bruno Spyckerelle
 * @version 1.0
 */

( function() {
    $.widget('covidtracker.datamap', {

        /**
         *
         * @memberOf $
         */
        version: "0.0.1",

        legendContainer: null,

        options: {
            svgPath: "",
            values: [">", "250", "150", "50"],
            colors: ["#3c0000", "#c80000", "#f95228", "#98ac3b"],
            legendDirection: "descending",
            svgId: "data-num",
            iterationKey: "num_dep",
            valueKey: "incidence_cas",
            symbol: '',
            hoverCallback: function(){},
            clickCallback: function(){}
        },

        _create: function(){
            let self = this;
            if( this.options.values.length != this.options.colors.length) {
                throw 'Values and colors arrays have not the same size.';
            }
            self.element.load(self.options.svgPath, function(e){
                self.element.find('svg').css({'padding-right': '30px'}).attr('width', '').attr('height', '');
                self._colorize();
                self._buildLegend();
            });

        },

        _setOption: function(key, value) {
            this._super(key, value);
            let self = this;
            if(key == "svgPath") {
                this.element.load(value, function(e){
                    self.refresh();
                });
            } else {
                if( this.options.values.length != this.options.colors.length) {
                    throw 'Values and colors arrays have not the same size.';
                } else {
                    self.refresh();
                }
            }
        },

        /* *********************** */
        /* *** Public Methods *** */
        /* *** ******************* */

        /**
         * Redraw map
         */
        refresh: function(){
            this._colorize();
            this._buildLegend();
        },

        /* *********************** */
        /* *** Private Methods *** */
        /* *** ******************* */
        _buildLegend: function(){
            let self = this;
            if(this.legendContainer == null) {
                let randId = Math.floor(Math.random() * Math.floor(1000));
                this.legendContainer = $('<div id="legend'+randId+'" class="mapLegend" style="margin-bottom:-80px; float:right;"></div>');
                this.element.prepend(this.legendContainer);
            }
            this.legendContainer.empty().append('<table><tbody></tbody></table>');
            let tbody = this.legendContainer.find('tbody');
            this.options.values.map((val, idx) => {
                let value = self.options.values[idx];
                if(value > 0) {
                    value = '+ '+value;
                }
                if (value != '>') {
                    value = value + ' ' + self.options.symbol;
                }
                tbody.append('<tr><td style="text-align: center; background-color: '+self.options.colors[idx]+'; color: white; font-size: 50%; padding: 5px;">'+self.options.values[idx]+'</td></tr>')
            });
        },
        _getColor: function(value){
            if (this.options.direction == "ascending") {
                for (let i = this.options.colors.length -1; i >= 0; i--){
                    if (i == 0) {
                        return this.options.colors[i];
                    } else if ( value >= this.options.values[i]) {
                        return this.options.colors[i];
                    }
                }
            } else { //"descending" by default
                for (let i = this.options.colors.length -1; i >=0 ; i--) {
                    if( i == 0) { //borne supérieure
                        return this.options.colors[i];
                    } else if ( value <= this.options.values[i]) {
                        return this.options.colors[i];
                    }
                }
            }
        },
        _colorize: function(){
            let self = this;
            $.each(self.options.data, function(key, value){
                let selector = 'path[data-num="'+value[self.options.iterationKey]+'"]';
                let elt = self.element.find(selector);
                elt.css("fill", self._getColor(value[self.options.valueKey]));
            });
        }
    });
})(jQuery);