# Data Dashboard with Infusion
Tool for explorative, accessible data visualisations

## Current State
As of right now, the project only supports CSV data formats and works on line graphs. I am in the process of working out best practices for data selection interactions, which will then allow me to expand the types of graphs supported.

## To Do

The first iteration of this project is being supported by Google Summer of Code and the Inclusive Design Institute. The goals for the first iteration are listed below. The list should be up to date with currently implemented functionality.

- [x] Use Fluid's Infusion to build basic component structure
- [x] Support CSV parsing and pass data across components
- [x] Use d3 to get sample graph working
- [x] Make a user-friendly design for working with data after parsing
- [] Allow user to choose arbitrary data to bind to x,y axes
- [] Support basic options for colors and axis customization
- [] Add support for Pie Chart
- [] Make graph messages accessible by attaching flocking

## Run Example

If you'd like to see the tool run an example visualization, clone the repo and follow the steps below.

- Run `python -m SimpleHTTPServer 8000` in the root of the repo (or your favorite simple server).
- Then take your browser to `localhost:8000` There should already be sample data in the text area. Use that or any other CSV data you want to copy and paste into the textfield.
- Use the dropdown box at the top to select line graph.
- Press the "Parse" button.

A line graph built from d3 and a selection box of data fields should appear.
