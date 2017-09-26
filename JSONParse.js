exports.parseJSON = function(JSONInput) {
	console.log(JSONInput.slice(0, 4));
}

function parseNull(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'n') 
			if(JSONInput.slice(i, i+4) == 'null')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [null,JSONInput];
			}		
}

function parseNull(JSONInput) {
	for(let i = 0; i < JSONInput.length - 1; i++) 
		if(JSONInput[i] == 'n') 
			if(JSONInput.slice(i, i+4) == 'true')	{
				JSONInput = JSONInput.slice(i+4,JSONInput.length);
				return [null,JSONInput];
			}		
}

