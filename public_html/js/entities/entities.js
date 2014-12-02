game.PlayerEntity = me.Entity.extend({
   init:function (x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
           image: "mario",
           spritewidth: "128",
           spriteheigth: "128",
           width: 128,
           height: 128,
           getShape: function(){
               return (new me.Rect(0, 0, 128, 128)).toPolygon();
           }
       }]);
       this.renderable.addAnimation("idle", [3]);
       this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
       this.renderable.setCurrentAnimation("idle");
       this.body.setVelocity(5, 20);
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   },
   
   update:function(delta) {
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x = 0;
        }
        if(this.body.vel.x !== 0) {
            if(!this.renderable.isCurrentAnimation("smallWalk")){
            this.renderable.setCurrentAnimation("smallWalk");
            this.renderable.setAnimationFrame();
            }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this._super(me.Entity, "update", [delta]);
        return true;
   },
   
   
});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
    },
    onCollision: function(){
        this.body.netCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
    }
});