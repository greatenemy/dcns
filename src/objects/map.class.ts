import { RawMap, RawTile, TileUuid } from '~/types'
import { Tile } from '~/objects/tile.class'

//  The pointer has to move 16 pixels before it's considered as a drag
const dragDistanceThreshold = 16;

/**
 * @todo this should probably be a Container instead of an Image
 **/
export class Map extends Phaser.GameObjects.Image {
  map: RawMap;
  // private tiles: PhaserTileMap;
  // private tiles: Phaser.GameObjects.Image[];
  tiles: Tile[];
  anchor_uuid: TileUuid;
  needs_create: boolean;
  map_screen_width: number;
  map_screen_height: number;
  border_size: number;
  tile_size_x: number;
  tile_size_y: number;
  pan_offset_x: number;
  pan_offset_y: number;
  pan_acceleration_x: number;
  pan_acceleration_y: number;
  pan_acceleration_max = 32;
  pan_acceleration_per_frame = 0.5;
  pan_deacceleration_per_frame = 1.5;
  zoom_level: number;
  zoom_momentum: number;
  zoom_ratio: number;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  bg_img: Phaser.GameObjects.TileSprite;
  origDragPoint: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.scene.add.existing(this);
    // this.depth = -1000
  }

  setRawMap(newMapValue: RawMap = null): void {
    this.map = newMapValue;
    this.needs_create = true;
  }

  private initVariables(): void {
    this.tiles = [];
    this.anchor_uuid = null;
    // this.increaseAlpha = false;
    this.border_size = 4;
    this.tile_size_x = 120 + this.border_size;
    this.tile_size_y = 104 + this.border_size;
    this.pan_offset_x = 300;
    this.pan_offset_y = 200;
    this.pan_acceleration_x = 0;
    this.pan_acceleration_y = 0;
    this.zoom_momentum = 0;
    this.zoom_level = 0; // 0 is 100%
    this.zoom_ratio = Math.exp(this.zoom_level)
  }

  private initImage(): void {
  }

  create(): void {
    // this.bg_img = this.scene.add.tileSprite(400, 300, 1600, 1600, 'map_bg_seemless');
    this.bg_img = new Phaser.GameObjects.TileSprite(this.scene, 400, 300, 1600, 1600, 'map_bg_seemless')
    this.scene.add.existing(this.bg_img)
    this.bg_img.alpha = 0.5
    // this.bg_img.setInteractive();
    // this.scene.input.setDraggable(this.bg_img);

    // bg_img.setTintFill(white, white, white, white)
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    // this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.recreateTiles();

    // @todo phaser scenes no support teardown???
    window.addEventListener("wheel", event => {
      const dir = Math.sign(event.deltaY);
        // console.log(dir);
      this.zoom_momentum += dir;
    });
  }

  recreateTiles(): void {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      this.tiles[i].destroy();
    }

    this.tiles.length = 0

    if (!this.map) return;

    // console.log(JSON.stringify(data, null, 2));
    // mapJson.setText(JSON.stringify(data, null, 2))

    for (let i = this.map.tiles.length - 1; i >= 0; i--) {
      const game_object = new Tile({
        scene: this.scene,
        map: this,
        x: 0,
        y: 0,
        tile: this.map.tiles[i],
        // key: this.map.tiles[i].uuid,
        key: 'terrain',
        sprite_index: this.map.tiles[i].terrain,
        index: i,
      });
      this.scene.add.existing(game_object)
      this.tiles.push(game_object)

      // console.log(this.input);

      // this.scene.input.setDraggable(game_object);
    }
    // this.scene.input.setDraggable(this.bg_img);

    // this.scene.input.dragDistanceThreshold = dragDistanceThreshold;

    // this.scene.input.on('dragstart', (pointer, gameObject) => {
    //     console.log('dragstart');
    //     // gameObject.setTint(0xff0000);
    // });

    // this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    //   console.log('drag');
    //   // console.log('drag', { diffX: dragX - gameObject.x, diffY: dragY - gameObject.x });
    //   this.pan_offset_x += Math.round((dragX - gameObject.x) / 3)
    //   this.pan_offset_y += Math.round((dragY - gameObject.y) / 3)
    //   // this.pan_acceleration_x += Math.round((dragX - gameObject.x) / 100)
    //   // this.pan_acceleration_y += Math.round((dragY - gameObject.y) / 100)
    //     // gameObject.x = dragX;
    //     // gameObject.y = dragY;

    // });

    // this.scene.input.on('dragend', (pointer, gameObject) => {
    //     console.log('dragend');

    //     // gameObject.clearTint();

    // });

  }

  update(): void {
    if (!this.map) return;
    if (this.needs_create) {
      this.recreateTiles();
      if (this.map && this.map.map_options) {
        this.bg_img.width = this.map.map_options.width * this.tile_size_x * 3
        this.bg_img.height = this.map.map_options.height * this.tile_size_y * 3
      }
      this.needs_create = false;
      return;
    }
    if (this.cursorKeys.up.isDown && this.cursorKeys.down.isUp) {
      this.pan_acceleration_y = Math.min(this.pan_acceleration_y + this.pan_acceleration_per_frame, this.pan_acceleration_max)
    } else if (this.cursorKeys.down.isDown && this.cursorKeys.up.isUp) {
      this.pan_acceleration_y = Math.max(this.pan_acceleration_y - this.pan_acceleration_per_frame, -this.pan_acceleration_max)
    } else if (this.pan_acceleration_y > 0) {
      this.pan_acceleration_y = Math.max(this.pan_acceleration_y - this.pan_deacceleration_per_frame, 0)
    } else if (this.pan_acceleration_y < 0) {
      this.pan_acceleration_y = Math.min(this.pan_acceleration_y + this.pan_deacceleration_per_frame, 0)
    }

    if (this.cursorKeys.left.isDown && this.cursorKeys.right.isUp) {
      this.pan_acceleration_x = Math.min(this.pan_acceleration_x + this.pan_acceleration_per_frame, this.pan_acceleration_max)
    } else if (this.cursorKeys.right.isDown && this.cursorKeys.left.isUp) {
      this.pan_acceleration_x = Math.max(this.pan_acceleration_x - this.pan_acceleration_per_frame, -this.pan_acceleration_max)
    } else if (this.pan_acceleration_x > 0) {
      this.pan_acceleration_x = Math.max(this.pan_acceleration_x - this.pan_deacceleration_per_frame, 0)
    } else if (this.pan_acceleration_x < 0) {
      this.pan_acceleration_x = Math.min(this.pan_acceleration_x + this.pan_deacceleration_per_frame, 0)
    }
    this.pan_offset_y += Math.round(this.pan_acceleration_y)
    this.pan_offset_x += Math.round(this.pan_acceleration_x)

    this.map_screen_width = this.map.map_options.width * (this.tile_size_x + this.border_size);
    this.map_screen_height = this.map.map_options.height * (this.tile_size_y + this.border_size);

    const scrollgutter = 400;
    if (this.pan_offset_x > scrollgutter) {
      this.pan_offset_x = scrollgutter;
    } else if (this.pan_offset_x < scrollgutter - this.map_screen_width) {
      // @todo account for screen width
      this.pan_offset_x = scrollgutter - this.map_screen_width;
    }
    if (this.pan_offset_y > scrollgutter) {
      this.pan_offset_y = scrollgutter;
    } else if (this.pan_offset_y < scrollgutter - this.map_screen_height) {
      // @todo account for screen width
      this.pan_offset_y = scrollgutter - this.map_screen_height;
    }
    this.bg_img.x = this.pan_offset_x
    this.bg_img.y = this.pan_offset_y

    for (let i = this.tiles.length - 1; i >= 0; i--) {
      this.tiles[i].update();
    }

    // for each point of momentum by the mouse
    // this is how much the zoom will change
    const zoom_interval = 0.1
    const max_zoom_in = 2
    const max_zoom_out = -2
    if (this.zoom_momentum > 0) {
      this.zoom_momentum = Math.max(0, this.zoom_momentum - 1);
      this.zoom_level = Math.max(max_zoom_out, this.zoom_level - zoom_interval);
      this.zoom_ratio = Math.exp(this.zoom_level)
      this.scene.cameras.main.setZoom(this.zoom_ratio);
    } else if (this.zoom_momentum < 0) {
      this.zoom_momentum = Math.min(0, this.zoom_momentum + 1);
      this.zoom_level = Math.min(max_zoom_in, this.zoom_level + zoom_interval);
      this.zoom_ratio = Math.exp(this.zoom_level)
      this.scene.cameras.main.setZoom(this.zoom_ratio);
    }

    if (this.scene.game.input.activePointer.isDown) {
      if (this.origDragPoint) {
      // move the camera by the amount the mouse has moved since last update
      this.scene.cameras.main.scrollX +=
        (this.origDragPoint.x - this.scene.game.input.activePointer.position.x) / this.zoom_ratio;
      this.scene.cameras.main.scrollY +=
        (this.origDragPoint.y - this.scene.game.input.activePointer.position.y) / this.zoom_ratio;
      } // set new drag origin to current position
      this.origDragPoint = this.scene.game.input.activePointer.position.clone();
    } else {
      this.origDragPoint = null;
    }
  }

  public preload(): void {
    this.scene.load.image('map_bg_seemless', 'assets/map_bg_seemless.png');
    this.scene.load.spritesheet('terrain', 'assets/spritesheets/terrain_hex.png', {
      frameWidth: 120,
      frameHeight: 139,
    });
  }

}
