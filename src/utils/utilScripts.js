function convertInput(name){
    
    var found = this.teamArr.find((element) => {
      return element.id? element.name === name : element.name !== name
    })
    if(found === undefined){
      return -1;
    }else{
      return found.id;
    }
   
  }