var map = [];
var prefsuf = [];
var resultText = '';

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

    $.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1SihOU4ehrRBIdhgb0jEHkFGQwzUpkrjb7mNbNDJjkmk/1/public/values?alt=json",
        success: function( result ) {
            var a = result.feed.entry;
            for (index = 0; index < a.length; ++index) {
                var e = new Object();
                e.pref = result.feed.entry[index]['gsx$pref']['$t'];
                e.suf = result.feed.entry[index]['gsx$suf']['$t']
                prefsuf.push(e);
            }
		}
	});

    function substitutions (){
        var userinput = $("#inputText").val();
        $.grep(map, function(e){
            if (userinput.search(new RegExp(' '+ e.input + ' ', "i")) == -1 ||
               userinput.search(new RegExp(' '+ e.input, "i")) == -1 ||
               userinput.search(new RegExp(e.input + ' ', "i")) == -1 ||
                userinput.search(new RegExp(e.input + ',', "i")) == -1){
                var res = userinput.replace(new RegExp(e.input, 'gi'), e.output);
                userinput = res;
                resultText = userinput;
            } 
            else{
                resultText = userinput;
            }
        });
    }

    function addprefixandsuffix (){
        var rand = prefsuf[Math.floor(Math.random() * prefsuf.length)];
        var arr = resultText.split(' ');
        var firstWord = arr[0];
        firstWord = firstWord.replace(',','');
        var lastWord = arr[arr.length - 1];
        lastWord = lastWord.replace(',','');
        if (firstWord == rand.pref || lastWord == rand.suf || (firstWord.toLowerCase() == "hola" && rand.pref == "pah")) {
            rand = prefsuf[Math.floor(Math.random() * prefsuf.length)];
            addprefixandsuffix();
        }
        else{
            resultText = rand.pref + ", " + resultText + ", " + rand.suf;
        }
    }

    function setInput(){
        if ($("#inputText").val() == ''){
            resultText = "escribí algo, ahí";
        }else{
            substitutions();
            addprefixandsuffix();
        }
        $("#result").removeClass("hide");
        $("#result").addClass("show");
        $("#result").text(resultText);
    }

    $('#inputText').bind('keypress', function(e){
        if ( e.keyCode == 13 ) {
            setInput();
        }
    });

    $("#submit").click(function() {
        setInput();
    });

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-86177830-1', 'auto');
        ga('send', 'pageview');


});