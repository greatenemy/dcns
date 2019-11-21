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
      key: "map1",
    });
    this.map.preload();
  }
  public update() {
    this.map.update();
  }
  public create() {
    this.map.create();
  }
}
