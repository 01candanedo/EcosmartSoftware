import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import {UserSession} from "../models/interfaces/usersession.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: UserSession) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  public async clear(){
    await this._storage?.clear();
  }
}
