import './polyfills.ts';
import './vendor.ts';
import './main.less';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

if (__IS_PROD__) {
    enableProdMode();
}

let platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);