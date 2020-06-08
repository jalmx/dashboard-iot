import headerEvents  from "./modules/events/header";
import {addCardEvents}  from "./modules/events/cardAdd"; 
import loadAllWidgets from './modules/events/loadWidgets'
import evetDocument from "./modules/events/evetDocument";

loadAllWidgets()
headerEvents()
addCardEvents()
evetDocument()