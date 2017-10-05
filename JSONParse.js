function parseNull(JSONInput) {	
	return (JSONInput.slice(0, 4) == 'null') ? [null, JSONInput.slice(4)] : null;
}

function parseBoolean(JSONInput) {	
	return (JSONInput.slice(0, 4) == 'true') ? [true, JSONInput.slice(4)] : ((JSONInput.slice(0, 5) == 'false') ? [false, JSONInput.slice(5)] : null);
}

function parseNum(JSONInput)	{
	let match = /^-?[0-9]+(.[0-9]+)?([eE][+-]?[0-9]+)?/.exec(JSONInput), numb = "", i;
	if (match == null || match.index != 0) return null;	
	for (i = match.index ; /^-?[0-9]*(.[0-9]+)?([eE][+-]?[0-9]+)?$/.test(JSONInput[i]) && JSONInput[i] != undefined; i++) numb += JSONInput[i].toString();
	return [parseFloat(numb), JSONInput.slice(i)];    
}	

function parseString(JSONInput)	{	
	let string = "", i;
	if (JSONInput[0] != '"') return null;
	for (i = 1; JSONInput[i] != '"'; i++) string += JSONInput[i];
	return [string, JSONInput.slice(i+1)];
}

function parseArray(JSONInput)	{
	if(JSONInput[0] != "[") return null;
	let arr = [], val;
	JSONInput = JSONInput.slice(1);	
	while (JSONInput[0] !== "]") 	{
		val = parseValue(JSONInput);
		if (val == null) return null;
		arr.push(val[0]);
		if (parseComma(val[1]) != null)
			JSONInput = parseComma(val[1]);
		else {
			JSONInput = val[1];
		}		
	}
	return [arr, JSONInput.slice(1)];
}

function parseObject(JSONInput)	{
	if(JSONInput[0] != "{") return null;
	// console.log("Obj");
	let obj = {}, strng, value, val1, val2;
	JSONInput = JSONInput.slice(1);
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
	return JSONInput.replace(/([^"]+)|("[^"]+")/g, function($0, $1, $2) {
			    if ($1)
			        return $1.replace(/\s/g, '');
			    else
			    	return $2;
			});
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
	if (value != null)
		return value[0];
	else {
		// console.log(value)
		return "Nope";
	}
}
