/**
 * typescript ripped from: https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/alpha-adjust/objects/clone-crystal.ts
 **/

import { MenuButton } from '~/ui/menu-button';
import mapGenerate from '~/api/map/generate';
import { Map } from '~/objects/map.class.ts';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MapEditor',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MapEditorScene extends Phaser.Scene {
  private map: Map;

  constructor() {
    super(sceneConfig);
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
    this.map.preload();
  }
  public update() {
    this.map.update();
    // console.log('Scene.update')
    // this.load.spritesheet('terrain', 'assets/spritesheets/terrain_hex.png', {
    //   frameWidth: 120,
    //   frameHeight: 139,
    // });
  }
  public create() {
    this.map.create();
    this.add.text(100, 50, 'Map Editor', { fill: '#FFFFFF' }).setFontSize(24).setDepth(50);
    const mapJson = this.add.text(400, 100, 'Click Generate New Map', { fill: '#FFFFFF' }).setFontSize(12);

    new MenuButton(this, 50, 150, 'Generate New Map', () => {
      mapGenerate({
        script: 'pangea',
        height: 16,
        width: 24,
        seed: 1337,
      }).then(data => {
        this.map.setRawMap(data);
        mapJson.setText('')
      }, err => {
        this.map.setRawMap(null);
        // console.log(JSON.stringify(data, null, 2));
        mapJson.setText(new String(err) as string)
      });
    });

    new MenuButton(this, 50, 250, 'Main Menu', () => {
      this.scene.start('MainMenu');
    });
  }
}
