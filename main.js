var map = [];

jQuery( document ).ready(function( $ ) {
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1hyX9RIS9cza_WXLYCParWALZIfSnmpt0qSb5xszGfog/1/public/values?alt=json",
        success: function( result ) {
            var a = result.feed.entry;
            for (index = 0; index < a.length; ++index) {
                var e = new Object();
                e.input = result.feed.entry[index]['gsx$input']['$t'];
                e.output = result.feed.entry[index]['gsx$output']['$t']
                map.push(e);    
            }
		}
	});
}); 

$(document).ready(function() {
    function escapeRegExp (s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    $("#submit").click(function() {
        $.grep(map, function(e){
            var userinput = $("#inputText").val();
            if (userinput.toLowerCase().indexOf(' '+ e.input + ' ') !== -1 ||
                userinput.toLowerCase().indexOf(' '+ e.input) !== -1 ||
                userinput.toLowerCase().indexOf(e.input + ' ') !== -1 ){
                $("#result").text(userinput.replace(e.input, e.output));
            } 
        });
        
    });

});