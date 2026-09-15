import { Boot } from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Playground } from './scenes/Playground';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',

    backgroundColor: '#808080',

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0, x: 0 }
        }
    },

    scene: [
        Boot,
        Preloader,
        Playground
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
