import debounce from 'lodash/debounce'
import * as Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'DCNS',

  // type: Phaser.AUTO,
  type: Phaser.CANVAS,

  scale: {
    mode: Phaser.Scale.RESIZE,
    // mode: Phaser.Scale.FIT,
    // mode: Phaser.Scale.CENTER_BOTH,
    // width: window.innerWidth,
    // height: window.innerHeight,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.RESIZE,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', debounce(() => {
  setTimeout(() => game.scale.refresh(), 10)
}, 33));
