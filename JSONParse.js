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
	let num ="", reg = new RegExp('^[0-9]+'), match = reg.exec(JSONInput), i = 0; 
	if (match == null || match.index != 0) return null;
	console.log("Number")
	while(reg.test(JSONInput[i]))	{
		num += JSONInput[i];
		i++;
	}
	num = parseFloat(num);
	JSONInput = JSONInput.slice(i);
	return [num, JSONInput];    
}	

function parseString(JSONInput)	{	
	let string = '', i = 1;
	if (JSONInput[0] != '"') return null;
	console.log("String")
	while(JSONInput[i] != '"')	{
		string += JSONInput[i];
		i++;
	}	
	JSONInput = JSONInput.slice(i+1);
	console.log(JSONInput);
	return [string, JSONInput];
}

function parseArray(JSONInput)	{
	if(JSONInput[0] != "[") return null;
	let arr = [], val;
	JSONInput = JSONInput.slice(1);
	console.log("Array")		
	while (JSONInput[0] !== "]") 	{
		val = parseValue(JSONInput);
		if (val == null) return null;
		arr.push(val[0]);
		console.log(arr);
		if (parseComma(val[1]) != null)
			JSONInput = parseComma(val[1]);
		else
			JSONInput = val[1];
		console.log(JSONInput);			
	}	
	return [arr, JSONInput.slice(1)];
}

function parseObject(JSONInput)	{
	if(JSONInput[0] != "{") return null;
	let obj = {}, strng, value, val1, val2;
	JSONInput = JSONInput.slice(1);
	console.log("Object")		
	while (JSONInput[0] !== "}") 	{
		val1 = parseValue(JSONInput);
		if (val1 == null) return null;
		strng = val1[0];	
		if (parseColon(val1[1]) != null)
			JSONInput = parseColon(val1[1]);
		else
			JSONInput = val1[1];	
		val2 = parseValue(JSONInput);
		if (val2 == null) return null;
		value = val2[0];
		obj[strng] = value;
		if (parseComma(val2[1]) != null)
			JSONInput = parseComma(val2[1]);
		else
			JSONInput = val2[1];			
	}	
	return [obj, JSONInput.slice(1)];
}

function parseColon(JSONInput)	{
	if (JSONInput[0] == ":")
		return JSONInput.slice(1);
	return null;
}

function parseComma(JSONInput)	{
	if (JSONInput[0] == ",")
		return JSONInput.slice(1);
	return null;
}

function factoryParsers(...parsers)	{
	return function(In)	{
		for(let i = 0; i < parsers.length; i++)	{
			let result = parsers[i](In);
			if (result != null)	return result;
		}
		return null;
	}
}

let parseValue = factoryParsers(parseNull, parseTrue, parseFalse, parseNum, parseString, parseArray, parseObject);

exports.parseJSON = function(JSONInput) {
	let value = parseValue(JSONInput);
	return value[0];
}
