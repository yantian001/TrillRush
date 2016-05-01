function registerParticleDictionary(t) {
    arrayParticleDictionaryIndex.push(t);
    var e = cc.FileUtils.getInstance(),
    i = e.fullPathForFilename(t),
    s = e.dictionaryWithContentsOfFileThreadSafe(i);
    s ? arrayParticleDictionaryObject.push(s) : arrayParticleDictionaryIndex.pop()
}
function createParticleSystemWithDictionary(t) {
    var e = arrayParticleDictionaryIndex.indexOf(t);
    if ( - 1 === e) return cc.ParticleSystem.create(t);
    var i = arrayParticleDictionaryObject[e],
    s = new cc.ParticleSystem;
    return s.initWithDictionary(i, ""),
    s
}
function showButtonParticles(t) {
    if (!IS_HANDHELD) {
        var e = createParticleSystemWithDictionary("res/button_particles.plist");
        e.setDrawMode(cc.PARTICLE_TEXTURE_MODE),
        t.addChild(e),
        e.setPosition(cc.p(.5 * t.getContentSize().width, .5 * t.getContentSize().height)),
        e.setPositionType(cc.PARTICLE_TYPE_RELATIVE),
        e.setAutoRemoveOnFinish(!0)
    }
}
function spilPauseGame() {
    gSharedEngine.pauseMusic()
}
function spilResumeGame() {
    gSharedEngine.resumeMusic()
}
cc.s_sharedNotificationCenter = null,
cc.NotificationCenter = cc.Class.extend({
    ctor: function() {
        this._observers = []
    },
    addObserver: function(t, e, i, s) {
        if (!this._observerExisted(t, i)) {
            var a = new cc.NotificationObserver(t, e, i, s);
            a && this._observers.push(a)
        }
    },
    removeObserver: function(t, e) {
        for (var i = 0; i < this._observers.length; i++) {
            var s = this._observers[i];
            if (s && s.getName() === e && s.getTarget() === t) return void this._observers.splice(i, 1)
        }
    },
    removeAllObservers: function(t) {
        for (var e = [], i = 0; i < this._observers.length; i++) {
            var s = this._observers[i];
            s.getTarget() === t && e.push(s)
        }
        return cc.ArrayRemoveArray(this._observers, e),
        e.length
    },
    postNotification: function(t, e) {
        for (var i = 0; i < this._observers.length; i++) {
            var s = this._observers[i];
            s && s.getName() === t && s.performSelector(e)
        }
    },
    _observerExisted: function(t, e) {
        for (var i = 0; i < this._observers.length; i++) {
            var s = this._observers[i];
            if (s && s.getName() === e && s.getTarget() === t) return ! 0
        }
        return ! 1
    },
    _observers: null
}),
cc.NotificationCenter.getInstance = function() {
    return cc.s_sharedNotificationCenter || (cc.s_sharedNotificationCenter = new cc.NotificationCenter),
    cc.s_sharedNotificationCenter
},
cc.NotificationObserver = cc.Class.extend({
    ctor: function(t, e, i, s) {
        this._target = t,
        this._selector = e,
        this._name = i,
        this._object = s
    },
    performSelector: function(t) {
        this._target && "string" == typeof this._selector ? this._target[this._selector](t) : this._target && "function" == typeof this._selector ? this._selector.call(this._target, t) : this._selector(t)
    },
    _target: null,
    _selector: null,
    _name: null,
    _object: null,
    getTarget: function() {
        return this._target
    },
    getSelector: function() {
        return this._selector
    },
    getName: function() {
        return this._name
    },
    getObject: function() {
        return this._object
    }
});
var BMFONT_SIZE = 64,
TextUtilsClass = cc.Class.extend({
    ctor: function() {},
    getTextSizeScale: function(t) {
        return t / BMFONT_SIZE
    },
    addOffsetToLabelBMFont: function(t, e) {
        for (var i = 0,
        s = 0,
        a = 0,
        r = 0,
        n = 0; n < t.getChildrenCount(); n++) {
            var o = t.getChildren()[n];
            s = s > o.getPositionX() ? s: o.getPositionX(),
            o.setPositionX(o.getPositionX() + i),
            a = a > o.getPositionX() ? a: o.getPositionX(),
            "\n" === t._string.charAt(n + r) ? (r++, i = 0) : i += e
        }
        for (var n = 0; n < t.getChildrenCount(); n++) {
            var o = t.getChildren()[n];
            o.setPositionX(o.getPositionX() - (a - s) / 2)
        }
    }
}),
LocalizationClass = cc.Class.extend({
    currentLanguage: null,
    localizationData: null,
    masterData: null,
    configurationDone: !1,
    ctor: function(t) {
        this.currentLanguage = t,
        this.localizationData = {},
        this.masterData = null,
        this.configurationDone = !1
    },
    parse: function(t) {
        var e = this;
        $.getJSON("res/languages.json",
        function(i) {
            e.masterData = i.languages,
            e.getData(),
            "undefined" != typeof t && null !== t && t()
        })
    },
    setLanguage: function(t) {
        this.localizationData = {},
        this.currentLanguage = t,
        this.getData();
        var e = null;
        null !== cc.Director.getInstance().getRunningScene() && cc.Director.getInstance().getRunningScene().getChildrenCount() > 0 && (e = cc.Director.getInstance().getRunningScene().getChildren()[0]),
        null !== e && "undefined" != typeof e.updateTexts && null !== e.updateTexts && e.updateTexts()
    },
    getLanguage: function() {
        return this.currentLanguage
    },
    getData: function() { ("undefined" == typeof this.currentLanguage || null === this.currentLanguage) && (this.currentLanguage = "en-US");
        for (var t in this.masterData) for (var e in this.masterData[t]) e === this.currentLanguage && (this.localizationData["{" + t + "}"] = this.masterData[t][e]);
        this.configurationDone = !0
    },
    getText: function(t) {
        for (var e in this.localizationData) if (e === t) return this.localizationData[e];
        return t
    }
}),
DataFlag = {
    frames: [[1500, 0, 150, 100, 0, 0, 0], [712, 100, 78, 56, 0, 0, 0], [634, 100, 78, 56, 0, 0, 0], [556, 100, 78, 56, 0, 0, 0], [1200, 0, 150, 100, 0, 0, 0], [0, 100, 150, 100, 0, 0, 0], [1800, 0, 150, 100, 0, 0, 0], [1950, 0, 78, 56, 0, 0, 0], [1650, 0, 150, 100, 0, 0, 0], [478, 100, 78, 56, 0, 0, 0], [790, 100, 78, 56, 0, 0, 0], [1350, 0, 150, 100, 0, 0, 0], [0, 0, 150, 100, 0, 0, 0], [1050, 0, 150, 100, 0, 0, 0], [900, 0, 150, 100, 0, 0, 0], [750, 0, 150, 100, 0, 0, 0], [600, 0, 150, 100, 0, 0, 0], [450, 0, 150, 100, 0, 0, 0], [300, 0, 150, 100, 0, 0, 0], [150, 0, 150, 100, 0, 0, 0], [150, 100, 328, 63, 0, 0, 0]],
    animations: {
        ar: {
            frames: [1],
            speed: 1
        },
        es: {
            frames: [14],
            speed: 1
        },
        it: {
            frames: [12],
            speed: 1
        },
        tr: {
            frames: [0],
            speed: 1
        },
        ru: {
            frames: [5],
            speed: 1
        },
        sa: {
            frames: [3],
            speed: 1
        },
        jp: {
            frames: [9],
            speed: 1
        },
        br: {
            frames: [19],
            speed: 1
        },
        uk: {
            frames: [16],
            speed: 1
        },
        select: {
            frames: [20],
            speed: 1
        },
        us: {
            frames: [15],
            speed: 1
        },
        pt: {
            frames: [7],
            speed: 1
        },
        nl: {
            frames: [8],
            speed: 1
        },
        cn: {
            frames: [18],
            speed: 1
        },
        fr: {
            frames: [13],
            speed: 1
        },
        de: {
            frames: [17],
            speed: 1
        },
        "in": {
            frames: [10],
            speed: 1
        },
        id: {
            frames: [11],
            speed: 1
        },
        se: {
            frames: [4],
            speed: 1
        },
        mx: {
            frames: [2],
            speed: 1
        },
        pl: {
            frames: [6],
            speed: 1
        }
    }
},
LanguageSelectorClass = cc.Layer.extend({
    _cont: null,
    _contSelect: null,
    _contOptions: null,
    _txt: null,
    _flag: null,
    _node: null,
    _background: null,
    _sceneMain: null,
    ctor: function() {
        this.init()
    },
    init: function() {
        var t = !1;
        return this._super() && (this._node = cc.Node.create(), this.addChild(this._node), this._node.setVisible(!1), this._cont = cc.Menu.create(), this._cont.setPosition(0, 0), this.addChild(this._cont), this.createSelect(), this.createOptions(), CURRENT_LAYERS.push(this), this.updatePositions(), t = !0),
        t
    },
    createSelect: function() {
        var t = DataFlag.frames[DataFlag.animations.select.frames[0]];
        this._contSelect = cc.MenuItemImage.create(null, null,
        function() {
            this._node.setVisible(!this._node.isVisible())
        },
        this);
        var e = cc.Sprite.create("res/ui-localization.png", cc.rect(.5 * t[0], .5 * t[1], .5 * t[2], .5 * t[3]));
        this._contSelect.setNormalImage(e),
        this._cont.addChild(this._contSelect);
        var i = DataFlag.frames[DataFlag.animations[LANGUAGES[PlayerData.currentLanguageIndex].iso].frames[0]];
        this._flag = cc.Sprite.create("res/ui-localization.png", cc.rect(.5 * i[0], .5 * i[1], .5 * i[2], .5 * i[3])),
        this._flag.setScale(.5),
        this._flag.setPosition(25, 15),
        this._txt = cc.LabelTTF.create(LANGUAGES[PlayerData.currentLanguageIndex].label, "Arial", "15", cc.TEXT_ALIGNMENT_LEFT),
        this._txt.setColor(cc.black()),
        this._txt.setPosition(cc.p(85, 15)),
        this._contSelect.addChild(this._flag),
        this._contSelect.addChild(this._txt)
    },
    updateText: function() {},
    updatePositions: function() {
        if (WIN_SIZE.width / WIN_SIZE.height < 1.64) {
            var t = 1 - (1.64 - WIN_SIZE.width / WIN_SIZE.height);
            this._node.setScale(t),
            this._node.setPosition(cc.p(.7 * WIN_SIZE.width - 540 * t, .85 * WIN_SIZE.height - 405 * t))
        } else this._node.setScale(1),
        this._node.setPosition(cc.p(0, 0))
    },
    createOptions: function() {
        this._background = new cc.Sprite,
        this._background.initWithSpriteFrameName("black.png"),
        this._background.setScaleX(20),
        this._background.setScaleY(15),
        this._background.setOpacity(150),
        this._background.setPosition(cc.p(370, 120)),
        this._node.addChild(this._background),
        this._contOptions = cc.Menu.create(),
        this._contOptions.setPosition(150, 280),
        this._node.addChild(this._contOptions);
        for (var t = 5,
        e = {
            w: 35,
            h: 100
        },
        i = 0; i < LANGUAGES.length; i++) {
            var s = i % t,
            a = Math.floor(i / t),
            r = DataFlag.frames[DataFlag.animations[LANGUAGES[i].iso].frames[0]],
            n = cc.Sprite.create("res/ui-localization.png", cc.rect(.5 * r[0], .5 * r[1], .5 * r[2], .5 * r[3])),
            o = cc.LabelTTF.create(LANGUAGES[i].label, "Arial", "18");
            o.setPosition(cc.p(.5 * n.getContentSize().width, .5 * -n.getContentSize().height + 10)),
            n.addChild(o);
            var c = cc.MenuItemSprite.create(null, null,
            function(t) {
                Localization.setLanguage(LANGUAGES[t.getUserData()].lang);
                var e = DataFlag.frames[DataFlag.animations[LANGUAGES[t.getUserData()].iso].frames[0]];
                if (this._flag.setTextureRect(cc.rect(.5 * e[0], .5 * e[1], .5 * e[2], .5 * e[3])), this._txt.setString(LANGUAGES[t.getUserData()].label), PlayerData.currentLanguageIndex = t.getUserData(), this._node.setVisible(!1), PlayerData.saveData(), CURRENT_LAYERS.length > 0) for (var i = 0; i < CURRENT_LAYERS.length; i++) CURRENT_LAYERS[i].updateText()
            },
            this);
            c.setNormalImage(n),
            c.setUserData(i),
            this._contOptions.addChild(c),
            c.setPosition(s * (n.getContentSize().width + e.w), -a * (n.getContentSize().height + e.h))
        }
    }
}),
Background = cc.Layer.extend({
    _bgSprite: null,
    _gameLogic: null,
    _haftSize: 0,
    _initPos: 0,
    _size: 0,
    ctor: function(t) {
        if (this._super(), "undefined" != typeof t && null !== t) {
            this._gameLogic = t,
            this._gameLogic.setBackground(this);
            var e = getBackground(this._gameLogic._modeType);
            e && (this._bgSprite = e)
        } else {
            var e = getBackground();
            e && (this._bgSprite = e),
            CURRENT_LAYERS.push(this)
        }
        this._bgSprite && (this._haftSize = .5 * this._bgSprite.getContentSize().width, this._size = this._bgSprite.getContentSize().width, this.addChild(this._bgSprite), this._initPos = CENTER_POS.x - WIN_SIZE.width / 2 + this._haftSize, this._bgSprite.setPosition(cc.p(this._initPos, CENTER_POS.y)))
    },
    updatePositions: function() {
        this._bgSprite && (this._haftSize = .5 * this._bgSprite.getContentSize().width, this._size = this._bgSprite.getContentSize().width, this._initPos = CENTER_POS.x - WIN_SIZE.width / 2 + this._haftSize, this._parent.getChildren()[3].getPositionX() < .5 * WIN_SIZE.width ? (this._parent.getChildren()[1].setPosition(cc.p( - WIN_SIZE.width, 0)), this._parent.getChildren()[3].setPosition(cc.p(0, 0)), this._bgSprite.setPosition(cc.p(this._initPos - (this._size - WIN_SIZE.width), CENTER_POS.y))) : (this._parent.getChildren()[1].setPosition(cc.p(0, 0)), this._parent.getChildren()[3].setPosition(cc.p(WIN_SIZE.width, 0)), this._bgSprite.setPosition(cc.p(this._initPos, CENTER_POS.y))))
    },
    update: function() {
        if (this._bgSprite) {
            if (null === this._gameLogic) return;
            if (null === this._gameLogic._mapManager._lastPoint) return;
            var t = this._gameLogic._player.getPosition().x / BOX2D_GAME_SCALE,
            e = this._gameLogic._mapManager._lastPoint.x,
            i = t / e,
            s = Math.min(Math.max(i, 0), 1);
            this._bgSprite.setPositionX(this._initPos - (this._size - WIN_SIZE.width) * s)
        }
    }
}),
SceneSplash = cc.Layer.extend({
    ctor: function() {
        this._super();
        var t = cc.SpriteFrameCache.getInstance();
        t.addSpriteFrames("res/general0.plist"),
        t.addSpriteFrames("res/general_share0.plist"),
        t.addSpriteFrames("res/general_noalpha0.plist"),
        PlayerData.firstPlayed || t.addSpriteFrames("res/characters0.plist"),
        CURRENT_LAYERS.length = 0,
        this.loadGlobalVariables();
        var e = cc.Scene.create(),
        i = new ButtonLayer;
        e.addChild(i),
        cc.Director.getInstance().replaceScene(e)
    },
    loadGlobalVariables: function() {
        carsArray[CAR_1] = {
            sprite: "yellow_cart.png",
            animated: !1
        },
        carsArray[CAR_2] = {
            sprite: "gold_cart.png",
            animated: !1
        },
        carsArray[CAR_3] = {
            sprite: "banana.png",
            animated: !1
        },
        carsArray[CAR_4] = {
            sprite: "kiss.png",
            animated: !1
        },
        carsArray[CAR_5] = {
            sprite: "moto.png",
            animated: !0,
            speed: .03,
            offset: cc.p( - 70, -41),
            region: cc.p(120, 70),
            name: "motocart",
            range: cc.p(1, 5),
            alwaysAnimate: !1
        },
        carsArray[CAR_6] = {
            sprite: "dolphin.png",
            animated: !1
        },
        carsArray[CAR_7] = {
            sprite: "carpet_cart.png",
            animated: !1
        },
        carsArray[CAR_8] = {
            sprite: "plane.png",
            animated: !1
        },
        carsArray[CAR_9] = {
            sprite: "train.png",
            animated: !1
        },
        carsArray[CAR_10] = {
            sprite: "unicorn.png",
            animated: !1
        },
        carsArray[CAR_11] = {
            sprite: "shoe.png",
            animated: !1
        },
        carsArray[CAR_12] = {
            sprite: "tank.png",
            animated: !1
        },
        carsArray[CAR_13] = {
            sprite: "car.png",
            animated: !0,
            speed: .06,
            offset: cc.p( - 60, -40),
            region: cc.p(128, 63),
            name: "pinkcar",
            range: cc.p(1, 9),
            alwaysAnimate: !1
        },
        carsArray[CAR_14] = {
            sprite: "fire_cart_anim.png",
            animated: !0,
            speed: .09,
            offset: cc.p( - 88, -40),
            region: cc.p(133, 72),
            name: "carFire",
            range: cc.p(1, 7),
            alwaysAnimate: !0
        },
        charactersArray[CHARACTER_1] = {
            s1: "standard_girl.png",
            s2: "res/assets/standardgirl1_fail.png",
            size: cc.p(89, 126),
            s3: "res/assets/TR3_GUI_Fail_01.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_01.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_01.png"
        },
        charactersArray[CHARACTER_2] = {
            s1: "girl_3.png",
            s2: "res/assets/standard2_fail.png",
            size: cc.p(96, 140),
            s3: "res/assets/TR3_GUI_Fail_02.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_02.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_02.png"
        },
        charactersArray[CHARACTER_3] = {
            s1: "yellow_boy.png",
            s2: "res/assets/standard1_guy_fail.png",
            size: cc.p(95, 140),
            s3: "res/assets/TR3_GUI_Fail_03.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_03.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_03.png"
        },
        charactersArray[CHARACTER_4] = {
            s1: "guy_sunglasses.png",
            s2: "res/assets/sunglasses_fail.png",
            size: cc.p(96, 151),
            s3: "res/assets/TR3_GUI_Fail_04.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_04.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_04.png"
        },
        charactersArray[CHARACTER_5] = {
            s1: "punk_girl.png",
            s2: "res/assets/punk_fail.png",
            size: cc.p(79, 131),
            s3: "res/assets/TR3_GUI_Fail_05.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_05.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_05.png"
        },
        charactersArray[CHARACTER_6] = {
            s1: "rapper.png",
            s2: "res/assets/rapper_fail.png",
            size: cc.p(94, 136),
            s3: "res/assets/TR3_GUI_Fail_06.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_06.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_06.png"
        },
        charactersArray[CHARACTER_7] = {
            s1: "cocodile.png",
            s2: "res/assets/cocodile_fail.png",
            size: cc.p(70, 89),
            s3: "res/assets/TR3_GUI_Fail_07.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_07.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_07.png"
        },
        charactersArray[CHARACTER_8] = {
            s1: "dog_.png",
            s2: "res/assets/dog_fail.png",
            size: cc.p(66, 87),
            s3: "res/assets/TR3_GUI_Fail_08.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_08.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_08.png"
        },
        charactersArray[CHARACTER_9] = {
            s1: "princess.png",
            s2: "res/assets/princess_fail.png",
            size: cc.p(74, 122),
            s3: "res/assets/TR3_GUI_Fail_09.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_09.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_09.png"
        },
        charactersArray[CHARACTER_10] = {
            s1: "fire_man.png",
            s2: "res/assets/fireman_fail.png",
            size: cc.p(116, 162),
            s3: "res/assets/TR3_GUI_Fail_10.png",
            s4: "res/assets/TR3_InGame_HUD_HeadsBar_10.png",
            s5: "res/assets/TR3_InGame_HUD_HeadsIcon_10.png"
        },
        npcArray[NPC_1] = {
            s1: "TR3_InGame_NPC_01.png",
            s2: "TR_NPCH1.png",
            speed: .05,
            offset: cc.p(0, 0),
            region: cc.p(108, 146),
            name: "deathNPC1",
            frames: cc.p(1, 10)
        },
        npcArray[NPC_2] = {
            s1: "TR3_InGame_NPC_02.png",
            s2: "TR_NPCH2.png",
            speed: .05,
            offset: cc.p(0, 0),
            region: cc.p(108, 146),
            name: "deathNPC2",
            frames: cc.p(1, 10)
        },
        npcArray[NPC_3] = {
            s1: "TR3_InGame_NPC_03.png",
            s2: "TR_NPCM1.png",
            speed: .05,
            offset: cc.p(0, 0),
            region: cc.p(103, 127),
            name: "deathNPC3",
            frames: cc.p(1, 10)
        },
        npcArray[NPC_4] = {
            s1: "TR3_InGame_NPC_04.png",
            s2: "TR_NPCM2.png",
            speed: .05,
            offset: cc.p(0, 0),
            region: cc.p(104, 127),
            name: "deathNPC4",
            frames: cc.p(1, 10)
        },
        npcArray[NPC_5] = {
            s1: "TR3_InGame_NPC_05.png",
            s2: "TR_NPC5.png",
            speed: .05,
            offset: cc.p(0, 0),
            region: cc.p(104, 127),
            name: "deathNPC5",
            frames: cc.p(1, 10)
        }
    }
}),
MyGameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var t = new SceneSplash;
        this.addChild(t)
        admob_showBanner(bannerLocation.BOTTOMLEFT);
        cb_show();
    }
}),
BST = function() {
    var t = function(t, e, i, s, a, r) {
        return {
            leftChild: "undefined" == typeof t ? null: t,
            key: "undefined" == typeof e ? null: e,
            value: "undefined" == typeof i ? null: i,
            rightChild: "undefined" == typeof s ? null: s,
            parent: "undefined" == typeof a ? null: a,
            objects: "undefined" == typeof r ? new Array: r
        }
    },
    e = new t,
    i = function(t, e) {
        if (null === t.key) return null;
        var s = parseInt(t.key, 10);
        return s > e ? t.leftChild.key ? i(t.leftChild, e) : t: e > s && t.rightChild.key ? i(t.rightChild, e) : t
    },
    s = function(e, i, a, r) {
        if (null === e.key) return e.leftChild = new t,
        e.key = i,
        e.value = a,
        e.rightChild = new t,
        e.parent = r,
        !0;
        var n = parseInt(e.key, 10);
        if (n > i) s(e.leftChild, i, a, e);
        else {
            if (! (i > n)) return e.value = a,
            !0;
            s(e.rightChild, i, a, e)
        }
    },
    a = function(t, e) {
        return null !== t.key && (a(t.leftChild, e), e(t.key, t.value), a(t.rightChild, e)),
        !0
    },
    r = function(t) {
        for (; null !== t.leftChild.key;) t = t.leftChild;
        return t.key
    },
    n = function(t) {
        for (; null !== t.rightChild.key;) t = t.rightChild;
        return t.key
    },
    o = function(t) {
        var e;
        if (null !== t.rightChild.key) return r(t.rightChild);
        for (e = t.parent; null !== e.key && t === e.rightChild;) t = e,
        e = e.parent;
        return e.key
    },
    c = function(t) {
        var e;
        if (null !== t.leftChild.key) return n(t.leftChild);
        for (e = t.parent; null !== e.key && t === e.leftChild;) t = e,
        e = e.parent;
        return e.key
    };
    return {
        search: function(t) {
            var s = parseInt(t, 10);
            return isNaN(s) ? void 0 : i(e, s)
        },
        insert: function(t, i) {
            var a = parseInt(t, 10);
            return isNaN(a) ? void 0 : s(e, a, i, null)
        },
        traverse: function(t) {
            return "undefined" == typeof t && (t = function(t, e) {
                print(t + ": " + e)
            }),
            a(e, t)
        },
        min: function() {
            return r(e)
        },
        max: function() {
            return n(e)
        },
        successor: function() {
            return o(e)
        },
        predecessor: function() {
            return c(e)
        }
    }
},
DEFAULT_LANGUAGE = 0,
poolOfSoundsIndex = new Array,
poolOfSoundsObjects = new Array,
gSharedEngine = {
    _music: null,
    _currentAudioMusic: "",
    _soundVolume: 1,
    _musicVolume: 1,
    playEffect: function(t, e) {
        if (0 !== this._soundVolume) {
            var i = poolOfSoundsIndex.indexOf(t),
            s = null;
            if ( - 1 === i) {
                var a = t + ".mp3",
                r = t + ".ogg";
                s = new Howl({
                    urls: [a, r]
                }),
                poolOfSoundsIndex.push(t),
                poolOfSoundsObjects.push(s)
            } else s = poolOfSoundsObjects[i];
            return ("undefined" == typeof e || null === e) && (e = 1),
            s.volume(e),
            s.play(),
            s
        }
    },
    playMusic: function(t, e) {
        if (this._currentAudioMusic !== t) { ("undefined" == typeof e || null === e) && (e = !0),
            this._currentAudioMusic = t;
            var i = t + ".mp3",
            s = t + ".ogg";
            null !== this._music && (this._music.stop(), this._music = null);
            var a = this;
            this._music = new Howl({
                urls: [i, s],
                volume: this._musicVolume,
                onend: function() {
                    e && (a._music.volume(a._musicVolume), a._music.play())
                }
            }),
            this._music.volume(this._musicVolume),
            this._music.play()
        }
    },
    setMusicVolume: function(t) {
        this._musicVolume = t,
        null !== this._music && this._music.volume(this._musicVolume)
    },
    setEffectsVolume: function(t) {
        this._soundVolume = t
    },
    pauseAllEffects: function() {
        Howler.mute()
    },
    pauseMusic: function() {
        Howler.mute()
    },
    resumeAllEffects: function() {
        Howler.unmute()
    },
    resumeMusic: function() {
        Howler.unmute()
    }
};
cc.AudioEngine.getInstance = function() {
    return gSharedEngine
};
var hasStorage = function() {
    try {
        return sys.localStorage.setItem("test", !0),
        sys.localStorage.removeItem("test"),
        !0
    } catch(t) {
        return ! 1
    }
} (),
PlayerDataClass = cc.Class.extend({
    currentLanguageIndex: DEFAULT_LANGUAGE,
    soundMute: !1,
    musicMute: !1,
    currentCash: 0,
    currentCharacter: 0,
    currentCar: 10,
    skipIntro: !1,
    itemsBought: null,
    firstPlayed: !0,
    coinCollected: null,
    levelUnlocked: null,
    ctor: function() {
        this.itemsBought = new Array(24);
        for (var t = 0; t < this.itemsBought.length; t++) this.itemsBought[t] = 0;
        this.coinCollected = new Array(45);
        for (var t = 0; t < this.coinCollected.length; t++) this.coinCollected[t] = 0;
        this.levelUnlocked = new Array(15);
        for (var t = 0; t < this.levelUnlocked.length; t++) this.levelUnlocked[t] = 0;
        this.levelUnlocked[0] = 1
    },
    getCoinLevel: function(t, e) {
        var i = this.coinCollected[t + 3 * e];
        return i
    },
    getCoinsLevelCount: function(t) {
        for (var e = 0,
        i = 0; 3 > i; i++) {
            var s = this.coinCollected[i + 3 * t];
            e += s
        }
        return e
    },
    setCoinLevel: function(t, e) {
        0 === this.coinCollected[3 * e + t] && (this.coinCollected[3 * e + t] = 1)
    },
    saveFirstPlayed: function() {
        this.firstPlayed && (this.firstPlayed = !1, hasStorage && sys.localStorage.setItem("TR4FirstPlayed", this.firstPlayed))
    },
    loadData: function() {
        if (hasStorage) {
            var t = sys.localStorage.getItem("TR4currentLanguageIndex");
            this.currentLanguageIndex = null !== t ? parseInt(t) : DEFAULT_LANGUAGE,
            t = sys.localStorage.getItem("TR4currentCash"),
            this.currentCash = null !== t ? parseInt(t) : 0;
            for (var e = 0; e < this.itemsBought.length; e++) 0 === e || 2 === e || 10 === e || 11 === e ? this.itemsBought[e] = 1 : (t = sys.localStorage.getItem("TR4itemsBought_" + e), this.itemsBought[e] = null !== t ? parseInt(t) : 0);
            for (var e = 0; e < this.coinCollected.length; e++) t = sys.localStorage.getItem("TR4coinCollected_" + e),
            this.coinCollected[e] = null !== t ? parseInt(t) : 0;
            for (var e = 0; e < this.levelUnlocked.length; e++) t = sys.localStorage.getItem("TR4levelUnlocked_" + e),
            this.levelUnlocked[e] = null !== t ? parseInt(t) : 0;
            this.levelUnlocked[0] = 1;
            var t = sys.localStorage.getItem("TR4currentCharacter");
            this.currentCharacter = null !== t ? parseInt(t) : 0;
            var t = sys.localStorage.getItem("TR4currentCar");
            this.currentCar = null !== t ? parseInt(t) : 10,
            t = sys.localStorage.getItem("TR4skipIntro"),
            this.skipIntro = null !== t && "true" === t ? !0 : !1,
            t = sys.localStorage.getItem("TR4FirstPlayed"),
            this.firstPlayed = null !== t ? "true" === t ? !0 : !1 : !0,
            t = sys.localStorage.getItem("TR4musicMute"),
            this.musicMute = null !== t && "true" === t ? !0 : !1,
            this.setMusicMute(this.musicMute),
            t = sys.localStorage.getItem("TR4soundMute"),
            this.soundMute = null !== t && "true" === t ? !0 : !1,
            this.setSoundMute(this.soundMute)
        }
    },
    saveData: function() {
        if (hasStorage) {
            sys.localStorage.setItem("TR4currentLanguageIndex", this.currentLanguageIndex),
            sys.localStorage.setItem("TR4soundMute", this.soundMute),
            sys.localStorage.setItem("TR4musicMute", this.musicMute),
            sys.localStorage.setItem("TR4currentCash", this.currentCash),
            sys.localStorage.setItem("TR4currentCharacter", this.currentCharacter),
            sys.localStorage.setItem("TR4currentCar", this.currentCar),
            sys.localStorage.setItem("TR4skipIntro", this.skipIntro),
            sys.localStorage.setItem("TR4FirstPlayed", this.firstPlayed);
            for (var t = 0; t < this.itemsBought.length; t++) sys.localStorage.setItem("TR4itemsBought_" + t, this.itemsBought[t]);
            for (var t = 0; t < this.coinCollected.length; t++) sys.localStorage.setItem("TR4coinCollected_" + t, this.coinCollected[t]);
            for (var t = 0; t < this.levelUnlocked.length; t++) sys.localStorage.setItem("TR4levelUnlocked_" + t, this.levelUnlocked[t])
        }
    },
    eraseData: function() {
        if (hasStorage) {
            sys.localStorage.setItem("TR4currentLanguageIndex", DEFAULT_LANGUAGE),
            sys.localStorage.setItem("TR4soundMute", !1),
            sys.localStorage.setItem("TR4musicMute", !1),
            sys.localStorage.setItem("TR4currentCash", 0),
            sys.localStorage.setItem("TR4currentCharacter", 0),
            sys.localStorage.setItem("TR4currentCar", 12),
            sys.localStorage.setItem("TR4skipIntro", !1),
            sys.localStorage.setItem("TR4FirstPlayed", !0);
            for (var t = 0; t < this.itemsBought.length; t++) sys.localStorage.setItem("TR4itemsBought_" + t, 0);
            for (var t = 0; t < this.coinCollected.length; t++) sys.localStorage.setItem("TR4coinCollected_" + t, 0);
            for (var t = 0; t < this.levelUnlocked.length; t++) sys.levelUnlocked.setItem("TR4levelUnlocked_" + t, 0)
        }
    },
    setMusicMute: function(t) {
        this.musicMute = t,
        gSharedEngine.setMusicVolume(this.musicMute ? 0 : 1)
    },
    setSoundMute: function(t) {
        this.soundMute = t,
        gSharedEngine.setEffectsVolume(this.soundMute ? 0 : 1)
    }
}),
DRAW_DEBUG_PHYSICS = !1,
DEACTIVATE_END_TRIGGER = !1,
ENABLE_DEBUG_FUNCTIONS = !1,
UNLOCK_ALL_LEVELS = !1,
BOX2D_GAME_SCALE = 30,
FIXED_TIMESTEP = 1 / 60,
MAX_STEPS = 5,
JUMP_TIME = 1,
LANGUAGES = new Array({
    iso: "us",
    label: "English",
    lang: "en-US",
    specialChars: !1
},
{
    iso: "uk",
    label: "English",
    lang: "en-GB",
    specialChars: !1
},
{
    iso: "nl",
    label: "Nederlands",
    lang: "nl-NL",
    specialChars: !1
},
{
    iso: "fr",
    label: "Français",
    lang: "fr-FR",
    specialChars: !1
},
{
    iso: "de",
    label: "German",
    lang: "de-DE",
    specialChars: !1
},
{
    iso: "es",
    label: "Español",
    lang: "es-ES",
    specialChars: !1
},
{
    iso: "br",
    label: "Português",
    lang: "pt-BR",
    specialChars: !1
},
{
    iso: "it",
    label: "Italiano",
    lang: "it-IT",
    specialChars: !1
},
{
    iso: "se",
    label: "Svenska",
    lang: "sv-SE",
    specialChars: !1
},
{
    iso: "pl",
    label: "Polski",
    lang: "pl-PL",
    specialChars: !1
},
{
    iso: "ru",
    label: "Русский",
    lang: "ru-RU",
    specialChars: !0
},
{
    iso: "id",
    label: "Bahasa Ind.",
    lang: "en-ID",
    specialChars: !1
},
{
    iso: "cn",
    label: "中文",
    lang: "CHINESE-CN",
    specialChars: !0
},
{
    iso: "tr",
    label: "Turkish",
    lang: "tr-TR",
    specialChars: !1
}),
TYPE_NONE = 0,
TYPE_CAR = 2,
TYPE_GROUND = 4,
TYPE_PICKUP = 8,
TYPE_CHARACTER = 16,
TYPE_TRIGGER = 32,
TYPE_OBSTACLE = 64,
TYPE_WHEEL_1 = 128,
TYPE_WHEEL_2 = 256,
TYPE_OBSTACLE_EX = 512,
DataObject = function(t, e) {
    this._type = t,
    this._data = e
},
IS_HANDHELD = isMobile.any;
if (IS_HANDHELD) if (isMobile.apple.device) {
    var background = document.getElementById("backDay");
    background.style.display = "block"
} else document.getElementById("gameCanvas").style.backgroundImage = "url('res/IngameBGDayMin.jpg')";
var CURRENT_LAYERS = new Array,
PICKUP_COMBO_TIME = .4,
PlayerData = new PlayerDataClass;
PlayerData.loadData();
var TextUtils = new TextUtilsClass,
Localization = new LocalizationClass;
Localization.parse();
var GAME_VERSION = "0.1",
DAY_STAGE = 1,
NIGHT_STAGE = 2,
NUMBER_OF_LIVES = 9,
FLURRY_SESSION_KEY = "",
WIN_SIZE = null,
CENTER_POS = null,
CAR_1 = 0,
CAR_2 = 1,
CAR_3 = 2,
CAR_4 = 3,
CAR_5 = 4,
CAR_6 = 5,
CAR_7 = 6,
CAR_8 = 7,
CAR_9 = 8,
CAR_10 = 9,
CAR_11 = 10,
CAR_12 = 11,
CAR_13 = 12,
CAR_14 = 13,
CHARACTER_1 = 0,
CHARACTER_2 = 1,
CHARACTER_3 = 2,
CHARACTER_4 = 3,
CHARACTER_5 = 4,
CHARACTER_6 = 5,
CHARACTER_7 = 6,
CHARACTER_8 = 7,
CHARACTER_9 = 8,
CHARACTER_10 = 9,
NPC_1 = 0,
NPC_2 = 1,
NPC_3 = 2,
NPC_4 = 3,
NPC_5 = 4,
NPC_MAX = 5,
carsArray = new Array,
charactersArray = new Array,
npcArray = new Array,
JUMP_IMPULSE = 5500 / BOX2D_GAME_SCALE * 2,
JUMP_OVER_IMPULSE = 1e3 / BOX2D_GAME_SCALE * 2,
TRAMPOLINE_JUMP = 6e3,
GRAVITY_Y = 600 / BOX2D_GAME_SCALE,
PLAYER_SPEED = 22,
NPC_SPEED = 7,
PINCH_FORCE = 6e4 / BOX2D_GAME_SCALE,
FLURRY_SESSION = "session",
FLURRY_REACHED_LEVEL_5 = "reachedLevel5",
FLURRY_REACHED_LEVEL_10 = "reachedLevel10",
FLURRY_REACHED_LEVEL_15 = "reachedLevel15",
FLURRY_REACHED_LEVEL_20 = "reachedLevel20",
FLURRY_REACHED_GAME_OVER = "reachedGameOver",
FLURRY_CLICKED_FACEBOOK = "clickedFacebook",
FLURRY_CLICKED_IOS = "clickedIOS",
FLURRY_CLICKED_ANDROID = "clickedAndroid",
FLURRY_CLICKED_OLDER_VERSION = "clickedOlderVersion",
g_PhysicsManager = null,
g_gamelogic = null;
FlurryAgent.logEvent(FLURRY_SESSION);
var loopLights = new Array("green_loop.png", "blue_loop.png", "orange_loop.png", "purple_loop.png"),
loopLightsIndex = 0,
loopLightsDelay = 0;
getLoopLightBulb = function() {
    var t = loopLights[loopLightsIndex];
    return loopLightsIndex++,
    loopLightsDelay += .1,
    loopLightsIndex >= loopLights.length && (loopLightsIndex = 0, loopLightsDelay = 0),
    t
};
var rainbowDelay = 0,
rainbowDelayCount = 7;
getNextRainbowDelay = function() {
    return rainbowDelayCount > 6 ? (rainbowDelayCount = 0, rainbowDelay = 0) : rainbowDelay += .1,
    rainbowDelayCount++,
    rainbowDelay
};
var g_nightChangedResources = new Array({
    dayRes: "Arbol1.png",
    nightRes: "Arbol1_Noche.png"
},
{
    dayRes: "Arbol2.png",
    nightRes: "Arbol2_Noche.png"
},
{
    dayRes: "Bloque1.png",
    nightRes: "Bloque1_Noche.png"
},
{
    dayRes: "Bloque2.png",
    nightRes: "Bloque2_Noche.png"
},
{
    dayRes: "Bloque3.png",
    nightRes: "Bloque3_Noche.png"
},
{
    dayRes: "Bloque4.png",
    nightRes: "Bloque4_Noche.png"
},
{
    dayRes: "Borde1.png",
    nightRes: "Borde1_Noche.png"
},
{
    dayRes: "Borde2.png",
    nightRes: "Borde2_Noche.png"
},
{
    dayRes: "Borde3.png",
    nightRes: "Borde3_Noche.png"
},
{
    dayRes: "Borde4.png",
    nightRes: "Borde4_Noche.png"
},
{
    dayRes: "BordeCuevaTecho1.png",
    nightRes: "BordeCuevaTecho1_Noche.png"
},
{
    dayRes: "BordeCuevaTecho2.png",
    nightRes: "BordeCuevaTecho2_Noche.png"
},
{
    dayRes: "BordeFondo1.png",
    nightRes: "BordeFondo1_Noche.png"
},
{
    dayRes: "BordeFondo2.png",
    nightRes: "BordeFondo2_Noche.png"
},
{
    dayRes: "BordeFondo3.png",
    nightRes: "BordeFondo3_Noche.png"
},
{
    dayRes: "BordeFondo4.png",
    nightRes: "BordeFondo4_Noche.png"
},
{
    dayRes: "Flor Blanca1.png",
    nightRes: "Flor Blanca1_Noche.png"
},
{
    dayRes: "Flor Blanca2.png",
    nightRes: "Flor Blanca2_Noche.png"
},
{
    dayRes: "Flor Roja.png",
    nightRes: "Flor Roja_Noche.png"
},
{
    dayRes: "Flor Rosa.png",
    nightRes: "Flor Rosa_Noche.png"
},
{
    dayRes: "Nube.png",
    nightRes: "Nube_Noche_Noche.png"
},
{
    dayRes: "Roca1.png",
    nightRes: "Roca1_Noche.png"
},
{
    dayRes: "Roca2.png",
    nightRes: "Roca2_Noche.png"
},
{
    dayRes: "Roca3.png",
    nightRes: "Roca3_Noche.png"
},
{
    dayRes: "Roca4.png",
    nightRes: "Roca4_Noche.png"
},
{
    dayRes: "Roca5.png",
    nightRes: "Roca5_Noche.png"
},
{
    dayRes: "Roca6.png",
    nightRes: "Roca6_Noche.png"
},
{
    dayRes: "Roca7.png",
    nightRes: "Roca7_Noche.png"
},
{
    dayRes: "RocaCae1.png",
    nightRes: "RocaCae1_Noche.png"
},
{
    dayRes: "RocaCae2.png",
    nightRes: "RocaCae2_Noche.png"
},
{
    dayRes: "RocaIndiana.png",
    nightRes: "RocaIndiana_Noche.png"
},
{
    dayRes: "RocaPlana1.png",
    nightRes: "RocaPlana1_Noche.png"
},
{
    dayRes: "RocaPlana2.png",
    nightRes: "RocaPlana2_Noche.png"
},
{
    dayRes: "RocaPlana3.png",
    nightRes: "RocaPlana3_Noche.png"
},
{
    dayRes: "RocaPlana4.png",
    nightRes: "RocaPlana4_Noche.png"
},
{
    dayRes: "TexturaCuevaTecho1.png",
    nightRes: "TexturaCuevaTecho1_Noche.png"
},
{
    dayRes: "TexturaCuevaTecho2.png",
    nightRes: "TexturaCuevaTecho2_Noche.png"
},
{
    dayRes: "TexturaFondo1.png",
    nightRes: "TexturaFondo1_Noche.png"
},
{
    dayRes: "TexturaFondo2.png",
    nightRes: "TexturaFondo2_Noche.png"
},
{
    dayRes: "circle_ferriswheel_.png",
    nightRes: "circle_ferriswheel_noche.png"
},
{
    dayRes: "ferriswheel_cart1.png",
    nightRes: "ferriswheel_cart1_noche.png"
},
{
    dayRes: "moon_ferriswheel.png",
    nightRes: "moon_ferriswheel_noche.png"
},
{
    dayRes: "structure_ferris_wheel.png",
    nightRes: "structure_ferris_wheel_noche.png"
},
{
    dayRes: "Recta.png",
    nightRes: "Recta_Noche.png"
},
{
    dayRes: "L1.png",
    nightRes: "L1_Noche.png"
},
{
    dayRes: "L2.png",
    nightRes: "L2_Noche.png"
},
{
    dayRes: "L3.png",
    nightRes: "L3_Noche.png"
},
{
    dayRes: "L4.png",
    nightRes: "L4_Noche.png"
},
{
    dayRes: "L5.png",
    nightRes: "L5_Noche.png"
},
{
    dayRes: "L6.png",
    nightRes: "L6_Noche.png"
},
{
    dayRes: "LB1.png",
    nightRes: "LB1_Noche.png"
},
{
    dayRes: "LB2.png",
    nightRes: "LB2_Noche.png"
},
{
    dayRes: "LB3.png",
    nightRes: "LB3_Noche.png"
},
{
    dayRes: "LB4.png",
    nightRes: "LB4_Noche.png"
},
{
    dayRes: "LB5.png",
    nightRes: "LB5_Noche.png"
},
{
    dayRes: "LB6.png",
    nightRes: "LB6_Noche.png"
},
{
    dayRes: "M1.png",
    nightRes: "M1_Noche.png"
},
{
    dayRes: "M2.png",
    nightRes: "M2_Noche.png"
},
{
    dayRes: "M3.png",
    nightRes: "M3_Noche.png"
},
{
    dayRes: "M4.png",
    nightRes: "M4_Noche.png"
},
{
    dayRes: "M5.png",
    nightRes: "M5_Noche.png"
},
{
    dayRes: "M6.png",
    nightRes: "M6_Noche.png"
},
{
    dayRes: "MB1.png",
    nightRes: "MB1_Noche.png"
},
{
    dayRes: "MB2.png",
    nightRes: "MB2_Noche.png"
},
{
    dayRes: "MB3.png",
    nightRes: "MB3_Noche.png"
},
{
    dayRes: "MB4.png",
    nightRes: "MB4_Noche.png"
},
{
    dayRes: "MB5.png",
    nightRes: "MB5_Noche.png"
},
{
    dayRes: "MB6.png",
    nightRes: "MB6_Noche.png"
},
{
    dayRes: "RectaInv.png",
    nightRes: "RectaInv_Noche.png"
},
{
    dayRes: "S1.png",
    nightRes: "S1_Noche.png"
},
{
    dayRes: "S2.png",
    nightRes: "S2_Noche.png"
},
{
    dayRes: "S3.png",
    nightRes: "S3_Noche.png"
},
{
    dayRes: "S4.png",
    nightRes: "S4_Noche.png"
},
{
    dayRes: "S5.png",
    nightRes: "S5_Noche.png"
},
{
    dayRes: "S6.png",
    nightRes: "S6_Noche.png"
},
{
    dayRes: "SB1.png",
    nightRes: "SB1_Noche.png"
},
{
    dayRes: "SB2.png",
    nightRes: "SB2_Noche.png"
},
{
    dayRes: "SB3.png",
    nightRes: "SB3_Noche.png"
},
{
    dayRes: "SB4.png",
    nightRes: "SB4_Noche.png"
},
{
    dayRes: "SB5.png",
    nightRes: "SB5_Noche.png"
},
{
    dayRes: "SB6.png",
    nightRes: "SB6_Noche.png"
});
FlurryAgent.startSession(FLURRY_SESSION_KEY),
FlurryAgent.setAppVersion(GAME_VERSION);
var gNotification = cc.NotificationCenter.getInstance(),
gSpriteFrameCache = cc.SpriteFrameCache.getInstance(),
MUSIC_BACKGROUND_1 = "audio/day",
MUSIC_BACKGROUND_2 = "audio/level_complete",
MUSIC_BACKGROUND_3 = "audio/level_failed",
MUSIC_BACKGROUND_4 = "audio/mainmenu",
MUSIC_BACKGROUND_5 = "audio/night",
SOUND_1 = "audio/Cable",
SOUND_2 = "audio/Car_crash",
SOUND_3 = "audio/Cheered_fireworks",
SOUND_4 = "audio/Click_the_button",
SOUND_5 = "audio/Driving",
SOUND_6 = "audio/Fire_broke_out",
SOUND_7 = "audio/Gold",
SOUND_8 = "audio/Jump",
SOUND_9 = "audio/Mark",
SOUND_10 = "audio/People_scream_man",
SOUND_11 = "audio/People_scream_woman",
SOUND_12 = "audio/Return",
SOUND_13 = "audio/Spring_bed",
SOUND_14 = "audio/Squat",
SOUND_15 = "audio/The_balloon_burst",
SOUND_16 = "audio/The_candidate",
SOUND_17 = "audio/The_explosion",
SOUND_18 = "audio/The_interface_slip",
SOUND_19 = "audio/The_mouse_pointer",
SOUND_20 = "audio/Water",
SOUND_21 = "audio/collect_level_star",
SOUND_22 = "audio/turbo",
g_ressources = [{
    src: "res/checkpoint_particles.plist"
},
{
    src: "res/star_particles.plist"
},
{
    src: "res/score_sparkles.plist"
},
{
    src: "res/ui-localization.png"
},
{
    src: "res/button_particles.plist"
},
{
    src: "res/sparkles.plist"
},
{
    src: "res/Particle2.png"
},
{
    src: "res/languages.json"
},
{
    src: "res/Arial.fnt"
},
{
    src: "res/Arial_0.png"
},
{
    src: "res/general0.plist"
},
{
    src: "res/general0.png"
},
{
    src: "res/general_share0.plist"
},
{
    src: "res/general_share0.png"
},
{
    src: "res/general_noalpha0.plist"
},
{
    src: "res/general_noalpha0.jpg"
}],
g_resourcesGUIOnly = [{
    src: "res/general0.plist"
},
{
    src: "res/general0.png"
},
{
    src: "res/general_noalpha0.plist"
},
{
    src: "res/general_noalpha0.jpg"
}];
PlayerData.firstPlayed || (g_ressources.push({
    src: "res/characters0.plist"
}), g_ressources.push({
    src: "res/characters0.png"
}));
var g_gameResources = [{
    src: "res/confetti2.plist"
},
{
    src: "res/TR_Challa.png"
},
{
    src: "res/gameplay0.plist"
},
{
    src: "res/gameplay0.png"
},
{
    src: "res/gameplay_noalpha0.plist"
},
{
    src: "res/gameplay_noalpha0.jpg"
},
{
    src: "res/fireworks_yellow.plist"
},
{
    src: "res/fireworks_pink.plist"
},
{
    src: "res/fireworks_cyan.plist"
},
{
    src: "res/texture.png"
}],
g_gameResourcesLen = g_gameResources.length,
SceneMainGame = cc.Layer.extend({
    _gameLogic: null,
    _keyboardInput: null,
    _backgroundLayer: null,
    _foregroundLayer: null,
    ctor: function(t, e, i) {
        this._super(),
        cc.Loader.purgeCachedData(g_resourcesGUIOnly),
        this._backgroundLayer = cc.Node.create(),
        this._foregroundLayer = cc.Node.create(),
        t === DAY_STAGE ? gSharedEngine.playMusic(MUSIC_BACKGROUND_1, !0) : gSharedEngine.playMusic(MUSIC_BACKGROUND_5, !0),
        this._gameLogic = new GameLogic(this, t, e, i),
        this.addChild(this._backgroundLayer),
        this.addChild(this._foregroundLayer),
        this.setTouchEnabled(!0),
        this.setKeyboardEnabled(!0),
        this._keyboardInput = {
            left: !1,
            leftJustPressed: !1,
            right: !1,
            rightJustPressed: !1,
            up: !1,
            upJustPressed: !1,
            down: !1,
            downJustPressed: !1
        },
        this.scheduleUpdate()
    },
    update: function(t) {
        this._gameLogic.update(t, this._keyboardInput),
        this._keyboardInput.leftJustPressed = !1,
        this._keyboardInput.upJustPressed = !1,
        this._keyboardInput.rightJustPressed = !1,
        this._keyboardInput.downJustPressed = !1
    },
    draw: function() {
        this._super(),
        DRAW_DEBUG_PHYSICS && (this._gameLogic._physicManager._debugDraw.scale = BOX2D_GAME_SCALE * cc.Director.getInstance().getOpenGLView().getScaleY(), this._gameLogic._physicManager._physicWorld.DrawDebugData())
    },
    onTouchesEnded: function(t) {
        if (this._gameLogic._hud._buttonDown && this._gameLogic._hud._buttonUp && t) for (var e = 0; e < t.length; e++) {
            var i = t[e].getLocation(),
            s = cc.rect(0, 0, .5 * WIN_SIZE.width, WIN_SIZE.height);
            cc.rectContainsPoint(s, i) ? (this._keyboardInput.down = !1, this._gameLogic._hud._buttonDown.setScale(1)) : (this._keyboardInput.up = !1, this._gameLogic._hud._buttonUp.setScale(1))
        }
    },
    onTouchesBegan: function(t) {
        if (this._gameLogic._hud._buttonDown && this._gameLogic._hud._buttonUp && t) for (var e = 0; e < t.length; e++) {
            var i = t[e].getLocation(),
            s = cc.rect(0, 0, .5 * WIN_SIZE.width, WIN_SIZE.height);
            cc.rectContainsPoint(s, i) ? (this._keyboardInput.down = !0, this._keyboardInput.downJustPressed = !0, this._gameLogic._hud._buttonDown.setScale(.75)) : (this._keyboardInput.up = !0, this._keyboardInput.upJustPressed = !0, this._gameLogic._hud._buttonUp.setScale(.75))
        }
    },
    onKeyDown: function(t) {
        switch (t) {
        case cc.KEY.left:
            this._keyboardInput.left === !1 && (this._keyboardInput.left = !0, this._keyboardInput.leftJustPressed = !0);
            break;
        case cc.KEY.up:
            this._keyboardInput.up === !1 && (this._keyboardInput.up = !0, this._keyboardInput.upJustPressed = !0);
            break;
        case cc.KEY.right:
            this._keyboardInput.right === !1 && (this._keyboardInput.right = !0, this._keyboardInput.rightJustPressed = !0);
            break;
        case cc.KEY.down:
            this._keyboardInput.down === !1 && (this._keyboardInput.down = !0, this._keyboardInput.downJustPressed = !0)
        }
    },
    onKeyUp: function(t) {
        switch (t) {
        case cc.KEY.left:
            this._keyboardInput.left = !1;
            break;
        case cc.KEY.up:
            this._keyboardInput.up = !1;
            break;
        case cc.KEY.right:
            this._keyboardInput.right = !1;
            break;
        case cc.KEY.down:
            this._keyboardInput.down = !1
        }
    }
}),
Camera = cc.Layer.extend({
    _factorX: .3,
    _frustrumTree: null,
    _prevFrustrumValueX: 0,
    _prevFrustrumValueY: 0,
    _prevVisibleNode: null,
    ctor: function() {
        this._super()
    },
    addToTree: function(t, e, i) {
        if (! (i - e <= WIN_SIZE.width)) {
            var s = .5 * (i - e),
            a = parseInt(e + s);
            this._frustrumTree.insert(a, {
                left: e,
                right: i
            }),
            this.addToTree(t + 1, e, e + s),
            this.addToTree(t + 1, e + s, i)
        }
    },
    createFrustrumTree: function(t) {
        this._frustrumTree = new BST,
        this.addToTree(0, 0, t.currentCheckPointEndPos(0))
    },
    update: function(t) {
        var e = g_gamelogic._player;
        if (null !== e) {
            var i = e.getPosition();
            if (!e._dieAnimation) {
                e._moveForwards ? this._factorX > .3 ? this._factorX = this._factorX + t * (.3 - this._factorX) : this._factorX < .3 && (this._factorX = .3) : this._factorX < .7 ? this._factorX = this._factorX + t * (.7 - this._factorX) : this._factorX > .7 && (this._factorX = .7);
                var s = i.x - WIN_SIZE.width * this._factorX,
                a = i.y - .5 * WIN_SIZE.height,
                r = this.getParent().getParent().getScale();
                this.getParent().getParent().setPosition(cc.p( - s * r, -a * r)),
                this.calculateFrustrum(s, a, r)
            }
        }
    },
    calculateFrustrum: function(t, e) {
        var i = t,
        s = e;
        if ((this._prevFrustrumValueX !== i || this._prevFrustrumValueY !== s) && (this._prevFrustrumValueX = i, this._prevFrustrumValueY = s, this._frustrumTree)) {
            var a = this._frustrumTree.search(i),
            r = this._frustrumTree.search(i + WIN_SIZE.width);
            if (this._prevVisibleNode && this._prevVisibleNode !== a) for (var n = 0; n < this._prevVisibleNode.objects.length; n++) {
                var o = this._prevVisibleNode.objects[n];
                o.getParent() && o.isVisible() && o.show(!1)
            }
            for (var n = 0; n < a.objects.length; n++) {
                var o = a.objects[n];
                o.getParent() && (o._limitLeft <= t + WIN_SIZE.width && o._limitRight >= t - WIN_SIZE.width && o._limitBottom <= e + WIN_SIZE.height && o._limitTop >= e - WIN_SIZE.height ? o.isVisible() || o.show(!0) : o.isVisible() && o.show(!1))
            }
            if (r !== a) for (var n = 0; n < r.objects.length; n++) {
                var o = r.objects[n];
                o.getParent() && (o._limitLeft <= t + WIN_SIZE.width && o._limitRight >= t - WIN_SIZE.width && o._limitBottom <= e + WIN_SIZE.height && o._limitTop >= e - WIN_SIZE.height ? o.isVisible() || o.show(!0) : o.isVisible() && o.show(!1))
            }
            this._prevVisibleNode = a
        }
    }
}),
PathObject = cc.Sprite.extend({
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _posX: 0,
    _posY: 0,
    _body: null,
    _fixture: null,
    _type: 0,
    _nodes: null,
    _checkCars: null,
    _sequence: "",
    _name: "",
    _activated: !1,
    ctor: function(t, e, i, s) {
        this._super(),
        this._checkCars = new Array,
        this._posX = t,
        this._posY = e,
        this._type = i,
        this._nodes = s,
        this.createCostumes(),
        this.setPosition(this._posX, this._posY),
        this.createPhysicBody(),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this);
        var a = 0,
        r = 0;
        if (null !== this._nodes && this._nodes.length > 0) {
            for (var n = 0; n < this._nodes.length; n++) {
                var o = parseInt(t) + parseInt(this._nodes[n].x),
                c = parseInt(e) + parseInt(this._nodes[n].y);
                if (0 === n) this._posX = o,
                this._posY = c,
                this.setPosition(this._posX, this._posY);
                else {
                    if (this._type === PathObject.TYPE_SPLASH) {
                        var h = new cc.kmVec2(o, c),
                        _ = new cc.kmVec2(a, r),
                        l = cc.kmVec2Subtract(new cc.kmVec2, h, _),
                        p = -1 * Math.atan2(l.y, l.x);
                        p = 57.2957 * p,
                        this._sequence = this._sequence + "cc.RotateTo.create(0, " + p + "),"
                    }
                    this._sequence = this._sequence + "cc.MoveTo.create(1, cc.p(" + o + ", " + c + "))",
                    n < this._nodes.length - 1 && (this._sequence = this._sequence + ",")
                }
                a = o,
                r = c
            }
            "" !== this._sequence && (this._sequence = "this.runAction(cc.Sequence.create(" + this._sequence + "));")
        }
    },
    createPhysicBody: function() {
        var t = new b2BodyDef;
        t.userData = new DataObject(TYPE_OBSTACLE_EX, this),
        t.type = b2Body.b2_kinematicBody,
        this._body = g_PhysicsManager._physicWorld.CreateBody(t);
        var e = new b2PolygonShape;
        e.SetAsBox(.4 * this.getContentSize().width / BOX2D_GAME_SCALE, .4 * this.getContentSize().height / BOX2D_GAME_SCALE);
        var i = new b2FixtureDef;
        i.shape = e,
        i.density = 1,
        i.friction = 3,
        i.restitution = 0,
        this._fixture = this._body.CreateFixture(i),
        this._body.SetAwake(!1)
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    createCostumes: function() {
        if (this._type === PathObject.TYPE_BOULDER) this.initWithSpriteFrameName("boulder.png"),
        this.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 360)));
        else if (this._type === PathObject.TYPE_SPLASH) {
            this.initWithSpriteFrameName("splashcart.png");
            var t = new cc.Sprite;
            t.initWithSpriteFrameName("characterscombination_pendulum.png"),
            t.setPosition(cc.p(.5 * this.getContentSize().width, .5 * this.getContentSize().height + 20)),
            this.addChild(t, -1)
        }
        this._width = this.getContentSize().width,
        this._height = this.getContentSize().height,
        this._limitLeft = this._posX - .5 * this._width,
        this._limitRight = this._posX + .5 * this._width,
        this._limitTop = this._posY + .5 * this._height,
        this._limitBottom = this._posY - .5 * this._height
    },
    reload: function() {
        this.setPosition(this._posX, this._posY),
        this._checkCars.length = 0,
        this.stopAllActions(),
        this._type === PathObject.TYPE_BOULDER && this.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 360))),
        this._activated = !1
    },
    activate: function() {
        this._activated || (this._activated = !0, "" !== this._sequence && eval(this._sequence))
    },
    update: function() {
        null !== this._body && (this._body.IsAwake() || this._body.SetAwake(!0), this._body.SetTransform(new b2Vec2(this.getPositionX() / BOX2D_GAME_SCALE, -this.getPositionY() / BOX2D_GAME_SCALE), this._body.GetAngle()));
        for (var t = 0; t < this._checkCars.length; t++) this._checkCars[t].die(),
        this._checkCars.splice(t, 1)
    },
    doAction: function(t) {
        this._checkCars.push(t)
    }
});
PathObject.TYPE_BOULDER = 0,
PathObject.TYPE_SPLASH = 1;
var GameLogic = cc.Class.extend({
    _player: null,
    _physicManager: null,
    _mapManager: null,
    _sceneMainGame: null,
    _camera: null,
    _background: null,
    _hud: null,
    _modeType: 0,
    _currentLevel: -1,
    _nextScene: null,
    _paused: !1,
    _pickupLabel: null,
    _starLabel: null,
    _pickupLabelIndex: 0,
    _heartsCollected: 0,
    ctor: function(t, e, i, s) {
        this._sceneMainGame = t,
        this._currentLevel = s,
        this._modeType = e,
        this._nextScene = i,
        g_gamelogic = this,
        null === g_PhysicsManager && (g_PhysicsManager = new PhysicManager),
        this._pickupLabel = new Array;
        for (var a = 0; 20 > a; a++) this._pickupLabel[a] = cc.LabelBMFont.create("+01234567789", "res/Arial.fnt"),
        this._pickupLabel[a].setScale(TextUtils.getTextSizeScale(45));
        this._starLabel = cc.LabelBMFont.create("+01234567789", "res/Arial.fnt"),
        this._starLabel.setScale(TextUtils.getTextSizeScale(65)),
        this._starLabel.setString("+250", !1),
        this._physicManager = g_PhysicsManager,
        this._physicManager._accumulatedTime = 0,
        this._mapManager = new MapManager
    },
    getPlayerPickUpLabel: function(t) {
        var e = this._pickupLabel[this._pickupLabelIndex];
        return this._pickupLabelIndex++,
        this._pickupLabelIndex >= 20 && (this._pickupLabelIndex = 0),
        e._parent && e.removeFromParent(!1),
        e.stopAllActions(),
        e.setString(t, !1),
        e.setPosition(0, 0),
        e
    },
    getPlayerStarLabel: function() {
        return this._starLabel._parent && this._starLabel.removeFromParent(!1),
        this._starLabel.stopAllActions(),
        this._starLabel.setPosition(0, 0),
        this._starLabel
    },
    initPlayer: function(t, e, i) {
        this._camera = new Camera,
        this._camera.createFrustrumTree(i),
        this._sceneMainGame._backgroundLayer.addChild(this._camera),
        this._player = new Car(t, e, this._camera),
        this._player.setAsPlayer(),
        cc.Director.getInstance().replaceScene(this._nextScene)
    },
    setBackground: function(t) {
        this._background = t
    },
    setHud: function(t) {
        this._hud = t
    },
    update: function(t, e) {
        this._paused || (g_PhysicsManager && g_PhysicsManager.update(t), this._player && (this._player.processInput(e), this._player.update(t), this._mapManager.update(t), IS_HANDHELD || this._background && this._background.update(t), this._hud && this._hud.update(t), this._camera && this._camera.update(t)))
    },
    destroy: function() {
        delete this._mapManager,
        this._camera.removeFromParent(!0),
        this._player.destroy(),
        delete this._player
    }
}),
PickUp = cc.Sprite.extend({
    _body: null,
    _grabbed: !1,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _firstUpdate: !0,
    _fixture: null,
    _type: 0,
    _index: 0,
    _posX: 0,
    _posY: 0,
    _animation: null,
    _tag: "",
    ctor: function(t, e, i, s) {
        this._super(),
        this.setVisible(!1),
        this._type = i,
        this._index = s,
        this._posX = t,
        this._posY = e,
        this.createCostumes(),
        this.createPhysicBody(t / BOX2D_GAME_SCALE, e / BOX2D_GAME_SCALE),
        this.setPosition(parseInt(this._posX), parseInt(this._posY)),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this),
        this._limitLeft = t - .5 * this._width,
        this._limitRight = t + .5 * this._width,
        this._limitTop = e + .5 * this._height,
        this._limitBottom = e - .5 * this._height
    },
    createPhysicBody: function(t, e) {
        var i = new b2BodyDef;
        i.type = b2Body.b2_staticBody,
        i.userData = new DataObject(TYPE_PICKUP, this),
        this._body = g_gamelogic._physicManager._physicWorld.CreateBody(i),
        this._body.SetTransform(new b2Vec2(t, -e), this._body.GetAngle());
        var s = new b2PolygonShape;
        this._type === PickUp.TYPE_BILL ? s.SetAsBox(.5 * this.getContentSize().width / BOX2D_GAME_SCALE, .5 * this.getContentSize().height / BOX2D_GAME_SCALE) : s.SetAsBox(57.5 / BOX2D_GAME_SCALE, 55.5 / BOX2D_GAME_SCALE);
        var a = new b2FixtureDef;
        a.shape = s,
        a.isSensor = !0,
        a.density = 1,
        a.friction = 0,
        a.restitution = 0,
        this._fixture = this._body.CreateFixture(a)
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    createCostumes: function() {
        this._type === PickUp.TYPE_BILL ? (this.initWithSpriteFrameName("TR_IN_CashIcon.png"), this._width = this.getContentSize().width, this._height = this.getContentSize().height) : this._type === PickUp.TYPE_STAR && (this.createAnimation("star_spritesheet_anim.png", 9999999, .03, cc.p(115, 111), "star"), this.setScale(2), this._posX = this._posX - 115, this._posY = this._posY - 111, this._width = 115, this._height = 111)
    },
    createAnimation: function(t, e, i, s, a) {
        var r = cc.SpriteFrameCache.getInstance(),
        n = r.getSpriteFrame(t),
        o = n._originalSize.width / s.x,
        c = n._originalSize.height / s.y,
        h = {
            x: n.getRect().x,
            y: n.getRect().y
        };
        this._animation = new cc.Animation.create;
        for (var _ = 0,
        l = 0; c > l; l++) for (var p = 0; o > p; p++) 13 > _ && (this._animation.addSpriteFrameWithTexture(n.getTexture(), cc.rect(h.x + p * s.x, h.y + l * s.y, s.x, s.y)), _++);
        this._animation.setDelayPerUnit(i),
        this._animation.setLoops(e),
        cc.AnimationCache.getInstance().addAnimation(this._animation, a),
        this.runAction(cc.Animate.create(this._animation)),
        this._tag = a
    },
    show: function(t) {
        this._grabbed || this.setVisible(t)
    },
    reload: function() {
        this.setVisible(!1),
        this._type === PickUp.TYPE_BILL && (this._grabbed = !1)
    },
    update: function() {
        if (this._firstUpdate) {
            this._firstUpdate = !1;
            var t = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            t.objects.push(this)
        }
    },
    grab: function() {
        return this._grabbed ? !1 : (this.setVisible(!1), this._grabbed = !0, !0)
    }
});
PickUp.TYPE_BILL = 0,
PickUp.TYPE_STAR = 1;
var Obstacle = cc.Sprite.extend({
    _body: null,
    _name: "",
    _canmove: !1,
    _originalX: 0,
    _originalY: 0,
    _startRotation: 0,
    _checkCars: null,
    _killPlayer: !1,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _physicsAlreadyCreated: !1,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _firstUpdate: !0,
    ctor: function(t, e, i, s, a, r) {
        this._super(),
        this.setVisible(!1),
        this._checkCars = new Array,
        this._originalX = parseInt(e),
        this._originalY = parseInt(i),
        this._startRotation = -a,
        this._killPlayer = r,
        this._canmove = s;
        var n = t;
        if (g_gamelogic._modeType === NIGHT_STAGE) for (var o = g_nightChangedResources.length,
        c = 0; o > c; c++) if (g_nightChangedResources[c].dayRes === n) {
            n = g_nightChangedResources[c].nightRes;
            break
        }
        this.createCostumes(n),
        this._canmove || this.createPhysicBody(e / BOX2D_GAME_SCALE, i / BOX2D_GAME_SCALE),
        this.setPosition(e, i),
        this.setRotation(this._startRotation),
        g_gamelogic._sceneMainGame._foregroundLayer.addChild(this)
    },
    createPhysicBody: function(t, e) {
        var i = new b2BodyDef;
        i.userData = new DataObject(TYPE_OBSTACLE, this),
        i.type = b2Body.b2_staticBody,
        this._body = g_gamelogic._physicManager._physicWorld.CreateBody(i),
        this._body.SetTransform(new b2Vec2(t, -e), this._startRotation * Math.PI / 180);
        var s = new b2PolygonShape;
        s.SetAsBox(.5 * this.getContentSize().width / BOX2D_GAME_SCALE, .5 * this.getContentSize().height / BOX2D_GAME_SCALE);
        var a = new b2FixtureDef;
        a.shape = s,
        a.density = 1,
        a.friction = 3,
        a.restitution = 0,
        this._fixture = this._body.CreateFixture(a)
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    reload: function() {
        this.setVisible(!1),
        this.setPosition(this._originalX, this._originalY),
        this.runAction(cc.FadeIn.create(0)),
        this._checkCars.length = 0
    },
    createPhysics: function() {
        if (this._physicsAlreadyCreated !== !0 && this._canmove) {
            var t = this.getPositionX(),
            e = this.getPositionY();
            this.createPhysicBody(t / BOX2D_GAME_SCALE, e / BOX2D_GAME_SCALE),
            this._physicsAlreadyCreated = !0
        }
    },
    update: function() {
        for (var t = 0; t < this._checkCars.length; t++) this._killPlayer && !this._checkCars[t]._layLow ? (this._checkCars[t].die(), this._checkCars.splice(t, 1)) : this._checkCars[t]._layLow ? this._checkCars[t]._layLow && this._checkCars[t]._isJumping && (this._checkCars[t].die(), this._checkCars.splice(t, 1)) : (this._checkCars[t].die(), this._checkCars.splice(t, 1));
        if (this._firstUpdate) {
            this._firstUpdate = !1,
            this._limitLeft = this.getPositionX() - .5 * this._width,
            this._limitRight = this.getPositionX() + .5 * this._width,
            this._limitTop = this.getPositionY() + .5 * this._height,
            this._limitBottom = this.getPositionY() - .5 * this._height;
            var e = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            e.objects.push(this)
        }
        this._canmove && (this._limitLeft = this.getPositionX() - .5 * this._width, this._limitRight = this.getPositionX() + .5 * this._width, this._limitTop = this.getPositionY() + .5 * this._height, this._limitBottom = this.getPositionY() - .5 * this._height)
    },
    createCostumes: function(t) {
        this.initWithSpriteFrameName(t),
        this._width = this.getContentSize().width,
        this._height = this.getContentSize().height
    },
    removeAction: function(t) {
        for (var e = 0; e < this._checkCars.length; e++) if (this._checkCars[e] === t) {
            this._checkCars.splice(e, 1);
            break
        }
    },
    show: function(t) {
        this.setVisible(t)
    },
    doAction: function(t) {
        this._checkCars.push(t)
    }
});
cc.GameLoaderScene = cc.Scene.extend({
    _backgroundSprite: null,
    _backgroundTexture: null,
    _textureBarraRelleno: null,
    _relleno: null,
    _barSizeHeight: null,
    _barSizeWidth: null,
    _loadLogo: !0,
    _textureBarraFondo: null,
    _barraFondoSprite: null,
    _text: null,
    ctor: function() {
        cc.Scene.prototype.ctor.call(this)
    },
    init: function() {
        cc.Scene.prototype.init.call(this),
        this._initStage(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this)
    },
    _initStage: function() {
        var t = 2 * CENTER_POS.y * .1;
        if (IS_HANDHELD || (this._backgroundTexture = new cc.Texture2D, this._backgroundTexture.initWithElement(g_background), this._backgroundTexture.handleLoadedTexture(), this._backgroundSprite = cc.Sprite.createWithTexture(this._backgroundTexture), this._backgroundSprite.setPosition(CENTER_POS), this.addChild(this._backgroundSprite, 10)), this._textureBarraFondo = new cc.Texture2D, this._textureBarraFondo.initWithElement(g_barraFondo), this._textureBarraFondo.handleLoadedTexture(), this._barraFondoSprite = cc.Sprite.createWithTexture(this._textureBarraFondo), this._barraFondoSprite.setPosition(CENTER_POS.x, t), this.addChild(this._barraFondoSprite, 10), LANGUAGES[PlayerData.currentLanguageIndex].specialChars) {
            this._text = cc.LabelTTF.create(Localization.getText("{LOADING}"), "Arial", "25"),
            this._text.setColor(cc.BLACK);
            var e = cc.LabelTTF.create(Localization.getText("{LOADING}"), "Arial", "25");
            this._text.addChild(e),
            e.setPosition(cc.p(.5 * this._text.getContentSize().width + 1, .5 * this._text.getContentSize().height + 2))
        } else this._text = cc.LabelBMFont.create(Localization.getText("{LOADING}"), "res/Arial.fnt"),
        this._text.setScale(TextUtils.getTextSizeScale(40));
        this.addChild(this._text, 10),
        this._text.setPosition(CENTER_POS.x, t + 40),
        this._textureBarraRelleno = new cc.Texture2D,
        this._textureBarraRelleno.initWithElement(g_barraRelleno),
        this._textureBarraRelleno.handleLoadedTexture(),
        this._relleno = cc.Sprite.createWithTexture(this._textureBarraRelleno),
        this._relleno.setPosition(CENTER_POS.x, t),
        this.addChild(this._relleno, 10),
        this._barSizeHeight = this._relleno.getContentSize().height,
        this._barSizeWidth = this._relleno.getContentSize().width - 2,
        this._relleno.setTextureRect(cc.rect(0, 0, 0, this._barSizeHeight), !1, cc.rect(0, 0, 0, 0)),
        IS_HANDHELD || this.checkBackgroundScreen()
    },
    updatePositions: function() {
        var t = 2 * CENTER_POS.y * .1;
        this._barraFondoSprite.setPosition(CENTER_POS.x, t),
        this._relleno.setPosition(CENTER_POS.x, t),
        this._text.setPosition(CENTER_POS.x, t + 40),
        IS_HANDHELD || (this._backgroundSprite.setPosition(CENTER_POS), this.checkBackgroundScreen())
    },
    checkBackgroundScreen: function() {
        var t = this._backgroundSprite.getContentSize().width;
        if (t < WIN_SIZE.width) for (var e = !0,
        i = 1.1; e;) {
            var s = t;
            if (s *= i, s >= WIN_SIZE.width) {
                this._backgroundSprite.setScale(i);
                break
            }
            i += .1
        } else this._backgroundSprite.setScale(1)
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this),
        this.schedule(this._startLoading, .3)
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this)
    },
    initWithResources: function(t, e, i) {
        this.resources = t,
        this.selector = e,
        this.target = i
    },
    _startLoading: function() {
        this.unschedule(this._startLoading),
        cc.Loader.preload(this.resources, this.selector, this.target),
        this.schedule(this._updatePercent)
    },
    _updatePercent: function(t) {
        var e = cc.Loader.getInstance().getPercentage(),
        i = Math.round(this._barSizeWidth * e / 100);
        if (i % 2 === 0) {
            var s = CENTER_POS.x - this._barSizeWidth / 2;
            this._relleno.setPosition(Math.round(s + i / 2), this._relleno.getPosition().y),
            this._relleno.setTextureRect(cc.rect(0, 0, i, this._barSizeHeight), !1, cc.rect(0, 0, 0, 0)),
            e >= 100 && this.unschedule(this._updatePercent),
            null !== g_PhysicsManager && g_PhysicsManager.update(t)
        }
    }
}),
cc.GameLoaderScene.preload = function(t, e, i) {
    this._instance && (this._instance.removeFromParent(!0), this._instance = null),
    this._instance = new cc.GameLoaderScene,
    this._instance.init(),
    this._instance.initWithResources(t, e, i);
    var s = cc.Director.getInstance();
    return s.getRunningScene() ? s.replaceScene(this._instance) : s.runWithScene(this._instance),
    this._instance
};
var arrayParticleDictionaryIndex = new Array,
arrayParticleDictionaryObject = new Array,
ButtonLayer = cc.Layer.extend({
    _backgroundTexture: null,
    _itemStartGame: null,
    _gotoNextScene: !1,
    _backgroundSprite: null,
    ctor: function() {
        g_textureText = null,
        this._super(),
        registerParticleDictionary("res/button_particles.plist"),
        registerParticleDictionary("res/checkpoint_particles.plist"),
        registerParticleDictionary("res/star_particles.plist"),
        registerParticleDictionary("res/score_sparkles.plist"),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this),
        this.setTouchEnabled(!0),
        this.setKeyboardEnabled(!0),
        this.init()
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            IS_HANDHELD || (this._backgroundTexture = new cc.Texture2D, this._backgroundTexture.initWithElement(g_background), this._backgroundTexture.handleLoadedTexture(), this._backgroundSprite = cc.Sprite.createWithTexture(this._backgroundTexture), this._backgroundSprite.setPosition(CENTER_POS), this.addChild(this._backgroundSprite), this.checkBackgroundScreen()),
            this._itemStartGame = cc.MenuItemImage.create(null, null, this.playCallBack, this),
            this._itemStartGame.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PlayButtonNormal.png")),
            this._itemStartGame.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PlayButtonOn.png")),
            this._itemStartGame.setPosition(CENTER_POS);
            var e = cc.Menu.create(this._itemStartGame);
            e.setPosition(cc.p(0, 0)),
            this.addChild(e),
            t = !0
        }
        return t
    },
    checkBackgroundScreen: function() {
        var t = this._backgroundSprite.getContentSize().width;
        if (t < WIN_SIZE.width) for (var e = !0,
        i = 1.1; e;) {
            var s = t;
            if (s *= i, s >= WIN_SIZE.width) {
                this._backgroundSprite.setScale(i);
                break
            }
            i += .1
        } else this._backgroundSprite.setScale(1)
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                void t.selected()
            }
            t.unselected()
        }
        var e = t.getLocation();
        i(this._itemStartGame, e)
    },
    updatePositions: function() {
        this._itemStartGame.setPosition(CENTER_POS),
        IS_HANDHELD || (this._backgroundSprite.setPosition(CENTER_POS), this.checkBackgroundScreen())
    },
    playCallBack: function() {
        if (!this._gotoNextScene) {
            gSharedEngine.playEffect(SOUND_4),
            showButtonParticles(this._itemStartGame),
            gSharedEngine._currentAudioMusic = "";
            var t = cc.Scene.create(),
            e = new SceneMainMenu;
            t.addChild(e),
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.3, t)),
            this._gotoNextScene = !0
        }
    }
}),
Turbopad = cc.Sprite.extend({
    _body: null,
    _activated: !1,
    _fixture: null,
    _posX: 0,
    _posY: 0,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _firstUpdate: !0,
    _time: 0,
    _forceMul: 0,
    ctor: function(t, e, i, s) {
        this._super(),
        this._time = i,
        this._forceMul = s,
        this.setVisible(!1),
        this._width = 122,
        this._height = 71,
        this._posX = t - 61,
        this._posY = e - 35,
        this.createCostumes(),
        this.createPhysicBody(t / BOX2D_GAME_SCALE, e / BOX2D_GAME_SCALE),
        this.setPosition(parseInt(this._posX), parseInt(this._posY)),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this)
    },
    createCostumes: function() {
        this.createAnimation("turbopad.png", 9999999, .2, cc.p(122, 71), "turbopad"),
        this._limitLeft = this._posX - .5 * this._width,
        this._limitRight = this._posX + .5 * this._width,
        this._limitTop = this._posY + .5 * this._height,
        this._limitBottom = this._posY - .5 * this._height
    },
    createAnimation: function(t, e, i, s, a) {
        var r = cc.SpriteFrameCache.getInstance(),
        n = r.getSpriteFrame(t),
        o = n._originalSize.width / s.x,
        c = n._originalSize.height / s.y,
        h = {
            x: n.getRect().x,
            y: n.getRect().y
        };
        this._animation = new cc.Animation.create;
        for (var _ = 0,
        l = 0; c > l; l++) for (var p = 0; o > p; p++) 13 > _ && (this._animation.addSpriteFrameWithTexture(n.getTexture(), cc.rect(h.x + p * s.x, h.y + l * s.y, s.x, s.y)), _++);
        this._animation.setDelayPerUnit(i),
        this._animation.setLoops(e),
        cc.AnimationCache.getInstance().addAnimation(this._animation, a),
        this.runAction(cc.Animate.create(this._animation)),
        this._tag = a
    },
    show: function(t) {
        this.setVisible(t)
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    createPhysicBody: function(t, e) {
        var i = new b2BodyDef;
        i.userData = new DataObject(TYPE_TRIGGER, this),
        i.type = b2Body.b2_staticBody,
        this._body = g_gamelogic._physicManager._physicWorld.CreateBody(i),
        this._body.SetTransform(new b2Vec2(t, -e), this._body.GetAngle());
        var s = new b2PolygonShape;
        s.SetAsBox(.5 * this._width / BOX2D_GAME_SCALE, .5 * this._height / BOX2D_GAME_SCALE);
        var a = new b2FixtureDef;
        a.shape = s,
        a.isSensor = !0,
        this._fixture = this._body.CreateFixture(a)
    },
    update: function() {
        if (this._firstUpdate) {
            this._firstUpdate = !1;
            var t = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            t.objects.push(this)
        }
    },
    reload: function() {
        this.setVisible(!1),
        this._activated = !1
    },
    doAction: function() {
        this._activated || (g_gamelogic._player.pushPlayer(this._time, this._forceMul), g_gamelogic._player._whooshFx.setVisible(!0), gSharedEngine.playEffect(SOUND_22, .3), this._activated = !0)
    }
}),
SpriteAnimation = cc.Sprite.extend({
    _animation: null,
    _endAnimationCallback: null,
    _obj: null,
    _tag: null,
    _params: "",
    ctor: function() {
        this._super()
    },
    initWithAtlas: function(t, e, i, s, a, r, n, o) {
        var c = cc.SpriteFrameCache.getInstance(),
        h = c.getSpriteFrame(t),
        _ = h._originalSize.width / a.x,
        l = h._originalSize.height / a.y,
        p = {
            x: h.getRect().x,
            y: h.getRect().y
        };
        this.createAnimation(h.getTexture(), _, l, e, i, s, a, r, n, o, p)
    },
    init: function(t, e, i, s, a, r, n, o) {
        var c = cc.TextureCache.getInstance().textureForKey(t);
        if (null !== c) {
            var h = c.getContentSize().width / a.x,
            _ = c.getContentSize().height / a.y;
            this.createAnimation(c, h, _, e, i, s, a, r, n, o)
        }
    },
    createAnimation: function(t, e, i, s, a, r, n, o, c, h, _) {
        this._animation = new cc.Animation.create;
        for (var l = 0,
        p = !1,
        d = 0; i > d; d++) {
            for (var u = 0; e > u; u++) {
                if (l += 1, null !== c && "undefined" != typeof c) {
                    if (l < c.x) continue;
                    if (l > c.y) {
                        p = !0;
                        break
                    }
                }
                "undefined" == typeof _ || null === _ ? this._animation.addSpriteFrameWithTexture(t, cc.rect(u * n.x, d * n.y, n.x, n.y)) : this._animation.addSpriteFrameWithTexture(t, cc.rect(_.x + u * n.x, _.y + d * n.y, n.x, n.y))
            }
            if (p) break
        }
        null !== h && h === !0 ? (this.setScaleX( - 1), this.setPositionX( - r.x), this.setPositionY(r.y)) : this.setPosition(r),
        this._animation.setDelayPerUnit(a),
        this._animation.setLoops(s),
        cc.AnimationCache.getInstance().addAnimation(this._animation, o),
        this.setDisplayFrameWithAnimationName(o, 0),
        this._tag = o
    },
    play: function() {
        null !== this._animation && this.runAction(cc.Sequence.create(cc.Animate.create(this._animation), cc.CallFunc.create(this.endAnimation, this)))
    },
    setFrame: function(t) {
        if (null !== this._animation) {
            var e = this._animation.getFrames();
            e.length > 0 && this.setDisplayFrameWithAnimationName(this._tag, t - 1)
        }
    },
    endAnimationCallback: function(t, e, i) {
        this._endAnimationCallback = e,
        this._obj = t,
        this._params = i
    },
    stop: function() {
        this.stopAllActions()
    },
    pause: function() {},
    endAnimation: function(sender) {
        null !== this._obj && null !== this._endAnimationCallback && eval("this._obj." + this._endAnimationCallback + "(" + this._params + ")")
    }
}),
TIME_NEXT_LOADING = 3,
SceneStartAnimation = cc.Layer.extend({
    _modeType: null,
    _selectedLevel: 0,
    _timeChangeScreen: 0,
    _screenChanged: !1,
    ctor: function(t, e) {
        this._modeType = t,
        this._selectedLevel = e,
        this._super(),
        this.init(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this)
    },
    init: function() {
        var t = !1;
        return this._super() && (t = !0, this.createRails()),
        this.scheduleUpdate(),
        t
    },
    updatePositions: function() {},
    createRails: function() {
        var t = WIN_SIZE.width - 220,
        e = 120,
        i = new cc.Sprite;
        i.initWithSpriteFrameName("Recta.png"),
        i.setPosition(cc.p(t + 260, e + 160)),
        i.setRotation( - 29),
        this.addChild(i);
        var s = new cc.Sprite;
        s.initWithSpriteFrameName("Recta.png"),
        s.setPosition(cc.p(t + 210, e + 132)),
        s.setRotation( - 29),
        this.addChild(s);
        var a = new cc.Sprite;
        a.initWithSpriteFrameName("Recta.png"),
        a.setPosition(cc.p(t + 160, e + 104)),
        a.setRotation( - 29),
        this.addChild(a);
        var r = new cc.Sprite;
        r.initWithSpriteFrameName("Recta.png"),
        r.setPosition(cc.p(t + 110, e + 76)),
        r.setRotation( - 29),
        this.addChild(r);
        var n = new cc.Sprite;
        n.initWithSpriteFrameName("Recta.png"),
        n.setPosition(cc.p(t + 60, e + 48)),
        n.setRotation( - 29),
        this.addChild(n);
        var o = new cc.Sprite;
        o.initWithSpriteFrameName("Recta.png"),
        o.setPosition(cc.p(t + 10, e + 20)),
        o.setRotation( - 29),
        this.addChild(o);
        var c = new SpriteAnimation;
        c.initWithAtlas("RotorB.png", 9999999, .02, cc.p(0, 0), cc.p(252, 45), "conveyor1"),
        c.setPosition(cc.p(t + 100 - 100, e + 47 - 60)),
        c.setRotation( - 29),
        c.play(),
        this.addChild(c);
        var h = new SpriteAnimation;
        h.initWithAtlas("RotorB.png", 9999999, .02, cc.p(0, 0), cc.p(252, 45), "conveyor2"),
        h.setPosition(cc.p(t + 220, e + 110)),
        h.setRotation( - 29),
        h.play(),
        this.addChild(h);
        var _ = new SpriteAnimation;
        _.initWithAtlas("RotorA.png", 9999999, .02, cc.p(0, 0), cc.p(35, 45), "rotor", cc.p(1, 10)),
        _.setRotation( - 30),
        _.setPosition(cc.p(t - 30, e - 30)),
        _.play(),
        this.addChild(_)
    },
    update: function(t) {
        this._timeChangeScreen += t,
        this._timeChangeScreen >= TIME_NEXT_LOADING && (this._screenChanged || (this.gotoNextScene(), this._screenChanged = !0))
    },
    gotoNextScene: function() {
        IS_HANDHELD && getBackground(this._modeType),
        g_gameResources.push({
            src: charactersArray[PlayerData.currentCharacter].s2
        }),
        g_gameResources.push({
            src: charactersArray[PlayerData.currentCharacter].s3
        }),
        g_gameResources.push({
            src: charactersArray[PlayerData.currentCharacter].s4
        }),
        g_gameResources.push({
            src: charactersArray[PlayerData.currentCharacter].s5
        }),
        this._modeType === DAY_STAGE ? (g_gameResources.push({
            src: "res/day0.plist"
        }), g_gameResources.push({
            src: "res/day0.png"
        }), cc.GameLoaderScene.preload(g_gameResources,
        function() {
            var t = cc.SpriteFrameCache.getInstance();
            t.addSpriteFrames("res/gameplay0.plist"),
            t.addSpriteFrames("res/gameplay_noalpha0.plist"),
            t.addSpriteFrames("res/day0.plist");
            var e = cc.Scene.create();
            if (PlayerData.skipIntro) {
                var i = new SceneMainGame(this._modeType, e, this._selectedLevel),
                s = new Hud,
                a = new Background(i._gameLogic);
                e.addChild(a),
                e.addChild(i),
                e.addChild(s)
            } else {
                var r = new SceneIntro(this._modeType, this._selectedLevel);
                e.addChild(r),
                cc.Director.getInstance().replaceScene(e)
            }
        },
        this)) : (g_gameResources.push({
            src: "res/night0.plist"
        }), g_gameResources.push({
            src: "res/night0.png"
        }), IS_HANDHELD || g_gameResources.push({
            src: "res/IngameBGNight.jpg"
        }), cc.GameLoaderScene.preload(g_gameResources,
        function() {
            var t = cc.SpriteFrameCache.getInstance();
            t.addSpriteFrames("res/gameplay0.plist"),
            t.addSpriteFrames("res/gameplay_noalpha0.plist"),
            t.addSpriteFrames("res/night0.plist");
            var e = cc.Scene.create();
            if (PlayerData.skipIntro) {
                var i = new SceneMainGame(this._modeType, e, this._selectedLevel),
                s = new Hud,
                a = new Background(i._gameLogic);
                e.addChild(a),
                e.addChild(i),
                e.addChild(s)
            } else {
                var r = new SceneIntro(this._modeType, this._selectedLevel);
                e.addChild(r),
                cc.Director.getInstance().replaceScene(e)
            }
        },
        this))
    }
}),
FakePlayerLayer = cc.Layer.extend({
    _character: null,
    _car: null,
    _carSparks: null,
    _node: null,
    _trainFx: null,
    _nextSteam: 0,
    ctor: function() {
        this._super(),
        CURRENT_LAYERS.push(this),
        this._node = cc.Node.create(),
        this.addChild(this._node),
        this.createFakePlayer(),
        this.scheduleUpdate(),
        this._nextSteam = Math.floor(3 * Math.random() + 1)
    },
    update: function(t) {
        18 === PlayerData.currentCar && null !== this._trainFx && (this._nextSteam -= t, this._nextSteam <= 0 && (this._nextSteam = Math.floor(3 * Math.random() + 1), this._trainFx.setFrame(1), this._trainFx.play(), this._trainFx.setVisible(!0)))
    },
    updatePositions: function() {
        this._node.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y - 50))
    },
    reloadFakePlayer: function() {
        this._character.removeFromParent(!0),
        this._car.removeFromParent(!0),
        this._carSparks.removeFromParent(!0),
        this.createFakePlayer()
    },
    createFakePlayer: function() {
        if (this._character = new SpriteAnimation, this._character.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "idle", cc.p(1, 1)), this._character.setPosition(cc.p( - 60, -30)), this._node.addChild(this._character), 9 === PlayerData.currentCharacter) {
            var t = new SpriteAnimation;
            t.initWithAtlas("flame_in_game.png", 9999999, .06, cc.p( - 10, -5), cc.p(96, 88), "fireFx"),
            this._character.addChild(t, -1),
            t.play()
        }
        var e = carsArray[PlayerData.currentCar - 10];
        e.animated === !0 ? (this._car = new SpriteAnimation, this._car.initWithAtlas(e.sprite, 9999999, e.speed, e.offset, e.region, e.name, e.range), this._car.setPosition(cc.p(e.offset.x, -8 + e.offset.y)), this._car.animated = !0, this._car._alwaysAnimate = e.alwaysAnimate, e.alwaysAnimate === !0 && this._car.play()) : (this._car = new cc.Sprite, this._car.initWithSpriteFrameName(e.sprite), this._car.setPosition(cc.p(0, -8)), this._car.animated = !1, 18 === PlayerData.currentCar ? (this._trainFx = new SpriteAnimation, this._trainFx.initWithAtlas("smoke_train.png", 1, .06, cc.p(85, -40), cc.p(173, 88), "trainFX"), this._car.addChild(this._trainFx), this._trainFx.setPosition(cc.p( - 85, 60)), this._trainFx.endAnimationCallback(this._trainFx, "setVisible", "false"), this._trainFx.play()) : (null !== this._trainFx && this._trainFx.removeFromParent(!0), this._trainFx = null)),
        this._node.addChild(this._car),
        this._node.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y - 50)),
        this._carSparks = new SpriteAnimation,
        this._carSparks.initWithAtlas("TR_cart_Spark.png", 9999999, .08, cc.p(60, 35), cc.p(120.5, 73), "sparkCar"),
        this._car.addChild(this._carSparks),
        this._carSparks.setPosition(cc.p( - 5, -35)),
        this._carSparks.setVisible(!1),
        this._carSparks.play()
    }
}),
Pendulum = cc.Node.extend({
    _posX: 0,
    _posY: 0,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _star: null,
    _cart: null,
    _base1: null,
    _base2: null,
    _structure: null,
    _rotor: null,
    _passa: null,
    _checkCars: null,
    _body: null,
    _fixture: null,
    _firstUpdate: !0,
    _radio: 0,
    _time: 0,
    _heightReached: 0,
    ctor: function(t, e, i, s) {
        cc.Node.prototype.ctor.call(this),
        this._checkCars = new Array,
        this._posX = t,
        this._posY = e,
        this._time = i,
        this._heightReached = s,
        this.createCostumes(),
        this.createPhysicBody(),
        this.setPosition(parseInt(t), parseInt(e)),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this),
        this._limitLeft = t - .5 * this._width,
        this._limitRight = t + .5 * this._width,
        this._limitTop = e + .5 * this._height,
        this._limitBottom = e - .5 * this._height,
        this.setVisible(!1)
    },
    createCostumes: function() {
        this._star = new cc.Sprite,
        this._cart = new cc.Sprite,
        this._base1 = new cc.Sprite,
        this._base2 = new cc.Sprite,
        this._structure = new cc.Sprite,
        this._passa = new cc.Sprite,
        this._rotor = new cc.Node,
        g_gamelogic._modeType === NIGHT_STAGE ? (this._star.initWithSpriteFrameName("star_pendulum_noche.png"), this._cart.initWithSpriteFrameName("pendulum_cart_noche.png"), this._base1.initWithSpriteFrameName("pendulum_down_structure_noche.png"), this._base2.initWithSpriteFrameName("pendulum_down_structure_noche.png"), this._structure.initWithSpriteFrameName("pendulum_structure_noche.png")) : (this._star.initWithSpriteFrameName("star_pendulum.png"), this._cart.initWithSpriteFrameName("pendulum_cart_noche.png"), this._base1.initWithSpriteFrameName("pendulum_down_structure.png"), this._base2.initWithSpriteFrameName("pendulum_down_structure.png"), this._structure.initWithSpriteFrameName("pendulum_structure.png")),
        this._passa.initWithSpriteFrameName("characterscombination_pendulum.png"),
        this._base1.setPosition(cc.p( - 100, -160)),
        this._base2.setPosition(cc.p(100, -160)),
        this._star.setPosition(cc.p(0, .5 * this._structure.getContentSize().height)),
        this._rotor.setPosition(this._star.getPosition()),
        this._structure.setPosition(cc.p(0, .5 * -this._structure.getContentSize().height)),
        this._cart.setPosition(cc.p(.5 * this._structure.getContentSize().width, 0)),
        this._passa.setPosition(cc.p(.5 * this._cart.getContentSize().width, .5 * this._cart.getContentSize().height)),
        this._base2.setScaleX( - 1),
        this.addChild(this._base1),
        this.addChild(this._base2),
        this.addChild(this._rotor),
        this._rotor.addChild(this._structure),
        this._structure.addChild(this._cart),
        this._cart.addChild(this._passa, -1),
        this.addChild(this._star),
        this._rotor.setRotation(.5 * -this._heightReached),
        this._rotor.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.EaseInOut.create(cc.RotateBy.create(this._time, this._heightReached), 3), cc.EaseInOut.create(cc.RotateBy.create(this._time, -this._heightReached), 3)))),
        this._width = 2 * this._structure.getContentSize().height,
        this._height = this._base1.getContentSize().height,
        this._radio = this._structure.getContentSize().height
    },
    createPhysicBody: function() {
        var t = new b2BodyDef;
        t.userData = new DataObject(TYPE_OBSTACLE_EX, this),
        t.type = b2Body.b2_kinematicBody,
        this._body = g_PhysicsManager._physicWorld.CreateBody(t);
        var e = new b2PolygonShape;
        e.SetAsBox(.3 * this._cart.getContentSize().width / BOX2D_GAME_SCALE, .2 * this._cart.getContentSize().height / BOX2D_GAME_SCALE);
        var i = new b2FixtureDef;
        i.shape = e,
        i.density = 1,
        i.friction = 3,
        i.restitution = 0,
        this._fixture = this._body.CreateFixture(i),
        this._body.SetAwake(!1)
    },
    reload: function() {
        this._rotor.stopAllActions(),
        this._checkCars.length = 0,
        this.setVisible(!1),
        this._rotor.setRotation(.5 * -this._heightReached),
        this._rotor.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.EaseInOut.create(cc.RotateBy.create(this._time, this._heightReached), 3), cc.EaseInOut.create(cc.RotateBy.create(this._time, -this._heightReached), 3))))
    },
    show: function(t) {
        this.setVisible(t)
    },
    update: function() {
        if (this._firstUpdate) {
            this._firstUpdate = !1;
            var t = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            t.objects.push(this)
        }
        if (null !== this._body) {
            this._body.IsAwake() || this._body.SetAwake(!0);
            var e = this._posX + this._rotor.getPositionX() + Math.cos( - this._rotor._rotationRadiansX - 1.57079633) * this._radio,
            i = this._posY + this._rotor.getPositionY() + Math.sin( - this._rotor._rotationRadiansY - 1.57079633) * this._radio;
            this._body.SetTransform(new b2Vec2(e / BOX2D_GAME_SCALE, -i / BOX2D_GAME_SCALE), this._body.GetAngle())
        }
        for (var s = 0; s < this._checkCars.length; s++) this._checkCars[s].die(),
        this._checkCars.splice(s, 1)
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    doAction: function(t) {
        this._checkCars.push(t)
    }
}),
PhysicManager = cc.Class.extend({
    _debugDraw: null,
    _physicWorld: null,
    _destroyedBodiesFixtures: null,
    _deactivateBodies: null,
    _callbackArray: null,
    _accumulatedTime: 0,
    ctor: function() {
        this._destroyedBodiesFixtures = new Array,
        this._deactivateBodies = new Array,
        this._callbackArray = new Array;
        var t = new b2Vec2(0, GRAVITY_Y),
        e = !0;
        this._physicWorld = new b2World(t, e),
        this._physicWorld.SetWarmStarting(!0),
        this._physicWorld.SetContinuousPhysics(!1),
        DRAW_DEBUG_PHYSICS && (this._debugDraw = new CanvasDebugDraw, this._debugDraw.context = cc.renderContext, this._debugDraw.scale = BOX2D_GAME_SCALE * cc.Director.getInstance().getOpenGLView().getScaleY(), this._debugDraw.SetFlags(b2Draw.e_shapeBit | b2Draw.e_jointBit), this._physicWorld.SetDebugDraw(this._debugDraw)),
        this.addCollisionListener()
    },
    update: function(t) {
        this._accumulatedTime += t;
        var e = Math.floor(this._accumulatedTime / FIXED_TIMESTEP);
        this._accumulatedTime -= e * FIXED_TIMESTEP;
        var i = Math.min(e, MAX_STEPS);
        for (this._physicWorld.Step(3 * FIXED_TIMESTEP / 4 * i, 5, 5), this._physicWorld.Step(3 * FIXED_TIMESTEP / 4 * i, 5, 5), this._physicWorld.ClearForces(); this._destroyedBodiesFixtures.length > 0;) this._destroyedBodiesFixtures[0].body.DestroyFixture(this._destroyedBodiesFixtures[0].fixture),
        this._physicWorld.DestroyBody(this._destroyedBodiesFixtures[0].body),
        this._destroyedBodiesFixtures.shift();
        for (; this._deactivateBodies.length > 0;) this._deactivateBodies[0].SetActive(!1),
        this._deactivateBodies.shift();
        for (var s = 0; s < this._callbackArray.length; s++) this._callbackArray[s].createPhysics();
        this._callbackArray.length > 0 && (this._callbackArray.length = 0)
    },
    addCollisionListener: function() {
        var t = new b2ContactListener;
        t.BeginContact = function(t) {
            var e = t.GetFixtureA().GetBody().GetUserData(),
            i = t.GetFixtureB().GetBody().GetUserData(),
            s = null,
            a = null;
            if (hasCollision = function(t, r) {
                return e._type & t && i._type & r ? (s = e, a = i, !0) : e._type & r && i._type & t ? (s = i, a = e, !0) : !1
            },
            hasCollision(TYPE_WHEEL_1, TYPE_GROUND | TYPE_OBSTACLE)) s._data.changeWheel1State(!0);
            else if (hasCollision(TYPE_WHEEL_2, TYPE_GROUND | TYPE_OBSTACLE)) s._data.changeWheel2State(!0);
            else if (hasCollision(TYPE_CHARACTER | TYPE_WHEEL_1 | TYPE_WHEEL_2 | TYPE_CAR, TYPE_OBSTACLE_EX)) a._data.doAction(s._data);
            else if (hasCollision(TYPE_CAR, TYPE_PICKUP)) s._data.grabPickUp(a._data);
            else if (hasCollision(TYPE_CAR, TYPE_TRIGGER))"KILL" === a._data._action ? a._data._isdisabled || s._data.die() : s._data._isNPC || a._data.doAction();
            else if (hasCollision(TYPE_CHARACTER, TYPE_OBSTACLE)) a._data.doAction(s._data);
            else if (hasCollision(TYPE_CHARACTER | TYPE_WHEEL_1 | TYPE_WHEEL_2 | TYPE_CAR | TYPE_NONE, TYPE_CHARACTER | TYPE_WHEEL_1 | TYPE_WHEEL_2 | TYPE_CAR | TYPE_NONE)) {
                var r = null,
                n = null;
                if (s._data._isNPC && !a._data._isNPC) r = s._data,
                n = a._data;
                else {
                    if (!a._data._isNPC || s._data._isNPC) return;
                    r = a._data,
                    n = s._data
                }
                r.touchedByCar(),
                n._killNPC ? n.isOnFire() ? r.burn() : r.die() : n.isOnFire() ? r.burn() : n.die()
            }
        },
        t.EndContact = function(t) {
            var e = t.GetFixtureA().GetBody().GetUserData(),
            i = t.GetFixtureB().GetBody().GetUserData(),
            s = null,
            a = null;
            hasNoCollision = function(t, r) {
                return e._type & t && i._type & r ? (s = e, a = i, !0) : e._type & r && i._type & t ? (s = i, a = e, !0) : !1
            },
            hasNoCollision(TYPE_CHARACTER, TYPE_OBSTACLE) ? a._data.removeAction(i._data) : hasNoCollision(TYPE_WHEEL_1, TYPE_GROUND) ? s._data.changeWheel1State(!1) : hasNoCollision(TYPE_WHEEL_2, TYPE_GROUND) && s._data.changeWheel1State(!1)
        },
        this._physicWorld.SetContactListener(t)
    }
}),
VisualElement = cc.Sprite.extend({
    _name: "",
    _startX: 0,
    _startY: 0,
    _startRotation: 0,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _firstUpdate: !0,
    _animation: null,
    _isAnimated: !1,
    ctor: function(t, e, i) {
        this._super(),
        this.setVisible(!1),
        this._name = e,
        ("loop_light.png" === t || "rainbow_turbopad.png" === t) && (this._isAnimated = !0);
        var s = t;
        if (g_gamelogic._modeType === NIGHT_STAGE) for (var a = g_nightChangedResources.length,
        r = 0; a > r; r++) if (g_nightChangedResources[r].dayRes === s) {
            s = g_nightChangedResources[r].nightRes;
            break
        }
        this.createCostumes(s),
        "undefined" == typeof i || i === !0 ? g_gamelogic._sceneMainGame._foregroundLayer.addChild(this) : g_gamelogic._sceneMainGame._backgroundLayer.addChild(this)
    },
    createCostumes: function(t) {
        "region" === this._name ? (this.init(t), this._width = this.getContentSize().width, this._height = this.getContentSize().height) : this._isAnimated ? ("loop_light.png" === t ? (this._width = 35, this._height = 47, this.createAnimation(getLoopLightBulb(), 9999999, .2, cc.p(35, 47), "loop_light", loopLightsDelay)) : (this._width = 19, this._height = 29, this.createAnimation("rainbow_turbopad.png", 9999999, .06, cc.p(19, 29), "turbopad_rainbow", getNextRainbowDelay())), this._limitLeft = this._posX - .5 * this._width, this._limitRight = this._posX + .5 * this._width, this._limitTop = this._posY + .5 * this._height, this._limitBottom = this._posY - .5 * this._height) : (this.initWithSpriteFrameName(t), this._width = this.getContentSize().width, this._height = this.getContentSize().height)
    },
    createAnimation: function(t, e, i, s, a, r) {
        var n = cc.SpriteFrameCache.getInstance(),
        o = n.getSpriteFrame(t),
        c = o._originalSize.width / s.x,
        h = o._originalSize.height / s.y,
        _ = {
            x: o.getRect().x,
            y: o.getRect().y
        };
        this._animation = new cc.Animation.create;
        for (var l = 0; h > l; l++) for (var p = 0; c > p; p++) this._animation.addSpriteFrameWithTexture(o.getTexture(), cc.rect(_.x + p * s.x, _.y + l * s.y, s.x, s.y));
        this._animation.setDelayPerUnit(i),
        this._animation.setLoops(e),
        cc.AnimationCache.getInstance().addAnimation(this._animation, a),
        this.runAction(cc.Sequence.create(cc.MoveBy.create(r, cc.p(0, 0)), cc.Animate.create(this._animation))),
        this._tag = a
    },
    destroy: function() {
        this.removeFromParent(!0)
    },
    show: function(t) {
        this.setVisible(t)
    },
    update: function() {
        if (this._firstUpdate) {
            var t = .5 * this._width,
            e = .5 * this._height;
            this._limitLeft = this.getPositionX() - t,
            this._limitRight = this.getPositionX() + t,
            this._limitTop = this.getPositionY() + e,
            this._limitBottom = this.getPositionY() - e,
            this._firstUpdate = !1;
            var i = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            i.objects.push(this),
            this._isAnimated && this.setPosition(cc.p(this.getPositionX() - .5 * this._width, this.getPositionY() - .5 * this._height))
        }
    },
    setName: function(t) {
        this._name = t
    },
    makeInvisible: function() {
        this.setVisible(!1)
    }
});
cc.LoaderScene = cc.Scene.extend({
    _logo: null,
    _texture2d: null,
    _backgroundSprite: null,
    _backgroundTexture: null,
    _textureBarraRelleno: null,
    _relleno: null,
    _barSizeHeight: null,
    _barSizeWidth: null,
    _loadLogo: !0,
    _textureBarraFondo: null,
    _textureTextTexture: null,
    _barraFondoSprite: null,
    _text: null,
    ctor: function() {
        cc.Scene.prototype.ctor.call(this)
    },
    init: function() {
        cc.Scene.prototype.init.call(this),
        gSharedEngine.playMusic(MUSIC_BACKGROUND_4, !0),
        gSharedEngine._music.volume(0),
        this._initStage(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this)
    },
    _initStage: function() {
        var t = 2 * CENTER_POS.y * .1;
        IS_HANDHELD || (this._backgroundTexture = new cc.Texture2D, this._backgroundTexture.initWithElement(g_background), this._backgroundTexture.handleLoadedTexture(), this._backgroundSprite = cc.Sprite.createWithTexture(this._backgroundTexture), this._backgroundSprite.setPosition(CENTER_POS), this.addChild(this._backgroundSprite, 10)),
        this._texture2d = new cc.Texture2D,
        this._texture2d.initWithElement(g_logoTexture),
        this._texture2d.handleLoadedTexture(),
        this._logo = cc.Sprite.createWithTexture(this._texture2d),
        this._logo.setPositionX(CENTER_POS.x),
        this._logo.setPositionY(1.5 * CENTER_POS.y),
        this.addChild(this._logo, 10),
        this._textureTextTexture = new cc.Texture2D,
        this._textureTextTexture.initWithElement(g_textureText),
        this._textureTextTexture.handleLoadedTexture(),
        this._text = cc.Sprite.createWithTexture(this._textureTextTexture),
        this.addChild(this._text, 10),
        this._text.setPosition(CENTER_POS.x, t + 40),
        this._textureBarraFondo = new cc.Texture2D,
        this._textureBarraFondo.initWithElement(g_barraFondo),
        this._textureBarraFondo.handleLoadedTexture(),
        this._barraFondoSprite = cc.Sprite.createWithTexture(this._textureBarraFondo),
        this._barraFondoSprite.setPosition(CENTER_POS.x, t),
        this.addChild(this._barraFondoSprite, 10),
        this._textureBarraRelleno = new cc.Texture2D,
        this._textureBarraRelleno.initWithElement(g_barraRelleno),
        this._textureBarraRelleno.handleLoadedTexture(),
        this._relleno = cc.Sprite.createWithTexture(this._textureBarraRelleno),
        this._relleno.setPosition(CENTER_POS.x, t),
        this.addChild(this._relleno, 10),
        this._barSizeHeight = this._relleno.getContentSize().height,
        this._barSizeWidth = this._relleno.getContentSize().width - 2,
        this._relleno.setTextureRect(cc.rect(0, 0, 0, this._barSizeHeight), !1, cc.rect(0, 0, 0, 0)),
        IS_HANDHELD || this.checkBackgroundScreen()
    },
    checkBackgroundScreen: function() {
        var t = this._backgroundSprite.getContentSize().width;
        if (t < WIN_SIZE.width) for (var e = !0,
        i = 1.1; e;) {
            var s = t;
            if (s *= i, s >= WIN_SIZE.width) {
                this._backgroundSprite.setScale(i);
                break
            }
            i += .1
        } else this._backgroundSprite.setScale(1)
    },
    updatePositions: function() {
        var t = 2 * CENTER_POS.y * .1;
        this._logo.setPositionX(CENTER_POS.x),
        this._logo.setPositionY(1.5 * CENTER_POS.y),
        this._barraFondoSprite.setPosition(CENTER_POS.x, t),
        this._relleno.setPosition(CENTER_POS.x, t),
        this._text.setPosition(CENTER_POS.x, t + 40),
        IS_HANDHELD || (this._backgroundSprite.setPosition(CENTER_POS), this.checkBackgroundScreen())
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this),
        this.schedule(this._startLoading, .3)
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this)
    },
    initWithResources: function(t, e, i) {
        this.resources = t,
        this.selector = e,
        this.target = i
    },
    _startLoading: function() {
        this.unschedule(this._startLoading),
        cc.Loader.preload(this.resources, this.selector, this.target),
        this.schedule(this._updatePercent)
    },
    _updatePercent: function() {
        var t = cc.Loader.getInstance().getPercentage(),
        e = Math.round(this._barSizeWidth * t / 100);
        if (e % 2 === 0) {
            var i = Math.round(CENTER_POS.x - this._barSizeWidth / 2),
            s = Math.round(i + e / 2);
            this._relleno.setPosition(s, this._relleno.getPosition().y),
            this._relleno.setTextureRect(cc.rect(0, 0, e, this._barSizeHeight), !1, cc.rect(0, 0, 0, 0)),
            t >= 100 && this.unschedule(this._updatePercent)
        }
    }
}),
cc.LoaderScene.preload = function(t, e, i) {
    this._instance || (this._instance = new cc.LoaderScene, this._instance.init()),
    this._instance.initWithResources(t, e, i);
    var s = cc.Director.getInstance();
    return s.getRunningScene() ? s.replaceScene(this._instance) : s.runWithScene(this._instance),
    this._instance
};
var Hud = cc.Layer.extend({
    _cash: null,
    _minimapBG: null,
    _buttonDown: null,
    _buttonUp: null,
    _iconFace: null,
    _initPos: 0,
    _spilLogo: null,
    _livesValue: null,
    _cashValue: null,
    _currentCash: 0,
    _currentLives: NUMBER_OF_LIVES,
    _explosion: null,
    _startTimer: 3.9,
    _useCountDown: !1,
    _counterText: null,
    _counterValue: 3,
    _coins: null,
    _coin1: null,
    _coin2: null,
    _coin3: null,
    _pauseButton: null,
    ctor: function() {
        IS_HANDHELD && (this._useCountDown = !0),
        g_gamelogic.setHud(this),
        this._super(),
        this._explosion = new SpriteAnimation,
        this._explosion.initWithAtlas("TR_IN_FallExplosion.png", 1, .06, cc.p(85, 31), cc.p(152, 63), "carExplosion"),
        this._explosion.setPosition(cc.p(CENTER_POS.x - 100, -30)),
        this._explosion.setScale(2),
        this.addChild(this._explosion),
        this.init()
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            this._iconFace = cc.Sprite.create(charactersArray[PlayerData.currentCharacter].s5),
            this._iconFace.setPosition(cc.p(50, WIN_SIZE.height - 55)),
            this.addChild(this._iconFace),
            this._cash = new cc.Sprite,
            this._cash.initWithSpriteFrameName("TR_IN_CashIcon.png"),
            this._cash.setPosition(cc.p(.3 * WIN_SIZE.width, this._iconFace.getPositionY())),
            this.addChild(this._cash),
            this._cash.setScale(1.2),
            this._coins = new cc.Sprite,
            this._coins.initWithSpriteFrameName("coins_hud.png"),
            this._coins.setPosition(cc.p(this._iconFace.getPositionX() + .5 * this._iconFace.getContentSize().width, this._iconFace.getPositionY() - 50)),
            this.addChild(this._coins),
            this._coin1 = new cc.Sprite,
            this._coin1.initWithSpriteFrameName("coins_hud_earn.png"),
            this._coin1.setPosition(cc.p(.5 * this._coins.getContentSize().width - 35, 18)),
            this._coins.addChild(this._coin1),
            this._coin2 = new cc.Sprite,
            this._coin2.initWithSpriteFrameName("coins_hud_earn.png"),
            this._coin2.setPosition(cc.p(.5 * this._coins.getContentSize().width, 18)),
            this._coins.addChild(this._coin2),
            this._coin3 = new cc.Sprite,
            this._coin3.initWithSpriteFrameName("coins_hud_earn.png"),
            this._coin3.setPosition(cc.p(.5 * this._coins.getContentSize().width + 35, 18)),
            this._coins.addChild(this._coin3),
            this._coin1.setVisible(!1),
            this._coin2.setVisible(!1),
            this._coin3.setVisible(!1),
            this._minimapBG = new cc.Sprite,
            this._minimapBG.initWithSpriteFrameName(g_gamelogic._modeType === DAY_STAGE ? "TR_IN_ProgressBarFull.png": "TR_IN_ProgressBarFull_Night.png"),
            this._minimapBG.setPosition(cc.p(CENTER_POS.x, 50)),
            this.addChild(this._minimapBG),
            this._initPos = this._minimapBG.getPosition().x - .5 * this._minimapBG.getContentSize().width + 15,
            this._faceBar = cc.Sprite.create(charactersArray[PlayerData.currentCharacter].s4),
            this._faceBar.setPosition(cc.p(this._initPos, this._minimapBG.getPosition().y - 25)),
            this.addChild(this._faceBar),
            this._livesValue = cc.LabelBMFont.create("X 0" + this._currentLives, "res/Arial.fnt"),
            this._livesValue.setScale(TextUtils.getTextSizeScale(40)),
            this._livesValue.setPosition(cc.p(this._iconFace.getPositionX() + .5 * this._iconFace.getContentSize().width + 25, this._iconFace.getPositionY())),
            this.addChild(this._livesValue),
            this._cashValue = cc.LabelBMFont.create("0123456789", "res/Arial.fnt", 300, cc.TEXT_ALIGNMENT_LEFT),
            this._cashValue.setScale(TextUtils.getTextSizeScale(40)),
            this._cashValue.setPosition(cc.p(this._cash.getPositionX() + 70, this._livesValue.getPositionY())),
            this.addChild(this._cashValue),
            this._cashValue.setString("0", !1),
            IS_HANDHELD && (this._buttonDown = new cc.Sprite, this._buttonDown.initWithSpriteFrameName("TR3_controls2.png"), this.addChild(this._buttonDown), this._buttonDown.setPosition(cc.p(.5 * this._buttonDown.getContentSize().width, CENTER_POS.y)), this._buttonUp = new cc.Sprite, this._buttonUp.initWithSpriteFrameName("TR3_controls1.png"), this.addChild(this._buttonUp), this._buttonUp.setPosition(cc.p(WIN_SIZE.width - .5 * this._buttonDown.getContentSize().width, CENTER_POS.y)), this._counterText = cc.LabelTTF.create("3", "Arial", "129"), this._counterText.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y)), this.addChild(this._counterText)),
            this._pauseButton = cc.MenuItemImage.create(null, null, this.pauseCallBack, this),
            this._pauseButton.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PauseBtn.png")),
            this._pauseButton.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PauseOverBtn.png")),
            this._pauseButton.setPosition(cc.p(WIN_SIZE.width - 50, this._iconFace.getPositionY()));
            var e = cc.Menu.create(this._pauseButton);
            e.setPosition(cc.p(0, 0)),
            this.addChild(e);
            var i = this;
            if (SpilAPI) {
                var s = SpilAPI.Branding.getLogo();
                if (s.image) {
                    var a = new Image;
                    a.crossOrigin = "Anonymous",
                    a.src = s.image,
                    a.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(a),
                        t.handleLoadedTexture();
                        var e = cc.Sprite.createWithTexture(t);
                        i._spilLogo = cc.MenuItemImage.create(null, null, s.action, i),
                        i._spilLogo.setNormalImage(e),
                        i._spilLogo.setPosition(cc.p(WIN_SIZE.width - 200, i._iconFace.getPositionY()));
                        var r = cc.Menu.create(i._spilLogo);
                        r.setPosition(cc.p(0, 0)),
                        i.addChild(r)
                    }
                }
            }
            CURRENT_LAYERS.push(this)
        }
        return t
    },
    winStar: function(t) {
        function e(t, e) {
            if (!IS_HANDHELD) {
                var i = createParticleSystemWithDictionary("res/score_sparkles.plist");
                i.setDrawMode(cc.PARTICLE_TEXTURE_MODE),
                t.addChild(i),
                i.setPosition(cc.p(t.getPositionX() + e, t.getPositionY())),
                i.setPositionType(cc.PARTICLE_TYPE_RELATIVE),
                i.setAutoRemoveOnFinish(!0)
            }
        }
        0 === t ? (this._coin1.setVisible(!0), this._coin1.setScale(2), this._coin1.runAction(cc.ScaleTo.create(.2, 1, 1)), e(this._coin1, -5)) : 1 === t ? (this._coin2.setVisible(!0), this._coin2.setScale(2), this._coin2.runAction(cc.ScaleTo.create(.2, 1, 1)), e(this._coin2, -50)) : 2 === t && (this._coin3.setVisible(!0), this._coin3.setScale(2), this._coin3.runAction(cc.ScaleTo.create(.2, 1, 1)), e(this._coin3, -60))
    },
    setNewCashValue: function(t) {
        this._currentCash += t,
        this._cashValue.setString("" + this._currentCash, !1)
    },
    pauseCallBack: function() {
        showButtonParticles(this._pauseButton),
        g_gamelogic._paused = !g_gamelogic._paused,
        g_gamelogic._paused === !0 ? (SpilAPI && SpilAPI.GameBreak.request(spilPauseGame, spilResumeGame), cc.Director.getInstance().pause()) : cc.Director.getInstance().resume()
    },
    updatePositions: function() {
        this._explosion.setPosition(cc.p(CENTER_POS.x - 100, -30)),
        this._minimapBG.setPosition(cc.p(CENTER_POS.x, 50)),
        this._initPos = this._minimapBG.getPosition().x - .5 * this._minimapBG.getContentSize().width + 15,
        this._iconFace.setPosition(cc.p(50, WIN_SIZE.height - 35)),
        this._coins.setPosition(cc.p(this._iconFace.getPositionX() + .5 * this._iconFace.getContentSize().width, this._iconFace.getPositionY() - 50)),
        this._cash.setPosition(cc.p(.3 * WIN_SIZE.width, this._iconFace.getPositionY())),
        this._faceBar.setPosition(cc.p(this._initPos, this._minimapBG.getPosition().y - 25)),
        this._livesValue.setPosition(cc.p(this._iconFace.getPositionX() + .5 * this._iconFace.getContentSize().width + 25, this._iconFace.getPositionY())),
        this._cashValue.setPosition(cc.p(this._cash.getPositionX() + 70, this._livesValue.getPositionY())),
        this._pauseButton.setPosition(cc.p(WIN_SIZE.width - 40, this._iconFace.getPositionY())),
        this._spilLogo && this._spilLogo.setPosition(cc.p(WIN_SIZE.width - 200, this._iconFace.getPositionY())),
        IS_HANDHELD && (this._buttonDown.setPosition(cc.p(.5 * this._buttonDown.getContentSize().width, CENTER_POS.y)), this._buttonUp.setPosition(cc.p(WIN_SIZE.width - .5 * this._buttonDown.getContentSize().width, CENTER_POS.y)))
    },
    update: function(t) {
        if (IS_HANDHELD && this._useCountDown) {
            this._startTimer -= t;
            var e = parseInt(this._startTimer);
            e !== this._counterValue && this._counterText.setString(0 === e ? "GO!": e),
            this._startTimer <= 0 && (this._useCountDown = !1, g_gamelogic._player._activated = !0, g_PhysicsManager._callbackArray.push(g_gamelogic._player), this._counterText.removeFromParent(!0))
        }
        if (null !== g_gamelogic._mapManager._lastPoint) {
            var i = Math.max(g_gamelogic._mapManager._currentCheckPoint - 1, 0),
            s = g_gamelogic._mapManager.currentCheckPointStartPos(i),
            a = g_gamelogic._player.getPosition().x,
            r = g_gamelogic._mapManager.currentCheckPointEndPos(i),
            n = (a - s) / (r - s),
            o = Math.min(Math.max(n, 0), 1),
            c = 0;
            c = g_gamelogic._modeType === DAY_STAGE ? .33333 * (i + o) : .25 * (i + o),
            this._faceBar.setPositionX(this._initPos + (this._minimapBG.getContentSize().width - 45) * c)
        }
    }
}),
TIME_NEXT_SCENE_INTRO = 4.5,
MAX_CARS_INTRO = 7,
CAR_VELOCITY = 2,
SceneIntro = cc.Layer.extend({
    _modeType: null,
    _bgSprite: null,
    _timeChangeScreen: 0,
    _screenChanged: !1,
    _carIndex: 0,
    _timeToCreateNewCar: 99,
    _timeForNextCar: 0,
    _explosionTimer: 0,
    _explosionActionated: !1,
    _carArray: null,
    _rect8: null,
    _rect9: null,
    _selectedLevel: 0,
    _carCount: 0,
    ctor: function(t, e) {
        this._modeType = t,
        this._selectedLevel = e,
        this._carArray = new Array,
        this._super(),
        this.init(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this),
        this.setTouchEnabled(!0),
        this.setKeyboardEnabled(!0),
        PlayerData.skipIntro = !0,
        PlayerData.saveData()
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            t = !0;
            var e = getBackground(this._modeType);
            e && (this._bgSprite = e, this.addChild(this._bgSprite), this._bgSprite.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y))),
            this.createRails()
        }
        return this.scheduleUpdate(),
        t
    },
    updatePositions: function() {
        this._bgSprite && this._bgSprite.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y))
    },
    onTouchesEnded: function() {
        this._screenChanged || (this._screenChanged = !0, this.gotoNextScene())
    },
    onKeyUp: function() {
        this._screenChanged || (this._screenChanged = !0, this.gotoNextScene())
    },
    createRails: function() {
        var t = new cc.Sprite;
        t.initWithSpriteFrameName("Recta.png"),
        t.setPosition(cc.p(260, 160)),
        t.setRotation( - 29),
        this.addChild(t);
        var e = new cc.Sprite;
        e.initWithSpriteFrameName("Recta.png"),
        e.setPosition(cc.p(210, 132)),
        e.setRotation( - 29),
        this.addChild(e);
        var i = new cc.Sprite;
        i.initWithSpriteFrameName("Recta.png"),
        i.setPosition(cc.p(160, 104)),
        i.setRotation( - 29),
        this.addChild(i);
        var s = new cc.Sprite;
        s.initWithSpriteFrameName("Recta.png"),
        s.setPosition(cc.p(110, 76)),
        s.setRotation( - 29),
        this.addChild(s);
        var a = new cc.Sprite;
        a.initWithSpriteFrameName("Recta.png"),
        a.setPosition(cc.p(60, 48)),
        a.setRotation( - 29),
        this.addChild(a);
        var r = new cc.Sprite;
        r.initWithSpriteFrameName("Recta.png"),
        r.setPosition(cc.p(10, 20)),
        r.setRotation( - 29),
        this.addChild(r);
        var n = new cc.Sprite;
        n.initWithSpriteFrameName("Recta.png"),
        n.setPosition(cc.p(340, 160)),
        n.setRotation(40),
        this.addChild(n),
        this._rect8 = new cc.Sprite,
        this._rect8.initWithSpriteFrameName("Recta.png"),
        this._rect8.setPosition(cc.p(390, 118)),
        this._rect8.setRotation(40),
        this.addChild(this._rect8),
        this._rect9 = new cc.Sprite,
        this._rect9.initWithSpriteFrameName("Recta.png"),
        this._rect9.setPosition(cc.p(440, 76)),
        this._rect9.setRotation(40),
        this.addChild(this._rect9);
        var o = new cc.Sprite;
        o.initWithSpriteFrameName("Recta.png"),
        o.setPosition(cc.p(490, 34)),
        o.setRotation(40),
        this.addChild(o);
        var c = new cc.Sprite;
        c.initWithSpriteFrameName("Recta.png"),
        c.setPosition(cc.p(540, -8)),
        c.setRotation(40),
        this.addChild(c);
        var h = new SpriteAnimation;
        h.initWithAtlas("RotorB.png", 9999999, .02, cc.p(0, 0), cc.p(252, 45), "conveyor1"),
        h.setPosition(cc.p(100, 47)),
        h.setRotation( - 29),
        h.play(),
        this.addChild(h);
        var _ = new SpriteAnimation;
        _.initWithAtlas("RotorB.png", 9999999, .02, cc.p(0, 0), cc.p(252, 45), "conveyor2"),
        _.setPosition(cc.p( - 115, -72)),
        _.setRotation( - 29),
        _.play(),
        this.addChild(_);
        var l = new SpriteAnimation;
        l.initWithAtlas("RotorA.png", 9999999, .02, cc.p(0, 0), cc.p(35, 45), "rotor", cc.p(1, 10)),
        l.setRotation(151),
        l.setPosition(cc.p(310, 210)),
        l.play(),
        this.addChild(l)
    },
    createFakeCar: function() {
        var t = cc.Node.create();
        if (this._carCount !== MAX_CARS_INTRO - 1) {
            var e = new cc.Sprite;
            e.initWithSpriteFrameName(npcArray[this._carIndex].s1),
            e.setPosition(cc.p(0, 10)),
            t.addChild(e)
        } else {
            var e = new SpriteAnimation;
            e.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "idle", cc.p(1, 1)),
            e.setPosition(cc.p( - 60, -30)),
            t.addChild(e)
        }
        var i = carsArray[PlayerData.currentCar - 10],
        s = null;
        i.animated === !0 ? (s = new SpriteAnimation, s.initWithAtlas(i.sprite, 9999999, i.speed, i.offset, i.region, i.name, i.range), s.setPosition(cc.p(i.offset.x, -8 + i.offset.y)), s.play()) : (s = new cc.Sprite, s.initWithSpriteFrameName(i.sprite), s.setPosition(cc.p(0, -8))),
        t.addChild(s),
        t.setPosition(cc.p( - 100, CENTER_POS.y - 50 - 140)),
        t.setRotation( - 30),
        this.addChild(t),
        this._timeForNextCar = .55 * CAR_VELOCITY * s.getContentSize().width / 400,
        t.runAction(cc.Sequence.create(cc.MoveTo.create(CAR_VELOCITY, cc.p(300, 250)), cc.RotateTo.create(0, 45, 15), cc.MoveBy.create(0, cc.p(40, -13)), cc.MoveTo.create(CAR_VELOCITY, cc.p(700, -100)))),
        this._carArray.push(t)
    },
    update: function(t) {
        if (this._timeChangeScreen += t, this._timeChangeScreen >= TIME_NEXT_SCENE_INTRO && (this._screenChanged || (this.gotoNextScene(), this._screenChanged = !0)), !this._explosionActionated && (this._explosionTimer += t, this._explosionTimer > 3.5)) {
            var e = new SpriteAnimation;
            e.initWithAtlas("TR_IN_Explosion.png", 1, .04, cc.p(75, 70), cc.p(137, 141), "explosion"),
            e.setPosition(cc.p(300, 0)),
            e.play(),
            e.setScale(2),
            this.addChild(e),
            gSharedEngine.playEffect(SOUND_17),
            this._explosionActionated = !0;
            for (var i = 0; i < this._carArray.length; i++) this._carArray[i].stopAllActions();
            for (var s = 0,
            a = 0,
            i = 0; i < this._carArray.length; i++) s = 1e3 * (Math.random() + .1),
            a = 1e3 * (Math.random() + .1),
            this._carArray[i].runAction(cc.RepeatForever.create(cc.RotateBy.create(.2, 75))),
            this._carArray[i].runAction(cc.MoveBy.create(.9, cc.p(s, a)));
            s = 1e3 * (Math.random() + .1),
            a = 1e3 * (Math.random() + .1),
            this._rect8.runAction(cc.RepeatForever.create(cc.RotateBy.create(.2, 75))),
            this._rect8.runAction(cc.MoveBy.create(.9, cc.p(s, a))),
            s = 1e3 * (Math.random() + .1),
            a = 1e3 * (Math.random() + .1),
            this._rect9.runAction(cc.RepeatForever.create(cc.RotateBy.create(.2, 75))),
            this._rect9.runAction(cc.MoveBy.create(.9, cc.p(s, a)))
        }
        this._carCount < MAX_CARS_INTRO && (this._timeToCreateNewCar += t, this._timeToCreateNewCar >= this._timeForNextCar && (this.createFakeCar(), this._carCount++, this._carIndex += 1, this._carIndex >= NPC_MAX && (this._carIndex = 0), this._timeToCreateNewCar = 0))
    },
    gotoNextScene: function() {
        var t = cc.Scene.create(),
        e = new SceneMainGame(this._modeType, t, this._selectedLevel),
        i = new Hud,
        s = new Background(e._gameLogic);
        t.addChild(s),
        t.addChild(e),
        t.addChild(i)
    }
}),
Trigger = cc.Sprite.extend({
    _body: null,
    _activated: !1,
    _action: "",
    _name: "",
    _target: "",
    _distance: "",
    _fixture: null,
    _rotation: 0,
    _canmove: !1,
    _originalX: 0,
    _originalY: 0,
    _tileName: "",
    _helperX: 0,
    _helperY: 0,
    _overrideGroups: !1,
    _overrideGroupArray: null,
    _startDisabled: !1,
    _isdisabled: !1,
    _dataObject: null,
    _animation: null,
    _tag: null,
    _offset: null,
    _splash: null,
    _playedAnimation: !1,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _firstUpdate: !0,
    _hasImage: !1,
    ctor: function(t, e, i, s, a, r, n, o, c, h, _, l) {
        this._target = n,
        this._distance = o,
        this._canmove = h,
        this._originalX = i,
        this._originalY = s,
        this._startDisabled = l,
        this._offset = cc.p(0, 0),
        this._hasImage = !1,
        this._action = t,
        this.setVisible(!1),
        l && (this._isdisabled = !0),
        this._rotation = -c * Math.PI / 180,
        this._super(),
        "TRAMPOLINE" === this._action && (this._hasImage = !0, this._offset = cc.p( - 90, -70), this.createAnimation("catapult_spritesheet.png", 3, .03, cc.p(186, 149), "catapult"), this._width = 186, this._height = 149, this._limitLeft = i + this._offset.x - .5 * this._width, this._limitRight = i + this._offset.x + .5 * this._width, this._limitTop = s + this._offset.y + .5 * this._height, this._limitBottom = s + this._offset.y - .5 * this._height),
        this.createPhysicBody(i / BOX2D_GAME_SCALE, s / BOX2D_GAME_SCALE, a, r),
        this.setPosition(parseInt(i + this._offset.x), parseInt(s + this._offset.y)),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this)
    },
    show: function(t) {
        this._hasImage && this.setVisible(t)
    },
    createAnimation: function(t, e, i, s, a) {
        var r = cc.SpriteFrameCache.getInstance(),
        n = r.getSpriteFrame(t),
        o = n._originalSize.width / s.x,
        c = n._originalSize.height / s.y,
        h = {
            x: n.getRect().x,
            y: n.getRect().y
        };
        this._animation = new cc.Animation.create;
        for (var _ = 0; c > _; _++) for (var l = 0; o > l; l++) this._animation.addSpriteFrameWithTexture(n.getTexture(), cc.rect(h.x + l * s.x, h.y + _ * s.y, s.x, s.y));
        this._animation.setDelayPerUnit(i),
        this._animation.setLoops(e),
        cc.AnimationCache.getInstance().addAnimation(this._animation, a),
        this.setDisplayFrameWithAnimationName(a, 0),
        this._tag = a
    },
    createCostumes: function(t, e) {
        this.initWithSpriteFrameName(t),
        this.setRotation( - e)
    },
    createPhysicBody: function(t, e, i, s) {
        var a = new b2BodyDef;
        a.userData = new DataObject(TYPE_TRIGGER, this),
        a.type = this._canmove ? b2Body.b2_kinematicBody: b2Body.b2_staticBody,
        this._body = g_gamelogic._physicManager._physicWorld.CreateBody(a),
        this._body.SetTransform(new b2Vec2(t, -e), this._rotation);
        var r = new b2PolygonShape;
        r.SetAsBox(.5 * i / BOX2D_GAME_SCALE, .5 * s / BOX2D_GAME_SCALE);
        var n = new b2FixtureDef;
        n.shape = r,
        n.isSensor = !0,
        this._fixture = this._body.CreateFixture(n),
        this._canmove && (this._body.SetLinearVelocity(new b2Vec2(0, 1)), this._body.SetAwake(!1))
    },
    update: function() {
        if (this._canmove) {
            var t = (this.getPositionX() - this._offset.x) / BOX2D_GAME_SCALE,
            e = (this.getPositionY() - this._offset.y) / BOX2D_GAME_SCALE;
            this._body.SetAwake(!0),
            this._body.SetTransform(new b2Vec2(t, -e), this._body.GetAngle())
        }
        if (this._firstUpdate) {
            this._firstUpdate = !1;
            var i = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            i.objects.push(this)
        }
    },
    destroy: function() {
        this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        })
    },
    playAnimation: function() {
        this._playedAnimation || (null !== this._animation && (gSharedEngine.playEffect(SOUND_15), this.runAction(cc.Animate.create(this._animation))), this._playedAnimation = !0)
    },
    reload: function() {
        this.setVisible(!1),
        "CHECKPOINT" !== this._action && (this._activated = !1),
        this.setPosition(parseInt(this._originalX + this._offset.x), parseInt(this._originalY + this._offset.y)),
        this._isdisabled = this._startDisabled ? !0 : !1,
        null !== this._animation && this.setDisplayFrameWithAnimationName(this._tag, 0),
        this._playedAnimation = !1
    },
    doAction: function() {
        if (!this._isdisabled && !this._activated) {
            switch (this._action) {
            case "KILL":
                break;
            case "NPC":
                "" !== this._target && g_gamelogic._mapManager.createNPC(this._target, this._distance);
                break;
            case "ACTIVATEPATH":
                if ("" !== this._target) {
                    var t = this._name.split(".");
                    2 === t.length && g_gamelogic._mapManager.activatePath(t[0], this._target)
                }
                break;
            case "ACTIVATETRIGGERS":
                var t = this._name.split(".");
                2 === t.length && g_gamelogic._mapManager.activateTriggers(t[0], this._target);
                break;
            case "CHECKPOINT":
                if (g_gamelogic._player.checkPoint(this.getPositionX(), this.getPositionY()), g_gamelogic._mapManager.changeActivedTriggerGroup(), g_gamelogic._mapManager.changeCurrentCheckPoint(), null !== this._dataObject) {
                    if (gSharedEngine.playEffect(SOUND_9), !IS_HANDHELD) {
                        var e = createParticleSystemWithDictionary("res/checkpoint_particles.plist");
                        e.setDrawMode(cc.PARTICLE_TEXTURE_MODE),
                        e.setPositionType(cc.PARTICLE_TYPE_RELATIVE),
                        e.setPosition(cc.p(0, 50)),
                        e.setAutoRemoveOnFinish(!0),
                        this._dataObject.addChild(e)
                    }
                    this._dataObject.play()
                }
                break;
            case "TRAMPOLINE":
                "0" === this._distance || "" === this._distance ? g_gamelogic._player.trampoline(TRAMPOLINE_JUMP / BOX2D_GAME_SCALE * 2, this._rotation) : g_gamelogic._player.trampoline(parseInt(this._distance) / BOX2D_GAME_SCALE * 2, this._rotation),
                this.playAnimation(),
                gSharedEngine.playEffect(SOUND_13);
                break;
            case "NOINPUT":
                g_gamelogic._player._noInput = !0;
                break;
            case "ENDNOINPUT":
                g_gamelogic._player._noInput = !1;
                break;
            case "STARTLOOP":
                g_gamelogic._player.activateLoop(),
                g_gamelogic._mapManager.disable(this._target);
                break;
            case "STOPLOOP":
                g_gamelogic._player.deactivateLoop(),
                g_gamelogic._mapManager.disable(this._target);
                break;
            case "PUSHPLAYER":
                var t = this._distance.split(",");
                2 === t.length && g_gamelogic._player.pushPlayer(parseFloat(t[0]), parseFloat(t[1]));
                break;
            case "EXPLOSION":
                var i = this._originalX + this._helperX,
                s = this._originalY + this._helperY;
                g_gamelogic._mapManager.explosion(this._target, i, s);
                break;
            case "EXPLOSIONOBSTACLE":
                var i = this._originalX + this._helperX,
                s = this._originalY + this._helperY;
                g_gamelogic._mapManager.explosionObstacle(this._target, i, s, this._distance),
                g_gamelogic._player.runAnimation(Car.ANIMATION_COVER);
                break;
            case "MOVERAIL":
                var i = this._originalX + this._helperX,
                s = this._originalY + this._helperY;
                g_gamelogic._mapManager.addExplosion(i, s),
                g_gamelogic._mapManager.moveRail(this._target, i, s, this._distance);
                break;
            case "MOVEOBSTACLE":
                var i = this._originalX + this._helperX,
                s = this._originalY + this._helperY;
                g_gamelogic._mapManager.addExplosion(i, s),
                g_gamelogic._mapManager.moveObstacle(this._target, i, s, this._distance);
                break;
            case "SCARE":
                g_gamelogic._player.runAnimation(Car.ANIMATION_COVER);
                break;
            case "MOVE":
                if ("" !== this._target) {
                    var t = this._distance.split(",");
                    2 === t.length && g_gamelogic._mapManager.moveObject(this._target, parseInt(t[0]), parseFloat(t[1]))
                }
                break;
            case "ROTATELEFTPIVOT":
                if ("" !== this._target) {
                    var t = this._distance.split(",");
                    2 === t.length && g_gamelogic._mapManager.rotateRail(this._target, !0, parseFloat(t[0]), parseFloat(t[1]))
                }
                break;
            case "ROTATERIGHTPIVOT":
                if ("" !== this._target) {
                    var t = this._distance.split(",");
                    2 === t.length && g_gamelogic._mapManager.rotateRail(this._target, !0, parseFloat(t[0]), parseFloat(t[1]))
                }
                break;
            case "MOVEBACKWARDS":
                g_gamelogic._player.moveBackwards();
                break;
            case "MOVEFORWARD":
                g_gamelogic._player.moveForwards();
                break;
            case "FORCERAIL":
                g_gamelogic._player._forceRail = !0;
                break;
            case "NONFORCERAIL":
                g_gamelogic._player._forceRail = !1,
                g_gamelogic._player._loopActivated && g_gamelogic._player.deactivateLoop();
                break;
            case "END":
                if (DEACTIVATE_END_TRIGGER) break;
                g_gamelogic._player._winRace = !0
            }
            this._activated = !0
        }
    },
    setHelper: function(t, e) {
        this._helperX = t,
        this._helperY = e
    }
}),
FerrisWheel = cc.Node.extend({
    _posX: 0,
    _posY: 0,
    _width: 0,
    _height: 0,
    _limitLeft: 0,
    _limitRight: 0,
    _limitTop: 0,
    _limitBottom: 0,
    _rotateTime: 0,
    _direction: -1,
    _moon: null,
    _wheel: null,
    _pole1: null,
    _pole2: null,
    _car1: null,
    _car2: null,
    _car3: null,
    _radius: 0,
    _passa1: null,
    _passa2: null,
    _passa3: null,
    _checkCars: null,
    _body1: null,
    _body2: null,
    _body3: null,
    _fixture1: null,
    _firstUpdate: !0,
    _fixture2: null,
    _fixture3: null,
    ctor: function(t, e, i, s) {
        cc.Node.prototype.ctor.call(this),
        this._checkCars = new Array,
        this._posX = t,
        this._posY = e,
        this._rotateTime = i,
        this._direction = s,
        this.createCostumes(),
        this.createPhysicBody(),
        this.setPosition(parseInt(t), parseInt(e)),
        g_gamelogic._sceneMainGame._backgroundLayer.addChild(this),
        this._limitLeft = t - .5 * this._width,
        this._limitRight = t + .5 * this._width,
        this._limitTop = e + .5 * this._height,
        this._limitBottom = e - .5 * this._height,
        this._radius = .45 * this._width,
        this.setVisible(!1)
    },
    createCostumes: function() {
        this._wheel = new cc.Sprite,
        this._moon = new cc.Sprite,
        this._pole1 = new cc.Sprite,
        this._pole2 = new cc.Sprite,
        this._car1 = new cc.Sprite,
        this._car2 = new cc.Sprite,
        this._car3 = new cc.Sprite,
        this._passa1 = new cc.Sprite,
        this._passa2 = new cc.Sprite,
        this._passa3 = new cc.Sprite,
        g_gamelogic._modeType === NIGHT_STAGE ? (this._wheel.initWithSpriteFrameName("circle_ferriswheel_noche.png"), this._moon.initWithSpriteFrameName("moon_ferriswheel_noche.png"), this._pole1.initWithSpriteFrameName("structure_ferris_wheel_noche.png"), this._pole2.initWithSpriteFrameName("structure_ferris_wheel_noche.png")) : (this._wheel.initWithSpriteFrameName("circle_ferriswheel_.png"), this._moon.initWithSpriteFrameName("moon_ferriswheel_noche.png"), this._pole1.initWithSpriteFrameName("structure_ferris_wheel.png"), this._pole2.initWithSpriteFrameName("structure_ferris_wheel.png")),
        this._car1.initWithSpriteFrameName("ferriswheel_cart1.png"),
        this._car2.initWithSpriteFrameName("ferriswheel_cart1.png"),
        this._car3.initWithSpriteFrameName("ferriswheel_cart1.png"),
        this._passa1.initWithSpriteFrameName("peoplecombination1.png"),
        this._passa2.initWithSpriteFrameName("peoplecombination2.png"),
        this._passa3.initWithSpriteFrameName("peoplecombination3.png"),
        this._pole1.setPosition(cc.p( - 120, -410)),
        this._pole2.setPosition(cc.p(120, -410)),
        this._moon.setPosition(cc.p(0, 0)),
        this._car1.setPosition(cc.p(0, 0)),
        this._car2.setPosition(cc.p(0, 0)),
        this._car3.setPosition(cc.p(0, 0)),
        this._passa1.setPosition(cc.p(.5 * this._car1.getContentSize().width, .5 * this._car1.getContentSize().height)),
        this._passa2.setPosition(cc.p(.5 * this._car1.getContentSize().width, .5 * this._car1.getContentSize().height)),
        this._passa3.setPosition(cc.p(.5 * this._car1.getContentSize().width, .5 * this._car1.getContentSize().height)),
        this._pole2.setScaleX( - 1),
        this.addChild(this._pole1),
        this.addChild(this._pole2),
        this.addChild(this._wheel),
        this.addChild(this._moon),
        this.addChild(this._car1),
        this.addChild(this._car2),
        this.addChild(this._car3),
        this._car1.addChild(this._passa1, -1),
        this._car2.addChild(this._passa2, -1),
        this._car3.addChild(this._passa3, -1),
        this._wheel.setRotation(0),
        this._wheel.runAction(cc.RepeatForever.create(cc.RotateBy.create(this._rotateTime, 360 * this._direction))),
        this._width = this._wheel.getContentSize().width,
        this._height = this._pole1.getContentSize().height
    },
    createPhysicBody: function() {
        var t = new b2BodyDef;
        t.userData = new DataObject(TYPE_OBSTACLE_EX, this),
        t.type = b2Body.b2_kinematicBody,
        this._body1 = g_PhysicsManager._physicWorld.CreateBody(t),
        this._body2 = g_PhysicsManager._physicWorld.CreateBody(t),
        this._body3 = g_PhysicsManager._physicWorld.CreateBody(t);
        var e = new b2PolygonShape;
        e.SetAsBox(.3 * this._car1.getContentSize().width / BOX2D_GAME_SCALE, .2 * this._car1.getContentSize().height / BOX2D_GAME_SCALE);
        var i = new b2FixtureDef;
        i.shape = e,
        i.density = 1,
        i.friction = 3,
        i.restitution = 0,
        this._fixture1 = this._body1.CreateFixture(i),
        this._fixture2 = this._body2.CreateFixture(i),
        this._fixture3 = this._body3.CreateFixture(i),
        this._body1.SetAwake(!1),
        this._body2.SetAwake(!1),
        this._body3.SetAwake(!1)
    },
    reload: function() {
        this._wheel.stopAllActions(),
        this._checkCars.length = 0,
        this.setVisible(!1),
        this._wheel.setRotation(0),
        this._wheel.runAction(cc.RepeatForever.create(cc.RotateBy.create(this._rotateTime, 360 * this._direction)))
    },
    show: function(t) {
        this.setVisible(t)
    },
    update: function() {
        if (this._firstUpdate) {
            this._firstUpdate = !1;
            var t = g_gamelogic._camera._frustrumTree.search(this.getPositionX());
            t.objects.push(this)
        }
        var e = Math.cos( - 1 * this._wheel._rotationRadiansX) * this._radius,
        i = Math.sin( - 1 * this._wheel._rotationRadiansY) * this._radius,
        s = Math.cos( - 1 * (this._wheel._rotationRadiansX + 2.0943951)) * this._radius,
        a = Math.sin( - 1 * (this._wheel._rotationRadiansY + 2.0943951)) * this._radius,
        r = Math.cos( - 1 * (this._wheel._rotationRadiansX + 4.1887902)) * this._radius,
        n = Math.sin( - 1 * (this._wheel._rotationRadiansY + 4.1887902)) * this._radius;
        this._car1.setPosition(cc.p(e, i)),
        this._car2.setPosition(cc.p(s, a)),
        this._car3.setPosition(cc.p(r, n)),
        null !== this._body1 && (this._body1.IsAwake() || this._body1.SetAwake(!0), this._body2.IsAwake() || this._body2.SetAwake(!0), this._body3.IsAwake() || this._body3.SetAwake(!0), this._body1.SetTransform(new b2Vec2((this._posX + e) / BOX2D_GAME_SCALE, -(this._posY + i) / BOX2D_GAME_SCALE), this._body1.GetAngle()), this._body2.SetTransform(new b2Vec2((this._posX + s) / BOX2D_GAME_SCALE, -(this._posY + a) / BOX2D_GAME_SCALE), this._body2.GetAngle()), this._body3.SetTransform(new b2Vec2((this._posX + r) / BOX2D_GAME_SCALE, -(this._posY + n) / BOX2D_GAME_SCALE), this._body3.GetAngle()));
        for (var o = 0; o < this._checkCars.length; o++) this._checkCars[o].die(),
        this._checkCars.splice(o, 1)
    },
    destroy: function() {
        this._body1 && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body1,
            fixture: this._fixture1
        }),
        this._body2 && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body2,
            fixture: this._fixture2
        }),
        this._body3 && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body3,
            fixture: this._fixture3
        })
    },
    doAction: function(t) {
        this._checkCars.push(t)
    }
}),
SceneStore = cc.Layer.extend({
    _arrayObj: null,
    _selectChar: null,
    _selectCar: null,
    _currentSelectedChar: 0,
    _currentSelectedCar: 12,
    _movementActivated: !1,
    _selectionActivated: !1,
    _movementActivatedTime: 0,
    _enableButtonTime: 0,
    _itemBack: null,
    _prices: null,
    _emitter: null,
    _selectionAnimationTime: 0,
    _title: null,
    _cashImg1: null,
    _cashValue: null,
    _buttonArrays: null,
    _notMoneyArray: null,
    _iconList: null,
    _outOfThisWindow: !1,
    _enterByGameComplete: !1,
    _enterByGameCompleteTimer: 0,
    _activatingMovement: !1,
    _activationMovementTime: 0,
    ctor: function() {
        gSharedEngine.playMusic(MUSIC_BACKGROUND_4, !0),
        this._arrayObj = new Array,
        this._prices = new Array,
        this._buttonArrays = new Array,
        this._notMoneyArray = new Array,
        this._iconList = new Array,
        this._super(),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0);
        var t = new Array(58, 116, 174, WIN_SIZE.width - 232, WIN_SIZE.width - 174, WIN_SIZE.width - 116, WIN_SIZE.width - 58),
        e = new Array(350, 292, 234, 176);
        this._arrayObj.push({
            price: 0,
            x: t[0],
            y: e[0],
            img: "TR3_GUI_Store_Avatars01.png"
        }),
        this._arrayObj.push({
            price: 2e3,
            x: t[1],
            y: e[0],
            img: "TR3_GUI_Store_Avatars02.png"
        }),
        this._arrayObj.push({
            price: 0,
            x: t[0],
            y: e[1],
            img: "TR3_GUI_Store_Avatars03.png"
        }),
        this._arrayObj.push({
            price: 7500,
            x: t[1],
            y: e[1],
            img: "TR3_GUI_Store_Avatars04.png"
        }),
        this._arrayObj.push({
            price: 1e4,
            x: t[2],
            y: e[1],
            img: "TR3_GUI_Store_Avatars05.png"
        }),
        this._arrayObj.push({
            price: 2e4,
            x: t[0],
            y: e[2],
            img: "TR3_GUI_Store_Avatars06.png"
        }),
        this._arrayObj.push({
            price: 3e4,
            x: t[1],
            y: e[2],
            img: "TR3_GUI_Store_Avatars07.png"
        }),
        this._arrayObj.push({
            price: 4e4,
            x: t[2],
            y: e[2],
            img: "TR3_GUI_Store_Avatars08.png"
        }),
        this._arrayObj.push({
            price: 5e4,
            x: t[0],
            y: e[3],
            img: "TR3_GUI_Store_Avatars09.png"
        }),
        this._arrayObj.push({
            price: 75e3,
            x: t[1],
            y: e[3],
            img: "TR3_GUI_Store_Avatars10.png"
        }),
        this._arrayObj.push({
            price: 0,
            x: t[4],
            y: e[0],
            img: "TR3_GUI_Store_Carts_01.png"
        }),
        this._arrayObj.push({
            price: 0,
            x: t[5],
            y: e[0],
            img: "TR3_GUI_Store_Carts_02.png"
        }),
        this._arrayObj.push({
            price: 2e3,
            x: t[6],
            y: e[0],
            img: "TR3_GUI_Store_Carts_03.png"
        }),
        this._arrayObj.push({
            price: 7500,
            x: t[3],
            y: e[1],
            img: "TR3_GUI_Store_Carts_04.png"
        }),
        this._arrayObj.push({
            price: 1e4,
            x: t[4],
            y: e[1],
            img: "TR3_GUI_Store_Carts_05.png"
        }),
        this._arrayObj.push({
            price: 1e4,
            x: t[5],
            y: e[1],
            img: "TR3_GUI_Store_Carts_06.png"
        }),
        this._arrayObj.push({
            price: 1e4,
            x: t[6],
            y: e[1],
            img: "TR3_GUI_Store_Carts_07.png"
        }),
        this._arrayObj.push({
            price: 2e4,
            x: t[3],
            y: e[2],
            img: "TR3_GUI_Store_Carts_08.png"
        }),
        this._arrayObj.push({
            price: 2e4,
            x: t[4],
            y: e[2],
            img: "TR3_GUI_Store_Carts_Carts_09.png"
        }),
        this._arrayObj.push({
            price: 3e4,
            x: t[5],
            y: e[2],
            img: "TR3_GUI_Store_Carts_Carts_10.png"
        }),
        this._arrayObj.push({
            price: 4e4,
            x: t[6],
            y: e[2],
            img: "TR3_GUI_Store_Carts_Carts_11.png"
        }),
        this._arrayObj.push({
            price: 5e4,
            x: t[4],
            y: e[3],
            img: "TR3_GUI_Store_Carts_Carts_12.png"
        }),
        this._arrayObj.push({
            price: 75e3,
            x: t[5],
            y: e[3],
            img: "TR3_GUI_Store_Carts_Carts_13.png"
        }),
        this._arrayObj.push({
            price: 1e5,
            x: t[6],
            y: e[3],
            img: "TR3_GUI_Store_Carts_Carts_14.png"
        }),
        this.init(),
        this.setAllVisible(!1)
    },
    setAllVisible: function(t) {
        this._title.setVisible(t),
        this._itemBack.setVisible(t),
        this._cashImg1.setVisible(t),
        this._cashValue.setVisible(t);
        for (var e = 0; e < this._arrayObj.length; e++) this._buttonArrays[e].setVisible(t)
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            if (t = !0, this._currentSelectedChar = PlayerData.currentCharacter, this._currentSelectedCar = PlayerData.currentCar, LANGUAGES[PlayerData.currentLanguageIndex].specialChars) {
                this._title = cc.LabelTTF.create(Localization.getText("{STORE}"), "Arial", "35"),
                this._title.setColor(cc.BLACK);
                var e = cc.LabelTTF.create(Localization.getText("{STORE}"), "Arial", "35");
                this._title.addChild(e),
                e.setPosition(cc.p(.5 * this._title.getContentSize().width + 1, .5 * this._title.getContentSize().height + 2))
            } else this._title = cc.LabelBMFont.create(Localization.getText("{STORE}"), "res/Arial.fnt"),
            this._title.setScale(TextUtils.getTextSizeScale(40));
            this._title.setPosition(cc.p(CENTER_POS.x, WIN_SIZE.height + 100)),
            this.addChild(this._title),
            this._itemBack = cc.MenuItemImage.create(null, null, this.backCallBack, this),
            this._itemBack.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("BackButtonNormal.png")),
            this._itemBack.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("BackButtonOn.png")),
            this._itemBack.setPosition(cc.p(115, -100));
            var i = cc.Menu.create(this._itemBack);
            i.setPosition(cc.p(0, 0)),
            this.addChild(i),
            this._cashImg1 = new cc.Sprite,
            this._cashImg1.initWithSpriteFrameName("TR3_GUI_ModeSelection_CashIcon.png"),
            this._cashImg1.setPosition(cc.p(30, WIN_SIZE.height + 100)),
            this.addChild(this._cashImg1),
            this._cashValue = cc.LabelBMFont.create(PlayerData.currentCash + "", "res/Arial.fnt", 200, cc.TEXT_ALIGNMENT_LEFT),
            this._cashValue.setScale(TextUtils.getTextSizeScale(30)),
            this._cashValue.setPosition(cc.p(150, WIN_SIZE.height + 100)),
            this.addChild(this._cashValue),
            CURRENT_LAYERS.push(this);
            for (var s = 0; s < this._arrayObj.length; s++) {
                var a = cc.MenuItemImage.create();
                0 !== this._arrayObj[s].price && 0 === PlayerData.itemsBought[s] ? (a.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_NotBought_Normal.png")), a.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Over.png"))) : (a.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Over.png")), a.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Normal.png"))),
                a.setCallback(this.selectItem, {
                    parent: this,
                    object: a
                }),
                a.setPosition(cc.p(this._arrayObj[s].x, WIN_SIZE.height + 100)),
                a.setTag(s),
                this._buttonArrays.push(a);
                var r = new cc.Sprite;
                r.initWithSpriteFrameName(this._arrayObj[s].img),
                r.setPosition(10 > s ? cc.p(.5 * r.getContentSize().width + 3, .5 * r.getContentSize().height + 3) : cc.p(.5 * r.getContentSize().width + 4, .5 * r.getContentSize().height + 10)),
                a.addChild(r),
                this._iconList.push(r)
            }
            var i = cc.Menu.create();
            i.initWithArray(this._buttonArrays),
            i.setPosition(cc.p(0, 0)),
            this.addChild(i);
            for (var s = 0; s < this._arrayObj.length; s++) if (0 !== this._arrayObj[s].price && 0 === PlayerData.itemsBought[s]) {
                var n = cc.Node.create();
                n.setPosition(cc.p(this._arrayObj[s].x, this._arrayObj[s].y)),
                this._notMoneyArray.push(n);
                var o = new cc.Sprite;
                o.initWithSpriteFrameName("TR3_GUI_ModeSelection_CashIconCrossed.png"),
                n.addChild(o),
                n.setVisible(!1),
                this.addChild(n);
                var c = cc.LabelBMFont.create("" + this._arrayObj[s].price, "res/Arial.fnt");
                c.setScale(TextUtils.getTextSizeScale(25)),
                c.setPosition(cc.p(28, 14)),
                this._buttonArrays[s].addChild(c),
                this._prices.push(c)
            } else this._notMoneyArray.push(null),
            this._prices.push(null);
            this._selectChar = new SpriteAnimation,
            this._selectChar.initWithAtlas("TR3_GUI_Store_Button_ButtonStoreAnimation.png", 999999, .04, cc.p(0, 0), cc.p(53, 53), "select1", cc.p(1, 7)),
            this._selectChar.play(),
            this._selectChar.setPosition(cc.p(this._arrayObj[this._currentSelectedChar].x - 26.5, this._arrayObj[this._currentSelectedChar].y - 26.5)),
            this.addChild(this._selectChar),
            this._selectChar.setVisible(!1),
            this._selectCar = new SpriteAnimation,
            this._selectCar.initWithAtlas("TR3_GUI_Store_Button_ButtonStoreAnimation.png", 999999, .04, cc.p(0, 0), cc.p(53, 53), "select2", cc.p(1, 7)),
            this._selectCar.play(),
            this._selectCar.setPosition(cc.p(this._arrayObj[this._currentSelectedCar].x - 26.5, this._arrayObj[this._currentSelectedCar].y - 26.5)),
            this.addChild(this._selectCar),
            this._selectCar.setVisible(!1)
        }
        return this.scheduleUpdate(),
        t
    },
    activateButtonMovement: function(t) {
        if (1 === t) {
            gSharedEngine.playEffect(SOUND_18),
            this.setAllVisible(!0),
            this._activatingMovement = !0;
            for (var e = .7,
            i = 0; i < this._buttonArrays.length; i++) this._buttonArrays[i].runAction(cc.EaseBackOut.create(cc.MoveTo.create(e, cc.p(this._arrayObj[i].x, this._arrayObj[i].y)))),
            e += .03;
            this._title.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(CENTER_POS.x, 420)))),
            this._cashImg1.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(30, 415)))),
            this._cashValue.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(150, 415)))),
            this._itemBack.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(115, 85))))
        } else {
            for (var e = .7,
            i = 0; i < this._buttonArrays.length; i++) this._buttonArrays[i].runAction(cc.EaseBackInOut.create(cc.MoveTo.create(e, cc.p(this._arrayObj[i].x, WIN_SIZE.height + 100)))),
            e += .03;
            this._selectChar.setVisible(!1),
            this._selectCar.setVisible(!1),
            this._title.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(CENTER_POS.x, WIN_SIZE.height + 100)))),
            this._cashImg1.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(30, WIN_SIZE.height + 100)))),
            this._cashValue.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(150, WIN_SIZE.height + 100)))),
            this._itemBack.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(115, -100))))
        }
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                t.selected(),
                !0
            }
            return t.unselected(),
            !1
        }
        var e = t.getLocation();
        i(this._itemBack, e);
        for (var s = 0; s < this._arrayObj.length; s++) i(this._buttonArrays[s]) ? 0 === PlayerData.itemsBought[s] && this._arrayObj[s].price > PlayerData.currentCash && null !== this._notMoneyArray[s] && (this._notMoneyArray[s].setVisible(!0), this._prices[s].setVisible(!1), this._iconList[s].setVisible(!1)) : null !== this._notMoneyArray[s] && (this._notMoneyArray[s].setVisible(!1), this._prices[s].setVisible(!0), this._iconList[s].setVisible(!0))
    },
    update: function(t) {
        this._activatingMovement && (this._activationMovementTime += t, this._activationMovementTime >= 1 && (this._selectChar.setVisible(!0), this._selectCar.setVisible(!0), this._activationMovementTime = 0, this._activatingMovement = !1)),
        this._enterByGameComplete && (this._enterByGameCompleteTimer += t, this._enterByGameCompleteTimer >= .6 && (this.activateButtonMovement(1), this._enterByGameComplete = !1, this._enterByGameCompleteTimer = 0)),
        this._movementActivated ? (this._outOfThisWindow && (this._outOfThisWindow = !1, this.activateButtonMovement(2)), this._movementActivatedTime += t, this._movementActivatedTime >= .5 && (this.setLayerMovement(), this._movementActivated = !1, this._movementActivatedTime = 0)) : this._selectionActivated ? (this._selectionAnimationTime -= t, this._selectionAnimationTime <= 0 && (showButtonParticles(this.getParent().getChildren()[2]._node), this._selectionActivated = !1)) : this._itemBack.isEnabled() || (this._enableButtonTime += t, this._enableButtonTime > 2 && this._itemBack.setEnabled(!0))
    },
    setLayerMovement: function() {
        var t = this.getParent().getChildren()[0],
        e = this.getParent().getChildren()[1],
        i = this.getParent().getChildren()[2],
        s = this.getParent().getChildren()[3];
        i._car.animated && !i._car._alwaysAnimate && i._car.play(),
        t._bgSprite.runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * (t._size - WIN_SIZE.width), 0)), cc.MoveBy.create(.7, cc.p(.6 * (t._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
            e.activateButtonMovement(1)
        }), cc.CallFunc.create(function() {
            i._carSparks.setVisible(!0)
        }), cc.MoveBy.create(1, cc.p(.25 * (t._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
            i._carSparks.setVisible(!1),
            s.setAllVisible(!1)
        }), cc.CallFunc.create(function() {
            i._car.animated && !i._car._alwaysAnimate && i._car.stop()
        }))),
        this.getParent().getChildren()[1].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * WIN_SIZE.width, 0)), cc.MoveBy.create(1, cc.p(.25 * WIN_SIZE.width, 0)))),
        this.getParent().getChildren()[3].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * WIN_SIZE.width, 0)), cc.MoveBy.create(1, cc.p(.25 * WIN_SIZE.width, 0))))
    },
    setSelectionMovement: function() {
        var t = this.getParent().getChildren()[2];
        t.reloadFakePlayer()
    },
    selectItem: function(t) {
        if (!this.parent._selectionActivated) {
            var e = this.object.getTag();
            if (! (this.parent._arrayObj[e].price > PlayerData.currentCash && 0 === PlayerData.itemsBought[e])) {
                gSharedEngine.playEffect(SOUND_16),
                null !== this.parent._prices[e] && this.parent._prices[e].removeFromParent(!0),
                null !== this.parent._iconList[e] && this.parent._iconList[e].removeFromParent(!0),
                this.parent._buttonArrays[e].setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Over.png")),
                this.parent._buttonArrays[e].setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Normal.png"));
                var i = new cc.Sprite;
                i.initWithSpriteFrameName(this.parent._arrayObj[e].img),
                i.setPosition(10 > e ? cc.p(.5 * i.getContentSize().width + 3, .5 * i.getContentSize().height + 3) : cc.p(.5 * i.getContentSize().width + 4, .5 * i.getContentSize().height + 10)),
                this.parent._buttonArrays[e].addChild(i),
                0 === PlayerData.itemsBought[e] && (PlayerData.currentCash -= this.parent._arrayObj[e].price, this.parent._cashValue.setString(PlayerData.currentCash + ""), PlayerData.itemsBought[e] = 1),
                e >= 0 && 9 >= e ? (this.parent._currentSelectedChar = e, this.parent._selectChar.setPosition(cc.p(this.parent._arrayObj[this.parent._currentSelectedChar].x - 26.5, this.parent._arrayObj[this.parent._currentSelectedChar].y - 26.5)), PlayerData.currentCharacter = e) : e >= 10 && 23 >= e && (this.parent._currentSelectedCar = e, this.parent._selectCar.setPosition(cc.p(this.parent._arrayObj[this.parent._currentSelectedCar].x - 26.5, this.parent._arrayObj[this.parent._currentSelectedCar].y - 26.5)), PlayerData.currentCar = e),
                this.parent._emitter = null,
                IS_HANDHELD || (this.parent._emitter = cc.ParticleSystem.create("res/sparkles.plist"), this.parent._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE), this.parent._emitter.setAutoRemoveOnFinish(!0), this.parent.addChild(this.parent._emitter));
                var s = this.parent;
                null !== this.parent._emitter ? (this.parent._emitter.setPosition(cc.p(t._position.x, t._position.y)), this.parent._emitter.runAction(cc.Sequence.create(cc.MoveTo.create(.6, cc.p(CENTER_POS.x, CENTER_POS.y - 50)), cc.CallFunc.create(function() {
                    s.setSelectionMovement()
                })))) : this.parent.setSelectionMovement(),
                PlayerData.saveData(),
                this.parent._selectionAnimationTime = .6,
                this.parent._selectionActivated = !0
            }
        }
    },
    updatePositions: function() {
        var t = new Array(58, 116, 174, WIN_SIZE.width - 232, WIN_SIZE.width - 174, WIN_SIZE.width - 116, WIN_SIZE.width - 58);
        this._arrayObj[0].x = t[0],
        this._arrayObj[1].x = t[1],
        this._arrayObj[2].x = t[0],
        this._arrayObj[3].x = t[1],
        this._arrayObj[4].x = t[2],
        this._arrayObj[5].x = t[0],
        this._arrayObj[6].x = t[1],
        this._arrayObj[7].x = t[2],
        this._arrayObj[8].x = t[0],
        this._arrayObj[9].x = t[1],
        this._arrayObj[10].x = t[4],
        this._arrayObj[11].x = t[5],
        this._arrayObj[12].x = t[6],
        this._arrayObj[13].x = t[3],
        this._arrayObj[14].x = t[4],
        this._arrayObj[15].x = t[5],
        this._arrayObj[16].x = t[6],
        this._arrayObj[17].x = t[3],
        this._arrayObj[18].x = t[4],
        this._arrayObj[19].x = t[5],
        this._arrayObj[20].x = t[6],
        this._arrayObj[21].x = t[4],
        this._arrayObj[22].x = t[5],
        this._arrayObj[23].x = t[6],
        this._title.setPosition(cc.p(CENTER_POS.x, 420)),
        this._itemBack.setPosition(cc.p(115, 85)),
        this._cashImg1.setPosition(cc.p(30, 415)),
        this._cashValue.setPosition(cc.p(150, 415));
        for (var e = 0; e < this._arrayObj.length; e++) this._buttonArrays[e].setPosition(cc.p(this._arrayObj[e].x, this._arrayObj[e].y));
        this._selectChar.setPosition(cc.p(this._arrayObj[this._currentSelectedChar].x - 26.5, this._arrayObj[this._currentSelectedChar].y - 26.5)),
        this._selectCar.setPosition(cc.p(this._arrayObj[this._currentSelectedCar].x - 26.5, this._arrayObj[this._currentSelectedCar].y - 26.5))
    },
    backCallBack: function() {
        this._selectionActivated || (gSharedEngine.playEffect(SOUND_12), this._movementActivated = !0, this._enableButtonTime = 0, this._outOfThisWindow = !0, this._itemBack.setEnabled(!1), showButtonParticles(this._itemBack))
    }
}),
SceneFail = cc.Layer.extend({
    _bgSprite: null,
    _itemContinue: null,
    _totalScoreValue: null,
    _itemMoreGame: null,
    _moreLabelFront: null,
    _totalScore: null,
    _photo: null,
    _fire1: null,
    _fire2: null,
    ctor: function() {
        gSharedEngine.playMusic(MUSIC_BACKGROUND_3, !1),
        g_gamelogic._player.destroyPhysics(),
        g_gamelogic._mapManager.destroyMap(),
        this._super(),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0),
        this.init(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this)
        cb_show();
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            t = !0,
            this._bgSprite = new cc.Sprite,
            this._bgSprite.initWithSpriteFrameName("TR3_GameFailed.png"),
            this._bgSprite.setPosition(CENTER_POS),
            this.addChild(this._bgSprite),
            this.checkBackgroundScreen(),
            this._fire1 = new SpriteAnimation,
            this._fire1.initWithAtlas("TR3_GUI_Fire2.png", 9999999, .04, cc.p(0, 0), cc.p(74.6, 82), "fire1"),
            this._fire1.setPosition(cc.p(CENTER_POS.x - 250, 190)),
            this._fire1.setScale(2),
            this.addChild(this._fire1),
            this._fire1.play(),
            this._fire2 = new SpriteAnimation,
            this._fire2.initWithAtlas("TR3_GUI_Fire2.png", 9999999, .03, cc.p(0, 0), cc.p(74.6, 82), "fire1"),
            this._fire2.setPosition(cc.p(CENTER_POS.x + 100, 230)),
            this._fire2.setScale(2),
            this.addChild(this._fire2),
            this._fire2.play(),
            this._itemContinue = cc.MenuItemImage.create(null, null, this.continueCallBack, this),
            this._itemContinue.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Normal.png")),
            this._itemContinue.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Over.png")),
            this._itemContinue.setPosition(cc.p(CENTER_POS.x + 100, CENTER_POS.y - 100)),
            this._itemMoreGame = cc.MenuItemImage.create(null, null, this.moreGamesCallBack, this),
            this._itemMoreGame.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Normal.png")),
            this._itemMoreGame.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Over.png")),
            this._itemMoreGame.setPosition(cc.p(CENTER_POS.x - 100, CENTER_POS.y - 100));
            var e = cc.Menu.create(this._itemContinue, this._itemMoreGame);
            e.setPosition(cc.p(0, 0)),
            this.addChild(e),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._totalScore = cc.LabelTTF.create(Localization.getText("{SCORE}"), "Arial", "25") : (this._totalScore = cc.LabelBMFont.create(Localization.getText("{SCORE}"), "res/Arial.fnt"), this._totalScore.setScale(TextUtils.getTextSizeScale(40))),
            this._totalScore.setPosition(cc.p(CENTER_POS.x - 50, CENTER_POS.y - 40)),
            this.addChild(this._totalScore),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._gameOver = cc.LabelTTF.create(Localization.getText("{GAMEOVER}"), "Arial", "40") : (this._gameOver = cc.LabelBMFont.create(Localization.getText("{GAMEOVER}"), "res/Arial.fnt"), this._gameOver.setScale(TextUtils.getTextSizeScale(70))),
            this._gameOver.setPosition(cc.p(CENTER_POS.x, WIN_SIZE.height - 30)),
            this.addChild(this._gameOver),
            this._photo = new cc.Sprite,
            this._photo.initWithSpriteFrameName("TR3_GUI_FotoBG.png"),
            this._photo.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y + 80)),
            this.addChild(this._photo),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._continueLabelFront = cc.LabelTTF.create(Localization.getText("{CONTINUE}"), "Arial", "20") : (this._continueLabelFront = cc.LabelBMFont.create(Localization.getText("{CONTINUE}"), "res/Arial.fnt"), this._continueLabelFront.setScale(TextUtils.getTextSizeScale(30))),
            this._continueLabelFront.setPosition(this._itemContinue.getPosition()),
            this.addChild(this._continueLabelFront),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._moreLabelFront = cc.LabelTTF.create(Localization.getText("{MOREGAMES}"), "Arial", "20") : (this._moreLabelFront = cc.LabelBMFont.create(Localization.getText("{MOREGAMES}"), "res/Arial.fnt"), this._moreLabelFront.setScale(TextUtils.getTextSizeScale(30))),
            this._moreLabelFront.setPosition(cc.p(this._itemMoreGame.getPosition().x, this._itemMoreGame.getPosition().y)),
            this.addChild(this._moreLabelFront);
            var i = g_gamelogic._player._score;
            this._totalScoreValue = cc.LabelBMFont.create("" + i, "res/Arial.fnt", 200, cc.TEXT_ALIGNMENT_CENTER),
            this._totalScoreValue.setScale(TextUtils.getTextSizeScale(40)),
            this._totalScoreValue.setPosition(cc.p(CENTER_POS.x + 50, CENTER_POS.y - 40)),
            this.addChild(this._totalScoreValue),
            this._photoFace = new cc.Sprite.create(charactersArray[PlayerData.currentCharacter].s3),
            this._photoFace.setPosition(this._photo.getPosition()),
            this.addChild(this._photoFace),
            this._photoFace.setOpacity(0),
            this._photo.setScale(2),
            this._photo.runAction(cc.ScaleTo.create(.5, 1, 1)),
            this._photo.runAction(cc.Sequence.create(cc.RotateBy.create(.5, 720, 0), cc.CallFunc.create(function() {
                this._photoFace.runAction(cc.FadeIn.create(.5))
            },
            this)));
            var s = this;
            if (SpilAPI) {
                var a = SpilAPI.Branding.getLogo();
                if (a.image) {
                    var r = new Image;
                    r.crossOrigin = "Anonymous",
                    r.src = a.image,
                    r.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(r),
                        t.handleLoadedTexture();
                        var e = cc.Sprite.createWithTexture(t);
                        s._spilLogo = cc.MenuItemImage.create(null, null, a.action, s),
                        s._spilLogo.setNormalImage(e),
                        s._spilLogo.setPosition(cc.p(CENTER_POS.x, 40));
                        var i = cc.Menu.create(s._spilLogo);
                        i.setPosition(cc.p(0, 0)),
                        s.addChild(i)
                    }
                }
            }
            PlayerData.currentCash += i,
            PlayerData.saveData()
        }
        return t
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                void t.selected()
            }
            t.unselected()
        }
        var e = t.getLocation();
        i(this._itemContinue, e),
        i(this._itemMoreGame, e)
    },
    checkBackgroundScreen: function() {
        var t = this._bgSprite.getContentSize().width;
        if (t < WIN_SIZE.width) for (var e = !0,
        i = 1.1; e;) {
            var s = t;
            if (s *= i, s >= WIN_SIZE.width) {
                this._bgSprite.setScale(i);
                break
            }
            i += .1
        } else this._bgSprite.setScale(1)
    },
    updatePositions: function() {
        this._bgSprite.setPosition(CENTER_POS),
        this._itemContinue.setPosition(cc.p(CENTER_POS.x + 100, CENTER_POS.y - 100)),
        this._itemMoreGame.setPosition(cc.p(CENTER_POS.x - 100, CENTER_POS.y - 100)),
        this._totalScore.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y - 30)),
        this._gameOver.setPosition(cc.p(CENTER_POS.x, WIN_SIZE.height - 30)),
        this._photo.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y + 80)),
        this._photoFace.setPosition(this._photo.getPosition()),
        this._continueLabelFront.setPosition(this._itemContinue.getPosition()),
        this._moreLabelFront.setPosition(cc.p(this._itemMoreGame.getPosition().x, this._itemMoreGame.getPosition().y)),
        this._totalScoreValue.setPosition(cc.p(CENTER_POS.x, CENTER_POS.y - 50)),
        this._spilLogo.setPosition(cc.p(CENTER_POS.x, 40)),
        this._fire1.setPosition(cc.p(CENTER_POS.x - 250, 190)),
        this._fire2.setPosition(cc.p(CENTER_POS.x + 100, 230)),
        this.checkBackgroundScreen()
    },
    moreGamesCallBack: function() {
        if (showButtonParticles(this._itemMoreGame), SpilAPI) {
            var t = SpilAPI.Branding.getLink("more_games");
            t.action()
        }
    },
    gotoNextScene: function() {
        var t = cc.Scene.create(),
        e = new Background,
        i = new SceneSelectLevel,
        s = new SceneStore;
        s._enterByGameComplete = !0;
        var a = new FakePlayerLayer;
        t.addChild(e),
        t.addChild(i),
        t.addChild(a),
        t.addChild(s),
        e._bgSprite.setPositionX(e._initPos - (e._size - WIN_SIZE.width)),
        i.setPositionX( - WIN_SIZE.width),
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.6, t))
    },
    continueCallBack: function() {
        showButtonParticles(this._itemContinue),
        gSharedEngine.playEffect(SOUND_12),
        g_gamelogic.destroy(),
        cc.Loader.purgeCachedData(g_gameResources),
        g_gameResources.length = g_gameResourcesLen;
        var t = this;
        if (PlayerData.firstPlayed) {
            PlayerData.saveFirstPlayed();
            var e = [{
                src: "res/characters0.plist"
            },
            {
                src: "res/characters0.png"
            }];
            cc.Loader.preload(e,
            function() {
                var e = cc.SpriteFrameCache.getInstance();
                e.addSpriteFrames("res/characters0.plist"),
                t.gotoNextScene()
            },
            this)
        } else this.gotoNextScene()
    }
}),
SceneMainMenu = cc.Layer.extend({
    _itemMusic: null,
    _itemSound: null,
    _bgSprite: null,
    _logo: null,
    _itemStartGame: null,
    _itemMoreGame: null,
    _moreLabelFront: null,
    _moreLabelFront2: null,
    _languageSelector: null,
    _spilLogo: null,
    _gotoNextScene: !1,
    _gotoNextSceneTime: 0,
    ctor: function() {
        this._super(),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0),
        this.setTouchEnabled(!0),
        this.setKeyboardEnabled(!0),
        gSharedEngine.playMusic(MUSIC_BACKGROUND_4, !0),
        this.init(),
        gSharedEngine.playEffect(SOUND_18),
        this.scheduleUpdate(),
        admob_showBanner(bannerLocation.BOTTOMCENTER);
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            CURRENT_LAYERS.length = 0,
            CURRENT_LAYERS.push(this),
            Localization.setLanguage(LANGUAGES[PlayerData.currentLanguageIndex].lang),
            this._bgSprite = new cc.Sprite,
            this._bgSprite.initWithSpriteFrameName("MainMenuBG.png"),
            this._bgSprite.setPosition(CENTER_POS),
            this.addChild(this._bgSprite),
            this.checkBackgroundScreen(),
            this.createMainMenuAnimation();
            var e = new cc.Texture2D;
            e.initWithElement(g_logoTexture),
            e.handleLoadedTexture(),
            this._logo = cc.Sprite.createWithTexture(e),
            this._logo.setScale(.9),
            this._logo.setPosition(cc.p(WIN_SIZE.width - 25 - .9 * this._logo.getContentSize().width / 2, WIN_SIZE.height - 10 - .9 * this._logo.getContentSize().height / 2)),
            this.addChild(this._logo),
            t = !0,
            this._itemStartGame = cc.MenuItemImage.create(null, null, this.playCallBack, this),
            this._itemStartGame.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PlayButtonNormal.png")),
            this._itemStartGame.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("PlayButtonOn.png")),
            this._itemStartGame.setPosition(cc.p(this._logo.getPositionX(), -200)),
            this._itemMoreGame = cc.MenuItemImage.create(null, null, this.moreGamesCallBack, this),
            this._itemMoreGame.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Normal.png")),
            this._itemMoreGame.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Over.png")),
            this._itemMoreGame.setPosition(cc.p(this._itemStartGame.getPosition().x, -200));
            var i = cc.Menu.create(this._itemStartGame, this._itemMoreGame);
            i.setPosition(cc.p(0, 0)),
            this.addChild(i),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? (this._moreLabelFront = cc.LabelBMFont.create("", "res/Arial.fnt"), this._moreLabelFront.setScale(TextUtils.getTextSizeScale(28)), this._moreLabelFront2 = cc.LabelTTF.create(Localization.getText("{MOREGAMES}"), "Arial", "20")) : (this._moreLabelFront = cc.LabelBMFont.create(Localization.getText("{MOREGAMES}"), "res/Arial.fnt"), this._moreLabelFront.setScale(TextUtils.getTextSizeScale(28)), this._moreLabelFront2 = cc.LabelTTF.create("", "Arial", "20")),
            this._moreLabelFront2.setPosition(cc.p(this._itemMoreGame.getPosition().x, -200)),
            this.addChild(this._moreLabelFront2),
            this._moreLabelFront.setPosition(cc.p(this._itemMoreGame.getPosition().x, -200)),
            this.addChild(this._moreLabelFront),
            this._languageSelector = new LanguageSelectorClass,
            this._languageSelector.setPosition(100, 110),
            this._itemMusic = cc.MenuItemImage.create(null, null, this.musicCallBack, this),
            this._itemMusic.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff.png")),
            this._itemMusic.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff_Over.png")),
            this._itemMusic.setPosition( - 200, 165),
            this._itemSound = cc.MenuItemImage.create(null, null, this.soundCallBack, this),
            this._itemSound.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff.png")),
            this._itemSound.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff_Over.png")),
            this._itemSound.setPosition( - 200, 165);
            var s = cc.Menu.create(this._itemMusic, this._itemSound);
            s.setPosition(cc.p(0, 0)),
            this.setMusicSoundButtonStates(),
            this.addChild(s);
            var a = this;
            if (SpilAPI) {
                var r = SpilAPI.Branding.getLogo();
                if (r.image) {
                    var n = new Image;
                    n.crossOrigin = "Anonymous",
                    n.src = r.image,
                    n.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(n),
                        t.handleLoadedTexture();
                        var e = cc.Sprite.createWithTexture(t);
                        a._spilLogo = cc.MenuItemImage.create(null, null, r.action, a),
                        a._spilLogo.setNormalImage(e),
                        a._spilLogo.setPosition(cc.p(100, 54));
                        var i = cc.Menu.create(a._spilLogo);
                        i.setPosition(cc.p(0, 0)),
                        a.addChild(i)
                    }
                }
            }
            this.addChild(this._languageSelector),
            this._itemStartGame.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(this._itemStartGame.getPositionX(), WIN_SIZE.height - 10 - .9 * this._logo.getContentSize().height - this._itemStartGame.getContentSize().height / 2)))),
            this._itemMoreGame.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.3, cc.p(this._itemStartGame.getPosition().x, 52)))),
            this._moreLabelFront.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.3, cc.p(this._itemMoreGame.getPosition().x, 52)))),
            this._moreLabelFront2.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.3, cc.p(this._itemMoreGame.getPosition().x, 52)))),
            this._itemMusic.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(70, 165)))),
            this._itemSound.runAction(cc.Sequence.create(cc.EaseBackOut.create(cc.MoveTo.create(1.3, cc.p(130, 165))), cc.CallFunc.create(this.updatePositions, this)))
        }
        return t
    },
    createMainMenuAnimation: function() {
        for (var t = 20,
        e = 200,
        i = 0; 5 > i; i++) {
            var s = new cc.Sprite;
            s.initWithSpriteFrameName("Pilar01.png"),
            s.setPosition(cc.p(t, e)),
            this.addChild(s),
            s = new cc.Sprite,
            s.initWithSpriteFrameName("Pilar01.png"),
            s.setPosition(cc.p(t, e - s.getContentSize().height)),
            this.addChild(s),
            t += 120,
            e -= 68
        }
        t = 20,
        e = 300;
        for (var i = 0; 10 > i; i++) {
            var a = new cc.Sprite;
            a.initWithSpriteFrameName("Recta.png"),
            a.setPosition(cc.p(t, e)),
            a.setRotation(30),
            this.addChild(a),
            t += a.getContentSize().width - 10,
            e -= 33
        }
        var r = new cc.Sprite;
        r.initWithSpriteFrameName("yellow_cart.png"),
        r.setRotation(30),
        r.setPosition(cc.p( - 40, 390)),
        r.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(3, cc.p(690, -35)), cc.MoveTo.create(0, cc.p( - 40, 390)), cc.MoveTo.create(2, cc.p( - 40, 390))))),
        this.addChild(r);
        var n = new SpriteAnimation;
        n.initWithAtlas("standard_girl.png", 1, .5, cc.p(0, 0), cc.p(101, 90), "main_char", cc.p(1, 1)),
        n.setRotation(10),
        n.setPosition(cc.p(10, 25)),
        r.addChild(n, -1)
    },
    updateText: function() {
        LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? (this._moreLabelFront2.setString(Localization.getText("{MOREGAMES}")), this._moreLabelFront.setString("")) : (this._moreLabelFront.setString(Localization.getText("{MOREGAMES}")), this._moreLabelFront2.setString(""))
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                void t.selected()
            }
            t.unselected()
        }
        var e = t.getLocation();
        i(this._itemStartGame, e),
        i(this._itemMoreGame, e),
        i(this._itemSound, e),
        i(this._itemMusic, e)
    },
    checkBackgroundScreen: function() {
        var t = this._bgSprite.getContentSize().width;
        if (t < WIN_SIZE.width) for (var e = !0,
        i = 1.1; e;) {
            var s = t;
            if (s *= i, s >= WIN_SIZE.width) {
                this._bgSprite.setScale(i);
                break
            }
            i += .1
        } else this._bgSprite.setScale(1)
    },
    updatePositions: function() {
        this._bgSprite.setPosition(CENTER_POS),
        this._logo.setPosition(cc.p(WIN_SIZE.width - 25 - .9 * this._logo.getContentSize().width / 2, WIN_SIZE.height - 10 - .9 * this._logo.getContentSize().height / 2)),
        this._itemStartGame.setPosition(cc.p(this._logo.getPositionX(), WIN_SIZE.height - 10 - .9 * this._logo.getContentSize().height - this._itemStartGame.getContentSize().height / 2)),
        this._itemMoreGame.setPosition(cc.p(this._itemStartGame.getPosition().x, 52)),
        this._moreLabelFront.setPosition(cc.p(this._itemMoreGame.getPosition().x, this._itemMoreGame.getPosition().y)),
        this._moreLabelFront2.setPosition(cc.p(this._itemMoreGame.getPosition().x, this._itemMoreGame.getPosition().y)),
        this._languageSelector.setPosition(100, 110),
        this._itemMusic.setPosition(70, 165),
        this._itemSound.setPosition(130, 165),
        this._spilLogo && this._spilLogo.setPosition(cc.p(100, 54)),
        this.checkBackgroundScreen()
    },
    update: function(t) {
        if (this._gotoNextScene && (this._gotoNextSceneTime += t, this._gotoNextSceneTime >= .72)) {
            this._gotoNextSceneTime = -1e5,
            CURRENT_LAYERS.length = 0;
            var e = cc.Scene.create(),
            i = new Background,
            s = new SceneSelectLevel;
            s._enterByGameComplete = !0;
            var a = new SceneStore,
            r = new FakePlayerLayer;
            e.addChild(i),
            e.addChild(s),
            e.addChild(r),
            e.addChild(a),
            a.setPosition(cc.p(WIN_SIZE.width, 0)),
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.6, e))
        }
    },
    setMusicSoundButtonStates: function() {
        var t = PlayerData.musicMute,
        e = PlayerData.soundMute;
        t ? (this._itemMusic.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff.png")), this._itemMusic.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff_Over.png"))) : (this._itemMusic.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOn.png")), this._itemMusic.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOn_Over.png"))),
        e ? (this._itemSound.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff.png")), this._itemSound.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff_Over.png"))) : (this._itemSound.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOn.png")), this._itemSound.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOn_Over.png")))
    },
    musicCallBack: function() {
        gSharedEngine.playEffect(SOUND_12),
        PlayerData.setMusicMute(!PlayerData.musicMute),
        PlayerData.musicMute ? (this._itemMusic.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff.png")), this._itemMusic.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOff_Over.png"))) : (this._itemMusic.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOn.png")), this._itemMusic.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_MusicOn_Over.png"))),
        PlayerData.saveData(),
        showButtonParticles(this._itemMusic)
    },
    soundCallBack: function() {
        PlayerData.setSoundMute(!PlayerData.soundMute),
        gSharedEngine.playEffect(SOUND_12),
        PlayerData.soundMute ? (this._itemSound.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff.png")), this._itemSound.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOff_Over.png"))) : (this._itemSound.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOn.png")), this._itemSound.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainMenu_SoundOn_Over.png"))),
        PlayerData.saveData(),
        showButtonParticles(this._itemSound)
    },
    moreGamesCallBack: function() {
        // if (showButtonParticles(this._itemMoreGame), SpilAPI) {
        //     var t = SpilAPI.Branding.getLink("more_games");
        //     t.action()
        // }
        cb_showMoreApp();
    },
    playCallBack: function() {
        this._gotoNextScene || (gSharedEngine.playEffect(SOUND_4), showButtonParticles(this._itemStartGame), this._itemStartGame.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(this._itemStartGame.getPositionX(), -200)))), this._itemMoreGame.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.3, cc.p(this._itemStartGame.getPosition().x, -200)))), this._moreLabelFront.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.3, cc.p(this._itemMoreGame.getPosition().x, -200)))), this._moreLabelFront2.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.3, cc.p(this._itemMoreGame.getPosition().x, -200)))), this._itemMusic.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p( - 200, 165)))), this._itemSound.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.3, cc.p( - 200, 165)))), this._gotoNextScene = !0)
    }
}),
TIME_UPDATE = .7,
SceneComplete = cc.Layer.extend({
    _bgSprite: null,
    _itemContinue: null,
    _board: null,
    _totalScoreValue: null,
    _sparkles1: null,
    _sparkles2: null,
    _timeToStartFire: 0,
    _startFire: !1,
    _timeUpdated: 0,
    _cash: 0,
    _bonus: 0,
    _step1: !0,
    _step2: !1,
    _step3: !1,
    _startFireworks: !1,
    _currentTotal: 0,
    _moreLabelFront: null,
    _car: null,
    _character: null,
    _node: null,
    _fire2: null,
    _pole1: null,
    _backPeople: null,
    _backPerson1: null,
    _backPerson2: null,
    _backPerson3: null,
    _fence: null,
    _pole2: null,
    _fire1: null,
    _frontPerson7: null,
    _frontPerson1: null,
    _frontPerson3: null,
    _frontPerson2: null,
    _frontPerson12: null,
    _frontPerson6: null,
    _frontPerson5: null,
    _frontPerson4: null,
    _frontPerson11: null,
    _frontPerson33: null,
    _frontPerson9: null,
    _frontPerson8: null,
    _frontPerson10: null,
    _firework1: null,
    _firework2: null,
    _firework3: null,
    _timeFirework1: 0,
    _timeFirework2: 0,
    _timeFirework3: 0,
    _balloon1: null,
    _balloon2: null,
    _balloon3: null,
    _balloon4: null,
    _timeSpawnBalloon1: 3,
    _timeSpawnBalloon2: 1,
    _timeSpawnBalloon3: 1.3,
    _timeSpawnBalloon4: 4.3,
    _emitter: null,
    _stars: null,
    _star1: null,
    _star2: null,
    _star3: null,
    _balloonsCreated: !1,
    _startCelebration: !1,
    ctor: function() {
        gSharedEngine.playMusic(MUSIC_BACKGROUND_2, !1),
        g_gamelogic._player.destroyPhysics(),
        g_gamelogic._mapManager.destroyMap(),
        this._super(),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0),
        this.init(),
        CURRENT_LAYERS.length = 0,
        CURRENT_LAYERS.push(this)
        cb_show();
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            t = !0;
            var e = getBackground(g_gamelogic._modeType);
            e && (this._bgSprite = e, this._bgSprite.setPosition(CENTER_POS), this.addChild(this._bgSprite)),
            g_gamelogic._modeType === NIGHT_STAGE ? IS_HANDHELD || (this._firework1 = cc.ParticleSystem.create("res/fireworks_yellow.plist"), this._firework1.setPosition(cc.p(CENTER_POS.x - 200, CENTER_POS.y)), this._firework1.setPositionType(cc.PARTICLE_TYPE_RELATIVE), this.addChild(this._firework1), this._firework2 = cc.ParticleSystem.create("res/fireworks_pink.plist"), this._firework2.setPosition(cc.p(CENTER_POS.x - 300, CENTER_POS.y - 100)), this._firework2.setPositionType(cc.PARTICLE_TYPE_RELATIVE), this.addChild(this._firework2), this._firework3 = cc.ParticleSystem.create("res/fireworks_cyan.plist"), this._firework3.setPosition(cc.p(CENTER_POS.x - 250, CENTER_POS.y + 50)), this._firework3.setPositionType(cc.PARTICLE_TYPE_RELATIVE), this.addChild(this._firework3)) : this.createBalloons(),
            this._board = new cc.Sprite,
            this._board.initWithSpriteFrameName("TR3_GUI_WoodenSign.png"),
            this._board.setPosition(cc.p(WIN_SIZE.width - 10 - .5 * this._board.getContentSize().width, WIN_SIZE.height - 10 - .5 * this._board.getContentSize().height)),
            this.addChild(this._board),
            this._itemContinue = cc.MenuItemImage.create(null, null, this.continueCallBack, this),
            this._itemContinue.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Normal.png")),
            this._itemContinue.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Over.png")),
            this._itemContinue.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - 25)),
            this._itemContinue.setVisible(!1);
            var i = cc.Menu.create(this._itemContinue);
            i.setPosition(cc.p(0, 0)),
            this.addChild(i),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._moreLabelFront = cc.LabelTTF.create(Localization.getText("{CONTINUE}"), "Arial", "20") : (this._moreLabelFront = cc.LabelBMFont.create(Localization.getText("{CONTINUE}"), "res/Arial.fnt"), this._moreLabelFront.setScale(TextUtils.getTextSizeScale(30))),
            this._moreLabelFront.setPosition(this._itemContinue.getPosition()),
            this.addChild(this._moreLabelFront),
            this._moreLabelFront.setVisible(!1),
            this._cash = new cc.Sprite,
            this._cash.initWithSpriteFrameName("TR_IN_CashIcon.png"),
            this._cash.setPosition(cc.p(125, 160)),
            this._board.addChild(this._cash),
            this._cash.setVisible(!1),
            this._stars = new cc.Sprite,
            this._stars.initWithSpriteFrameName("stars_levelcomplete_empty.png"),
            this._stars.setPosition(cc.p(170, 230)),
            this._board.addChild(this._stars),
            this._star1 = new cc.Sprite,
            this._star1.initWithSpriteFrameName("star_levelcomplete.png"),
            this._star1.setPosition(cc.p(110, 222)),
            this._board.addChild(this._star1),
            this._star1.setVisible(!1),
            this._star2 = new cc.Sprite,
            this._star2.initWithSpriteFrameName("star_levelcomplete.png"),
            this._star2.setPosition(cc.p(170, 238)),
            this._board.addChild(this._star2),
            this._star2.setVisible(!1),
            this._star3 = new cc.Sprite,
            this._star3.initWithSpriteFrameName("star_levelcomplete.png"),
            this._star3.setPosition(cc.p(230, 223)),
            this._board.addChild(this._star3),
            this._star3.setVisible(!1),
            this._totalScoreValue = cc.LabelBMFont.create("0", "res/Arial.fnt", 200, cc.TEXT_ALIGNMENT_RIGHT),
            this._totalScoreValue.setScale(TextUtils.getTextSizeScale(30)),
            this._totalScoreValue.setPosition(cc.p(150, 160)),
            this._board.addChild(this._totalScoreValue),
            this._totalScoreValue.setVisible(!1),
            this._fire2 = new cc.Sprite,
            this._fire2.initWithSpriteFrameName("TR3_GUI_FinishLine03.png"),
            this._fire2.setPosition(cc.p(50, 160)),
            this.addChild(this._fire2),
            this._sparkles2 = new SpriteAnimation,
            this._sparkles2.initWithAtlas("TR3_GUI_GameComplete_Explosion.png", 1, .05, cc.p(0, 0), cc.p(53, 73), "fire2"),
            this._sparkles2.setPosition(cc.p(this._fire2.getPositionX() - 120, this._fire2.getPositionY() + 5)),
            this._sparkles2.setScale(4),
            this.addChild(this._sparkles2),
            this._pole1 = new cc.Sprite,
            this._pole1.initWithSpriteFrameName("TR3_GUI_FinishLine02.png"),
            this._pole1.setPosition(cc.p(60, 200)),
            this.addChild(this._pole1),
            this._backPeople = new cc.Sprite,
            this._backPeople.initWithSpriteFrameName("TR3_GUI_GameComplete_PeopleBack.png"),
            this._backPeople.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - .5 * this._board.getContentSize().height + 15)),
            this.addChild(this._backPeople),
            this._backPerson1 = new SpriteAnimation,
            this._backPerson1.initWithAtlas("TR3_GUI_GameComplete_PeopleBack01.png", 99999999, .05, cc.p(0, 0), cc.p(75, 125), "backPerson1", cc.p(1, 15)),
            this._backPerson1.setPosition(cc.p(this._board.getPositionX() - 100, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
            this.addChild(this._backPerson1),
            this._backPerson1.play(),
            this._backPerson2 = new SpriteAnimation,
            this._backPerson2.initWithAtlas("TR3_GUI_GameComplete_PeopleBack02.png", 99999999, .04, cc.p(0, 0), cc.p(75, 125), "backPerson2", cc.p(1, 15)),
            this._backPerson2.setPosition(cc.p(this._board.getPositionX() - 20, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
            this.addChild(this._backPerson2),
            this._backPerson2.play(),
            this._backPerson3 = new SpriteAnimation,
            this._backPerson3.initWithAtlas("TR3_GUI_GameComplete_PeopleBack03.png", 99999999, .07, cc.p(0, 0), cc.p(88, 146), "backPerson3"),
            this._backPerson3.setPosition(cc.p(this._board.getPositionX() + 50, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
            this.addChild(this._backPerson3),
            this._backPerson3.play(),
            this._fence = new cc.Sprite,
            this._fence.initWithSpriteFrameName("TR3_GUI_GameComplete_Fence.png"),
            this._fence.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - .5 * this._board.getContentSize().height - 20)),
            this.addChild(this._fence);
            for (var s = 0,
            a = !0,
            r = 0; r <= Math.ceil(WIN_SIZE.width / 67); r++) {
                if (a) {
                    var n = new cc.Sprite;
                    n.initWithSpriteFrameName("Pilar01.png"),
                    n.setPosition(cc.p(.5 * n.getContentSize().width + s, this._board.getPositionY() - .5 * this._board.getContentSize().height - .5 * n.getContentSize().height - 40)),
                    this.addChild(n);
                    var o = g_gamelogic._modeType === DAY_STAGE ? "Roca3.png": "Roca3_Noche.png",
                    c = new cc.Sprite;
                    c.initWithSpriteFrameName(o),
                    c.setPosition(cc.p(.5 * c.getContentSize().width + s, this._board.getPositionY() - .5 * this._board.getContentSize().height - 170)),
                    this.addChild(c),
                    a = !1
                } else {
                    var o = g_gamelogic._modeType === DAY_STAGE ? "Roca1.png": "Roca1_Noche.png",
                    c = new cc.Sprite;
                    c.initWithSpriteFrameName(o),
                    c.setPosition(cc.p(.5 * c.getContentSize().width + s, this._board.getPositionY() - .5 * this._board.getContentSize().height - 165)),
                    this.addChild(c),
                    a = !0
                }
                var h = new cc.Sprite;
                h.initWithSpriteFrameName(g_gamelogic._modeType === NIGHT_STAGE ? "Recta_Noche.png": "Recta.png"),
                h.setPosition(cc.p(.5 * h.getContentSize().width + s, this._board.getPositionY() - .5 * this._board.getContentSize().height - 40)),
                this.addChild(h),
                s += 64
            }
            this.createFakePlayer(),
            this._pole2 = new cc.Sprite,
            this._pole2.initWithSpriteFrameName("TR3_GUI_FinishLine01.png"),
            this._pole2.setPosition(cc.p(120, 200)),
            this.addChild(this._pole2),
            this._fire1 = new cc.Sprite,
            this._fire1.initWithSpriteFrameName("TR3_GUI_FinishLine03.png"),
            this._fire1.setPosition(cc.p(170, 150)),
            this.addChild(this._fire1),
            this._sparkles1 = new SpriteAnimation,
            this._sparkles1.initWithAtlas("TR3_GUI_GameComplete_Explosion.png", 1, .05, cc.p(0, 0), cc.p(53, 73), "fire"),
            this._sparkles1.setPosition(cc.p(this._fire1.getPositionX() - 120, this._fire1.getPositionY() + 5)),
            this._sparkles1.setScale(4),
            this.addChild(this._sparkles1),
            this._frontPerson7 = new cc.Sprite,
            this._frontPerson7.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_07.png"),
            this._frontPerson7.setPosition(cc.p(CENTER_POS.x + 170, 50)),
            this.addChild(this._frontPerson7),
            this._frontPerson1 = new cc.Sprite,
            this._frontPerson1.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_01.png"),
            this._frontPerson1.setPosition(cc.p(CENTER_POS.x + 190, 30)),
            this.addChild(this._frontPerson1),
            this._frontPerson1.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.3, cc.p(this._frontPerson1.getPositionX(), this._frontPerson1.getPositionY() - 10)), cc.MoveTo.create(.3, cc.p(this._frontPerson1.getPositionX(), this._frontPerson1.getPositionY() + 10))))),
            this._frontPerson3 = new cc.Sprite,
            this._frontPerson3.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_03.png"),
            this._frontPerson3.setPosition(cc.p(CENTER_POS.x - 140, 30)),
            this.addChild(this._frontPerson3),
            this._frontPerson3.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.4, cc.p(this._frontPerson3.getPositionX(), this._frontPerson3.getPositionY() - 10)), cc.MoveTo.create(.4, cc.p(this._frontPerson3.getPositionX(), this._frontPerson3.getPositionY() + 10))))),
            this._frontPerson2 = new cc.Sprite,
            this._frontPerson2.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_02.png"),
            this._frontPerson2.setPosition(cc.p(CENTER_POS.x - 220, 50)),
            this.addChild(this._frontPerson2),
            this._frontPerson2.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.5, cc.p(this._frontPerson2.getPositionX(), this._frontPerson2.getPositionY() - 10)), cc.MoveTo.create(.5, cc.p(this._frontPerson2.getPositionX(), this._frontPerson2.getPositionY() + 10))))),
            this._frontPerson12 = new cc.Sprite,
            this._frontPerson12.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_01.png"),
            this._frontPerson12.setPosition(cc.p(CENTER_POS.x - 260, 5)),
            this.addChild(this._frontPerson12),
            this._frontPerson12.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.6, cc.p(this._frontPerson12.getPositionX(), this._frontPerson12.getPositionY() - 10)), cc.MoveTo.create(.6, cc.p(this._frontPerson12.getPositionX(), this._frontPerson12.getPositionY() + 10))))),
            this._frontPerson6 = new cc.Sprite,
            this._frontPerson6.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_06.png"),
            this._frontPerson6.setPosition(cc.p(CENTER_POS.x + 70, 50)),
            this.addChild(this._frontPerson6),
            this._frontPerson6.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.3, cc.p(this._frontPerson6.getPositionX(), this._frontPerson6.getPositionY() - 10)), cc.MoveTo.create(.3, cc.p(this._frontPerson6.getPositionX(), this._frontPerson6.getPositionY() + 10))))),
            this._frontPerson5 = new cc.Sprite,
            this._frontPerson5.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_05.png"),
            this._frontPerson5.setPosition(cc.p(CENTER_POS.x - 10, 40)),
            this.addChild(this._frontPerson5),
            this._frontPerson5.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.4, cc.p(this._frontPerson5.getPositionX(), this._frontPerson5.getPositionY() - 10)), cc.MoveTo.create(.4, cc.p(this._frontPerson5.getPositionX(), this._frontPerson5.getPositionY() + 10))))),
            this._frontPerson4 = new cc.Sprite,
            this._frontPerson4.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_04.png"),
            this._frontPerson4.setPosition(cc.p(CENTER_POS.x - 70, 50)),
            this.addChild(this._frontPerson4),
            this._frontPerson4.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.6, cc.p(this._frontPerson4.getPositionX(), this._frontPerson4.getPositionY() - 10)), cc.MoveTo.create(.6, cc.p(this._frontPerson4.getPositionX(), this._frontPerson4.getPositionY() + 10))))),
            this._frontPerson11 = new cc.Sprite,
            this._frontPerson11.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_01.png"),
            this._frontPerson11.setPosition(cc.p(CENTER_POS.x + 40, 5)),
            this.addChild(this._frontPerson11),
            this._frontPerson11.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.5, cc.p(this._frontPerson11.getPositionX(), this._frontPerson11.getPositionY() - 10)), cc.MoveTo.create(.5, cc.p(this._frontPerson11.getPositionX(), this._frontPerson11.getPositionY() + 10))))),
            this._frontPerson33 = new cc.Sprite,
            this._frontPerson33.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_03.png"),
            this._frontPerson33.setPosition(cc.p(CENTER_POS.x + 120, 50)),
            this.addChild(this._frontPerson33),
            this._frontPerson33.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.3, cc.p(this._frontPerson33.getPositionX(), this._frontPerson33.getPositionY() - 10)), cc.MoveTo.create(.3, cc.p(this._frontPerson33.getPositionX(), this._frontPerson33.getPositionY() + 10))))),
            this._frontPerson9 = new cc.Sprite,
            this._frontPerson9.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_09.png"),
            this._frontPerson9.setPosition(cc.p(CENTER_POS.x + 280, 60)),
            this.addChild(this._frontPerson9),
            this._frontPerson9.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.6, cc.p(this._frontPerson9.getPositionX(), this._frontPerson9.getPositionY() - 10)), cc.MoveTo.create(.6, cc.p(this._frontPerson9.getPositionX(), this._frontPerson9.getPositionY() + 10))))),
            this._frontPerson8 = new cc.Sprite,
            this._frontPerson8.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_08.png"),
            this._frontPerson8.setPosition(cc.p(CENTER_POS.x + 240, 50)),
            this.addChild(this._frontPerson8),
            this._frontPerson8.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.4, cc.p(this._frontPerson8.getPositionX(), this._frontPerson8.getPositionY() - 10)), cc.MoveTo.create(.4, cc.p(this._frontPerson8.getPositionX(), this._frontPerson8.getPositionY() + 10))))),
            this._frontPerson10 = new cc.Sprite,
            this._frontPerson10.initWithSpriteFrameName("TR3_GUI_GameCompleteCharacter_10.png"),
            this._frontPerson10.setPosition(cc.p(CENTER_POS.x + 340, 50)),
            this.addChild(this._frontPerson10),
            this._frontPerson10.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveTo.create(.3, cc.p(this._frontPerson10.getPositionX(), this._frontPerson10.getPositionY() - 10)), cc.MoveTo.create(.3, cc.p(this._frontPerson10.getPositionX(), this._frontPerson10.getPositionY() + 10)))));
            var _ = this;
            if (SpilAPI) {
                var l = SpilAPI.Branding.getLogo();
                if (l.image) {
                    var p = new Image;
                    p.crossOrigin = "Anonymous",
                    p.src = l.image,
                    p.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(p),
                        t.handleLoadedTexture();
                        var e = cc.Sprite.createWithTexture(t);
                        _._spilLogo = cc.MenuItemImage.create(null, null, l.action, _),
                        _._spilLogo.setNormalImage(e),
                        _._spilLogo.setPosition(cc.p(WIN_SIZE.width - 100, 50));
                        var i = cc.Menu.create(_._spilLogo);
                        i.setPosition(cc.p(0, 0)),
                        _.addChild(i)
                    }
                }
            }
            PlayerData.currentCash += g_gamelogic._player._score;
            for (var d = g_gamelogic._heartsCollected,
            r = 0; d > r; r++) PlayerData.setCoinLevel(r, g_gamelogic._currentLevel);
            if (g_gamelogic._currentLevel < 12 && 1 !== PlayerData.levelUnlocked[g_gamelogic._currentLevel + 1] && (PlayerData.levelUnlocked[g_gamelogic._currentLevel + 1] = 1), 1 !== PlayerData.levelUnlocked[13]) {
                for (var u = 0,
                r = 0; 13 > r && !(PlayerData.getCoinsLevelCount(r) < 2); r++) u++;
                13 === u && (PlayerData.levelUnlocked[13] = 1)
            } else if (1 !== PlayerData.levelUnlocked[14]) {
                for (var u = 0,
                r = 0; 14 > r && !(PlayerData.getCoinsLevelCount(r) < 3); r++) u++;
                14 === u && (PlayerData.levelUnlocked[14] = 1)
            }
            PlayerData.saveData(),
            this.scheduleUpdate()
        }
        return t
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                void t.selected()
            }
            t.unselected()
        }
        var e = t.getLocation();
        i(this._itemContinue, e)
    },
    createBalloons: function() {
        this._balloon1 = new cc.Sprite,
        this._balloon1.initWithSpriteFrameName("Globo1.png"),
        this._balloon1.setPosition(cc.p(CENTER_POS.x, -100)),
        this.addChild(this._balloon1),
        this._balloon2 = new cc.Sprite,
        this._balloon2.initWithSpriteFrameName("Globo2.png"),
        this._balloon2.setPosition(cc.p(CENTER_POS.x, -100)),
        this.addChild(this._balloon2),
        this._balloon3 = new cc.Sprite,
        this._balloon3.initWithSpriteFrameName("Globo3.png"),
        this._balloon3.setPosition(cc.p(CENTER_POS.x, -100)),
        this.addChild(this._balloon3),
        this._balloon4 = new cc.Sprite,
        this._balloon4.initWithSpriteFrameName("Globo3.png"),
        this._balloon4.setPosition(cc.p(CENTER_POS.x, -100)),
        this.addChild(this._balloon4)
    },
    balloonUpdate: function(t) {
        function e(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        }
        var i = 7;
        if (this._timeSpawnBalloon1 -= t, this._timeSpawnBalloon2 -= t, this._timeSpawnBalloon3 -= t, this._timeSpawnBalloon4 -= t, this._timeSpawnBalloon1 <= 0) {
            var s = e(0, WIN_SIZE.width);
            this._balloon1.setPosition(cc.p(s, -100)),
            this._balloon1.runAction(cc.MoveBy.create(i, cc.p(0, WIN_SIZE.height + 200))),
            this._timeSpawnBalloon1 = e(i, i + 3)
        }
        if (this._timeSpawnBalloon2 <= 0) {
            var s = e(0, WIN_SIZE.width);
            this._balloon2.setPosition(cc.p(s, -100)),
            this._balloon2.runAction(cc.MoveBy.create(i, cc.p(0, WIN_SIZE.height + 200))),
            this._timeSpawnBalloon2 = e(i, i + 3)
        }
        if (this._timeSpawnBalloon3 <= 0) {
            var s = e(0, WIN_SIZE.width);
            this._balloon3.setPosition(cc.p(s, -100)),
            this._balloon3.runAction(cc.MoveBy.create(i, cc.p(0, WIN_SIZE.height + 200))),
            this._timeSpawnBalloon3 = e(i, i + 3)
        }
        if (this._timeSpawnBalloon4 <= 0) {
            var s = e(0, WIN_SIZE.width);
            this._balloon4.setPosition(cc.p(s, -100)),
            this._balloon4.runAction(cc.MoveBy.create(i, cc.p(0, WIN_SIZE.height + 200))),
            this._timeSpawnBalloon4 = e(i, i + 3)
        }
    },
    createFakePlayer: function() {
        this._node = cc.Node.create(),
        this._character = new SpriteAnimation,
        this._character.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "idle", cc.p(1, 1)),
        this._character.setPosition(cc.p( - 60, -30)),
        this._node.addChild(this._character);
        var t = carsArray[PlayerData.currentCar - 10];
        t.animated === !0 ? (this._car = new SpriteAnimation, this._car.initWithAtlas(t.sprite, 9999999, t.speed, t.offset, t.region, t.name, t.range), this._car.setPosition(cc.p(t.offset.x, -8 + t.offset.y)), this._car.play()) : (this._car = new cc.Sprite, this._car.initWithSpriteFrameName(t.sprite), this._car.setPosition(cc.p(0, -8))),
        this._node.addChild(this._car),
        this._node.setPosition(cc.p( - 100, this._board.getPositionY() - .5 * this._board.getContentSize().height + 15)),
        this._carSparks = new SpriteAnimation,
        this._carSparks.initWithAtlas("TR_cart_Spark.png", 9999999, .08, cc.p(60, 35), cc.p(120.5, 73), "sparkCar"),
        this._car.addChild(this._carSparks),
        this._carSparks.setPosition(cc.p( - 5, -35)),
        this._carSparks.setVisible(!1),
        this._carSparks.play(),
        this.addChild(this._node),
        this._node.runAction(cc.Sequence.create(cc.MoveBy.create(.7, cc.p(300, 0)), cc.CallFunc.create(function() {
            this._carSparks.setVisible(!0)
        },
        this), cc.MoveBy.create(1, cc.p(100, 0)), cc.MoveBy.create(1, cc.p(50, 0)), cc.CallFunc.create(function() {
            this._carSparks.setVisible(!1),
            t.animated !== !0 || t.alwaysAnimate || this._car.stop()
        },
        this)))
    },
    moveCarAway: function() {
        var t = carsArray[PlayerData.currentCar - 10];
        this._node.runAction(cc.Sequence.create(cc.CallFunc.create(function() {
            t.animated !== !0 || t.alwaysAnimate || this._car.play()
        },
        this), cc.MoveBy.create(.7, cc.p(100, 0)), cc.MoveBy.create(.7, cc.p(WIN_SIZE.width - this._node.getPositionX(), 0)), cc.CallFunc.create(this.runNextScene, this)))
    },
    runNextScene: function() {
        var t = cc.Scene.create(),
        e = new Background,
        i = new SceneSelectLevel,
        s = new SceneStore;
        s._enterByGameComplete = !0;
        var a = new FakePlayerLayer;
        t.addChild(e),
        t.addChild(i),
        t.addChild(a),
        t.addChild(s),
        e._bgSprite && e._bgSprite.setPositionX(e._initPos - (e._size - WIN_SIZE.width)),
        i.setPositionX( - WIN_SIZE.width),
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.6, t))
    },
    update: function(t) {
        if (this._startFire || (this._timeToStartFire += t, this._startCelebration || (g_gamelogic._modeType === NIGHT_STAGE ? (this._timeFirework1 = 10, this._timeFirework2 = 10, this._timeFirework3 = 10, IS_HANDHELD || (this._startFireworks = !0)) : (IS_HANDHELD || (this._emitter = cc.ParticleSystem.create("res/confetti2.plist"), this._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE), this._emitter.setPosVar(cc.p(WIN_SIZE.width, 0)), this.addChild(this._emitter), this._emitter.setPositionType(cc.PARTICLE_TYPE_RELATIVE), this._emitter.setPosition(CENTER_POS.x, WIN_SIZE.height + 50), this._emitter.setAutoRemoveOnFinish(!0)), this._balloonsCreated = !0), gSharedEngine.playEffect(SOUND_3), this._startCelebration = !0), this._timeToStartFire > .5 && (this._startFire = !0, this._sparkles1.play(), this._sparkles2.play(), gSharedEngine.playEffect(SOUND_6))), this._balloonsCreated && this.balloonUpdate(t), this._timeUpdated += t, this._timeUpdated > TIME_UPDATE) if (this._step1) {
            this._step1 = !1,
            this._step2 = !0;
            var e = g_gamelogic._heartsCollected;
            if (0 === e) this._timeUpdated = TIME_UPDATE;
            else for (var i = this,
            s = 0; e > s; s++) e > 0 && (this._timeUpdated = 0, this._star1.setVisible(!0), this._star1.setScale(3), this._star1.runAction(cc.Sequence.create(cc.ScaleTo.create(.3, 1, 1), cc.MoveBy.create(.3, cc.p(0, 0)), cc.CallFunc.create(function() {
                e > 1 && i._star2.setVisible(!0)
            },
            this))), this.addParticles(cc.p(this._star1.getPositionX(), this._star1.getPositionY()))),
            e > 1 && (this._timeUpdated = -TIME_UPDATE, this._star2.setScale(3), this._star2.runAction(cc.Sequence.create(cc.MoveBy.create(.5, cc.p(0, 0)), cc.CallFunc.create(function() {
                i.addParticles(cc.p(i._star2.getPositionX(), i._star2.getPositionY()))
            }), cc.ScaleTo.create(.3, 1, 1), cc.MoveBy.create(.3, cc.p(0, 0)), cc.CallFunc.create(function() {
                e > 2 && i._star3.setVisible(!0)
            },
            this)))),
            e > 2 && (this._timeUpdated = 2 * -TIME_UPDATE, this._star3.setScale(3), this._star3.runAction(cc.Sequence.create(cc.MoveBy.create(1, cc.p(0, 0)), cc.CallFunc.create(function() {
                i.addParticles(cc.p(i._star3.getPositionX(), i._star3.getPositionY()))
            }), cc.ScaleTo.create(.3, 1, 1))))
        } else this._step2 ? (this._step2 = !1, this._step3 = !0, this._timeUpdated = 0, this._cash.setVisible(!0), this._totalScoreValue.setString("" + g_gamelogic._player._score), this._totalScoreValue.setVisible(!0), this.addParticles(cc.p(this._totalScoreValue.getPosition().x + 80, this._totalScoreValue.getPosition().y))) : this._step3 && (this._step3 = !1, this._itemContinue.setVisible(!0), this._moreLabelFront.setVisible(!0));
        if (this._startFireworks) {
            this._timeFirework1 += t,
            this._timeFirework2 += t,
            this._timeFirework3 += t;
            var a = {
                0 : cc.p(CENTER_POS.x - 350, CENTER_POS.y + 100),
                1 : cc.p(CENTER_POS.x - 120, CENTER_POS.y + 100),
                2 : cc.p(CENTER_POS.x - 230, CENTER_POS.y + 50),
                3 : cc.p(CENTER_POS.x - 110, CENTER_POS.y + 10),
                4 : cc.p(CENTER_POS.x - 200, CENTER_POS.y - 50)
            };
            if (this._timeFirework1 >= 3) {
                var r = Math.floor(5 * Math.random() + 1);
                this._firework1.setPosition(a[r - 1]),
                this._firework1.resetSystem(),
                this._timeFirework1 = Math.random()
            }
            if (this._timeFirework2 >= 3) {
                var r = Math.floor(5 * Math.random() + 1);
                this._firework2.setPosition(a[r - 1]),
                this._firework2.resetSystem(),
                this._timeFirework2 = Math.random()
            }
            if (this._timeFirework3 >= 3) {
                var r = Math.floor(5 * Math.random() + 1);
                this._firework3.setPosition(a[r - 1]),
                this._firework3.resetSystem(),
                this._timeFirework3 = Math.random()
            }
        }
    },
    addParticles: function(t) {
        if (!IS_HANDHELD) {
            var e = createParticleSystemWithDictionary("res/score_sparkles.plist");
            e.setDrawMode(cc.PARTICLE_TEXTURE_MODE),
            this._board.addChild(e),
            e.setPosition(t),
            e.setPositionType(cc.PARTICLE_TYPE_RELATIVE),
            e.setAutoRemoveOnFinish(!0)
        }
    },
    updatePositions: function() {
        this._bgSprite && this._bgSprite.setPosition(CENTER_POS),
        this._board.setPosition(cc.p(WIN_SIZE.width - 10 - .5 * this._board.getContentSize().width, WIN_SIZE.height - 10 - .5 * this._board.getContentSize().height)),
        this._itemContinue.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - 25)),
        this._moreLabelFront.setPosition(this._itemContinue.getPosition()),
        this._totalScoreValue.setPosition(cc.p(150, 160)),
        this._fire2.setPosition(cc.p(50, 160)),
        this._sparkles2.setPosition(cc.p(this._fire2.getPositionX() - 45, this._fire2.getPositionY() + 5)),
        this._pole1.setPosition(cc.p(60, 200)),
        this._backPeople.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - .5 * this._board.getContentSize().height + 15)),
        this._backPerson1.setPosition(cc.p(this._board.getPositionX() - 100, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
        this._backPerson2.setPosition(cc.p(this._board.getPositionX() - 20, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
        this._backPerson3.setPosition(cc.p(this._board.getPositionX() + 50, this._board.getPositionY() - .5 * this._board.getContentSize().height - 35)),
        this._fence.setPosition(cc.p(this._board.getPositionX(), this._board.getPositionY() - .5 * this._board.getContentSize().height - 20)),
        this._pole2.setPosition(cc.p(120, 200)),
        this._fire1.setPosition(cc.p(170, 150)),
        this._sparkles1.setPosition(cc.p(this._fire1.getPositionX() - 45, this._fire1.getPositionY() + 5)),
        this._frontPerson7.setPosition(cc.p(CENTER_POS.x + 170, 50)),
        this._frontPerson1.setPosition(cc.p(CENTER_POS.x + 190, 30)),
        this._frontPerson3.setPosition(cc.p(CENTER_POS.x - 140, 30)),
        this._frontPerson2.setPosition(cc.p(CENTER_POS.x - 220, 50)),
        this._frontPerson12.setPosition(cc.p(CENTER_POS.x - 260, 5)),
        this._frontPerson6.setPosition(cc.p(CENTER_POS.x + 70, 50)),
        this._frontPerson5.setPosition(cc.p(CENTER_POS.x - 10, 40)),
        this._frontPerson4.setPosition(cc.p(CENTER_POS.x - 70, 50)),
        this._frontPerson11.setPosition(cc.p(CENTER_POS.x + 40, 5)),
        this._frontPerson33.setPosition(cc.p(CENTER_POS.x + 120, 50)),
        this._frontPerson9.setPosition(cc.p(CENTER_POS.x + 280, 60)),
        this._frontPerson8.setPosition(cc.p(CENTER_POS.x + 240, 50)),
        this._frontPerson10.setPosition(cc.p(CENTER_POS.x + 340, 50)),
        SpilAPI && this._spilLogo.setPosition(cc.p(WIN_SIZE.width - 100, 50)),
        null !== this._emitter && this._emitter.setPosition(CENTER_POS.x, WIN_SIZE.height + 50)
    },
    continueCallBack: function() {
        showButtonParticles(this._itemContinue),
        gSharedEngine.playEffect(SOUND_12),
        this.unscheduleUpdate(),
        g_gamelogic.destroy(),
        cc.Loader.purgeCachedData(g_gameResources),
        g_gameResources.length = g_gameResourcesLen;
        var t = this;
        if (PlayerData.firstPlayed) {
            PlayerData.saveFirstPlayed();
            var e = [{
                src: "res/characters0.plist"
            },
            {
                src: "res/characters0.png"
            }];
            cc.Loader.preload(e,
            function() {
                var e = cc.SpriteFrameCache.getInstance();
                e.addSpriteFrames("res/characters0.plist"),
                t.moveCarAway()
            },
            this)
        } else this.moveCarAway()
    }
}),
SceneSelectLevel = cc.Layer.extend({
    _itemStore: null,
    _buttonArrays: null,
    _storeLabelFront: null,
    _spilLogo: null,
    _movementActivated: !1,
    _movementActivated2: !1,
    _movementActivatedTime: 0,
    _enableButtonTime: 0,
    _modeType: 0,
    _currentLevel: "",
    _rielsArray: null,
    _pilarArray: null,
    _enterByGameComplete: !1,
    _enterByGameCompleteTimer: 0,
    _outOfThisWindow: !1,
    _cashImg1: null,
    _cashValue: null,
    _itemBack: null,
    _arrayObj: null,
    _levelSelected: !1,
    ctor: function() {
        this._rielsArray = new Array,
        this._pilarArray = new Array,
        this._arrayObj = new Array,
        this._buttonArrays = new Array,
        this._super();
        var t = new Array(CENTER_POS.x - 136, CENTER_POS.x - 58 - 10, CENTER_POS.x, CENTER_POS.x + 58 + 10, CENTER_POS.x + 136),
        e = new Array(CENTER_POS.y + 100 + 58 + 10, CENTER_POS.y + 100, CENTER_POS.y + 100 - 58 - 10);
        this._arrayObj.push({
            x: t[0],
            y: e[0]
        }),
        this._arrayObj.push({
            x: t[1],
            y: e[0]
        }),
        this._arrayObj.push({
            x: t[2],
            y: e[0]
        }),
        this._arrayObj.push({
            x: t[3],
            y: e[0]
        }),
        this._arrayObj.push({
            x: t[4],
            y: e[0]
        }),
        this._arrayObj.push({
            x: t[0],
            y: e[1]
        }),
        this._arrayObj.push({
            x: t[1],
            y: e[1]
        }),
        this._arrayObj.push({
            x: t[2],
            y: e[1]
        }),
        this._arrayObj.push({
            x: t[3],
            y: e[1]
        }),
        this._arrayObj.push({
            x: t[4],
            y: e[1]
        }),
        this._arrayObj.push({
            x: t[0],
            y: e[2]
        }),
        this._arrayObj.push({
            x: t[1],
            y: e[2]
        }),
        this._arrayObj.push({
            x: t[2],
            y: e[2]
        }),
        this._arrayObj.push({
            x: t[3],
            y: e[2]
        }),
        this._arrayObj.push({
            x: t[4],
            y: e[2]
        }),
        "mouse" in sys.capabilities && this.setMouseEnabled(!0),
        this.init()
    },
    init: function() {
        var t = !1;
        if (this._super()) {
            t = !0,
            this._itemStore = cc.MenuItemImage.create(null, null, this.storeCallBack, this),
            this._itemStore.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Normal.png")),
            this._itemStore.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_MainButton_Over.png")),
            this._itemStore.setPosition(cc.p(WIN_SIZE.width - 100, -100)),
            this._itemBack = cc.MenuItemImage.create(null, null, this.backCallBack, this),
            this._itemBack.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("BackButtonNormal.png")),
            this._itemBack.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("BackButtonOn.png")),
            this._itemBack.setPosition(cc.p(100, -100));
            for (var e = -67,
            i = !0,
            s = 0; s <= Math.ceil(4 * WIN_SIZE.width / 67) + 2; s++) {
                var a = new cc.Sprite;
                if (a.initWithSpriteFrameName("Recta.png"), i) {
                    var r = new cc.Sprite;
                    r.initWithSpriteFrameName("Pilar01.png"),
                    r.setPosition(cc.p(a.getContentSize().width + .5 * r.getContentSize().width + e, 85 - .5 * r.getContentSize().height + 35)),
                    this.addChild(r);
                    var n = new cc.Sprite;
                    n.initWithSpriteFrameName("Roca3.png"),
                    n.setPosition(cc.p(.5 * n.getContentSize().width + e, -30)),
                    this.addChild(n),
                    i = !1,
                    this._pilarArray.push(r)
                } else {
                    var n = new cc.Sprite;
                    n.initWithSpriteFrameName("Roca1.png"),
                    n.setPosition(cc.p(.5 * n.getContentSize().width + e, -25)),
                    this.addChild(n),
                    i = !0
                }
                a.setPosition(cc.p(a.getContentSize().width + e, 120)),
                this.addChild(a),
                this._rielsArray.push(a),
                e += 64
            }
            var o = cc.Menu.create(this._itemStore, this._itemBack);
            o.setPosition(cc.p(0, 0)),
            this.addChild(o),
            LANGUAGES[PlayerData.currentLanguageIndex].specialChars ? this._storeLabelFront = cc.LabelTTF.create(Localization.getText("{STORE}"), "Arial", "20") : (this._storeLabelFront = cc.LabelBMFont.create(Localization.getText("{STORE}"), "res/Arial.fnt"), this._storeLabelFront.setScale(TextUtils.getTextSizeScale(30))),
            this._storeLabelFront.setPosition(this._itemStore.getPosition()),
            this.addChild(this._storeLabelFront),
            this._cashImg1 = new cc.Sprite,
            this._cashImg1.initWithSpriteFrameName("TR3_GUI_ModeSelection_CashIcon.png"),
            this._cashImg1.setPosition(cc.p(30, WIN_SIZE.height + 100)),
            this.addChild(this._cashImg1),
            this._cashValue = cc.LabelBMFont.create(PlayerData.currentCash + "", "res/Arial.fnt", 200, cc.TEXT_ALIGNMENT_LEFT),
            this._cashValue.setScale(TextUtils.getTextSizeScale(30)),
            this._cashValue.setPosition(cc.p(150, WIN_SIZE.height + 100)),
            this.addChild(this._cashValue);
            for (var s = 0; s < this._arrayObj.length; s++) {
                var c = cc.MenuItemImage.create(),
                h = new cc.Sprite,
                _ = "";
                _ = 10 > s + 1 ? "0" + (s + 1) : s + 1 + "",
                0 !== PlayerData.levelUnlocked[s] || UNLOCK_ALL_LEVELS ? (c.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Over.png")), c.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Bought_Normal.png")), c.setCallback(this.selectItem, {
                    parent: this,
                    object: c
                }), h.initWithSpriteFrameName("level" + _ + ".png")) : (c.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_NotBought_Normal.png")), c.setSelectedSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("TR3_GUI_Store_Button_Over.png")), h.initWithSpriteFrameName("level" + _ + "_byw.png")),
                c.setPosition(cc.p(this._arrayObj[s].x, WIN_SIZE.height + 100)),
                c.setTag(s),
                h.setPosition(cc.p(.5 * h.getContentSize().width, .5 * h.getContentSize().height)),
                c.addChild(h);
                var l = cc.LabelBMFont.create(s + 1 + "", "res/Arial.fnt", 200, cc.TEXT_ALIGNMENT_CENTER);
                l.setScale(TextUtils.getTextSizeScale(30)),
                l.setPosition(cc.p(17, 45)),
                c.addChild(l);
                var p = new cc.Sprite;
                p.initWithSpriteFrameName("coins_level.png"),
                p.setPosition(cc.p(.5 * c.getContentSize().width, 9)),
                c.addChild(p);
                var d = new cc.Sprite;
                d.initWithSpriteFrameName("coins_level_earn.png"),
                d.setPosition(cc.p(.5 * c.getContentSize().width - 17, 9)),
                c.addChild(d);
                var u = new cc.Sprite;
                u.initWithSpriteFrameName("coins_level_earn.png"),
                u.setPosition(cc.p(.5 * c.getContentSize().width, 7)),
                c.addChild(u);
                var g = new cc.Sprite;
                g.initWithSpriteFrameName("coins_level_earn.png"),
                g.setPosition(cc.p(.5 * c.getContentSize().width + 17, 9)),
                c.addChild(g),
                d.setVisible(!1),
                u.setVisible(!1),
                g.setVisible(!1);
                for (var m = PlayerData.getCoinsLevelCount(s), S = 0; m > S; S++) m > 0 && d.setVisible(!0),
                m > 1 && u.setVisible(!0),
                m > 2 && g.setVisible(!0);
                this._buttonArrays.push(c)
            }
            var o = cc.Menu.create();
            o.initWithArray(this._buttonArrays),
            o.setPosition(cc.p(0, 0)),
            this.addChild(o);
            var y = this;
            if (SpilAPI) {
                var f = SpilAPI.Branding.getLogo();
                if (f.image) {
                    var P = new Image;
                    P.crossOrigin = "Anonymous",
                    P.src = f.image,
                    P.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(P),
                        t.handleLoadedTexture();
                        var e = cc.Sprite.createWithTexture(t);
                        y._spilLogo = cc.MenuItemImage.create(null, null, f.action, y),
                        y._spilLogo.setNormalImage(e),
                        y._spilLogo.setPosition(cc.p(CENTER_POS.x, -100));
                        var i = cc.Menu.create(y._spilLogo);
                        i.setPosition(cc.p(0, 0)),
                        y.addChild(i)
                    }
                }
            }
            CURRENT_LAYERS.push(this),
            this.setAllVisible(!1)
        }
        return this.scheduleUpdate(),
        t
    },
    setAllVisible: function(t) {
        this._itemStore.setVisible(t),
        this._storeLabelFront.setVisible(t),
        this._itemBack.setVisible(t),
        this._cashImg1.setVisible(t),
        this._cashValue.setVisible(t);
        for (var e = 0; e < this._arrayObj.length; e++) this._buttonArrays[e].setVisible(t);
        this._spilLogo && this._spilLogo.setVisible(t),
        this._cashValue.setString(PlayerData.currentCash + "")
    },
    activateButtonMovement: function(t) {
        if (1 === t) {
            gSharedEngine.playEffect(SOUND_18),
            this.setAllVisible(!0);
            for (var e = .7,
            i = 0; i < this._buttonArrays.length; i++) this._buttonArrays[i].runAction(cc.EaseBackOut.create(cc.MoveTo.create(e, cc.p(this._arrayObj[i].x, this._arrayObj[i].y)))),
            e += .03;
            this._itemStore.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.1, cc.p(WIN_SIZE.width - 100, 85)))),
            this._storeLabelFront.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.1, cc.p(WIN_SIZE.width - 100, 85)))),
            this._itemBack.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1.4, cc.p(100, 85)))),
            this._cashImg1.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(30, 415)))),
            this._cashValue.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(150, 415)))),
            this._spilLogo && this._spilLogo.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(CENTER_POS.x, 85))))
        } else {
            for (var e = .7,
            i = 0; i < this._buttonArrays.length; i++) this._buttonArrays[i].runAction(cc.EaseBackInOut.create(cc.MoveTo.create(e, cc.p(this._arrayObj[i].x, WIN_SIZE.height + 100)))),
            e += .03;
            this._itemStore.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.1, cc.p(WIN_SIZE.width - 100, -100)))),
            this._storeLabelFront.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.1, cc.p(WIN_SIZE.width - 100, -100)))),
            this._itemBack.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1.4, cc.p(100, -100)))),
            this._cashImg1.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(30, WIN_SIZE.height + 100)))),
            this._cashValue.runAction(cc.EaseBackInOut.create(cc.MoveTo.create(1, cc.p(150, WIN_SIZE.height + 100)))),
            this._spilLogo && this._spilLogo.runAction(cc.EaseBackOut.create(cc.MoveTo.create(1, cc.p(CENTER_POS.x, -100))))
        }
    },
    onMouseMoved: function(t, e) {
        function i(t) {
            if (t.isVisible() && t.isEnabled()) {
                var i = t.convertToNodeSpace(e),
                s = t.rect();
                if (s.x = 0, s.y = 0, cc.rectContainsPoint(s, i)) return t.isSelected() || gSharedEngine.playEffect(SOUND_19),
                void t.selected()
            }
            t.unselected()
        }
        var e = t.getLocation();
        i(this._itemStore, e),
        i(this._itemBack, e);
        for (var s = 0; s < this._arrayObj.length; s++) i(this._buttonArrays[s])
    },
    update: function(t) {
        if (this._enterByGameComplete && (this._enterByGameCompleteTimer += t, this._enterByGameCompleteTimer >= .6 && (this.activateButtonMovement(1), this._enterByGameComplete = !1, this._enterByGameCompleteTimer = 0)), this._movementActivated) {
            if (this._outOfThisWindow && (this._outOfThisWindow = !1, this.activateButtonMovement(2)), this._movementActivatedTime += t, this._movementActivatedTime >= .5) {
                var e = this.getParent().getChildren()[0],
                i = this.getParent().getChildren()[1],
                s = this.getParent().getChildren()[2],
                a = this.getParent().getChildren()[3];
                s._car.animated && !s._car._alwaysAnimate && s._car.play(),
                e._bgSprite.runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -(e._size - WIN_SIZE.width), 0)), cc.MoveBy.create(.7, cc.p(.6 * -(e._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
                    a.activateButtonMovement(1)
                }), cc.CallFunc.create(function() {
                    s._carSparks.setVisible(!0)
                }), cc.MoveBy.create(1, cc.p(.25 * -(e._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
                    s._carSparks.setVisible(!1),
                    i.setAllVisible(!1)
                }), cc.CallFunc.create(function() {
                    s._car.animated && !s._car._alwaysAnimate && s._car.stop()
                }))),
                this.getParent().getChildren()[1].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * -WIN_SIZE.width, 0)), cc.MoveBy.create(1, cc.p(.25 * -WIN_SIZE.width, 0)))),
                this.getParent().getChildren()[3].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * -WIN_SIZE.width, 0)), cc.MoveBy.create(1, cc.p(.25 * -WIN_SIZE.width, 0)))),
                this._movementActivated = !1,
                this._movementActivatedTime = 0
            }
        } else if (this._movementActivated2) {
            if (this._outOfThisWindow && (this._outOfThisWindow = !1, this.activateButtonMovement(2)), this._movementActivatedTime += t, this._movementActivatedTime >= .5) {
                this.getParent().getChildren()[3].removeFromParent(!0);
                for (var r = 0; 5 > r; r++) this._rielsArray[this._rielsArray.length - 1 - r].removeFromParent(!0);
                for (var r = 0; 3 > r; r++) this._pilarArray[this._pilarArray.length - 1 - r].removeFromParent(!0);
                var n = new SceneStartAnimation(this._modeType, this._currentLevel);
                this.getParent().addChild(n),
                n.setPosition(cc.p(WIN_SIZE.width, 0));
                var e = this.getParent().getChildren()[0],
                s = this.getParent().getChildren()[2];
                s._car.animated && !s._car._alwaysAnimate && s._car.play(),
                e._bgSprite.runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -(e._size - WIN_SIZE.width), 0)), cc.MoveBy.create(.7, cc.p(.6 * -(e._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
                    s._carSparks.setVisible(!0)
                }), cc.MoveBy.create(.4, cc.p(.25 * -(e._size - WIN_SIZE.width), 0)), cc.CallFunc.create(function() {
                    s._carSparks.setVisible(!1)
                }), cc.CallFunc.create(function() {
                    s._node.runAction(cc.Sequence.create(cc.MoveTo.create(.5, cc.p(WIN_SIZE.width - 220 - 30, s._node.getPositionY())), cc.RotateTo.create(0, -30), cc.CallFunc.create(function() {
                        gSharedEngine.playEffect(SOUND_1)
                    }), cc.MoveBy.create(0, cc.p(0, 10)), cc.MoveBy.create(1.8, cc.p(500, 280))))
                }))),
                this.getParent().getChildren()[1].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.4, cc.p(.25 * -WIN_SIZE.width, 0)))),
                this.getParent().getChildren()[3].runAction(cc.Sequence.create(cc.MoveBy.create(.2, cc.p(.15 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.7, cc.p(.6 * -WIN_SIZE.width, 0)), cc.MoveBy.create(.4, cc.p(.25 * -WIN_SIZE.width, 0)))),
                this._movementActivated2 = !1,
                this._movementActivatedTime = 0
            }
        } else this._itemStore.isEnabled() || this._itemBack.isEnabled() || (this._enableButtonTime += t, this._enableButtonTime > 2 && (this._itemStore.setEnabled(!0), this._itemBack.setEnabled(!0)))
    },
    updatePositions: function() {
        this._itemStore.setPosition(cc.p(WIN_SIZE.width - 100, 85)),
        this._itemBack.setPosition(cc.p(100, 85)),
        this._storeLabelFront.setPosition(this._itemStore.getPosition());
        var t = new Array(CENTER_POS.x - 136, CENTER_POS.x - 58 - 10, CENTER_POS.x, CENTER_POS.x + 58 + 10, CENTER_POS.x + 136);
        this._arrayObj[0].x = t[0],
        this._arrayObj[1].x = t[1],
        this._arrayObj[2].x = t[2],
        this._arrayObj[3].x = t[3],
        this._arrayObj[4].x = t[4],
        this._arrayObj[5].x = t[0],
        this._arrayObj[6].x = t[1],
        this._arrayObj[7].x = t[2],
        this._arrayObj[8].x = t[3],
        this._arrayObj[9].x = t[4],
        this._arrayObj[10].x = t[0],
        this._arrayObj[11].x = t[1],
        this._arrayObj[12].x = t[2],
        this._arrayObj[13].x = t[3],
        this._arrayObj[14].x = t[4];
        for (var e = 0; e < this._arrayObj.length; e++) this._buttonArrays[e].setPosition(cc.p(this._arrayObj[e].x, this._arrayObj[e].y));
        SpilAPI && this._spilLogo.setPosition(cc.p(CENTER_POS.x, 85))
    },
    selectItem: function() {
        if (this.parent._levelSelected !== !0) {
            this.parent._levelSelected = !0;
            var t = this.object.getTag();
            gSharedEngine.playEffect(SOUND_4),
            this.parent._itemStore.setEnabled(!1),
            this.parent._itemBack.setEnabled(!1),
            CURRENT_LAYERS.length = 0,
            showButtonParticles(this.parent._buttonArrays[t]);
            var e = this.parent,
            i = DAY_STAGE; (2 === t || 5 === t || 8 === t || 11 === t || 14 === t) && (i = NIGHT_STAGE),
            SpilAPI ? SpilAPI.GameBreak.request(function() {
                gSharedEngine.pauseMusic(),
                gSharedEngine.pauseAllEffects()
            },
            function() {
                gSharedEngine.resumeMusic(),
                gSharedEngine.resumeAllEffects(),
                gSharedEngine.playEffect(SOUND_5),
                e._modeType = i,
                e._movementActivated2 = !0,
                e._currentLevel = t,
                e._outOfThisWindow = !0
            }) : (this.parent._currentLevel = t, this.parent._modeType = i, this.parent._movementActivated2 = !0, this.parent._outOfThisWindow = !0)
        }
    },
    storeCallBack: function() {
        gSharedEngine.playEffect(SOUND_12),
        showButtonParticles(this._itemStore),
        this._movementActivated = !0,
        this._enableButtonTime = 0,
        this._itemStore.setEnabled(!1),
        this._itemBack.setEnabled(!1),
        this._outOfThisWindow = !0
    },
    backCallBack: function() {
        gSharedEngine.playEffect(SOUND_12),
        showButtonParticles(this._itemBack);
        var t = cc.Scene.create(),
        e = new SceneMainMenu;
        t.addChild(e),
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.3, t)),
        this._outOfThisWindow = !0
    }
}),
TIME_TO_ENABLE_RAIL = 2,
MapManager = cc.Class.extend({
    _world: null,
    _bodyList: null,
    _lastPoint: null,
    _pickUpList: null,
    _triggerList: null,
    _obstacleList: null,
    _npcArray: null,
    _initMapValueX: 0,
    _initMapValueY: 0,
    _npcList: null,
    _initPlayerPosX: 0,
    _initPlayerPosY: 0,
    _railNames: null,
    _disabledRails: null,
    _railVisuals: null,
    _movingRailVisuals: null,
    _physicRailStarts: null,
    _physicRailEnds: null,
    _checkPointStarts: null,
    _checkPointEnds: null,
    _rotatingRails: null,
    _rotatingRailsFinalAng: null,
    _rotatedRailsToReset: null,
    _explosionList: null,
    _movingRailList: null,
    _lastRailPosX: 0,
    _lastRailPosY: 0,
    _activedTriggersGroup: 1,
    _visualElements: null,
    _finalRail: null,
    _finalFixture: null,
    _currentCheckPoint: 0,
    _explosionArrayIndex: 0,
    _explosionSpriteArray: null,
    _onlyUpdateOnce: !1,
    _railFixtures: null,
    _ferrisWheel: null,
    _pendulum: null,
    _turbopads: null,
    _paths: null,
    ctor: function() {
        this._bodyList = new Array,
        this._pickUpList = new Array,
        this._triggerList = new Array,
        this._obstacleList = new Array,
        this._npcArray = new Array,
        this._npcList = new Array,
        this._railNames = new Array,
        this._disabledRails = new Array,
        this._railVisuals = new Array,
        this._movingRailVisuals = new Array,
        this._physicRailStarts = new Array,
        this._physicRailEnds = new Array,
        this._checkPointStarts = new Array,
        this._checkPointEnds = new Array,
        this._rotatingRails = new Array,
        this._rotatingRailsFinalAng = new Array,
        this._rotatedRailsToReset = new Array,
        this._explosionList = new Array,
        this._movingRailList = new Array,
        this._visualElements = new Array,
        this._railFixtures = new Array,
        this._explosionSpriteArray = new Array,
        this._ferrisWheel = new Array,
        this._turbopads = new Array,
        this._pendulum = new Array,
        this._paths = new Array,
        this.loadMapSystem();
        for (var t = 0; 15 > t; t++) {
            var e = new SpriteAnimation;
            e.initWithAtlas("TR_IN_Explosion.png", 1, .04, cc.p(0, 0), cc.p(137, 141), "explosion"),
            IS_HANDHELD || e.setScale(2),
            this._explosionSpriteArray.push(e)
        }
    },
    loadMapSystem: function() {
        this._currentCheckPoint = 0;
        var t = this,
        e = "level" + (g_gamelogic._currentLevel + 1),
        i = $.ajax({
            type: "GET",
            url: "res/levels/" + e + ".json",
            dataType: "json",
            async: !0,
            cache: !0
        });
        $.when(i).done(function(e) {
            var i = function(t) {
                for (var e in t) return e;
                return ""
            };
            t.loadMap(e, i(e)),
            g_gamelogic.initPlayer(t._initPlayerPosX, t._initPlayerPosY, t)
        })
    },
    loadMap: function(t, e) {
        if ("level1" === e && this.loadTutorial(), null !== t && "undefined" != typeof t) {
            var i = this.getTilePositions(t[e].RailVisuals);
            this._initMapValueX -= i.start.x,
            this._initMapValueY -= i.start.y,
            this.createPhysicsNames(t[e].platform_names, e),
            this.createDrawRegionElements(t[e].DrawRegion, e),
            this.createVisualElements(t[e].Background_01, !1, e, !1),
            this.createVisualElements(t[e].Background_02, !1, e, !1),
            this.createVisualElements(t[e].Background_03, !1, e, !1),
            this.createTurbopads(t[e].Turbopads),
            this.createPaths(t[e].Paths),
            this.createFerrisWheels(t[e].FerrisWheels),
            this.createPendulums(t[e].Pendulums),
            this.createVisualElements(t[e].Pilar_00, !1, e, !1),
            this.createVisualElements(t[e].Pilar_01, !1, e, !1),
            this.createVisualElements(t[e].Pilar_02, !1, e, !1),
            this.createVisualElements(t[e].RailVisuals, !0, e, !1),
            this.createPickUpsElements(t[e]),
            this.createNPCsElements(t[e], e),
            this.createTriggerElements(t[e].Triggers, e),
            this.createVisualElements(t[e].Foreground_00, !1, e, !1),
            this.createVisualElements(t[e].Foreground_01, !1, e, !0),
            this.createVisualElements(t[e].Foreground_02, !1, e, !0),
            this.createObstacleElements(t[e].Obstacles, e),
            this.createPhysicsElements(t[e]),
            this.createMovingRailVisuals(t[e], e),
            this._initMapValueX += i.end.x,
            this._initMapValueY += i.end.y
        } else cc.log("ERROR: scenes no loaded");
        this._checkPointStarts.sort(function(t, e) {
            return t - e
        }),
        this._checkPointEnds.sort(function(t, e) {
            return t - e
        })
    },
    loadTutorial: function() {
        var t = new cc.Sprite;
        if (t.initWithSpriteFrameName("TR3_GUI_WoodenSign.png"), t.setPosition(cc.p(1400, 130)), g_gamelogic._sceneMainGame._backgroundLayer.addChild(t), IS_HANDHELD) {
            var e = new cc.Sprite;
            e.initWithSpriteFrameName("TR3_controls1.png"),
            e.setPosition(cc.p(.5 * t.getContentSize().width, .5 * t.getContentSize().height + 40)),
            t.addChild(e)
        } else {
            var e = new cc.Sprite;
            e.initWithSpriteFrameName("TR_IN_Arrow_Jump.png"),
            e.setPosition(cc.p(.5 * t.getContentSize().width, .5 * t.getContentSize().height + 40)),
            e.setScale(2),
            t.addChild(e)
        }
        var i = new cc.Sprite;
        if (i.initWithSpriteFrameName("TR3_GUI_WoodenSign.png"), i.setPosition(cc.p(11300, 240)), g_gamelogic._sceneMainGame._backgroundLayer.addChild(i), IS_HANDHELD) {
            var s = new cc.Sprite;
            s.initWithSpriteFrameName("TR3_controls2.png"),
            s.setPosition(cc.p(.5 * i.getContentSize().width, .5 * i.getContentSize().height + 40)),
            i.addChild(s)
        } else {
            var s = new cc.Sprite;
            s.initWithSpriteFrameName("TR_IN_Arrow_Jump.png"),
            s.setRotation(180),
            s.setPosition(cc.p(.5 * i.getContentSize().width, .5 * i.getContentSize().height + 40)),
            s.setScale(2),
            i.addChild(s)
        }
    },
    getTilePositions: function(t) {
        if (null !== t && "undefined" != typeof t) {
            var e = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            for (var i in t) {
                var s = t[i];
                s.istilestart && (e.start.y = s.y, e.start.x = s.x),
                s.istileend && (e.end.y = s.y, e.end.x = s.x)
            }
            return e
        }
    },
    explosion: function(t, e, i) {
        if (this.addExplosion(e, i), "undefined" != typeof t && "" !== t) {
            for (var s = t.split("."), a = s[0], r = s[1].split(","), n = 0; n < this._railNames.length; n++) for (var o in r) a + "." + r[o] === this._railNames[n] && g_PhysicsManager._deactivateBodies.push(this._bodyList[n]);
            this.explodeTargets(r, a)
        }
    },
    explodeTargets: function(t, e) {
        for (var i in this._railVisuals) for (var s in t) if (e + "." + t[s] === this._railVisuals[i]._name) {
            var a = 1e3 * (Math.random() + .1),
            r = 1e3 * (Math.random() + .1);
            this._railVisuals[i].runAction(cc.RepeatForever.create(cc.RotateBy.create(.2, 75))),
            this._railVisuals[i].runAction(cc.Sequence.create(cc.MoveBy.create(.9, cc.p(a, r)), cc.FadeOut.create(.1, 0)))
        }
    },
    activatePath: function(t, e) {
        for (var i = 0; i < this._paths.length; i++) if (e === t + "." + this._paths[i]._name) {
            this._paths[i].activate();
            break
        }
    },
    activateTriggers: function(t, e) {
        for (var i = e.split(","), s = 0; s < i.length; s++) for (var a = t + "." + i[s], r = 0; r < this._triggerList.length; r++) if (a === this._triggerList[r]._name) {
            this._triggerList[r]._isdisabled = !1;
            break
        }
    },
    moveObject: function(t, e, i) {
        for (var s = 0; s < this._triggerList.length; s++) if (this._triggerList[s]._name === t) return void this._triggerList[s].runAction(cc.MoveBy.create(i, cc.p(0, e)));
        for (var s = 0; s < this._obstacleList.length; s++) if (this._obstacleList[s]._name === t) return this.addExplosion(this._obstacleList[s].getPositionX(), this._obstacleList[s].getPositionY()),
        void this._obstacleList[s].runAction(cc.MoveBy.create(i, cc.p(0, e)))
    },
    createNPC: function(t, e) {
        if ("" !== t) for (var i = 0; i < this._npcList.length; i++) if (this._npcList[i].name === t) {
            var s = new Car(this._npcList[i].x, this._npcList[i].y);
            return s.setAsNPC(parseInt(e)),
            g_gamelogic._sceneMainGame._backgroundLayer.addChild(s._node),
            void this._npcArray.push(s)
        }
    },
    createTriggerElements: function(t, e) {
        if (null !== t && "undefined" != typeof t) for (var i in t) {
            var s = null,
            a = t[i],
            r = "";
            if ("undefined" != typeof a.target && "" !== a.target && (r = "ACTIVATETRIGGERS" !== a.action && "CHECKPOINT" !== a.action ? e + "." + a.target: a.target), "CHECKPOINT" === a.action) {
                var n = -1;
                "" !== r && (n = parseInt(r)),
                0 === n ? (this._initPlayerPosX = this._initMapValueX + a.x, this._initPlayerPosY = this._initMapValueY + a.y, this._checkPointStarts.push(this._initMapValueX + a.x)) : (this._checkPointStarts.push(this._initMapValueX + a.x), this._checkPointEnds.push(this._checkPointStarts[this._checkPointStarts.length - 1]), s = new SpriteAnimation, s.initWithAtlas("TR_IN_GreenFlag.png", 1, .05, cc.p(35, 70), cc.p(73, 143), "flag" + n, cc.p(1, 16)), s.setPosition(cc.p(parseInt(this._initMapValueX + a.x), parseInt(this._initMapValueY + a.y - .5 * a.height - 5))), g_gamelogic._sceneMainGame._backgroundLayer.addChild(s))
            }
            if ("END" === a.action) {
                this._checkPointEnds.push(this._initMapValueX + a.x);
                for (var o = this._lastRailPosX,
                c = !0,
                h = 0; h <= Math.ceil(WIN_SIZE.width / 67); h++) {
                    var _ = new VisualElement("Roca7.png", "");
                    if (_.setPosition(cc.p(parseInt(.5 * _.getContentSize().width + o), parseInt( - 200 + this._lastRailPosY))), this._visualElements.push(_), c) {
                        var l = new VisualElement("Pilar01.png", "");
                        l.setPosition(cc.p(parseInt(.5 * l.getContentSize().width + o), parseInt(.5 * -l.getContentSize().height + this._lastRailPosY))),
                        this._visualElements.push(l);
                        var p = new VisualElement("Roca3.png", "");
                        p.setPosition(cc.p(parseInt(.5 * p.getContentSize().width + o), parseInt( - 150 + this._lastRailPosY))),
                        this._visualElements.push(p),
                        c = !1
                    } else {
                        var d = new VisualElement("Roca1.png", "");
                        d.setPosition(cc.p(parseInt(.5 * d.getContentSize().width + o), parseInt( - 145 + this._lastRailPosY))),
                        this._visualElements.push(d),
                        c = !0
                    }
                    var u = new VisualElement("Recta.png", "");
                    u.setPosition(cc.p(parseInt(.5 * u.getContentSize().width + o), parseInt(this._lastRailPosY))),
                    this._visualElements.push(u),
                    o += 64
                }
                var g = new b2BodyDef;
                g.type = b2Body.b2_staticBody,
                g.userData = new DataObject(TYPE_GROUND, null),
                this._finalRail = g_gamelogic._physicManager._physicWorld.CreateBody(g),
                this._finalRail.SetTransform(new b2Vec2(0, 0), this._finalRail.GetAngle());
                var m = new b2Vec2;
                m.Set(this._lastRailPosX / BOX2D_GAME_SCALE, -this._lastRailPosY / BOX2D_GAME_SCALE);
                var S = new b2Vec2;
                S.Set((this._lastRailPosX + WIN_SIZE.width) / BOX2D_GAME_SCALE, -this._lastRailPosY / BOX2D_GAME_SCALE);
                var y = new b2EdgeShape;
                y.Set(m, S);
                var f = new b2FixtureDef;
                f.shape = y,
                f.density = 1,
                f.friction = 3,
                f.restitution = 0,
                this._finalFixture = this._finalRail.CreateFixture(f)
            }
            var P = 0;
            "undefined" != typeof a.distance && (P = a.distance);
            var C = "";
            "undefined" != typeof a.img && "" !== a.img && (C = a.img + ".png");
            var E = 0;
            "undefined" != typeof a.rotation && (E = a.rotation);
            var b = !1;
            "undefined" != typeof a.canmove && (b = a.canmove);
            var A = 0;
            "undefined" != typeof a.group && (A = a.group);
            var T = !1;
            "undefined" != typeof a.startdisabled && (T = a.startdisabled);
            var R = new Trigger(a.action, C, this._initMapValueX + a.x, this._initMapValueY + a.y, a.width, a.height, r, P, E, b, A, T);
            R._name = e + "." + i,
            null !== s && (R._dataObject = s),
            "undefined" != typeof a.helperx && R.setHelper(a.helperx, a.helpery),
            R._tileName = e,
            this._triggerList.push(R)
        }
    },
    createTurbopads: function(t) {
        if (null !== t && "undefined" != typeof t) for (var e in t) {
            var i = t[e],
            s = 0;
            "undefined" != typeof i.time && (s = i.time);
            var a = 1;
            "undefined" != typeof i.forceMul && (a = i.forceMul),
            this._turbopads.push(new Turbopad(this._initMapValueX + i.x, this._initMapValueY + i.y, s, a))
        }
    },
    createPendulums: function(t) {
        if (null !== t && "undefined" != typeof t) for (var e in t) {
            var i = t[e],
            s = 3;
            "undefined" != typeof i.time && (s = i.time);
            var a = 100;
            "undefined" != typeof i.heightReached && (a = i.heightReached),
            this._pendulum.push(new Pendulum(this._initMapValueX + i.x, this._initMapValueY + i.y, s, a))
        }
    },
    createPaths: function(t) {
        if (null !== t && "undefined" != typeof t) for (var e in t) {
            var i = t[e],
            s = 0;
            "undefined" != typeof i.objectType && (s = i.objectType);
            var a = new Array;
            if ("undefined" != typeof i.points) {
                var r = i.points.split("*");
                if (r.length > 1) for (var n = 0; n < r.length; n++) {
                    var o = r[n].split(",");
                    o.length > 1 && a.push({
                        x: o[0],
                        y: o[1]
                    })
                }
            }
            var c = new PathObject(this._initMapValueX + i.x, this._initMapValueY + i.y, s, a);
            c._name = e,
            this._paths.push(c)
        }
    },
    createFerrisWheels: function(t) {
        if (null !== t && "undefined" != typeof t) for (var e in t) {
            var i = t[e],
            s = 50;
            "undefined" != typeof i.speed && (s = i.speed);
            var a = -1;
            "undefined" != typeof i.direction && (a = i.direction),
            this._ferrisWheel.push(new FerrisWheel(this._initMapValueX + i.x, this._initMapValueY + i.y, s, a))
        }
    },
    createObstacleElements: function(t, e) {
        if (null !== t && "undefined" != typeof t) for (var i in t) {
            var s = t[i],
            a = !1;
            "undefined" != typeof s.canmove && (a = s.canmove);
            var r = 0;
            "undefined" != typeof s.rotation && (r = s.rotation);
            var n = !1;
            "undefined" != typeof s.killplayer && (n = s.killplayer);
            var o = new Obstacle(s.img + ".png", this._initMapValueX + s.x, this._initMapValueY + s.y, a, r, n);
            o._name = e + "." + i,
            this._obstacleList.push(o)
        }
    },
    createNPCsElements: function(t, e) {
        if (null !== t.NPCs && "undefined" != typeof t.NPCs) for (var i in t.NPCs) {
            var s = t.NPCs[i],
            a = {
                name: e + "." + i,
                x: this._initMapValueX + s.x,
                y: this._initMapValueY + s.y
            };
            this._npcList.push(a)
        }
    },
    createPickUpsElements: function(t) {
        if (null !== t.Pickups && "undefined" != typeof t.Pickups) for (var e in t.Pickups) {
            var i = t.Pickups[e],
            s = 0;
            "undefined" != typeof i.index && (s = i.index);
            var a = 0;
            "undefined" != typeof i.type && (a = i.type);
            var r = new PickUp(this._initMapValueX + i.x, this._initMapValueY + i.y, a, s);
            this._pickUpList.push(r)
        }
    },
    reloadMap: function() {
        for (var t = 0; t < this._pickUpList.length; t++) this._pickUpList[t].reload();
        for (var t = 0; t < this._triggerList.length; t++) this._triggerList[t].reload();
        for (var t = 0; t < this._obstacleList.length; t++) this._obstacleList[t].reload();
        for (var t = 0; t < this._turbopads.length; t++) this._turbopads[t].reload();
        for (var t = 0; t < this._pendulum.length; t++) this._pendulum[t].reload();
        for (var t = 0; t < this._paths.length; t++) this._paths[t].reload();
        for (var t = 0; t < this._ferrisWheel.length; t++) this._ferrisWheel[t].reload();
        for (var t = 0; t < this._npcArray.length; t++) this._npcArray[t].destroy();
        for (var t = 0; t < this._railVisuals.length; t++) this._railVisuals[t].stopAllActions(),
        this._railVisuals[t].setOpacity(255),
        this._railVisuals[t].setPosition(parseInt(this._railVisuals[t]._startX), parseInt(this._railVisuals[t]._startY)),
        this._railVisuals[t].setRotation(this._railVisuals[t]._startRotation);
        this._npcArray.length = 0;
        for (var t = 0; t < this._rotatingRails.length; t++) {
            var e = this._rotatingRails[t];
            this._bodyList[e].SetAngularVelocity(0),
            this._bodyList[e].SetTransform(this._bodyList[e].GetPosition(), 0),
            this._bodyList[e].SetAwake(!1)
        }
        this._rotatingRails.length = 0,
        this._rotatingRailsFinalAng.length = 0;
        for (var t = 0; t < this._rotatedRailsToReset.length; t++) {
            var e = this._rotatedRailsToReset[t];
            this._bodyList[e].SetTransform(this._bodyList[e].GetPosition(), 0)
        }
        this._rotatedRailsToReset.length = 0;
        for (var t = 0; t < this._movingRailList.length; t++) {
            var i = this._movingRailList[t].GetPosition().x,
            s = this._movingRailList[t].startY;
            this._movingRailList[t].SetPosition(new b2Vec2(parseInt(i), parseInt(s)))
        }
        this._movingRailList.length = 0;
        for (var t = 0; t < this._bodyList.length; t++) this._bodyList[t].SetActive(!0)
    },
    destroyMap: function() {
        for (var t = 0; t < this._pickUpList.length; t++) this._pickUpList[t].destroy(),
        this._pickUpList[t].removeFromParent(!0);
        this._pickUpList.length = 0;
        for (var t = 0; t < this._turbopads.length; t++) this._turbopads[t].destroy();
        this._turbopads.length = 0;
        for (var t = 0; t < this._paths.length; t++) this._paths[t].destroy();
        this._paths.length = 0;
        for (var t = 0; t < this._pendulum.length; t++) this._pendulum[t].destroy();
        this._pendulum.length = 0;
        for (var t = 0; t < this._ferrisWheel.length; t++) this._ferrisWheel[t].destroy();
        this._ferrisWheel.length = 0,
        this._finalRail && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._finalRail,
            fixture: this._finalFixture
        });
        for (var t = 0; t < this._bodyList.length; t++) g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._bodyList[t],
            fixture: this._railFixtures[t]
        });
        this._bodyList.length = 0;
        for (var t = 0; t < this._triggerList.length; t++) this._triggerList[t].destroy();
        this._triggerList.length = 0;
        for (var t = 0; t < this._obstacleList.length; t++) this._obstacleList[t].destroy();
        this._obstacleList.length = 0;
        for (var t = 0; t < this._npcArray.length; t++) this._npcArray[t].destroy();
        for (var t = 0; t < this._npcArray.length; t++) this._npcArray[t].destroy();
        this._npcArray.length = 0,
        this._disabledRails.length = 0,
        this._rotatingRails.length = 0,
        this._rotatingRailsFinalAng.length = 0,
        this._rotatedRailsToReset.length = 0,
        this._railNames.length = 0,
        this._explosionList.length = 0,
        this._movingRailVisuals.length = 0,
        this._physicRailStarts.length = 0,
        this._physicRailEnds.length = 0,
        this._checkPointStarts.length = 0,
        this._checkPointEnds.length = 0;
        for (var e in this._movingRailList) {
            var i = this._movingRailList[e].GetPosition().x,
            s = this._movingRailList[e].startY;
            this._movingRailList[e].SetPosition(new b2Vec2(parseInt(i), parseInt(s)))
        }
        this._movingRailList.length = 0,
        this._railVisuals.length = 0,
        this._visualElements.length = 0
    },
    createPhysicsNames: function(t, e) {
        if (null !== t && "undefined" != typeof t) for (var i in t) {
            var s = t[i];
            this._railNames.push(e + "." + s)
        }
    },
    createMovingRailVisuals: function(t, e) {
        if (null !== t.move_platform_names && "undefined" != typeof t.move_platform_names) for (var i = 0; i < t.move_platform_names.length; i++) {
            for (var s = new Array,
            a = t.move_platform_names[i], r = 0; r < a.length; r++) for (var n = e + "." + a[r], o = 0; o < this._railVisuals.length; o++) {
                var c = this._railVisuals[o];
                if (c._name === n) {
                    s.push(c);
                    break
                }
            }
            this._movingRailVisuals.push(s)
        }
    },
    createDrawRegionElements: function(t, e) {
        if (null !== t && "undefined" != typeof t) for (var i in t) {
            var s = t[i],
            a = new VisualElement("res/levels/" + e + s.img + ".png", "region", !1);
            a.setPosition(parseInt(this._initMapValueX + s.x), parseInt(this._initMapValueY + s.y)),
            a._startX = this._initMapValueX + s.x,
            a._startY = this._initMapValueY + s.y,
            this._visualElements.push(a)
        }
    },
    createVisualElements: function(t, e, i, s) {
        if (null !== t && "undefined" != typeof t) for (var a in t) {
            var r = t[a],
            n = new VisualElement(r.img + ".png", "", s);
            n.setPosition(parseInt(this._initMapValueX + r.x), parseInt(this._initMapValueY + r.y)),
            n._startX = parseInt(this._initMapValueX + r.x),
            n._startY = parseInt(this._initMapValueY + r.y),
            "undefined" != typeof r.rotation && n.setRotation( - r.rotation),
            "undefined" != typeof e && e ? (n._name = i + "." + a, this._railVisuals.push(n), n._startRotation = "undefined" != typeof r.rotation ? -r.rotation: 0, "undefined" != typeof r.makeinvisible && r.makeinvisible && n.makeInvisible(), "undefined" != typeof r.istileend && r.istileend && (this._lastRailPosX = this._initMapValueX + r.x, this._lastRailPosY = this._initMapValueY + r.y)) : this._visualElements.push(n)
        }
    },
    createPhysicsElements: function(t) {
        if (null !== t.platform_points && "undefined" != typeof t.platform_points) {
            this._world = g_gamelogic._physicManager._physicWorld;
            for (var e = 0; e < t.platform_points.length; e++) {
                var i = 0 !== t.move_platform_names[e].length;
                this.createPhysicGround(t.platform_points[e], i)
            }
        }
    },
    createPhysicGround: function(t, e) {
        var i = new b2BodyDef;
        i.type = e ? b2Body.b2_kinematicBody: b2Body.b2_staticBody,
        i.userData = new DataObject(TYPE_GROUND, null);
        var s = this._world.CreateBody(i);
        s.SetAwake(!1),
        s.SetSleepingAllowed(!0);
        var a = t[t.length - 1],
        r = {
            x: this._initMapValueX + a.x,
            y: this._initMapValueY + a.y
        };
        s.SetTransform(new b2Vec2(r.x / BOX2D_GAME_SCALE, -r.y / BOX2D_GAME_SCALE), s.GetAngle());
        for (var n = new b2Vec2,
        o = new Array,
        c = null,
        h = 0; h < t.length; h++) {
            var _ = t[h];
            o.push(_);
            var l = new b2Vec2;
            l.Set((this._initMapValueX + _.x - r.x) / BOX2D_GAME_SCALE, ( - (this._initMapValueY + _.y) + r.y) / BOX2D_GAME_SCALE),
            n.Set((this._initMapValueX + _.x) / BOX2D_GAME_SCALE, -(this._initMapValueY + _.y) / BOX2D_GAME_SCALE),
            c = l,
            t[h] = l
        }
        var p = new b2Filter;
        p.categoryBits = 2,
        p.maskBits = 65535;
        var d = new b2FixtureDef;
        d.shape = new b2ChainShape,
        d.shape.CreateChain(t, t.length),
        d.density = 1,
        d.friction = 3,
        d.filter = p,
        d.restitution = 0,
        this._railFixtures.push(s.CreateFixture(d)),
        this._lastPoint = n,
        this._bodyList.push(s);
        var u = {
            x: this._initMapValueX + o[0].x,
            y: this._initMapValueY + o[0].y
        },
        g = {
            x: this._initMapValueX + o[t.length - 1].x,
            y: this._initMapValueY + o[t.length - 1].y
        };
        this._physicRailStarts.push(u),
        this._physicRailEnds.push(g)
    },
    update: function(t) {
        for (var e = 0; e < this._npcArray.length; e++) this._npcArray[e].update(t);
        for (var e = 0; e < this._triggerList.length; e++) this._triggerList[e].update();
        for (var e = 0; e < this._obstacleList.length; e++) this._obstacleList[e].update();
        for (var e = 0; e < this._ferrisWheel.length; e++) this._ferrisWheel[e].update();
        for (var e = 0; e < this._pendulum.length; e++) this._pendulum[e].update();
        for (var e = 0; e < this._paths.length; e++) this._paths[e].update();
        if (this._onlyUpdateOnce === !1) {
            for (var e = 0; e < this._pickUpList.length; e++) this._pickUpList[e].update();
            for (var e = 0; e < this._railVisuals.length; e++) this._railVisuals[e].update();
            for (var e = 0; e < this._visualElements.length; e++) this._visualElements[e].update();
            for (var e = 0; e < this._turbopads.length; e++) this._turbopads[e].update();
            this._onlyUpdateOnce = !0
        }
        for (var i in this._disabledRails) this._disabledRails[i].timer <= 0 ? (this._disabledRails[i].SetActive(!0), this._disabledRails.splice(i, 1)) : this._disabledRails[i].timer -= t;
        for (var e = 0; e < this._rotatingRails.length; e++) {
            var i = this._rotatingRails[e],
            s = this._rotatingRailsFinalAng[e],
            a = this._bodyList[i].GetAngle();
            s > 0 ? a >= s && (this._bodyList[i].SetAngularVelocity(0), this._bodyList[i].SetTransform(this._bodyList[i].GetPosition(), s), this._bodyList[i].SetAwake(!1), this._rotatingRails.splice(e, 1), this._rotatingRailsFinalAng.splice(e, 1), this._rotatedRailsToReset.push(i), a = s) : s >= a && (this._bodyList[i].SetAngularVelocity(0), this._bodyList[i].SetTransform(this._bodyList[i].GetPosition(), s), this._bodyList[i].SetAwake(!1), this._rotatingRails.splice(e, 1), this._rotatingRailsFinalAng.splice(e, 1), this._rotatedRailsToReset.push(i), a = s),
            this.rotateVisualRail(i, a)
        }
        for (var e = 0; e < this._explosionList.length; e++) {
            var r = this._explosionList[e];
            if (r.timeToExplode <= 0) {
                this.addExplosion(r.explodeX, r.explodeY),
                r.runAction(cc.Sequence.create(cc.FadeOut.create(.2), cc.CallFunc.create(function() {
                    r._body.SetActive(!1)
                },
                this))),
                this._explosionList.splice(e, 1);
                for (var n = 0; n < this._railNames.length; n++) for (var o in r.targets) r.tileName + "." + r.targets[o] === this._railNames[n] && this._bodyList[n].SetActive(!1);
                this.explodeTargets(r.targets, r.tileName)
            } else this._explosionList[e].timeToExplode -= t
        }
        for (var e = 0; e < this._movingRailList.length; e++) {
            var c = this._movingRailList[e],
            h = this._movingRailList[e].timer,
            _ = this._movingRailList[e].targetY;
            if (c.start) {
                c.start = !1,
                c.SetAwake(!0);
                var l = c.GetPosition().y * BOX2D_GAME_SCALE,
                p = -_ - l;
                c.SetLinearVelocity(new b2Vec2(0, (p + 10) / h / BOX2D_GAME_SCALE))
            }
            0 >= h ? (c.SetLinearVelocity(new b2Vec2(0, 0)), c.SetAwake(!1)) : this._movingRailList[e].timer -= t
        }
    },
    disable: function(t) {
        for (var e = 0; e < this._railNames.length; e++) if (t === this._railNames[e]) return g_gamelogic._physicManager._deactivateBodies.push(this._bodyList[e]),
        this._bodyList[e].timer = TIME_TO_ENABLE_RAIL,
        void this._disabledRails.push(this._bodyList[e])
    },
    rotateRail: function(t, e, i, s) {
        for (var a = 0; a < this._railNames.length; a++) if (t === this._railNames[a]) {
            var r = this._movingRailVisuals[a][0];
            return g_gamelogic._mapManager.addExplosion(r.getPositionX(), r.getPositionY()),
            this._bodyList[a].SetAwake(!0),
            this._bodyList[a].SetAngularVelocity(2 * Math.PI * s / 60),
            this._rotatingRails.push(a),
            void this._rotatingRailsFinalAng.push(Math.PI * i / 180)
        }
    },
    rotateVisualRail: function(t, e) {
        for (var i = 180 * e / Math.PI,
        s = this._movingRailVisuals[t], a = this._physicRailEnds[t], r = 0; r < s.length; r++) {
            var n = s[r];
            n.setRotation(n._startRotation + i);
            var o = Math.cos( - e),
            c = Math.sin( - e),
            h = new b2Vec2;
            h.Set(n._startX - a.x, n._startY - a.y);
            var _ = new b2Mat22;
            _.ex.x = o,
            _.ey.x = -c,
            _.ex.y = c,
            _.ey.y = o;
            var l = b2Mul_m22_v2(_, h);
            n.setPosition(l.x + a.x, l.y + a.y)
        }
    },
    addExplosion: function(t, e) {
        g_gamelogic._player._dieAnimation || g_gamelogic._player.runAnimation(Car.ANIMATION_COVER);
        var i = this.getExplosionSprite(),
        s = -160,
        a = -120;
        i.setPosition(cc.p(t + s, e + a)),
        i.endAnimationCallback(i, "removeFromParent"),
        i.play(),
        g_gamelogic._sceneMainGame._foregroundLayer.addChild(i),
        gSharedEngine.playEffect(SOUND_17)
    },
    getExplosionSprite: function() {
        var t = this._explosionSpriteArray[this._explosionArrayIndex];
        return this._explosionArrayIndex++,
        this._explosionArrayIndex >= 15 && (this._explosionArrayIndex = 0),
        t._parent && t.removeFromParent(!1),
        t
    },
    explosionObstacle: function(t, e, i, s) {
        var a = t.split("."),
        r = a[0],
        n = a[1].split(","),
        o = n[0];
        for (var c in this._obstacleList) if (r + "." + o === this._obstacleList[c]._name) {
            var h = this._obstacleList[c]._originalY - i;
            this._obstacleList[c].runAction(cc.MoveBy.create(s, cc.p(0, -h))),
            this._obstacleList[c].timeToExplode = s,
            this._obstacleList[c].explodeX = e,
            this._obstacleList[c].explodeY = i,
            this._obstacleList[c].targets = n,
            this._obstacleList[c].tileName = r,
            this._explosionList.push(this._obstacleList[c])
        }
    },
    moveRail: function(t, e, i, s) {
        for (var a = 0; a < this._railNames.length; a++) if (t === this._railNames[a]) {
            this._bodyList[a].timer = s,
            this._bodyList[a].targetY = i,
            this._bodyList[a].startY = this._bodyList[a].GetPosition().y,
            this._bodyList[a].start = !0,
            this._bodyList[a].visuals = this._movingRailVisuals[a],
            this._movingRailList.push(this._bodyList[a]);
            for (var r = this._movingRailVisuals[a], n = 0, o = 0; o < r.length; o++) n += r[o]._startY;
            n /= r.length;
            for (var o = 0; o < r.length; o++) {
                var c = r[o],
                h = n - i;
                c.runAction(cc.MoveBy.create(s, cc.p(0, -h)))
            }
        }
    },
    moveObstacle: function(t, e, i, s) {
        for (var a in this._obstacleList) if (t === this._obstacleList[a]._name) {
            var r = this._obstacleList[a],
            n = r._originalY - i,
            o = r._originalX - e;
            r.runAction(cc.Sequence.create(cc.MoveBy.create(s, cc.p( - o, -n)), cc.CallFunc.create(function() {
                g_PhysicsManager._callbackArray.push(r)
            },
            this)))
        }
    },
    changeActivedTriggerGroup: function() {
        this._activedTriggersGroup = 1 + Math.round(1e12 * Math.random()) % 3
    },
    changeCurrentCheckPoint: function() {
        this._currentCheckPoint++
    },
    currentCheckPointStartPos: function(t) {
        return this._checkPointStarts[t]
    },
    currentCheckPointEndPos: function(t) {
        return this._checkPointEnds[t]
    }
});
MapManager.JUMP = 0,
MapManager.LAYLOW = 1;
var COVER_EYES_TIME = 3,
FIXED_HIGH_POSITION_NPC = 10,
TIME_KILL_NPC = .3,
Car = cc.Class.extend({
    _car: null,
    _character: null,
    _wheel1TouchingGround: !1,
    _wheel2TouchingGround: !1,
    _touchingGround: !1,
    _lives: 0,
    _score: 0,
    _alive: !0,
    _camera: null,
    _forceRail: !1,
    _touchedByCar: !1,
    _stabilizer: !0,
    _timerPickupsCombo: 0,
    _comboMultiply: 0,
    _levelComplete: !1,
    _initPos: null,
    _isNPC: !1,
    _downPress: !1,
    _changingRail: !1,
    _disabled: !1,
    _isJumping: !0,
    _stopTimeElapsed: 0,
    _stopLastPositionX: 0,
    _stopLastPositionY: 0,
    _dieAnimation: !1,
    _timeToRestart: 0,
    _deathAnimationFlag1: !1,
    _scare: !1,
    _scareTime: 0,
    _loopActivated: !1,
    _createPhysiscFirstTime: !0,
    _body: null,
    _fixedFrameBody: null,
    _backWheelBody: null,
    _frontWheelBody: null,
    _world: null,
    _node: null,
    _joint1: null,
    _joint2: null,
    _joint3: null,
    _joint4: null,
    _joint111: null,
    _joint222: null,
    _revJoint: null,
    _superNPC: !1,
    _fixture: null,
    _trainFx: null,
    _nextSteam: 0,
    _fixedFrameFixture: null,
    _backWheelFixture: null,
    _frontWheelFixture: null,
    _physicManager: null,
    _body4: null,
    _fixture4: null,
    _winRace: !1,
    _automaticPush: !1,
    _winRaceAnimation: !1,
    _changegDirection: !1,
    _npcNumber: 0,
    _moveForwards: !0,
    _speedMulti: 1,
    _speedMultiTime: 0,
    _followObject: null,
    _noInput: !1,
    _animId: -1,
    _physicsCreated: !1,
    _activated: !0,
    _burned: !1,
    _disabledTimer: 0,
    _previousFilter: null,
    _carOnFire: !1,
    _timerWheel1: 0,
    _timerWheel2: 0,
    _killNPC: !1,
    _whooshFx: null,
    _blockedInputTimer: 0,
    ctor: function(t, e, i) {
        null !== i && "undefined" != typeof i && (this._camera = i, IS_HANDHELD && (this._activated = !1)),
        this._initPos = {
            x: 0,
            y: 0
        },
        this._world = g_gamelogic._physicManager._physicWorld,
        this._physicManager = g_gamelogic._physicManager,
        this._node = cc.Node.create(),
        this._initPos.x = t,
        this._initPos.y = e,
        this._alive = !0,
        null !== this._camera && this._camera.addChild(this._node),
        admob_showBanner(bannerLocation.TOPCENTER);

    },
    changeDirection: function() {
        this._changegDirection = !0,
        null !== this._node && (this._character.setScaleX( - 1), this._car.setScaleX( - 1))
    },
    setAsNPC: function(t) {
        this._isNPC = !0,
        -1 === t && (this._superNPC = !0),
        null !== this._character && this._character.removeFromParent(!0),
        this._npcNumber = Math.floor(Math.random() * NPC_MAX),
        this._character = new cc.Sprite,
        this._character.initWithSpriteFrameName(npcArray[this._npcNumber].s1),
        this._character.setPosition(cc.p( - 15, 10)),
        this._node.addChild(this._character),
        this.setCurrentCar(PlayerData.currentCar),
        -1 === t && this.changeDirection(),
        this._activated && this._physicManager._callbackArray.push(this)
    },
    setAsPlayer: function() {
        this.runAnimation(Car.ANIMATION_SCARE),
        this.setCurrentCar(PlayerData.currentCar),
        this._lives = NUMBER_OF_LIVES,
        this._followObject = cc.Node.create(),
        g_gamelogic._sceneMainGame._foregroundLayer.addChild(this._followObject),
        this._activated && this._physicManager._callbackArray.push(this)
    },
    setCurrentCar: function(t) {
        if (this._superNPC) return this._car = new cc.Sprite,
        this._car.initWithSpriteFrameName("npc_cart_.png"),
        this._car.setPosition(cc.p( - 30, -10)),
        void this._node.addChild(this._car);
        null !== this._car && this._car.removeFromParent(!0),
        this._isNPC === !0 && 23 === t && (t = 10);
        var e = carsArray[t - 10];
        e.animated === !0 ? (this._car = new SpriteAnimation, this._car.initWithAtlas(e.sprite, 9999999, e.speed, e.offset, e.region, e.name, e.range), this._car.setPosition(cc.p(e.offset.x, e.offset.y - 10)), this._car.play(), 23 === t && (this._carOnFire = !0)) : (this._car = new cc.Sprite, this._car.initWithSpriteFrameName(e.sprite), this._car.setPosition(cc.p(0, -10)), 18 === t && (this._trainFx = new SpriteAnimation, this._trainFx.initWithAtlas("smoke_train.png", 1, .06, cc.p(85, -40), cc.p(173, 88), "trainFX"), this._car.addChild(this._trainFx), this._trainFx.setPosition(cc.p( - 85, 60)), this._trainFx.endAnimationCallback(this._trainFx, "setVisible", "false"), this._trainFx.play())),
        this._node.addChild(this._car),
        this._whooshFx = new SpriteAnimation,
        this._whooshFx.initWithAtlas("cart_effect.png", 9999999, .03, cc.p(0, 0), cc.p(156, 58), "whoosh"),
        this._car.addChild(this._whooshFx),
        this._whooshFx.setPosition(cc.p( - 50, 0)),
        this._whooshFx.setVisible(!1),
        this._whooshFx.play()
    },
    moveBackwards: function() {
        this._moveForwards = !1
    },
    moveForwards: function() {
        this._moveForwards = !0
    },
    runAnimation: function(t) {
        if (this._animId !== t) {
            switch (null !== this._character && this._character.removeFromParent(!0), this._character = new SpriteAnimation, this._scare = !1, this._scareTime = 0, this._animId = t, t) {
            case Car.ANIMATION_IDLE:
                this._character.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "idle", cc.p(1, 1));
                break;
            case Car.ANIMATION_SCARE:
                this._character.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "scare", cc.p(2, 2));
                break;
            case Car.ANIMATION_COVER:
                this._character.initWithAtlas(charactersArray[PlayerData.currentCharacter].s1, 1, .5, cc.p(0, 0), cc.p(101, 90), "cover", cc.p(3, 3)),
                this._scare = !0,
                this._scareTime = COVER_EYES_TIME;
                break;
            case Car.ANIMATION_DEATH:
                this._isNPC ? (this._character.initWithAtlas(npcArray[this._npcNumber].s2, 9999999, .03, cc.p(50, 75), npcArray[this._npcNumber].region, npcArray[this._npcNumber].name, cc.p(1, 10)), this._character.play()) : (this._character.init(charactersArray[PlayerData.currentCharacter].s2, 9999999, .03, cc.p(50, 75), charactersArray[PlayerData.currentCharacter].size, "death", cc.p(1, 10)), this._character.play());
                break;
            case Car.ANIMATION_BURN:
                this._character.initWithAtlas("standard_died_by_firecart.png", 9999999, .03, cc.p(50, 75), cc.p(100, 154), "burn", cc.p(1, 10)),
                this._character.play()
            }
            if (9 === PlayerData.currentCharacter && t !== Car.ANIMATION_DEATH && t !== Car.ANIMATION_BURN) {
                var e = new SpriteAnimation;
                e.initWithAtlas("flame_in_game.png", 9999999, .06, cc.p( - 10, -5), cc.p(96, 88), "fireFx"),
                this._character.addChild(e, -1),
                e.play()
            }
            null !== this._car && this._character.setZOrder(this._car.getZOrder() - 1),
            this._character.setPosition(cc.p( - 60, -30)),
            t !== Car.ANIMATION_DEATH || this._isNPC ? this._node.addChild(this._character) : (g_gamelogic._hud.addChild(this._character), this._character.setPosition(cc.p(.3 * WIN_SIZE.width, CENTER_POS.y - 80)))
        }
    },
    isOnFire: function() {
        return this._carOnFire
    },
    checkPoint: function(t, e) {
        this._isNPC || (this._initPos.x = t, this._initPos.y = e)
    },
    pushPlayer: function(t, e) {
        this._speedMulti = e,
        this._speedMultiTime = t
    },
    restart: function() {
        this._wheel1TouchingGround = !1,
        this._wheel2TouchingGround = !1,
        this._touchingGround = !1,
        this._timerPickupsCombo = 0,
        this._comboMultiply = 0,
        this._downPress = !1,
        this._changingRail = !1,
        this._forceRail = !1,
        this._stabilizer = !0,
        this._isJumping = !0,
        this._dieAnimation = !1,
        this._timeToRestart = 0,
        this._animId = -1,
        this._deathAnimationFlag1 = !1,
        this._scare = !1,
        this._burned = !1,
        this._blockedInputTimer = 0,
        this._stopTimeElapsed = 0,
        this._scareTime = 0,
        this._loopActivated = !1,
        this._automaticPush = !1,
        this._moveForwards = !0,
        this._carOnFire = !1,
        this._speedMulti = 1,
        this._noInput = !1,
        this._speedMultiTime = 0,
        this._disabledTimer = 0,
        this._winRace = !1,
        this._winRaceAnimation = !1,
        this._timerWheel1 = 0,
        this._timerWheel2 = 0,
        this._killNPC = !1,
        1 !== this._camera.getParent()._parent.getScale() && this._camera.getParent()._parent.setScale(1),
        this._physicManager._callbackArray.push(this),
        this.runAnimation(Car.ANIMATION_SCARE),
        this.setCurrentCar(PlayerData.currentCar)
    },
    createPhysicsElements: function() {
        var t = new b2BodyDef;
        t.type = b2Body.b2_dynamicBody,
        t.userData = new DataObject(TYPE_CAR, this),
        this._body = this._world.CreateBody(t),
        this._body.fixedRotation = !0;
        var e = new b2PolygonShape;
        e.SetAsBox(30 / BOX2D_GAME_SCALE, 40 / BOX2D_GAME_SCALE);
        var i = new b2FixtureDef;
        i.shape = e,
        i.density = 3,
        i.friction = 0,
        i.restitution = 0,
        this._fixture = this._body.CreateFixture(i);
        var s = new b2BodyDef;
        s.type = b2Body.b2_dynamicBody,
        s.userData = new DataObject(TYPE_CHARACTER, this),
        this._body4 = this._world.CreateBody(s);
        var a = new b2PolygonShape;
        this._isNPC === !1 ? a.SetAsBox(55 / BOX2D_GAME_SCALE, 20 / BOX2D_GAME_SCALE, new b2Vec2(0, -10 / BOX2D_GAME_SCALE), 0) : a.SetAsBox(55 / BOX2D_GAME_SCALE, 29 / BOX2D_GAME_SCALE, new b2Vec2(0, -22 / BOX2D_GAME_SCALE), 0);
        var r = new b2FixtureDef;
        r.shape = a,
        r.isSensor = !0,
        r.density = 0,
        r.friction = 0,
        r.restitution = 0,
        this._fixture4 = this._body4.CreateFixture(r);
        var n = new b2BodyDef;
        n.type = b2Body.b2_dynamicBody,
        n.userData = new DataObject(TYPE_NONE, this),
        this._fixedFrameBody = this._world.CreateBody(n),
        this._fixedFrameBody.SetFixedRotation(!0);
        var o = new b2PolygonShape;
        o.SetAsBox(16 / BOX2D_GAME_SCALE, 12 / BOX2D_GAME_SCALE);
        var c = new b2FixtureDef;
        c.shape = o,
        c.isSensor = !0,
        c.density = 3,
        c.friction = 0,
        c.restitution = 0,
        this._fixedFrameFixture = this._fixedFrameBody.CreateFixture(c);
        var h = new b2BodyDef;
        h.type = b2Body.b2_dynamicBody,
        h.userData = new DataObject(TYPE_WHEEL_1, this),
        this._backWheelBody = this._world.CreateBody(h),
        this._backWheelBody.SetBullet(!0);
        var _ = new b2FixtureDef;
        _.shape = new b2CircleShape,
        _.shape.m_radius = 17 / BOX2D_GAME_SCALE,
        _.density = 4,
        _.friction = 30,
        _.restitution = 0,
        _.shape.m_p.Set( - 32 / BOX2D_GAME_SCALE, 28 / BOX2D_GAME_SCALE),
        this._backWheelFixture = this._backWheelBody.CreateFixture(_);
        var l = new b2BodyDef;
        l.type = b2Body.b2_dynamicBody,
        l.userData = new DataObject(TYPE_WHEEL_2, this),
        this._frontWheelBody = this._world.CreateBody(l),
        this._frontWheelBody.SetBullet(!0);
        var p = new b2FixtureDef;
        p.shape = new b2CircleShape,
        p.shape.m_radius = 17 / BOX2D_GAME_SCALE,
        p.density = 4,
        p.friction = 30,
        p.restitution = 0,
        p.shape.m_p.Set(32 / BOX2D_GAME_SCALE, 28 / BOX2D_GAME_SCALE),
        this._frontWheelFixture = this._frontWheelBody.CreateFixture(p),
        this.createJoints(),
        this._body.SetAngularDamping(0),
        this._isNPC ? this.setPosition(this._initPos.x, this._initPos.y + FIXED_HIGH_POSITION_NPC) : (this.setPosition(this._initPos.x, this._initPos.y), this._stopLastPositionX = this._initPos.x, this._stopLastPositionY = this._initPos.y),
        this._physicsCreated = !0
    },
    createJoints: function() {
        var t = new b2RevoluteJointDef;
        t.Initialize(this._body, this._fixedFrameBody, this._body.GetWorldCenter()),
        t.collideConnected = !1,
        this._revJoint = this._world.CreateJoint(t);
        var e = this._body.GetWorldCenter(),
        i = Math.abs(this._fixture.GetAABB(0).upperBound.x - this._fixture.GetAABB(0).lowerBound.x),
        s = Math.abs(this._fixture.GetAABB(0).upperBound.y - this._fixture.GetAABB(0).lowerBound.y),
        a = new b2DistanceJointDef;
        a.Initialize(this._backWheelBody, this._frontWheelBody, this._backWheelBody.GetWorldCenter(), this._frontWheelBody.GetWorldCenter()),
        a.collideConnected = !1,
        this._joint1 = this._world.CreateJoint(a);
        var r = new b2DistanceJointDef,
        n = new b2Vec2(e.x - .2 * i, e.y);
        r.Initialize(this._backWheelBody, this._body, this._backWheelBody.GetWorldCenter(), n),
        r.collideConnected = !1,
        this._joint2 = this._world.CreateJoint(r);
        var o = new b2DistanceJointDef,
        c = new b2Vec2(e.x + .2 * i, e.y);
        o.Initialize(this._frontWheelBody, this._body, this._frontWheelBody.GetWorldCenter(), c),
        o.collideConnected = !1,
        this._joint3 = this._world.CreateJoint(o);
        var h = new b2DistanceJointDef,
        _ = new b2Vec2(e.x, .3 * s - e.y);
        h.Initialize(this._frontWheelBody, this._body, this._frontWheelBody.GetWorldCenter(), _),
        h.collideConnected = !1,
        this._joint4 = this._world.CreateJoint(h);
        var l = new b2DistanceJointDef,
        p = new b2Vec2(e.x + .2 * i, e.y + .2 * s);
        l.Initialize(this._body4, this._body, this._body4.GetWorldCenter(), p),
        l.collideConnected = !1,
        this._joint111 = this._world.CreateJoint(l);
        var d = new b2DistanceJointDef,
        u = new b2Vec2(e.x - .2 * i, e.y + .2 * s);
        d.Initialize(this._body4, this._body, this._body4.GetWorldCenter(), u),
        d.collideConnected = !1,
        this._joint222 = this._world.CreateJoint(d)
    },
    processInput: function(t) {
        this._noInput || this._dieAnimation || this._winRaceAnimation || this._blockedInputTimer > 0 || (t.upJustPressed && (this._downPress = !1, this.jump()), t.down ? this.changeRail() : this._downPress = !1)
    },
    winAnimation: function(t) {
        0 === this._timeToRestart && (this.destroyPhysics(), this.runAnimation(Car.ANIMATION_SCARE), this._node.setRotation(0), this._node.runAction(cc.Sequence.create(cc.MoveTo.create(0, cc.p(this._node.getPositionX(), g_gamelogic._mapManager._lastRailPosY + 57)), cc.MoveBy.create(1, cc.p(.8 * WIN_SIZE.width, 0)), cc.CallFunc.create(this.gotoNextScene, this)))),
        this._timeToRestart += t
    },
    dieAnimation: function(t) {
        0 === this._timeToRestart && (this.destroyPhysics(), this.runAnimation(this._burned ? Car.ANIMATION_BURN: Car.ANIMATION_DEATH), this._node.setRotation(0), this._character.runAction(cc.ScaleTo.create(.2, 1.5, 1.5)), this._character.runAction(this._isNPC ? cc.MoveTo.create(.2, cc.p(.25 * CENTER_POS.x, -10)) : cc.MoveTo.create(.2, cc.p(CENTER_POS.x - 100, CENTER_POS.y))), this._car.runAction(this._isNPC ? cc.MoveTo.create(.6, cc.p(.5 * CENTER_POS.x, -400)) : cc.Sequence.create(cc.MoveTo.create(.6, cc.p(.5 * CENTER_POS.x, -400)), cc.CallFunc.create(g_gamelogic._hud._explosion.play(), this)))),
        this._timeToRestart += t,
        this._timeToRestart >= 2 ? this._isNPC || (this._lives < 0 ? this._alive = !1 : (g_gamelogic._hud._livesValue.setString("X 0" + this._lives), this.restart())) : this._timeToRestart >= 1 && (this._deathAnimationFlag1 || (this._character.runAction(cc.MoveTo.create(.3, cc.p(this._character.getPositionX(), -440))), this._deathAnimationFlag1 = !0))
    },
    trampoline: function(t, e) {
        var i = new b2Vec2(Math.sin( - e), Math.cos( - e));
        i.Multiply( - t),
        this._body.SetLinearVelocity(new b2Vec2(Math.abs(this._body.GetLinearVelocity().x), 0)),
        this._backWheelBody.SetLinearVelocity(new b2Vec2(Math.abs(this._backWheelBody.GetLinearVelocity().x), 0)),
        this._frontWheelBody.SetLinearVelocity(new b2Vec2(Math.abs(this._frontWheelBody.GetLinearVelocity().x), 0)),
        this._body.ApplyLinearImpulse(i, this._body.GetWorldCenter())
    },
    gotoNextScene: function() {
        var t = cc.Scene.create(),
        e = new SceneComplete;
        t.addChild(e),
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.1, t))
    },
    touchedByCar: function() {
        this._touchedByCar || (gSharedEngine.playEffect(SOUND_2, .4), this._touchedByCar = !0)
    },
    grabPickUp: function(t) {
        this._isNPC || t && t.grab() && (t._type === PickUp.TYPE_BILL ? this.grabBill() : t._type === PickUp.TYPE_STAR && this.grabStar(t))
    },
    grabStar: function(t) {
        if (gSharedEngine.playEffect(SOUND_21, .3), g_gamelogic._hud.setNewCashValue(250), g_gamelogic._heartsCollected += 1, this._score += 250, !IS_HANDHELD) {
            var e = createParticleSystemWithDictionary("res/star_particles.plist");
            e.setDrawMode(cc.PARTICLE_TEXTURE_MODE),
            e.setPositionType(cc.PARTICLE_TYPE_RELATIVE),
            e.setPosition(cc.p(t._posX + 180, t._posY + 100)),
            e.setAutoRemoveOnFinish(!0),
            g_gamelogic._sceneMainGame._backgroundLayer.addChild(e);
            var i = g_gamelogic.getPlayerStarLabel();
            this._followObject.addChild(i),
            i.runAction(cc.Sequence.create(cc.EaseOut.create(cc.MoveBy.create(.3, cc.p(0, 100)), 3), cc.EaseInOut.create(cc.MoveBy.create(.7, cc.p(0, -60)), 3))),
            i.runAction(cc.Sequence.create(cc.EaseOut.create(cc.MoveBy.create(.7, cc.p( - 100, 0)), 1), cc.CallFunc.create(function() {
                i.removeFromParent(!1)
            },
            this)))
        }
        g_gamelogic._hud.winStar(t._index)
    },
    grabBill: function() {
        gSharedEngine.playEffect(SOUND_7, .3),
        this._timerPickupsCombo > 0 && this._comboMultiply < 9 && this._comboMultiply++;
        var t = 10 * (this._comboMultiply + 1);
        if (g_gamelogic._hud.setNewCashValue(t), this._score += t, !IS_HANDHELD) {
            var e = g_gamelogic.getPlayerPickUpLabel("+" + t);
            this._followObject.addChild(e),
            e.runAction(cc.Sequence.create(cc.EaseOut.create(cc.MoveBy.create(.3, cc.p(0, 100)), 3), cc.EaseInOut.create(cc.MoveBy.create(.7, cc.p(0, -60)), 3))),
            e.runAction(cc.Sequence.create(cc.EaseOut.create(cc.MoveBy.create(.7, cc.p( - 100, 0)), 1), cc.CallFunc.create(function() {
                e.removeFromParent(!1)
            },
            this)))
        }
        this._timerPickupsCombo = PICKUP_COMBO_TIME
    },
    dyingSound: function() {
        gSharedEngine.playEffect(this._isNPC ? 0 === this._npcNumber || 1 === this._npcNumber ? SOUND_10: SOUND_11: 0 === PlayerData.currentCharacter || 1 === PlayerData.currentCharacter || 4 === PlayerData.currentCharacter || 8 === PlayerData.currentCharacter ? SOUND_11: SOUND_10)
    },
    burn: function() {
        this._dieAnimation === !1 && (this.dyingSound(), this._burned = !0, this._dieAnimation = !0)
    },
    die: function() {
        this._dieAnimation === !1 && (this.dyingSound(), this._lives--, this._dieAnimation = !0)
    },
    createPhysics: function() {
        this.createPhysicsElements(),
        this._createPhysiscFirstTime || this._isNPC || g_gamelogic._mapManager.reloadMap(),
        this._createPhysiscFirstTime = !1
    },
    update: function(t) {
        if (this._blockedInputTimer > 0 && (this._blockedInputTimer -= t), 18 === PlayerData.currentCar && null !== this._trainFx && (this._nextSteam -= t, this._nextSteam <= 0 && (this._nextSteam = Math.floor(3 * Math.random() + 1), this._trainFx.setFrame(1), this._trainFx.play(), this._trainFx.setVisible(!0))), this._disabledTimer > 0 && (this._disabledTimer -= t, this._disabledTimer <= 0 && (this.enableCollision(), this._disabledTimer = 0)), !this._disabled) {
            if (this._speedMultiTime > 0 && (this._speedMultiTime -= t, this._speedMultiTime <= 0 && (this._speedMulti = 1, this._speedMultiTime = 0, this._whooshFx.setVisible(!1))), this._alive === !1 && (this._disabled = !0, !this._isNPC)) {
                var e = cc.Scene.create(),
                i = new SceneFail;
                e.addChild(i),
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(.1, e))
            }
            if (this._winRaceAnimation === !0) return void this.winAnimation(t);
            if (this._dieAnimation === !0) return void this.dieAnimation(t);
            if (this._body && this._camera && this._activated && (.3 === this._camera._factorX || .7 === this._camera._factorX) && (this._stopTimeElapsed += t, this._stopTimeElapsed >= .7)) {
                var s = this._body.GetPosition();
                Math.abs(this._stopLastPositionX - s.x) < .2 && Math.abs(this._stopLastPositionY - s.y) < .2 && this.die(),
                this._stopTimeElapsed = 0,
                this._stopLastPositionX = s.x,
                this._stopLastPositionY = s.y
            }
            if (this._scareTime > 0 ? this._scareTime -= t: this._scareTime <= 0 && this._scare && (this.runAnimation(Car.ANIMATION_SCARE), this._scare = !1, this._scareTime = 0), this.checkIfImTouchingGround(t), null !== this._backWheelBody && null !== this._frontWheelBody && (this._isNPC ? this._changegDirection ? (this._backWheelBody.SetAngularVelocity( - NPC_SPEED), this._frontWheelBody.SetAngularVelocity( - NPC_SPEED)) : (this._backWheelBody.SetAngularVelocity(NPC_SPEED), this._frontWheelBody.SetAngularVelocity(NPC_SPEED)) : this._moveForwards ? (this._backWheelBody.SetAngularVelocity(PLAYER_SPEED), this._frontWheelBody.SetAngularVelocity(PLAYER_SPEED * this._speedMulti)) : (this._backWheelBody.SetAngularVelocity( - PLAYER_SPEED), this._frontWheelBody.SetAngularVelocity( - PLAYER_SPEED * this._speedMulti))), this._stabilizer && this.stabilize(), this._forceRail && null !== this._body) {
                var a = new b2Vec2(0, PINCH_FORCE),
                r = this._body.GetWorldCenter(),
                n = this._body.GetWorldPoint(a);
                n.x -= this._body.GetPosition().x,
                n.y -= this._body.GetPosition().y,
                this._body.ApplyForce(n, r)
            }
            null !== this._body && (this._node.setPosition(this._body.GetPosition().x * BOX2D_GAME_SCALE, -this._body.GetPosition().y * BOX2D_GAME_SCALE), this._node.setRotation(cc.RADIANS_TO_DEGREES(this._body.GetAngle())), this._body4 && this._body4.SetTransform(this._body4.GetPosition(), this._body.GetAngle())),
            this._timerPickupsCombo > 0 ? this._timerPickupsCombo -= t: (this._timerPickupsCombo = 0, this._comboMultiply = 0),
            null !== this._followObject && this._followObject.setPosition(this._node.getPosition()),
            this._activated ? this._car.isVisible() || (this._car.setVisible(!0), this._character.setVisible(!0)) : this._car.isVisible() && (this._car.setVisible(!1), this._character.setVisible(!1))
        }
    },
    changeWheel1State: function(t) {
        t === !0 && (this._wheel1TouchingGround = !0, this._timerWheel1 = .3, this._touchingGround = !0, this._isJumping = !1, this._changingRail = !1, this._killNPC = !1, this._winRace === !0 && (this._winRaceAnimation = !0))
    },
    changeWheel2State: function(t) {
        t === !0 && (this._wheel2TouchingGround = !0, this._timerWheel2 = .3, this._touchingGround = !0, this._isJumping = !1, this._changingRail = !1, this._killNPC = !1, this._winRace === !0 && (this._winRaceAnimation = !0))
    },
    checkIfImTouchingGround: function(t) {
        this._timerWheel1 > 0 && (this._timerWheel1 -= t, this._timerWheel1 <= 0 && (this._wheel1TouchingGround = !1, this._wheel2TouchingGround === !0 && (this._touchingGround = !1, this._killNPC = !0), this._timerWheel1 = 0)),
        this._timerWheel2 > 0 && (this._timerWheel2 -= t, this._timerWheel2 <= 0 && (this._wheel2TouchingGround = !1, this._wheel1TouchingGround === !0 && (this._touchingGround = !1, this._killNPC = !0), this._timerWheel2 = 0))
    },
    activateLoop: function() {
        this._loopActivated = !0,
        this._stabilizer = !1,
        this._forceRail = !0,
        1 === this._speedMulti && (this._automaticPush = !0),
        this._speedMulti < 1.5 && (this._speedMulti = 1.5)
    },
    deactivateLoop: function() {
        this._loopActivated = !1,
        this._stabilizer = !0,
        this._forceRail = !1,
        this._blockedInputTimer = .5,
        this._automaticPush && (this._speedMulti = 1, this._automaticPush = !1)
    },
    enableCollision: function() {
        null !== this._previousFilter && (this._fixture.SetFilterData(this._previousFilter), this._fixedFrameFixture.SetFilterData(this._previousFilter), this._backWheelFixture.SetFilterData(this._previousFilter), this._frontWheelFixture.SetFilterData(this._previousFilter), this._fixture4.SetFilterData(this._previousFilter))
    },
    disableCollision: function() {
        this._disabledTimer = .3,
        this._previousFilter = this._fixture.GetFilterData();
        var t = new b2Filter;
        t.maskBits = 65533,
        this._fixture.SetFilterData(t),
        this._fixedFrameFixture.SetFilterData(t),
        this._backWheelFixture.SetFilterData(t),
        this._frontWheelFixture.SetFilterData(t),
        this._fixture4.SetFilterData(t)
    },
    jump: function(t) {
        if (!this._forceRail) {
            var e = JUMP_IMPULSE;
            "undefined" != typeof t && (e = t),
            this._isJumping || this._changingRail || (gSharedEngine.playEffect(SOUND_8), this._body.ApplyLinearImpulse(new b2Vec2(0, -e), this._body.GetWorldCenter()), this._isJumping = !0, this._killNPC = !0, this.disableCollision())
        }
    },
    changeRail: function() {
        this._isJumping || this._forceRail || this._downPress || (this._downPress = !0, 0 === this._disabledTimer && this._touchingGround && (gSharedEngine.playEffect(SOUND_14), this.verifyIfCanMoveDown()))
    },
    verifyIfCanMoveDown: function() {
        var t = this,
        e = new b2RayCastCallback;
        e.ReportFixture = function(e) {
            var i = e.GetBody().GetUserData();
            return null !== i && "undefined" != typeof i && i._type === TYPE_GROUND ? (t.disableCollision(), t._changingRail = !0, t._killNPC = !0, 0) : -1
        };
        var i = new b2Vec2(this._fixedFrameBody.GetPosition().x + 1.5, this._fixedFrameBody.GetPosition().y + 3),
        s = new b2Vec2(this._fixedFrameBody.GetPosition().x + 1.5, this._fixedFrameBody.GetPosition().y + 10);
        g_PhysicsManager._physicWorld.RayCast(e, i, s)
    },
    setPosition: function(t, e) {
        null !== this._body && (this._body.SetTransform(new b2Vec2(t / BOX2D_GAME_SCALE, -e / BOX2D_GAME_SCALE), 0), this._fixedFrameBody.SetTransform(new b2Vec2(t / BOX2D_GAME_SCALE, -e / BOX2D_GAME_SCALE), 0), this._backWheelBody.SetTransform(new b2Vec2(t / BOX2D_GAME_SCALE, -e / BOX2D_GAME_SCALE), 0), this._frontWheelBody.SetTransform(new b2Vec2(t / BOX2D_GAME_SCALE, -e / BOX2D_GAME_SCALE), 0), this._body4.SetTransform(new b2Vec2(t / BOX2D_GAME_SCALE, -e / BOX2D_GAME_SCALE), 0))
    },
    getPosition: function() {
        return null !== this._body ? {
            x: this._body.GetPosition().x * BOX2D_GAME_SCALE,
            y: -this._body.GetPosition().y * BOX2D_GAME_SCALE
        }: {
            x: 0,
            y: 0
        }
    },
    destroyPhysics: function() {
        this._physicsCreated && (this._body && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body,
            fixture: this._fixture
        }), this._fixedFrameBody && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._fixedFrameBody,
            fixture: this._fixedFrameFixture
        }), this._backWheelBody && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._backWheelBody,
            fixture: this._backWheelFixture
        }), this._frontWheelBody && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._frontWheelBody,
            fixture: this._frontWheelFixture
        }), this._body4 && g_PhysicsManager._destroyedBodiesFixtures.push({
            body: this._body4,
            fixture: this._fixture4
        }), this._physicsCreated = !1)
    },
    destroy: function() {
        this._node.removeFromParent(!0),
        this.destroyPhysics()
    },
    stabilize: function() {
        function t(t, e) {
            t %= 2 * Math.PI,
            e %= 2 * Math.PI,
            0 > t && (t += 2 * Math.PI),
            0 > e && (e += 2 * Math.PI);
            var i = e - t;
            return i < -Math.PI && (i += 2 * Math.PI),
            i > Math.PI && (i -= 2 * Math.PI),
            i
        }
        if (null !== this._revJoint) {
            var e = t(this._revJoint.GetJointAngle() % (2 * Math.PI), 0); - .05 > e || e > .05 ? (this._revJoint.EnableMotor(!0), this._revJoint.SetMaxMotorTorque(Math.abs(5 * e + 200 * this._revJoint.GetJointSpeed())), this._revJoint.SetMotorSpeed(e / Math.sqrt(Math.abs(e)) + .1 * this._revJoint.GetJointSpeed())) : this._revJoint.EnableMotor(!1)
        }
    }
});
Car.ANIMATION_IDLE = 0,
Car.ANIMATION_SCARE = 1,
Car.ANIMATION_COVER = 2,
Car.ANIMATION_DEATH = 3,
Car.ANIMATION_BURN = 4;