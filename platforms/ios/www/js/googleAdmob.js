

var isOverlap = false;
var isTest = false;
var mobid ={};
if (/(android)/i.test(navigator.userAgent)) {
mobid={
	bannerAdUnit:"ca-app-pub-4639863322045897/3773818369",
	intersititalAdUnit:"ca-app-pub-4639863322045897/5250551569"
  };
}
else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
//  alert('iOS');
mobid={
		bannerAdUnit:"ca-app-pub-4639863322045897/3156539565",
		intersititalAdUnit:"ca-app-pub-4639863322045897/4633272767"
  };
}

function init(){
	window.admob.setUp(mobid.bannerAdUnit,mobid.intersititalAdUnit,isOverlap,isTest);
	window.admob.onBannerAdPreloaded = bannerPreloaded;
	window.admob.onInterstitialAdPreloaded = intersitialPreloaded;
	//window.admob.preloadBannerAd();
	//bannerPreloaded();
	//window.admob.preloadInterstitialAd();
	//alert('msg');
}

function bannerPreloaded()
{
	//admob_showBanner(bannerLocation.)
	alert('banner loaded!');
	//window.admob.showBannerAd('top-center', 'SMART_BANNER');
}

function hideBanner()
{
	window.admob.hideBannerAd();
}

function admob_showBanner(location)
{
	//window.admob.hideBanner();
	hideBanner();
	window.admob.showBannerAd(location, 'banner');
}

function intersitialPreloaded () {
	// body...
	//alert('intersitial preloaded');
	 window.admob.showInterstitialAd();
}

var bannerLocation={
	//position: 'top-left', 'top-center', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom-center', 'bottom-right'
	TOPLEFT:'top-left',
	TOPCENTER:'top-center',
	TOPRIGHT:'top-right',
	LEFT:'left',
	CENTER:'center',
	RIGHT:'right',
	BOTTOMLEFT:'bottom-left',
	BOTTOMCENTER:'bottom-center',
  BOTTOMRIGHT:'bottom-right'
};
