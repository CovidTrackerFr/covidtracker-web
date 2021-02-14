var g = new JustGage({
    id: "gauge_incidence",
    value: $("#gauge_incidence").data('value'),
    min: 0,
    max: 250,
    symbol: $("#gauge_incidence").data('symbol'),
    title: $("#gauge_incidence").data('title'),
    pointer: true,
    pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 12,
        color: '#8e8e93',
        stroke: '#ffffff',
        stroke_width: 3,
        stroke_linecap: 'round'
    },
    counter: true,
    showInnerShadow: true,
    customSectors: {
        percents: false,
        ranges: [
            {
                color: "#a9d70b",
                lo: 0,
                hi: 10
            },
            {
                color: "#f9c802",
                lo: 10,
                hi: 50
            },
            {
                color: "#ff0000",
                lo: 50
            },
        ]
    }
});

var g = new JustGage({
    id: "gauge_positivite",
    value: $("#gauge_positivite").data('value'),
    min: 0,
    max: 15,
    decimals: 1,
    showInnerShadow: true,
    pointer: true,
    pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 12,
        color: '#8e8e93',
        stroke: '#ffffff',
        stroke_width: 3,
        stroke_linecap: 'round'
    },
    title: "Taux de positivité",
    symbol: $("#gauge_positivite").data('symbol'),
    customSectors: {
        percents: false,
        ranges: [
            {
                color: "#a9d70b",
                lo: 0,
                hi: 5
            },
            {
                color: "#f9c802",
                lo: 5,
                hi: 10
            },
            {
                color: "#ff0000",
                lo: 10,
                hi: 100
            },
        ]
    }
});

var g = new JustGage({
    id: "gauge_reff",
    value: $("#gauge_reff").data('value'),
    min: 0,
    max: 3,
    decimals: 2,
    title: "Reff",
    pointer: true,
    symbol: $("#gauge_reff").data('symbol'),
    pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 12,
        color: '#8e8e93',
        stroke: '#ffffff',
        stroke_width: 3,
        stroke_linecap: 'round'
    },
    customSectors: {
        percents: false,
        ranges: [
            {
                color: "#a9d70b",
                lo: 0,
                hi: 1
            },
            {
                color: "#f9c802",
                lo: 1,
                hi: 1.5,
            },
            {
                color: "#ff0000",
                lo: 1.5
            },
        ]
    }
});

var g = new JustGage({
    id: "gauge_tension",
    value: $("#gauge_tension").data('value'),
    min: 0,
    max: 100,
    symbol: $("#gauge_tension").data('symbol'),
    pointer: true,
    pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 12,
        color: '#8e8e93',
        stroke: '#ffffff',
        stroke_width: 3,
        stroke_linecap: 'round'
    },
    title: "Tension hospitalière",
    customSectors: {
        percents: false,
        ranges: [
            {
                color: "#a9d70b",
                lo: 0,
                hi: 30
            },
            {
                color: "#f9c802",
                lo: 30,
                hi: 60
            },
            {
                color: "#ff0000",
                lo: 60,
                hi: 100
            },
        ]
    }
});