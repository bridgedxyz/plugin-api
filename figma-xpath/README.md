# Xpath for figma design

## Light mode - for navigating only (no property parsing)

For most cases, xpath on design is used for locating same child on main component, etc.. in this navigating scenario, we only need fraction of xpath's feature, optimized for design format. Light mode xpath is not a real xpath, it only mocks the navigating with similar & limited syntax. + query builder provided.

## Full mode - using real xpath (expensive)

Full mode first converts design to xml string, then runs the same full xpath on it. this is slightly expensive.

## JSONPath

(planned) also supports path finding with json path

- https://github.com/JSONPath-Plus/JSONPath
