jQuery( document ).ready(function( $ ) {
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1qvf8NYiMuS-kMRrdu-mXve_dWNWH80HCVoSugEXunXI/1/public/values?alt=json",
		success: function( result ) {
			debugger;
			$( "#main1" ).text(result.feed.entry[0]['gsx$title1']['$t']);
			$( "#main2" ).text(result.feed.entry[0]['gsx$title2']['$t']);
			$( "#main3" ).text(result.feed.entry[0]['gsx$title3']['$t']);
		}
	});
}); 