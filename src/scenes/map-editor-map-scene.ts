/**
 * typescript ripped from: https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/alpha-adjust/objects/clone-crystal.ts
 **/

import { MenuButton } from '~/ui/menu-button';
import mapGenerate from '~/api/map/generate';
import { Map } from '~/objects/map.class';
import { MapEditorUiScene } from '~/scenes/map-editor-ui-scene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MapEditorMap',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MapEditorMapScene extends Phaser.Scene {
  private map: Map;
  private ui: MapEditorUiScene;
  // private mapeditorui1: MapEditorUi;

  constructor() {
    super(sceneConfig);
  }

  public setRawMap (newValue) {
    return this.map.setRawMap(newValue)
  }

  public preload() {
    this.map = new Map({
      scene: this,
      x: this.sys.canvas.width / 2 - 150,
      y: this.sys.canvas.height / 2,
      // this doesn't mean anything, just that the abovce crashed
      // x: document.getElementById("content").clientWidth,
      // y: document.getElementById("content").clientHeight,
      key: "map1",
    });
    // this.mapeditorui1 = new MapEditorUi({
    //   scene: this,
    //   x: this.sys.canvas.width / 2 - 150,
    //   y: this.sys.canvas.height / 2,
    //   // this doesn't mean anything, just that the abovce crashed
    //   // x: document.getElementById("content").clientWidth,
    //   // y: document.getElementById("content").clientHeight,
    //   key: "mapeditorui1",
    // });
    this.map.preload();
    // this.mapeditorui1.preload();
  }
  public update() {
    this.map.update();
    // this.mapeditorui1.update();
    // console.log('Scene.update')
    // this.load.spritesheet('terrain', 'assets/spritesheets/terrain_hex.png', {
    //   frameWidth: 120,
    //   frameHeight: 139,
    // });
  }
  public create() {
    this.map.create();
    // this.mapeditorui1.create();
  }
}
