# Data Dashboard with Infusion
Tool for explorative, accessible data visualisations

## Current State
As of right now, the project only supports CSV data formats and works on line graphs. I am in the process of working out best practices for data selection interactions, which will then allow me to expand the types of graphs supported.

## Run Example

If you'd like to see the tool run an example visualization, simple start by serving the directory.

- Run `python -m SimpleHTTPServer 8000` in the root of the repo
- Then take your browser to `localhost:8000` There should already be sample data in the text area. Use that or any other CSV data you want to copy and paste into the textfield.
- Use the dropdown box at the top to select line graph.
- Press the "Parse" button.

A line graph built from d3 and a selection box of data fields should appear.
