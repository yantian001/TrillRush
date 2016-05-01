/* global IS_HANDHELD, DAY_STAGE, cc, isMobile, g_ressources, CURRENT_LAYERS, MyGameScene */

/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var BACKGROUND_TEXTURE = 0;

// Global function to set the background on mobile or desktop version
function getBackground(modeType)
{
    if (!IS_HANDHELD)
    {
        var backGround = null;
        
        if(typeof modeType !== "undefined")
        {
            if (modeType === DAY_STAGE)
            {
                backGround = cc.Sprite.create("res/IngameBGDay.jpg");
            }
            else
            {
                backGround = cc.Sprite.create("res/IngameBGNight.jpg");
            }
        }
        else
        {   
            backGround = cc.Sprite.create("res/IngameBGDay.jpg");
        }
        
        return backGround;
    }
    else
    {
        var canvas = document.getElementById("gameCanvas");
        
        if(typeof modeType !== "undefined")
        {
            if (modeType === DAY_STAGE)
            {
                if (BACKGROUND_TEXTURE !== 0)
                {
                    if (isMobile.apple.device)
                    {
                        var backDay = document.getElementById("backDay");
                        backDay.style.display = "block";
                        var backNight = document.getElementById("backNight");
                        backNight.style.display = "none";
                    }
                    else
                    {
                        canvas.style.backgroundImage = "url('res/IngameBGDayMin.jpg')";
                    }
                    
                    BACKGROUND_TEXTURE = 0;
                }
            }
            else
            {
                if (BACKGROUND_TEXTURE !== 1)
                {
                    if (isMobile.apple.device)
                    {
                        var backDay = document.getElementById("backDay");
                        backDay.style.display = "none";
                        var backNight = document.getElementById("backNight");
                        backNight.style.display = "block";
                    }
                    else
                    {
                        canvas.style.backgroundImage ="url('res/IngameBGNightMin.jpg')";
                    }
                    
                    BACKGROUND_TEXTURE = 1;
                }
            }
        }
        else
        {
            if (BACKGROUND_TEXTURE !== 0)
            {
                if (isMobile.apple.device)
                {
                    var backDay = document.getElementById("backDay");
                    backDay.style.display = "block";
                    var backNight = document.getElementById("backNight");
                    backNight.style.display = "none";
                }
                else
                {
                    canvas.style.backgroundImage = "url('res/IngameBGDayMin.jpg')";
                }
                
                BACKGROUND_TEXTURE = 0;
            }
        }
        
        // it reeturn something valid to be used as a background but actually we dont really need it
        var backGround = cc.Sprite.create("res/Particle2.png");
        backGround.setVisible(false);
        return backGround;
    }
}

var cocos2dApp = cc.Application.extend({
    
    config:document['ccConfig'],
    _screenCoveredWarning:false,
    
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    
    applicationDidFinishLaunching:function () {
        
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support Canvas or WebGL");
            return false;
        }
        
        var director = cc.Director.getInstance();
        
        this.SetGameResolution();
        
        cc.EGLView.getInstance().resizeWithBrowserSize(true);
        
        cc.EGLView.getInstance().setResizeCallback(function() {
            
            myApp.SetGameResolution();
        });
        
        // Add callback for mobiles when they change its orientation
        window.addEventListener("orientationchange", function() {
            
            myApp.SetGameResolution();
            
        }, false);
        
        director.setDisplayStats(this.config['showFPS']);
        
        if (IS_HANDHELD)
        {
            director.setAnimationInterval(1.0 / 30);
        }
        else
        {
            // set FPS. the default value is 1.0/60 if you don't call this
            director.setAnimationInterval(1.0 / this.config['frameRate']);
        }
        
        // load the background if we are playing on desktop
        if (!IS_HANDHELD)
        {
            g_ressources.push({src:"res/IngameBGDay.jpg"});
        }
        
        //load resources
        cc.LoaderScene.preload(g_ressources, function(){
            director.replaceScene(new this.startScene());
        }, this);
        
        document.addEventListener('fullscreenchange', function () { myApp.SetGameResolution(); }, false);
        document.addEventListener('mozfullscreenchange', function () { myApp.SetGameResolution(); }, false);
        document.addEventListener('webkitfullscreenchange', function () { myApp.SetGameResolution(); }, false);
        document.addEventListener('MSFullscreenChange', function () { myApp.SetGameResolution(); }, false);

        return true;
    },
    
    SetGameResolution:function() {
    
        // initialize director
        var director = cc.Director.getInstance();

        var width = 800;
        var heigth = 450;
        
        if (window.innerHeight > window.innerWidth)
        {
            cc.EGLView.getInstance().setDesignResolutionSize(width, heigth, cc.RESOLUTION_POLICY.FIXED_WIDTH);
            
            if (IS_HANDHELD)
            {
                if (!this._screenCoveredWarning)
                {
                    var image = document.getElementById("rotateImage");
                    var canvas = document.getElementById("gameCanvas");
                    
                    image.style.display = "block";
                    canvas.style.display = "none";

                    this._screenCoveredWarning = true;
                }
            }
        }
        else
        {   
            cc.EGLView.getInstance().setDesignResolutionSize(width, heigth, cc.RESOLUTION_POLICY.FIXED_HEIGHT);
            
            if (IS_HANDHELD)
            {
                if (this._screenCoveredWarning)
                {
                    var image = document.getElementById("rotateImage");
                    var canvas = document.getElementById("gameCanvas");
                    
                    image.style.display = "none";
                    canvas.style.display = "block";

                    this._screenCoveredWarning = false;
                }
            }
        }
        
        WIN_SIZE = director.getWinSize();
        
        CENTER_POS = cc.p(WIN_SIZE.width / 2, WIN_SIZE.height / 2);

        if (CURRENT_LAYERS.length > 0)
        {
            for (var i = 0; i < CURRENT_LAYERS.length; i++)
            {
                CURRENT_LAYERS[i].updatePositions();
            }
        }
        
        // Fix canvas on fullscreen
        var isFullScreen = document.mozFullScreen || document.webkitIsFullScreen;
        if (isFullScreen)
        {
            var c = document.getElementById("gameCanvas");
            c.style.width = "100%";
            c.style.height = "100%";
        }
    }
});

var myApp = new cocos2dApp(MyGameScene);