function parseNull(JSONInput) {	
	JSONInput = JSONInput.replace(/\s*n\s*u\s*l\s*l\s*/g,"null");
	if(JSONInput.slice(0, 4) == 'null')	{
		console.log("Null")
		JSONInput = JSONInput.slice(4);
		return [null, JSONInput];
	}
	return null;		
}

function parseTrue(JSONInput) {	
	JSONInput = JSONInput.replace(/\s*t\s*r\s*u\s*e\s*/g,"true");
	if(JSONInput.slice(0, 4) == 'true')	{
		console.log("True")
		JSONInput = JSONInput.slice(4);
		return [true, JSONInput];
	}
	return null;		
}

function parseFalse(JSONInput)	{
	JSONInput = JSONInput.replace(/\s*f\s*a\s*l\s*s\s*e\s*/g,"false");	
	if(JSONInput.slice(0, 5) == 'false')	{
		console.log("False")
		JSONInput = JSONInput.slice(5);
		return [false, JSONInput];
	}
	return null;		
}

function parseNum(JSONInput)	{	
	let reg = new RegExp('^-?[0-9]+(.[0-9]+)?([eE][+-]?[0-9]+)?'); 
	let match = reg.exec(JSONInput);
	// console.log("hello");
	// console.log(match);
	if (match == null || match.index != 0) 
		return null;	
	let i = match.index, numb = "";
	console.log("Number");
	// console.log(JSONInput)
	while (/^-?[0-9]*(.[0-9]+)?([eE][+-]?[0-9]+)?/.test(JSONInput[i]) && JSONInput[i] != undefined)	{
		numb += JSONInput[i].toString();
		// console.log(numb);
		i++;
		// console.log(JSONInput[i]);
	}
	// console.log(numb);
	numb = parseFloat(numb);
	JSONInput = JSONInput.slice(i);
	// console.log([numb, JSONInput]);
	return [numb, JSONInput];    
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

function parseSpace(JSONInput)	{
	return JSONInput.replace(/\s+/g,"");
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
	if (value != null)
		return value[0];
	else
		return "Bad Luck";
}
