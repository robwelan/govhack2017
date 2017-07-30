# GovHack 2017
Road Fatalities Dashboard for June 2017.

See [https://robwelan.github.io/govhack2017/](https://robwelan.github.io/govhack2017/).

## Introduction
Uses data from: [https://2017.hackerspace.govhack.org/dataset/australian-road-deaths-database-ardd](https://2017.hackerspace.govhack.org/dataset/australian-road-deaths-database-ardd).

Which should take you here [https://data.gov.au/dataset/australian-road-deaths-database](https://data.gov.au/dataset/australian-road-deaths-database).

From here you can find 'ARDD Fatalities June 2017' and 'ARDD Fatal Crashes June 2017'. This project uses both of those files.

## How?
The files have been converted to JSON. These have then been passed into [https://d3js.org/](D3.js) and turned into simple bar charts.

## What Else Could Be Done?
Ideally link to location data via the CrashID. This would allow fatalies to be linked to potential 'black spots' on our roads - which could then be used by roads and transport to target improvements (if accidents are deemed 'too frequent') at locations with more than 'X' fatal accidents (where 'X' presumably would be determined by policy).

## Why Only Two Graphs?
Time is the enemy.