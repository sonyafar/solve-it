import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() { }
  
  nativeGlobal(): any { return window }

}