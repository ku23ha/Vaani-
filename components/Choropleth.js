import React, { memo, useEffect, useMemo } from 'react';

import { ResponsiveChoropleth } from '@nivo/geo';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import PropTypes from "prop-types";
import { MAP_AREAS } from "../src/choroplethHelpers";
import useCurrentTheme from "../common/hooks/useCurrentTheme";

const correctDistrictName = {
    //"Anantapur": "Anantpur",
    "Devbhumi Dwarka": "DevbhoomiDwarka",
    "Visakhapatnam": "Vishakapattanam",
    "East Champaran": "EastChamparan",
    "Jehanabad": "Jahanabad",
    "Kabeerdham": "Kabirdham",
    "Surguja": "Sarguja",
    "Sahibganj": "Sahebganj",
    "Belagavi": "Belgaum",
    "Ballari": "Bellary",
    "Chamrajnagar": "Chamarajanagara",
   // "Dakshina Kannada": "DakshinKannada",
    "Kalaburagi": "Gulbarga",
    "Mysuru": "Mysore",
    "Shivamogga": "Shimoga",
    "Vijayapura": "Bijapur",
   // "Sindhudurg": "Sindhudurga",
    "Tehri Garhwal": "TehriGarhwal",
    "Dakshin Dinajpur": "DakshinDinajpur",
    "Kolkata": "Kolkata",
    "North 24 Parganas": "North24Parganas",
    "Paschim Medinipur": "PaschimMedinipur",
    "Amroha": "JyotibaPhuleNagar",
   // "Muzaffarnagar": "Muzzaffarnagar",
    // added
    "North Goa": "NorthSouthGoa",
    "South Goa": "NorthSouthGoa",
    "Unokoti": "Unakoti",
    "Delhi": "NewDelhi",
    "Mumbai": "Mumbai Suburban",
    "Bengaluru Urban": "Bangalore",
    //"Sindhudurg": "Sindhudurg",
    "Dakshina Kannada": "Dakshina Kannada",
    "Muzaffarnagar": "Muzaffarnagar",
    "Anantapur": "Anantpur",
    "Sri Sathya Sai": "SriSatyaSai",
    "Annamayya": "Annamaya"
};

//normalizeName func()
const normalizeName = (name) => {
    if (!name) return "";
    return String(name)
        .toLowerCase()
        .normalize("NFD").replace(/\p{Diacritic}+/gu, "") // remove accents
        .replace(/[^a-z0-9]/g, ""); // remove spaces/punctuation
};

const jsonPath = (region) => `/maps/${region}.json`;


const customColors = [
    "#e8f4fd",
    "#b3d9ff",
    "#66b3ff", 
    "#1a8cff",
    "#0066cc",
    "#004080"  
];

const Choropleth = memo(({
    region = "india",
    dataLevel = "districts",
    data = [],
    domain = [0, 50000],
    unknownColor,
    valueFormat = ".2s",
    colors = customColors,
    graticuleColor = "#f68c8c",
    enableLegend = true,
    noStateName = false,
    projectionTranslation = [0.5, 1.12],
    projectionRotation = [-83, 0, 0],
    projectionScale = 800,
    legend = [
        {
            anchor: 'bottom',
            direction: 'column',
            justify: true,
            translateX: -183,
            translateY: -45,
            itemsSpacing: 0,
            itemWidth: 82,
            itemHeight: 24,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 21,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ], ...rest
}) => {

    const [mapLoadingError, setMapLoadingError] = React.useState(null);
    const [features, setFeatures] = React.useState(null);

    const theme = useCurrentTheme();

    const unknownColorDerived = useMemo(() => {
        return theme === "dark" ? "#e5e5e5" : "#e5e5e5";
    }, [theme]);

    const legendTextColor = useMemo(() => {
        return theme === "dark" ? "#e5e5e5" : "#e5e5e5";
    }, [theme]);

    const processedLegends = useMemo(() => {
        return legend.map((legend) => {
            return {
                itemTextColor: legendTextColor,
                ...legend,
            }
        });
    }, [legend, legendTextColor]);

    useEffect(() => {
        if (!region) {
            return;
        }

        // Build lookup from dataset IDs
        const normalizedIdToDataId = new Map();
        if (Array.isArray(data) && dataLevel === "districts") {
            for (const d of data) {
                if (!d || !d.id) continue;
                normalizedIdToDataId.set(normalizeName(d.id), d.id);
            }
        }

        d3.json(jsonPath(region)).then((topology) => {
            const features = topojson.feature(topology, topology.objects?.[dataLevel]).features;

            if (dataLevel === "districts") {
                features.forEach((feature) => {
                    let district = feature.properties.district;

                    if (correctDistrictName[district]) {
                        district = correctDistrictName[district];
                    }

                    const normalized = normalizeName(district);
                    const mappedFromData = normalizedIdToDataId.get(normalized);
//Debugging Output
                    if (!mappedFromData) {
    console.warn(
        "No match for:",
        feature.properties.st_nm,
        "-",
        district,
        "| normalized:",
        normalized
    );
}

                    
                    if (mappedFromData) {
                        district = mappedFromData; // use dataset's exact ID
                    }

                    feature.id = noStateName ? district : `${feature.properties.st_nm}-${district}`;
                });
            }

            if (dataLevel === "states") {
                features.forEach((feature) => {
                    let state = feature.properties.st_nm.replace(/\s+/g, '');
                    feature.id = state;
                });
            }

            setFeatures(features);
        }).catch((error) => {
            setMapLoadingError(error);
        });
    }, [region, dataLevel, data, noStateName]);  //update dependencies

    if (!features) {
        return null;
    }

    return (
        <div className={"h-[240px] w-full md:h-[500px] md:w-[340px] lg:h-[500px] lg:w-[500px] text-zinc-800 choropleth"}>
            <ResponsiveChoropleth
                features={features}
                domain={domain}
                unknownColor={unknownColor || unknownColorDerived}
                label={dataLevel === "districts" ? "properties.district" : "id"}
                data={data}
                match={"id"}
                valueFormat={valueFormat}
                projectionTranslation={projectionTranslation}
                projectionRotation={projectionRotation}
                projectionScale={projectionScale}
                graticuleLineColor={graticuleColor}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                colors={colors}
                legends={processedLegends}
                {...rest}
            />
        </div>
    );
});

Choropleth.displayName = 'Choropleth';
Choropleth.propTypes = {
    ...ResponsiveChoropleth.propTypes,
    area: PropTypes.oneOf(Object.values(MAP_AREAS)),
    dataLevel: PropTypes.oneOf(["districts", "states"]),
    data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, value: PropTypes.number })),
    colors: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    enableLegend: PropTypes.bool,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Choropleth;