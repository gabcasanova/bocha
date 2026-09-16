import { GameObjects, Geom, Math } from 'phaser';
import { PointerEvent } from 'react';

export class Hand extends GameObjects.Sprite
{
    private possibleStates: Array<string>
    private currentState: string
    private lastMouseX: number = -1;
    private debugText: Phaser.GameObjects.Text

    private ball: Phaser.GameObjects.Image
    private line: Phaser.Geom.Line
    private graphics: Phaser.GameObjects.Graphics

    constructor(scene: Phaser.Scene) 
    {
        super(scene, 400, 630, "hand");

        // Add to updatelist
        scene.add.existing(this);

        // Set sprite size and position
        this.setOrigin(0.5, 0.5)
        this.displayWidth = 70
        this.scaleY = this.scaleX
        this.y = scene.scale.height - (this.displayHeight/4)

        // Create ball inside hand
        this.ball = scene.add.image(0.5, 0.5, "ball")
        this.ball.displayWidth = 70
        this.ball.scaleY = this.ball.scaleX

        // Create line
        this.line = new Geom.Line(this.x, this.y, this.x, this.y)
        this.graphics = scene.add.graphics()

        this.possibleStates = ["stopped", "moving", "turning", "force"]
        this.currentState = this.possibleStates[1]

        this.debugText = scene.add.text(0, 0, this.currentState)

        scene.input.once('pointerdown', (pointer: PointerEvent) => {
            this.currentState = this.possibleStates[2]
        }, this);
    }

    preUpdate(time: number, delta: number) 
    {
        super.preUpdate(time, delta);

        const mousePointer = this.scene.input.activePointer

        // Hand movement
        switch (this.currentState) 
        {
            case this.possibleStates[1]:
                this.x = mousePointer.x
                break;

            case this.possibleStates[2]:
                if (this.lastMouseX === -1) {
                    this.lastMouseX = mousePointer.x;
                }
                
                const deltaX = mousePointer.x - this.lastMouseX;

                const maxAngle = 41

                // 2. Tweak this number to make the turning feel heavier or lighter
                const sensitivity = 0.3; // 0.5 means 2 pixels of mouse movement = 1 degree of rotation

                // 3. Apply rotation instantly based on how fast the mouse actually moved
                if (deltaX !== 0) {
                    const newAngle = this.angle + (deltaX * sensitivity);
                    this.angle = Math.Clamp(newAngle, -maxAngle, maxAngle);
                }

                console.log(this.angle)

                this.lastMouseX = mousePointer.x;

                break;
            default:
                break;
        }

        // Ball follow hand
        this.ball.x = this.x
        this.ball.y = this.y
        this.ball.angle = this.angle

        // Draw direction line
        let handToLineOffset = 90
        let lineLength = 300
        this.line.setTo(this.x, this.y - handToLineOffset, this.x, this.y - lineLength)
        this.graphics.clear();
        this.graphics.lineStyle(3, 0xffffff, 1); // Width: 3px, Color: White, Alpha: 1.0
        this.graphics.strokeLineShape(this.line);

        // Debug display
        this.debugText.setText(this.currentState)
    }
}