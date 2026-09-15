import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Hand } from '../entities/Hand';

export class Playground extends Scene
{
    constructor()
    {
        super('Playground')
    }
    
    create()
    {
        // Notify React that this scene is active and ready
        EventBus.emit('current-scene-ready', this);

        this.sys.canvas.style.cursor = 'none';

        let background = this.add.image(0, 0, "playgroundBackground")
        background.setOrigin(0, 0)
        background.setDisplaySize(this.scale.width, this.scale.height)

        new Hand(this)
    }
    
    update()
    {
        // insert update code here
    }
}