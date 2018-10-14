const generateLine=function(length,symbol){
  let line="";
  for(let index=0; index<length; index++){
    line+=symbol;
  }
  return line;
}

const createRow=function(length,symbol,frontSpaces){
  return generateLine(frontSpaces," ")+generateLine(length,symbol)
}

const index=function(arg){
  return 1%(arg+1);
}

const botindex=function(arg){
  return 1%arg;
}

const filledRectangle=function(column,row,symbol){
  let line="";
  let delimeter="";
  for(let index=0; index<row; index++){
    line+=delimeter+generateLine(column,symbol);
    delimeter="\n";
  }
  return line;
}

const hollowRectangle=function(column,row,symbol){
  let line=filledRectangle(column,index(row),symbol);
  let delimeter="\n";
  for(let loopIndex=0; loopIndex<row-2; loopIndex++){
    line+=delimeter+generateLine(index(column),symbol);
    line+=generateLine(column-2," ")+generateLine(botindex(column),symbol);
  }
  return line+delimeter+filledRectangle(column,botindex(row),symbol);
}

const alternatingRectangle=function(column,row,symbol1,symbol2){
  let line=filledRectangle(column,index(row),symbol1);
  let delimeter="\n";
  for(let loopIndex=0; loopIndex<row-1; loopIndex++){
    if(loopIndex%2==0){
      line+=delimeter+generateLine(column,symbol2);
    }else{
      line+=delimeter+generateLine(column,symbol1);
    }
  }
  return line;
}

const createRectangle=function(name,column,row,symbol1,symbol2){
  return name(column,row,symbol1,symbol2);
}

const triangle=function(name,length,symbol){
  let line=name(index(length),symbol,length-1);
  let delimeter="\n";
  for(let index=2; index<=length; index++){
    line+=delimeter+name(index,symbol,length-index);
  }
  return line;
}

const diamondRow=function(length,column,symbol1,symbol2,symbol3){
  let line=generateLine(Math.floor(length/2)-Math.floor(column/2)," ");
  line+=symbol1+generateLine(column-2,symbol2)+symbol3;
  return line;
}

const generateDiamond=function(length,symbol1,symbol2,symbol3){
  let line=createRow(index(length),"*",Math.floor(length/2));
  let delimeter="\n";
  let botDiamond=createRow(botindex(length),"*",Math.floor(length/2));
  for(let index=3; index<=length-2; index+=2){
    line+=delimeter+diamondRow(length,index,symbol1,symbol2,symbol3);
    botDiamond=diamondRow(length,index,symbol3,symbol2,symbol1)+delimeter+botDiamond;
  }
  line+=delimeter+generateLine(botindex(length),"*");
  line+=generateLine(length-2,symbol2)+generateLine(botindex(length),"*");
  line+=delimeter+botDiamond;
  return line;
}
let type={};
let column=+process.argv[4];
let row=+process.argv[5];
type["filledRectangle"]=createRectangle(filledRectangle,column,row,"*","*");
type["hollowRectangle"]=createRectangle(hollowRectangle,column,row,"*"," ");
type["alternatingRectangle"]=createRectangle(alternatingRectangle,column,row,"*","-");

type["rightTriangle"]=triangle(createRow,column,"*");
type["leftTriangle"]=triangle(generateLine,column,"*");

type["filledDiamond"]=generateDiamond(column,"*","*","*");
type["hollowDiamond"]=generateDiamond(column,"*"," ","*");
type["angledDiamond"]=generateDiamond(column,"/"," ","\\");
let pattern=type[process.argv[3]+process.argv[2]];
console.log(pattern);
