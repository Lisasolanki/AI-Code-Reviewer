function extractJSON(text){
    try{
        return JSON.parse(text);
    }catch(err){
        //try to extract json manually 
        const match=text.match(/\{[\s\S]*\}/);
        if(match){
            try{
                return JSON.parse(match[0]);
            }catch(e){
                return null;
            }
        }
        return null;
    }
}
function normalizeResponse(data) {
  return {
    score: data.score || 0,
    issues: {
      bugs: data.issues?.bugs || [],
      performance: data.issues?.performance || [],
      bestPractices: data.issues?.bestPractices || []
    },
    summary: data.summary || "No summary available"
  };
}

module.exports = { extractJSON, normalizeResponse };
