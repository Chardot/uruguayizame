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
        var userinput = $("#inputText").val();
        $.grep(map, function(e){
            if (userinput.search(new RegExp(' '+ e.input + ' ', "i")) == -1 ||
               userinput.search(new RegExp(' '+ e.input, "i")) == -1 ||
               userinput.search(new RegExp(e.input + ' ', "i")) == -1 ||
                userinput.search(new RegExp(e.input + ',', "i")) == -1){
                var res = userinput.replace(new RegExp(e.input, 'gi'), e.output);
                userinput = res;
                $("#result").text(userinput);
            } 
            else{
                $("#result").text(userinput);
            }
        });
        
    });

});