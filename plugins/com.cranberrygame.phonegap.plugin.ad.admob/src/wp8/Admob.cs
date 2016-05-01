﻿//Copyright (c) 2014 Sang Ki Kwon (Cranberrygame)
//Email: cranberrygame@yahoo.com
//Homepage: http://www.github.com/cranberrygame
//License: MIT (http://opensource.org/licenses/MIT)
using System;
using System.Windows;
using System.Runtime.Serialization;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;
using System.Diagnostics; //Debug.WriteLine
//
using GoogleAds;
using System.Windows.Controls;
using Microsoft.Phone.Controls;

namespace Cordova.Extension.Commands
{
    public class Admob : BaseCommand
    {
		private string adUnit;
		private string adUnitFullScreen;
		private bool isOverlap;
		private bool isTest;
		//
        private AdView bannerView; //
        private InterstitialAd interstitialView; //
		//
		public bool bannerAdPreload;	
		public bool fullScreenAdPreload;	
		private string position;
		private string size;
		private int lastOrientation;
	
		public void setUp(string args)
        {
            string adUnit = JsonHelper.Deserialize<string[]>(args)[0];
            Debug.WriteLine("adUnit: " + adUnit);
            string adUnitFullScreen = JsonHelper.Deserialize<string[]>(args)[1];
            Debug.WriteLine("adUnitFullScreen: " + adUnitFullScreen);
            bool isOverlap = Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[2]);
            Debug.WriteLine("isOverlap: " + isOverlap);
            bool isTest = Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[3]);
            Debug.WriteLine("isTest: " + isTest);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {   
                _setUp(adUnit, adUnitFullScreen, isOverlap, isTest);
                
				PluginResult pr = new PluginResult(PluginResult.Status.OK);
				//pr.KeepCallback = true;
				DispatchCommandResult(pr);
				//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
				//pr.KeepCallback = true;
				//DispatchCommandResult(pr);				
            });					
        }
        public void preloadBannerAd(string args)
        {
			bannerAdPreload = true;	

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {   
                _preloadBannerAd();
            });
        }
        public void reloadBannerAd(string args)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _reloadBannerAd();
            });
        }		
        public void showBannerAd(string args)
        {
			string position=JsonHelper.Deserialize<string[]>(args)[0];
			Debug.WriteLine(position);
			string size=JsonHelper.Deserialize<string[]>(args)[1];
			Debug.WriteLine(size);
			
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
				//
				bool bannerIsShowing = false;
				if (isOverlap) {
					//if banner is showing
					if (bannerView != null)
					{
						PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
						if (frame != null)
						{
							PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
							if (page != null)
							{
								Grid grid = page.FindName("LayoutRoot") as Grid;							
								if (grid != null)
								{
                                    if (grid.Children.Contains(bannerView))
                                    {
                                        bannerIsShowing = true;
                                    }									
								}
							}
						}
					}
				}
				else {
				}
				if (bannerIsShowing && position.Equals(this.position) && size.Equals(this.size)) {		
					PluginResult pr = new PluginResult(PluginResult.Status.OK);
					//pr.KeepCallback = true;
					DispatchCommandResult(pr);
					//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
					//pr.KeepCallback = true;
					//DispatchCommandResult(pr);
					
					return;
				}
				
                _showBannerAd(position, size);
            });
        }
        public void hideBannerAd(string args)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _hideBannerAd();
            });	
        }
        public void preloadFullScreenAd(string args)
        {
			fullScreenAdPreload = true;			

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _preloadFullScreenAd();
            });
        }
        public void reloadFullScreenAd(string args)
        {
            if (interstitialView == null) {
				//PluginResult pr = new PluginResult(PluginResult.Status.OK);
				//pr.KeepCallback = true;
				//DispatchCommandResult(pr);
				PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
				//pr.KeepCallback = true;
				DispatchCommandResult(pr);

				return;				
			}
		
			fullScreenAdPreload = true;			

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _reloadFullScreenAd();
            });
        }		
        public void showFullScreenAd(string args)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _showFullScreenAd();
            });		
        }
		//---------------------------
        private void _setUp(string adUnit, string adUnitFullScreen, bool isOverlap, bool isTest)
        {
			this.adUnit = adUnit;
			this.adUnitFullScreen = adUnitFullScreen;
			this.isOverlap = isOverlap;
			this.isTest = isTest;
        }		
        private void _preloadBannerAd()
        {
			if (isOverlap)
				_preloadBannerAd_overlap();
			else
				_preloadBannerAd_split();
			
            if (bannerView == null)
            {
				if(size == null) {
					size = "SMART_BANNER";
				}			
				//
                AdFormats format = AdFormats.Banner;
				//https://developers.google.com/mobile-ads-sdk/docs/admob/wp/banner		
				if (size.Equals("BANNER")) {
					format = AdFormats.Banner;//Banner (320x50, Phones and Tablets)
				}
				else if (size.Equals("SMART_BANNER")) {
					format = AdFormats.SmartBanner;//Smart banner (Auto size, Phones and Tablets) //https://developers.google.com/mobile-ads-sdk/docs/admob/android/banner#smart
				} 				
				else {
					format = AdFormats.SmartBanner;
				}
				//
                bannerView = new AdView
                {
                    //Format = AdFormats.Banner,
                    //Format = AdFormats.SmartBanner,
                    Format = format,
                    AdUnitID = this.adUnit
                };
                bannerView.ReceivedAd += OnBannerViewReceivedAd;
                bannerView.FailedToReceiveAd += OnBannerViewFailedToReceiveAd;
                bannerView.ShowingOverlay += OnBannerViewShowingOverlay;
                bannerView.DismissingOverlay += OnBannerViewDismissingOverlay;				
            }
			
			_reloadBannerAd();
        }
        private void _preloadBannerAd_overlap()
        {
			//if banner is showing
            if (bannerView != null)
            {
                PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
                if (frame != null)
                {
                    PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                    if (page != null)
                    {
                        Grid grid = page.FindName("LayoutRoot") as Grid;                        
						if (grid != null)
                        {
							if (grid.Children.Contains(bannerView))
							{
								grid.Children.Remove(bannerView);
							}                            
                        }
                    }
                }
            }
		}
        private void _preloadBannerAd_split()
        { 
		}
		
        private void _reloadBannerAd()
        {
            if (bannerView != null)
			{
                AdRequest adRequest = new AdRequest();
				if(isTest) {
					adRequest.ForceTesting = true;
				}					
                bannerView.LoadAd(adRequest);
            }
        }		
        private void _showBannerAd(string position, string size)
        {
			this.position = position;
			this.size = size;
			
			if(bannerAdPreload) {
				bannerAdPreload = false;
			}
			else{
				_preloadBannerAd();
			}			
			
			if (isOverlap)
				_showBannerAd_overlap(position,size);
			else
				_showBannerAd_split(position,size);
        }
        private void _showBannerAd_overlap(string position, string size)
        {
            PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
            if (frame != null)
            {
                PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                if (page != null)
                {
                    Grid grid = page.FindName("LayoutRoot") as Grid;
                    if (grid != null)
                    {
                        if (position.Equals("top-left"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Top;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Left;
                        }
                        else if (position.Equals("top-center"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Top;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Center;
                        }
                        else if (position.Equals("top-right"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Top;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Right;
                        }
                        else if (position.Equals("left"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Center;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Left;
                        }
                        else if (position.Equals("center"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Center;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Center;
                        }
                        else if (position.Equals("right"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Center;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Right;
                        }
                        else if (position.Equals("bottom-left"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Bottom;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Left;
                        }
                        else if (position.Equals("bottom-center"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Bottom;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Center;
                        }
                        else if (position.Equals("bottom-right"))
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Bottom;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Right;
                        }
                        else
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Top;
                            bannerView.HorizontalAlignment = HorizontalAlignment.Center;
                        }

                        grid.Children.Add(bannerView);
                    }
                }
            }
		}		
        private void _showBannerAd_split(string position, string size)
        { 		
		}		
        private void _hideBannerAd()
        {
			if (isOverlap)
				_hideBannerAd_overlap();
			else
				_hideBannerAd_split();
        }
        private void _hideBannerAd_overlap()
        {
            if (bannerView != null)
            {
                PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
                if (frame != null)
                {
                    PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                    if (page != null)
                    {
                        Grid grid = page.FindName("LayoutRoot") as Grid;
                        if (grid != null)
                        {
							if (grid.Children.Contains(bannerView))
							{
								grid.Children.Remove(bannerView);
							}
                        }
                    }
                }
            }
		}		
        private void _hideBannerAd_split()
        {		
		}		
        private void _preloadFullScreenAd()
        {
            if (interstitialView == null)
            {
                //interstitialView = new InterstitialAd("ca-app-pub-4906074177432504/4879304879");//x cf) wp8
                //interstitialView = new InterstitialAd("ca-app-pub-4906074177432504/5150650074");//o cf) android
                interstitialView = new InterstitialAd(this.adUnitFullScreen);
				//http://forums.xamarin.com/discussion/849/binding-library-for-inneractive-sdk
                interstitialView.ReceivedAd += OnInterstitialViewReceivedAd;
                interstitialView.FailedToReceiveAd += OnInterstitialViewFailedToReceiveAd;
                interstitialView.ShowingOverlay += OnInterstitialViewShowingOverlay;
				interstitialView.DismissingOverlay += OnInterstitialViewDismissingOverlay;
            }
			
			_reloadFullScreenAd();
        }
        private void _reloadFullScreenAd()
        {
			if (interstitialView != null) {			
				AdRequest adRequest = new AdRequest();
				if(isTest) {
					adRequest.ForceTesting = true;
				}				
				interstitialView.LoadAd(adRequest);
			}
        }
        private void _showFullScreenAd()
        {
			if(fullScreenAdPreload) {
				//An exception of type 'System.NullReferenceException' occurred in GoogleAds.DLL and wasn't handled before a managed/native boundary
                try
                {
                    interstitialView.ShowAd();
                }
                catch (Exception ex)
                {
                }
				
				fullScreenAdPreload = false;
			}
			else{
				_preloadFullScreenAd();
			}
        }
		//bannerView.ReceivedAd
        private void OnBannerViewReceivedAd(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnBannerViewReceivedAd");

            PluginResult pr;
			if (bannerAdPreload) {
				pr = new PluginResult(PluginResult.Status.OK, "onBannerAdPreloaded");
				pr.KeepCallback = true;
				DispatchCommandResult(pr);
				//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
				//pr.KeepCallback = true;
				//DispatchCommandResult(pr);
			}
			
			pr = new PluginResult(PluginResult.Status.OK, "onBannerAdLoaded");
			//pr.KeepCallback = true;
			DispatchCommandResult(pr);
			//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
			//pr.KeepCallback = true;
			//DispatchCommandResult(pr);
        }
		//bannerView.FailedToReceiveAd
        private void OnBannerViewFailedToReceiveAd(object sender, AdErrorEventArgs errorCode)
        {
            Debug.WriteLine("OnBannerViewFailedToReceiveAd " + errorCode.ErrorCode);
        }
		//bannerView.ShowingOverlay
        private void OnBannerViewShowingOverlay(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnBannerViewShowingOverlay");			
        }
		//bannerView.DismissingOverlay
        private void OnBannerViewDismissingOverlay(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnBannerViewDismissingOverlay");
        }		
		
		//interstitialView.ReceivedAd
        private void OnInterstitialViewReceivedAd(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnInterstitialViewReceivedAd");

            PluginResult pr;
			if(fullScreenAdPreload) {
				pr = new PluginResult(PluginResult.Status.OK, "onFullScreenAdPreloaded");
				pr.KeepCallback = true;
				DispatchCommandResult(pr);
				//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
				//pr.KeepCallback = true;
				//DispatchCommandResult(pr);
			}
			
			pr = new PluginResult(PluginResult.Status.OK, "onFullScreenAdLoaded");
			pr.KeepCallback = true;
			DispatchCommandResult(pr);
			//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
			//pr.KeepCallback = true;
			//DispatchCommandResult(pr);
				
			if(!fullScreenAdPreload) {
				interstitialView.ShowAd();
			}
        }
		//interstitialView.FailedToReceiveAd
        private void OnInterstitialViewFailedToReceiveAd(object sender, AdErrorEventArgs errorCode)
        {
            Debug.WriteLine("OnInterstitialViewFailedToReceiveAd " + errorCode.ErrorCode);
        }
        //interstitialView.ShowingOverlay
        private void OnInterstitialViewShowingOverlay(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnInterstitialViewPresentScreen");
			
			PluginResult pr = new PluginResult(PluginResult.Status.OK, "onFullScreenAdShown");
			pr.KeepCallback = true;
			DispatchCommandResult(pr);
			//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
			//pr.KeepCallback = true;
			//DispatchCommandResult(pr);			
        }
        //interstitialView.DismissingOverlay
        private void OnInterstitialViewDismissingOverlay(object sender, AdEventArgs e)
        {
            Debug.WriteLine("OnInterstitialViewDismissScreen");	
			
			PluginResult pr = new PluginResult(PluginResult.Status.OK, "onFullScreenAdHidden");
			//pr.KeepCallback = true;
			DispatchCommandResult(pr);
			//PluginResult pr = new PluginResult(PluginResult.Status.ERROR);
			//pr.KeepCallback = true;
			//DispatchCommandResult(pr);			
        }

	}
}