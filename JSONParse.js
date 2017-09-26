
exports.parseJSON = function(JSONInput) {
	return parseFalse(JSONInput);
}

function parseNull(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'n') 
			if(JSONInput.slice(i, i+4) == 'null')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [null,JSONInput];
			}
	return ["", JSONInput];		
}

function parseTrue(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 't') 
			if(JSONInput.slice(i, i+4) == 'true')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [true,JSONInput];
			}
	return ["", JSONInput];		
}

function parseFalse(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'f') 
			if(JSONInput.slice(i, i+5) == 'false')	{
				JSONInput = JSONInput.slice(i+5,JSONInput.length);
				return [false,JSONInput];
			}
	return ["", JSONInput];		
}