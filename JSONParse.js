
exports.parseJSON = function(JSONInput) {
	return parseString(JSONInput);
}

function parseNull(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'n') 
			if(JSONInput.slice(i, i+4) == 'null')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [null,JSONInput];
			}
	return null;		
}

function parseTrue(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 't') 
			if(JSONInput.slice(i, i+4) == 'true')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [true,JSONInput];
			}
	return null;		
}

function parseFalse(JSONInput)	{
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'f') 
			if(JSONInput.slice(i, i+5) == 'false')	{
				JSONInput = JSONInput.slice(i+5,JSONInput.length);
				return [false,JSONInput];
			}
	return null;		
}

function parseNum(JSONInput)	{
	let num = "",reg = new RegExp('^[0-9]+'),match = reg.exec(JSONInput); 
	if (match != null) {
		i = match.index;
    	while(reg.test(JSONInput[i]))	{
    		num += JSONInput[i];
    		i++;
    	}
    	JSONInput = JSONInput.slice(i,JSONInput.length);
    	return [num, JSONInput];
    }
    return null;
}

function parseString(JSONInput)	{
	let string = "",match = /\S/.exec(JSONInput); 
	if (match != null) {
		i = match.index + 1;
    	while(JSONInput[i] != '"')	{
    		string += JSONInput[i];
    		i++;
    	}
    	JSONInput = JSONInput.slice(i+1,JSONInput.length);
    	return [string, JSONInput];
    }
    return null;
}

