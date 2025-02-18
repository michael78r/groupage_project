// Utilitaire de formatage de montant
export const mois = (value) => {
    let m = "";
    if(value===1){
        m = "01"
    }  
    else if(value===2){
        m = "02"
    }
    else if(value===3){
        m = "03"
    } 
    else if(value===4){
        m = "04"
    } 
    else if(value===5){
        m = "05"
    } 
    else if(value===6){
        m = "06"
    } 
    else if(value===7){
        m = "07"
    } 
    else if(value===8){
        m = "08"
    } 
    else if(value===9){
        m = "09"
    } 
    else if(value===10){
        m = "10"
    } 
    else if(value===11){
        m = "11"
    } 
    else if(value===12){
        m = "12"
    } 
    return m;
};
