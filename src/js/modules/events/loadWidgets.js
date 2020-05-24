import {getAllWidget} from '../localStorage'
import loadWidget from './loadWidget'

const loadAllWidgets = ()=>{
    const listWidgets = getAllWidget()
    listWidgets.forEach(element => {
        loadWidget(element)
    });

}

export default loadAllWidgets;