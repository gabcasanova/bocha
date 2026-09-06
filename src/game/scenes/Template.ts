import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Template extends Scene
{
    constructor()
    {
        super("GameScene")
    }

    create() 
    {
        // Notify React that this scene is active and ready
        EventBus.emit('current-scene-ready', this);

        // insert create code here
    }

    update()
    {
        // insert update code here
    }
}