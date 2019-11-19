export type TileUuid = string | number;

export interface RawTile {
  uuid: TileUuid;
  terrain: number;
  terrain_features: number[];
  neighbor_uuids: Array<TileUuid | null>;
}

export interface RawMapOption {
  height: number;
  script: string;
  seed: number;
  width: number;
}

export interface RawMap {
  map_options: RawMapOption;
  tiles: RawTile[];
}
