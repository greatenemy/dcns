import { Map } from '~/objects/map.class'
import { RawMap, RawTile, TileUuid } from '~/types'

// type PhaserTileMap = {
//   [uuid: string]: Phaser.GameObjects.Image;
// }

export class Tile extends Phaser.GameObjects.Image {

  private uuid: TileUuid;
  private terrain: number;
  private terrain_features: number[];
  private neighbor_uuids: Array<TileUuid | null>;
  private index: number;
  private map: Map;
  // private map: Phaser.GameObjects.Image;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.sprite_index);

    this.map = params.map;
    this.uuid = params.tile.uuid;
    this.terrain = params.tile.terrain;
    this.terrain_features = params.tile.terrain_features;
    this.neighbor_uuids = params.tile.neighbor_uuids;
    this.index = params.index;

    this.initVariables();
    this.initImage();
    this.scene.add.existing(this);
  }

  private initVariables(): void {
    // this.tiles = [];
    // this.anchor_uuid = null;
    // // this.increaseAlpha = false;
    // this.border_size = 4;
    // this.tile_size_x = 120 + this.border_size;
    // this.tile_size_y = 104 + this.border_size;
    // this.pan_offset_x = 300;
    // this.pan_offset_y = 200;
  }

  private initImage(): void {
  }

  create(): void {
    // this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    // this.cursorKeys = this.input.keyboard.createCursorKeys();
    // if (!this.map) return;

    // for (let i = this.tiles.length - 1; i >= 0; i--) {
    //   this.tiles[i].destroy();
    // }

    // this.tiles.length = 0
    // // console.log(JSON.stringify(data, null, 2));
    // // mapJson.setText(JSON.stringify(data, null, 2))

    // const { height, width } = this.map.map.map_options;
    // const { border_size, pan_offset_x, pan_offset_y, tile_size_x, tile_size_y } = this.map;

    // for (let i = this.map.tiles.length - 1; i >= 0; i--) {
    //   const rawTile = this.map.tiles[i]
    //   const tile_map_x = (i%width)
    //   const tile_map_y = Math.floor(i / width)
    //   const tile_screen_x = pan_offset_x + ((tile_map_x * tile_size_x)) + ((tile_map_y%2) * 0.5 * (tile_size_x))
    //   const tile_screen_y = pan_offset_y + (tile_map_y * (tile_size_y));

    //   const tile = this.scene.add.image(
    //     tile_screen_x,
    //     tile_screen_y,
    //     'terrain',
    //     rawTile.terrain);

    //   // tile.raw = rawTile;

    //   this.tiles.push(tile);
    // }
  }

  update(): void {
    const { index } = this;
    const { height, width } = this.map.map.map_options;
    const { border_size, pan_offset_x, pan_offset_y, tile_size_x, tile_size_y } = this.map;

    const tile_map_x = (index%width)
    const tile_map_y = Math.floor(index / width)
    const tile_screen_x = pan_offset_x + ((tile_map_x * tile_size_x)) + ((tile_map_y%2) * 0.5 * (tile_size_x))
    const tile_screen_y = pan_offset_y + (tile_map_y * (tile_size_y));

    this.x = tile_screen_x;
    this.y = tile_screen_y;
  }

  public preload(): void {
    this.scene.load.spritesheet('terrain', 'assets/spritesheets/terrain_hex.png', {
      frameWidth: 120,
      frameHeight: 139,
    });
  }

}
