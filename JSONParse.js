
exports.parseJSON = function(JSONInput) {
	let value;
	value = parseValue(JSONInput);
	return value[0];
}

function parseNull(JSONInput) {	
	if(JSONInput.slice(0, 4) == 'null')	{
		console.log("Null")
		JSONInput = JSONInput.slice(4);
		return [null, JSONInput];
	}
	return null;		
}

function parseTrue(JSONInput) {	
	if(JSONInput.slice(0, 4) == 'true')	{
		console.log("True")
		JSONInput = JSONInput.slice(4);
		return [true, JSONInput];
	}
	return null;		
}

function parseFalse(JSONInput)	{	
	if(JSONInput.slice(0, 5) == 'false')	{
		console.log("False")
		JSONInput = JSONInput.slice(5);
		return [false, JSONInput];
	}
	return null;		
}

function parseNum(JSONInput)	{	
	let num = "",reg = new RegExp('^[0-9]+'),match = reg.exec(JSONInput); 
	if (match != null) {
		console.log("Number")
		i = match.index;
    	while(reg.test(JSONInput[i]))	{
    		num += JSONInput[i];
    		i++;
    	}
    	JSONInput = JSONInput.slice(i);
    	return [num, JSONInput];
    }
    return null;
}

function parseString(JSONInput)	{	
	let string = "",match = /"(\S)+"/.exec(JSONInput); 
	if (match != null) {
		console.log("String")
		i = match.index + 1;
    	while(JSONInput[i] != '"')	{
    		string += JSONInput[i];
    		i++;
    	}
    	JSONInput = JSONInput.slice(i+1);
    	return [string, JSONInput];
    }
    return null;
}

function parseArray(JSONInput)	{
	if(JSONInput[0] != "[") return null;
	let arr = [], val;
	console.log("Array")		
	while (JSONInput[0] !== "]") 	{
		val = parseValue(JSONInput.slice(1));
		// console.log(val);
		if (val == null) return null;
		arr.push(val[0]);
		// console.log(arr);
		if (parseComma(val[1]) != null)
			JSONInput = parseComma(val[1]);
		else
			JSONInput = val[1];			
	}
	// console.log([arr, JSONInput])	
	return [arr, JSONInput];
}

function parseComma(JSONInput)	{
	if (JSONInput[0] == ",")
		return JSONInput.slice(1);
	return null;
}

let parseValue = factoryParsers(parseNull, parseTrue, parseFalse, parseNum, parseString, parseArray);


function factoryParsers(...parsers)	{
	return function(In)	{
		for(let i = 0; i < parsers.length; i++)	{
			let result = parsers[i](In);
			if (result != null)	return result;
		}
		return null;
	}
}
