var cbid ={};
//alert(navigator.userAgent);
if (/(android)/i.test(navigator.userAgent)) {
//  alert('android');
  cbid={
    appid:"5725ca42f6cd4551c95161af",
    appSignature:"4ff0d7c5b43830b2f9952d30682c3f7995cbb4e5"
  };
}
else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
//  alert('iOS');
  cbid={
    appid:"5725ca5d43150f499998a39f",
    appSignature:"2508f988b807c2f2ab07ec72516df83b65a1d446"
  };
}

function cb_init()
{
  window.chartboost.setUp(cbid.appid,cbid.appSignature);
  window.chartboost.preloadInterstitialAd('Default');
  window.chartboost.preloadMoreAppsAd('Default');
  //window.chartboost.onInterstitialAdPreloaded = function(location){alert(location)};
  //alert('init chartboost');
}

function cb_show()
{
  window.chartboost.showInterstitialAd('Default');
}

function cb_showMoreApp()
{
  window.chartboost.showMoreAppsAd('Default');
}

var cb = {
  init:function()
  {

      window.chartboost.setUp(cbid.appid,cbid.appSignature);
      window.chartboost.onInterstitialAdPreloaded = this.onInterstitialAdPreloaded;
      this.preload();
      //alert('inti ios');
  },
  preload:function()
  {
    window.chartboost.preloadInterstitialAd('Default');
    window.chartboost.preloadMoreAppsAd('Default');
  },
  onInterstitialAdPreloaded:function(location)
  {
    alert('Chartboost intersitial ad proloaded on'+ location);
  },
  showInterstitialAd:function()
  {
    window.chartboost.showInterstitialAd('Default');
  }
}
