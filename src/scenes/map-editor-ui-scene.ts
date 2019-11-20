/**
 * typescript ripped from: https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/alpha-adjust/objects/clone-crystal.ts
 **/

import { MenuButton } from '~/ui/menu-button';
import mapGenerate from '~/api/map/generate';
import { Map } from '~/objects/map.class';
import { MapEditorMapScene } from '~/scenes/map-editor-map-scene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MapEditorUi',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MapEditorUiScene extends Phaser.Scene {
  private mapScene: MapEditorMapScene;
  // private mapeditorui1: MapEditorUi;

  constructor() {
    super(sceneConfig);
  }

  public preload() {

  }
  public update() {

  }
  public create() {
    // this.map.create();
    // this.mapeditorui1.create();
    this.add.text(100, 50, 'Map Editor', { fill: '#FFFFFF' }).setFontSize(24).setDepth(50).setScrollFactor(0);;
    const mapJson = this.add.text(400, 100, 'Click Generate New Map', { fill: '#FFFFFF' }).setFontSize(12);

    new MenuButton(this, 50, 150, 'Generate New Map', () => {
      mapGenerate({
        script: 'pangea',
        height: 16,
        width: 24,
        seed: 1337,
      }).then(data => {
        this.mapScene.setRawMap(data);
        mapJson.setText('')
      }, err => {
        this.mapScene.setRawMap(null);
        // console.log(JSON.stringify(data, null, 2));
        mapJson.setText(new String(err) as string)
      });
    });

    new MenuButton(this, 50, 250, 'Main Menu', () => {
      this.scene.stop('MapEditorMap');
      this.scene.remove('MapEditorMap');
      this.scene.start('MainMenu');
    });

    this.mapScene = this.scene.add('MapEditorMapScene', MapEditorMapScene, true, { x: 0, y: 0 }) as MapEditorMapScene
    this.scene.bringToTop('MapEditorUi');

    // this.ui
  }
}
