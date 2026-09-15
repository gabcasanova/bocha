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

        new Hand(this)
    }
    
    update()
    {
        // insert update code here
    }
}