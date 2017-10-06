function parseNull(JSONInput) {	
	return (JSONInput.slice(0, 4) == 'null') ? [null, JSONInput.slice(4)] : null;
}

function parseBoolean(JSONInput) {	
	return (JSONInput.slice(0, 4) == 'true') ? [true, JSONInput.slice(4)] : ((JSONInput.slice(0, 5) == 'false') ? [false, JSONInput.slice(5)] : null);
}

function parseNum(JSONInput)	{
	let match = /^[-+]?[0-9]+(.[0-9]+([eE][-+]?[0-9]+)?)?/.exec(JSONInput), numb = "", i;
	if (match == null || match.index != 0) return null;	
	for (i = match.index ; /[-+0-9.eE]/.test(JSONInput[i]) && JSONInput[i] != undefined; i++) numb += JSONInput[i].toString();
	return [parseFloat(numb), JSONInput.slice(i)];    
}	

function parseString(JSONInput)	{		
	let string = "", i = 1;
	if (JSONInput[0] != '"') return null;
	while(true) {
		if(JSONInput[i-1]!="\\" && JSONInput[i]=='"') break;
		string += JSONInput[i];
		i++;
	}
	return [string, JSONInput.slice(i+1)];
}

function parseArray(JSONInput)	{
	if (JSONInput[0] !== "[") return null;
	JSONInput = JSONInput.slice(1);
	JSONInput = parseSpace(JSONInput);
	let arr = [], val;		
	while (JSONInput[0] !== "]") 	{
		val = parseValue(parseSpace(JSONInput));
		if (val == null) return null;
		arr.push(val[0]);
		JSONInput = (parseComma(val[1]) != null) ? parseComma(val[1]) : val[1];
		JSONInput = parseSpace(JSONInput);
	}
	return [arr, JSONInput.slice(1)];
}

function parseObject(JSONInput)	{
	if(JSONInput[0] != "{") return null;
	let obj = {}, strng, value, val1, val2;
	JSONInput = JSONInput.slice(1);
	JSONInput = parseSpace(JSONInput);
	while (JSONInput[0] !== "}") 	{
		val1 = parseString(parseSpace(JSONInput));
		if (val1 == null) return null;
		strng = val1[0];	
		JSONInput = (parseColon(val1[1]) != null) ? parseColon(val1[1]) : val1[1];
		val2 = parseValue(parseSpace(JSONInput));
		if (val2 == null) return null;
		value = val2[0];
		obj[strng] = value;
		JSONInput = (parseComma(val2[1]) != null) ? parseComma(val2[1]) : val2[1];	
		JSONInput = parseSpace(JSONInput);	
	}	
	return [obj, JSONInput.slice(1)];
}

function parseColon(JSONInput)	{
	JSONInput = parseSpace(JSONInput);
	return (JSONInput[0] == ":") ? JSONInput.slice(1) : null;
}

function parseComma(JSONInput)	{
	JSONInput = parseSpace(JSONInput);
	return (JSONInput[0] == ",") ? JSONInput.slice(1) : null;
}

function parseSpace(JSONInput) {
	while(/\s/.test(JSONInput[0])) JSONInput = JSONInput.slice(1);
	return JSONInput;
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

let parseValue = factoryParsers(parseNull, parseBoolean, parseNum, parseString, parseArray, parseObject);

exports.parseJSON = function(JSONInput) {
	let value = parseValue(parseSpace(JSONInput));
	return (value != null) ? value[0] : "Invalid JSON";
}
